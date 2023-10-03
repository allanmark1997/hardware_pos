<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with("supplier")->with("user")->with("product")->has("product")->with("price")->where("status", 0)->get();
        $group_suppliers = $orders->groupBy('supplier_id');
        $temp_array = [];
        foreach ($group_suppliers as $key => $supplier) {
            foreach ($supplier as $key2 => $data) {
                // dd(array_search($data->supplier->supplier_name, $temp_array));
                if (array_search($data->supplier->supplier_name, $temp_array) <= 0) {
                    $temp_array[$data->supplier->supplier_name][] = [$data];
                } else {
                    $temp_array[] = [$data];
                }
            }
        }

        return Inertia::render('Cart/Cart', [
            "orders" => $orders,
            "group_suppliers" => $temp_array,
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
            'quantity' => ["required", "integer"],
        ]);
        $order_find = Order::where("product_id", $request->product["product_id"])->where("status", 0)->first();
        if ($order_find == null) {
            $order = Order::create([
                "supplier_id" => $request->product["supplier_id"],
                "user_id" => Auth::user()->id,
                "status" => false,
                "remarks" => "",
                "product_id" => $request->product["product_id"],
                "price_id" => $request["product"]["price"]["id"],
                "quantity" => $request->quantity,
                "remarks" => $request->remarks
            ]);
        } else {
            $added_quantity = $order_find->quantity + $request->quantity;
            $order_find->update([
                "quantity" => $added_quantity
            ]);
        }

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        // dd($request->quantity);
        $order->update([
            "quantity" => $request->quantity
        ]);
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return back();
    }
}
