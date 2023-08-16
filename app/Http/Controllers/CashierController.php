<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use App\Models\Category;
use App\Models\product;


class CashierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $search = $request->search ?? '';
        // if ($request->search != '') {
        //     $product = product::with('current_price')->with('current_discount')->when($search != null || $search != "", function($query) use($search){
        //         $query->where("barcode", $search);
        //     })->first();
        // }
        // else{
        //     $product = "";
        // }
        $product = $product = product::with('current_price')->with('current_discount')->where("barcode", $request->search)->first();
        $categories = Category::get();
        return Inertia::render('Cashier/Cashier',[
            "product" => $product
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
        //
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
