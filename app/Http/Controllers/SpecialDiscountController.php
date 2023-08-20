<?php

namespace App\Http\Controllers;

use App\Models\SpecialDiscount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class SpecialDiscountController extends Controller
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
        $request->validate([
            'discount'=>["required", "integer", "max:99"],
        ]);
        $tax = SpecialDiscount::create([
            "discount"=>$request->discount,
            'user_id'=> Auth::user()->id
        ]);
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(SpecialDiscount $specialDiscount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SpecialDiscount $specialDiscount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SpecialDiscount $specialDiscount)
    {
        $request->validate([
            'discount'=>["required", "integer", "max:99"],
        ]);
        $special_current = SpecialDiscount::where("id",$specialDiscount->id)->first();
        if(floatVal($request->tax) != $special_current->discount){
            SpecialDiscount::create([
                'discount' => $request->discount,
                'user_id'=> Auth::user()->id
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SpecialDiscount $specialDiscount)
    {
        //
    }
}
