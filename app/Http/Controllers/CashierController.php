<?php

namespace App\Http\Controllers;

use App\Models\CashierStatus;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use App\Models\Category;
use App\Models\product;
use App\Models\transaction;
use App\Models\TransactionDetail;
use Illuminate\Support\Facades\Auth;

class CashierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $product = product::with('current_price')->with('current_discount')->get();
        $cashier_stat = CashierStatus::where("user_id", Auth::user()->id)->first();
        return Inertia::render('Cashier/Cashier', [
            "product" => $product,
            "cashier_status" => $cashier_stat->status == 0 ? "false" : "true",
            "cashier_stat_id" => $cashier_stat->id
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
    public function create_transaction(Request $request)
    {
        $transaction = transaction::create([
            "processed_by" => Auth::user()->id,
            "status" => false,
            "payment_method" => 0,
            "customer_type" => 0
        ]);
        return back();
    }
    public function store(Request $request)
    {
        $product = product::where("barcode", $request->search)->with('current_price')->with('current_discount')->first();
        if ($product != null) {
            // dd($product->current_discount->id);

            TransactionDetail::create([
                "product_id" => $product->id,
                "transaction_id" => $request->transaction["id"],
                "sale_discounts_id" => $product->current_discount->id,
                "price_id" => $product->current_price->id
            ]);
        }

        $products = TransactionDetail::where('transaction_id')->get();
        return Inertia::render('Cashier/Cashier', [
            "product_listed" => $products
        ]);
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
}
