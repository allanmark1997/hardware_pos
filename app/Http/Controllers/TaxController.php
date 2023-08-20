<?php

namespace App\Http\Controllers;

use App\Models\Tax;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class TaxController extends Controller
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
            'tax'=>["required", "integer", "max:99"],
        ]);
        $tax = Tax::create([
            "tax"=>$request->tax,
            'user_id'=> Auth::user()->id
        ]);
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Tax $tax)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tax $tax)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tax $tax)
    {
        $request->validate([
            'tax'=>["required", "integer", "max:99"],
        ]);
        $tax_current = Tax::where("id",$tax->id)->first();
        if(floatVal($request->tax) != $tax_current->tax){
            Tax::create([
                'tax' => $request->tax,
                'user_id'=> Auth::user()->id
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tax $tax)
    {
        //
    }
}
