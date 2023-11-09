<?php

namespace App\Http\Controllers;

use App\Exports\BackOrderExport;
use App\Models\BackOrder;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class BackOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Auth::user()->type == 2) {
            return Redirect::route('cashier.index');
        } else {
            $date_from = $request->date_from ?? "";
            $date_to = $request->date_to ?? "";
            $back_orders = BackOrder::with("product")->with("price")->with("discount")->with("user")->when($date_from !=  null || $date_from != "" && $date_to != null || $date_to != "", function ($query) use ($date_from, $date_to) {
                $query->whereBetween('created_at', [$date_from, $date_to]);
            })->orderBy("created_at", "desc")->paginate(20);
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

        $grand_total[] = ["GRAND TOTAL SUCCESS", "GRAND TOTAL IN PROGRESS", "GRAND TOTAL CANCEL"];
        $grand_total[] = ["PHP " . $this->number_format_conversion($this->calculate_success_grand_totals($back_orders)), "PHP " . $this->number_format_conversion($this->calculate_inprogress_grand_totals($back_orders)), "PHP " . $this->number_format_conversion($this->calculate_cancel_grand_totals($back_orders))];

        $results[] = [
            "PROCESSED BY",
            "PRODUCT NAME",
            "PRICE",
            "DISCOUNT",
            "QUANTITY",
            "STATUS",
            "SUCCESS SUB-TOTAL",
            "INPROGRESS SUB-TOTAL",
            "CANCEL SUB-TOTAL",
            "CREATED AT"
        ];
        foreach ($back_orders as $key => $backorder) {
            $results[] = [
                $backorder->user->name,
                $backorder->product->name,
                "PHP " . $this->number_format_conversion($backorder->price->price),
                $backorder->discount->discount,
                $backorder->quantity,
                $backorder->status == 1 ? "Refunded" : "In progress",
                "PHP " . $this->number_format_conversion($backorder->status == 1 ? $backorder->quantity * $backorder->price->price : 0),
                "PHP " . $this->number_format_conversion($backorder->status == 0 ? $backorder->quantity * $backorder->price->price : 0),
                "PHP " . $this->number_format_conversion($backorder->status == 2 ? $backorder->quantity * $backorder->price->price : 0),
                Carbon::parse($backorder->created_at)->format('d-m-Y')
            ];
        }

        return (new BackOrderExport([$results, $grand_total], ['Back Orders', 'Grand totals']))->download($request->date_from . " to " . $request->date_to . " Back-orders.xlsx");
    }

    private function number_format_conversion($data)
    {
        $split_data = explode(".", strval($data));
        $decimal = "";
        try {
            $decimal = strval($split_data[1]);
        } catch (\Throwable $th) {
            //throw $th;
        }
        $substring_decimal = $decimal == "" ? "00" : substr($decimal, 0, 2);
        $validate_decimal = $substring_decimal;
        $final_data = strval($split_data[0]) . "." . $validate_decimal;
        return $final_data;
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

    private function calculate_cancel_grand_totals($back_orders)
    {
        $result = 0;
        foreach ($back_orders as $key => $backorder) {
            if ($backorder->status == 2) {
                $result += $backorder->quantity * $backorder->price->price;
            }
        }
        return $result;
    }

    public function authorize_(Request $request, BackOrder $backOrder)
    {
        $product = Product::find($backOrder->product_id);
        if ($backOrder->quantity > $product->quantity) {
            $new_remarks = $product->remarks . " - This request is cancelled due to requested quantity is beyond the stocks";

            $backOrder->update([
                "status" => 2,
                "remarks" => $new_remarks
            ]);
            throw ValidationException::withMessages([
                'message' => "Sorry, quantity in back order is greater than the stocks... This back order request will be cancel. Please request new one to authorize back order"
            ]);
        } else {
            $temp_quantity = $product->quantity - $backOrder->quantity;

            $product->update([
                "quantity" => $temp_quantity
            ]);

            $backOrder->update([
                "status" => 1
            ]);
        }
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
