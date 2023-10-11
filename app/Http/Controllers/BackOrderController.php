<?php

namespace App\Http\Controllers;

use App\Exports\BackOrderExport;
use App\Models\BackOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BackOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Auth::user()->type != 0) {
            return Redirect::route('cashier.index');
        } else {
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
    }

    public function export(Request $request)
    {
        $results = [];
        $grand_total = [];
        $date_from = $request->date_from ?? "";
        $date_to = $request->date_to ?? "";
        $back_orders = BackOrder::with("product")->with("price")->with("discount")->with("user")->when($date_from !=  null || $date_from != "" && $date_to != null || $date_to != "", function ($query) use ($date_from, $date_to) {
            $query->whereBetween('created_at', [$date_from, $date_to]);
        })->get();

        $grand_total[] = ["GRAND TOTAL SUCCESS", "GRAND TOTAL IN PROGRESS"];
        $grand_total[] = ["PHP " . number_format($this->calculate_success_grand_totals($back_orders), 2), "PHP " . number_format($this->calculate_inprogress_grand_totals($back_orders), 2)];

        $results[] = [
            "PROCESSED BY",
            "PRODUCT NAME",
            "PRICE",
            "DISCOUNT",
            "QUANTITY",
            "STATUS",
            "SUCCESS SUB-TOTAL",
            "INPROGRESS SUB-TOTAL",
            "CREATED AT"
        ];
        foreach ($back_orders as $key => $backorder) {
            $results[] = [
                $backorder->user->name,
                $backorder->product->name,
                "PHP " . number_format($backorder->price->price, 2),
                $backorder->discount->discount,
                $backorder->quantity,
                $backorder->status == 1 ? "Refunded" : "In progress",
                "PHP " . number_format($backorder->status == 1 ? $backorder->quantity * $backorder->price->price : 0, 2),
                "PHP " . number_format($backorder->status == 0 ? $backorder->quantity * $backorder->price->price : 0, 2),
                Carbon::parse($backorder->created_at)->format('d-m-Y')
            ];
        }

        return (new BackOrderExport([$results, $grand_total], ['Back Orders', 'Grand totals']))->download($request->date_from . " to " . $request->date_to . " Back-orders.xlsx");
    }

    private function calculate_success_grand_totals($back_orders)
    {
        $result = 0;
        foreach ($back_orders as $key => $backorder) {
            if ($backorder->status == 1) {
                $result += $backorder->quantity * $backorder->price->price;
            }
        }
        return $result;
    }

    private function calculate_inprogress_grand_totals($back_orders)
    {
        $result = 0;
        foreach ($back_orders as $key => $backorder) {
            if ($backorder->status == 0) {
                $result += $backorder->quantity * $backorder->price->price;
            }
        }
        return $result;
    }

    public function authorize_(Request $request, BackOrder $backOrder)
    {
        $backOrder->update([
            "status" => true
        ]);
        return back();
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
