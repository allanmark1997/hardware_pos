<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ReturnProduct;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ReturnProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Auth::user()->type == 2) {
            return Redirect::route('cashier.index');
        } else {
            $date_from = $request->date_from ?? "";
            $date_to = $request->date_to ?? "";
            $search = $request->search ?? "";
            $transactions = ReturnProduct::with("transaction")->with("product")->with("price")->with("sale_discount")->orderBy("created_at")->when($search != null || $search != "", function ($query) use ($search) {
                $query->where("transaction_id", $search);
            })->when($date_from !=  null || $date_from != "" && $date_to != null || $date_to != "", function ($query) use ($date_from, $date_to) {
                $query->whereBetween('created_at', [$date_from, $date_to]);
            })->get();
            $group_transactions = $transactions->groupBy("transaction_id");

            $array_transactions = [];
            foreach ($group_transactions as $key => $value) {
                $array_transactions[] = array("transaction_id" => $key, "data" => $value);
            }

            // dd($array_transactions);
            return Inertia::render('ReturnProduct/Transaction', [
                "transactions" => $array_transactions,
                "date_from" => $date_from,
                "date_to" => $date_to,
                "search" => $search
            ]);
        }
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
        foreach ($request->products as $key => $product) {
            $transaction_detail = TransactionDetail::with("product")->where("id", $product["product"]["id"])->first();
            $product_in_stocks = Product::where("id", $product["product"]["product"]["id"])->first();
            $return_product = ReturnProduct::where("transaction_detail_id", $product["product"]["id"])->where("product_id", $product["product"]["product"]["id"])->get();
            $return_product_qty = 0;
            foreach ($return_product as $key => $product_return) {
                $return_product_qty += $product_return["quantity"];
            }
            // dd($product_in_stocks->quantity < $product["quantity"] && $product["type"] == 1);
            if ($return_product != null) {
                if ($return_product_qty == $transaction_detail->quantity) {
                    throw ValidationException::withMessages([
                        'transaction_validation' => "This product (" .  $transaction_detail->product->name . ") is already claimed."
                    ]);
                } elseif (($return_product_qty + $product["quantity"]) > $transaction_detail->quantity) {
                    throw ValidationException::withMessages([
                        'transaction_validation' => "This product (" .  $transaction_detail->product->name . ") is already in return products with quantity of (" . $return_product_qty . ") and avalable to return is (" . $transaction_detail->quantity - $return_product_qty . ") item(s) only. And you requested (" . $product["quantity"] . ") quantity that makes (" . $return_product_qty + $product["quantity"] . "), This is beyond in transaction detail quantity, INVALID"
                    ]);
                } else if ($product["quantity"] > $product_in_stocks->quantity && $product["type"] == 1) {
                    throw ValidationException::withMessages([
                        'transaction_validation' => "Opps, looks like the stocks of (" .  $product_in_stocks->name . ") in less than requested "
                    ]);
                }
            } else {
                if (($return_product_qty + $product["quantity"]) > $transaction_detail->quantity) {
                    throw ValidationException::withMessages([
                        'transaction_validation' => "Opps, looks like the requested quantity is beyond of the transaction detail named (" .  $transaction_detail->product->name . ")"
                    ]);
                } else if ($product["quantity"] > $product_in_stocks->quantity && $product["type"] == 1) {
                    throw ValidationException::withMessages([
                        'transaction_validation' => "Opps, looks like the stocks of (" .  $product_in_stocks->name . ") in less than requested "
                    ]);
                }
            }
        }
        DB::beginTransaction();
        try {
            foreach ($request->products as $key => $product) {
                $return_product = ReturnProduct::where("transaction_detail_id", $product["product"]["id"])->where("type", $product["type"])->first();
                $product_find = Product::where("id", $product["product"]["product"]["id"])->first();
                if ($return_product != null) {
                    $return_product->update([
                        "quantity" => $return_product->quantity + $product["quantity"],
                        "remarks" => $product["remarks"],
                        "proccessed_by" => Auth::user()->id
                    ]);
                    $inventory_new = 0;
                    if ($product["type"] == 1) {
                        $inventory_new = $product_find->quantity - $product["quantity"];
                    } elseif ($product["type"] == 2) {
                        $inventory_new = $product_find->quantity + $product["quantity"];
                    }
                    $product_find->update([
                        "quantity" => $inventory_new
                    ]);
                } else {
                    $inventory_new = 0;
                    if ($product["type"] == 1) {
                        $inventory_new = $product_find->quantity - $product["quantity"];
                    } elseif ($product["type"] == 2) {
                        $inventory_new = $product_find->quantity + $product["quantity"];
                    }
                    $product_find->update([
                        "quantity" => $inventory_new
                    ]);

                    ReturnProduct::create([
                        "transaction_id" => $product["product"]["transaction_id"],
                        "transaction_detail_id" => $product["product"]["id"],
                        "product_id" => $product["product"]["product"]["id"],
                        "quantity" => $product["quantity"],
                        "price_id" => $product["product"]["price_id"],
                        "sale_discount_id" => $product["product"]["sale_discounts_id"],
                        "remarks" => $product["remarks"],
                        "proccessed_by" => Auth::user()->id,
                        "type" => $product["type"],
                    ]);
                }
            }
            DB::commit();
        } catch (\Throwable $th) {
            dd("error");
            DB::rollback();
        }
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(ReturnProduct $returnProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReturnProduct $returnProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ReturnProduct $returnProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReturnProduct $returnProduct)
    {
        //
    }
}
