<?php

namespace App\Http\Controllers;

use App\Models\ReturnProduct;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
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
    public function store(Request $request, TransactionDetail $transaction_detail)
    {
        $request->validate([
            "quantity" => ["required"],
            "remarks" => ["required"],
        ]);
        if ($request->quantity < $transaction_detail->quantity) {
            throw ValidationException::withMessages([
                'transaction_validation' => "Opps, looks like your inputed quantity is beyond stocks in " . $transaction_detail["name"],
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
