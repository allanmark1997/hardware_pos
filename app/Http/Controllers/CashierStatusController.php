<?php

namespace App\Http\Controllers;

use App\Models\CashierStatus;
use Illuminate\Http\Request;

class CashierStatusController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CashierStatus $cashierStatus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CashierStatus $cashierStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CashierStatus $cashierStatus)
    {
    }

    public function update_status(Request $request, CashierStatus $cashierStatus)
    {
        $cashierStatus->update([
            "status" => true
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CashierStatus $cashierStatus)
    {
        //
    }
}
