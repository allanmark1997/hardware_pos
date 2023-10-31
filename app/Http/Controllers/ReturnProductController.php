<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ReturnProduct;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ReturnProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            // dd($transaction_detail);
            if ($product["quantity"] < $transaction_detail->quantity) {
                throw ValidationException::withMessages([
                    'transaction_validation' => "Opps, looks like the requested quantity is beyond of the transaction detail named (" .  $transaction_detail->product->name . ")"
                ]);
            } else if ($product["quantity"] > $product_in_stocks->quantity) {
                throw ValidationException::withMessages([
                    'transaction_validation' => "Opps, looks like the stocks of (" .  $product_in_stocks->name . ") in less than requested "
                ]);
            }
        }

        foreach ($request->products as $key => $product) {
            ReturnProduct::create([
                "transaction_id" => $product["product"]["transaction_id"],
                "transaction_detail_id" => $product["product"]["id"],
                "product_id" => $product["product"]["product"]["id"],
                "quantity" => $product["quantity"],
                "price_id" => $product["product"]["price_id"],
                "sale_discount_id" => $product["product"]["sale_discounts_id"],
                "remarks" => $product["remarks"],
                "proccessed_by" => Auth::user()->id
            ]);
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
