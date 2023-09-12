<?php

namespace App\Http\Controllers;

use App\Models\BackOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BackOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date_from = $request->date_from ?? "";
        $date_to = $request->date_to ?? "";
        $back_orders = BackOrder::with("product")->with("price")->with("discount")->with("user")->when($date_from !=  null || $date_from != "" && $date_to != null || $date_to != "", function ($query) use ($date_from, $date_to) {
            $query->whereBetween('created_at', [$date_from, $date_to]);
        })->paginate(20);
        return Inertia::render('BackOrder/BackOrder', [
            "back_orders" => $back_orders,
            "date_from" => $date_from,
            "date_to" => $date_to
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
    public function show(BackOrder $backOrder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BackOrder $backOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BackOrder $backOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BackOrder $backOrder)
    {
        //
    }
}
