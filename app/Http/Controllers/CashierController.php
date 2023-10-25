<?php

namespace App\Http\Controllers;

use App\Models\CashierStatus;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use App\Models\Category;
use App\Models\product;
use App\Models\SpecialDiscount;
use App\Models\Tax;
use App\Models\transaction;
use App\Models\TransactionDetail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;


class CashierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $image_address = env("APP_URL") . "/storage/logo/wrenches.jpg";
        return Inertia::render('Cashier/Welcome', [
            "logo" => $image_address
        ]);
    }
    public function transaction_index(Request $request)
    {
        // $code_generator = $request->code_generator ?? false;
        // $code = "";
        // if ($code_generator == true) {
        $code = $this->codeGenerator();
        // }
        $product = product::with('current_price')->with('current_discount')->get();
        $tax = Tax::orderBy('created_at', 'desc')->first();
        $special_discount = SpecialDiscount::orderBy('created_at', 'desc')->first();
        $cashier_stat = CashierStatus::where("user_id", Auth::user()->id)->first();
        if ($request->code === true) {
            $code = $this->generateCode();
        }
        return Inertia::render('Cashier/Cashier', [
            "product" => $product,
            "cashier_status" => $cashier_stat->status == 0 ? "false" : "true",
            "cashier_stat_id" => $cashier_stat->id,
            "tax" => $tax,
            "special_discount" => $special_discount,
            "code" => $code
        ]);
    }

    public function return_index(Request $request)
    {
        $transaction = transaction::get();
        return Inertia::render('Cashier/ReturnProducts', [
            "transaction" => $transaction
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "cash" => ["required"],
        ]);
        foreach ($request->products as $key => $product) {
            $product_find = product::find($product["id"]);
            if ($product_find->quantity < $product["cashier_quantity"]) {
                throw ValidationException::withMessages([
                    'transaction_validation' => "Opps, looks like your inputed quantity is beyond stocks in " . $product["name"],
                ]);
                return back();
            }
        }
        // dd("success");
        $transaction = transaction::create([
            "processed_by" => Auth::user()->id,
            "status" => true,
            "payment_method" => false,
            "customer_type" => false,
            "tax_id" => $request->tax_id,
            "special_discount_id" => $request->special_discount_id,
            "cash" => $request->cash,
            "code" => $request->code_generator
        ]);

        foreach ($request->products as $key => $product) {
            $product_find = product::where("id", $product["id"])->first();
            $deduct_inventory = $product_find->quantity - $product["cashier_quantity"];
            $product_find->update([
                "quantity" => $deduct_inventory
            ]);

            TransactionDetail::create([
                "product_id" => $product["id"],
                "transaction_id" => $transaction->id,
                "sale_discounts_id" => $product["current_discount"]["id"],
                "price_id" => $product["current_price"]["id"],
                "quantity" => $product["cashier_quantity"],
                "status" => true,
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function generateCode()
    {
        do {
            $code = Str::random(5);
            $exists = transaction::where('code', $code)->exists();
        } while ($exists);

        return response()->json([
            'status' => true,
            'code' => $code
        ], 200);
    }

    public function codeGenerator()
    {
        do {
            $code = Str::random(5);
            $exists = transaction::where('code', $code)->exists();
        } while ($exists);

        return $code;
    }
}
