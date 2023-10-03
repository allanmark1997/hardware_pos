<?php

namespace App\Http\Controllers;

use App\Exports\DeliveryExport;
use App\Models\Delivery;
use App\Models\Order;
use App\Models\DeliveryDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Maatwebsite\Excel\Facades\Excel;

class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search ?? "";
        $date_from = $request->date_from ?? "";
        $date_to = $request->date_to ?? "";
        $deliveries = Delivery::with("details")->with("supplier")->has("supplier")->with("user_receiver")->when($date_from !=  null || $date_from != "" && $date_to != null || $date_to != "", function ($query) use ($date_from, $date_to) {
            $query->whereBetween('created_at', [$date_from, $date_to]);
        })->when($search != null || $search != "", function ($query) use ($search) {
            $query->whereHas("supplier", function ($query2) use ($search) {
                $query2->where("supplier_name", "LIKE", "%{$search}%");
            })->with(['supplier' => function ($query2) use ($search) {
                $query2->where("supplier_name", "LIKE", "%{$search}%");
            }]);
        })->where("status", 1)->paginate(20);
        return Inertia::render('Delivery/Delivery', [
            "deliveries" => $deliveries,
            "date_from" => $date_from,
            "date_to" => $date_to,
            "search" => $search
        ]);
    }

    public function receive_index(Request $request)
    {
        $search = $request->search ?? "";
        $date_from = $request->date_from ?? "";
        $date_to = $request->date_to ?? "";
        $deliveries = Delivery::with("details")->with("supplier")->has("supplier")->with("user_receiver")->when($date_from !=  null || $date_from != "" && $date_to != null || $date_to != "", function ($query) use ($date_from, $date_to) {
            $query->whereBetween('created_at', [$date_from, $date_to]);
        })->when($search != null || $search != "", function ($query) use ($search) {
            $query->whereHas("supplier", function ($query2) use ($search) {
                $query2->where("supplier_name", "LIKE", "%{$search}%");
            })->with(['supplier' => function ($query2) use ($search) {
                $query2->where("supplier_name", "LIKE", "%{$search}%");
            }]);
        })->where("status", 0)->paginate(20);
        return Inertia::render('ReceiveDelivery/Delivery', [
            "deliveries" => $deliveries,
            "date_from" => $date_from,
            "date_to" => $date_to,
            "search" => $search
        ]);
    }

    public function export(Request $request)
    {
        $search = $request->search ?? "";
        $date_from = $request->date_from ?? "";
        $date_to = $request->date_to ?? "";
        // return Excel::download(new DeliveryExport, 'deliveries.xlsx');
        $deliveries = Delivery::with("details")->with("supplier")->with("user_receiver")->when($date_from !=  null || $date_from != "" && $date_to != null || $date_to != "", function ($query) use ($date_from, $date_to) {
            $query->whereBetween('created_at', [$date_from, $date_to]);
        })->when($search != null || $search != "", function ($query) use ($search) {
            $query->where("id", $search);
        })->where("status", 1)->get();

        $results = [];
        $grand_unsuccess_total = [];

        // $results[] = ['DATE RANGES', 'From', 'To', 'Success grand total', "Unsuccessful grand total"];
        // $results[] = ['', $request->date_from ?? "--", $request->date_to ?? '--', "PHP " . number_format($this->grand_total_success($deliveries), 2), "PHP " . number_format($this->grand_total_unsuccess($deliveries), 2)];

        $grand_unsuccess_total[] = ['Success grand total', "Unsuccessful grand total"];
        $grand_unsuccess_total[] = [
            "PHP " . number_format($this->grand_total_success($deliveries), 2),
            "PHP " . number_format($this->grand_total_unsuccess($deliveries), 2)
        ];
        $results[] = ['SUPPLIER NAME', 'RECEIVED BY', 'STATUS', 'PRODUCT NAME', 'QUANTITY', 'PRICE', "SUB-TOTAL", "STATUS", 'REMARKS', 'UNSUCCESSFULL TOTAL', 'SUCCESSFUL TOTAL', 'CREATED AT'];

        foreach ($deliveries as $key => $delivery) {
            $results[] =
                [
                    $delivery->supplier->supplier_name ?? "--",
                    $delivery->user_receiver->name ?? '--',
                    $delivery->status == 1 ? 'Delivered' : "Unsuccessful",
                    "",
                    "",
                    "",
                    "",
                    "",

                    $delivery->remarks ?? '--',
                    $this->products_total_unsuccessful($delivery->details),
                    $this->products_total_success($delivery->details),
                    $this->date_time_formatter($delivery->created_at)
                ];
            for ($i = 0; $i < count($delivery->details); $i++) {
                $results[][$i] =
                    [
                        "",
                        '',
                        '',
                        $delivery->details[$i]['product']->name,
                        $delivery->details[$i]['quantity'],
                        "PHP " . number_format($delivery->details[$i]['price']->price, 2),
                        "PHP " . number_format($delivery->details[$i]['quantity'] * $delivery->details[$i]['price']->price, 2),
                        $delivery->details[$i]['status'] == 1 ? 'Delivered' : "Unsuccessful",
                        '',
                        '',
                        ''
                    ];
            }
        }
        // dd($results);
        return (new DeliveryExport([$results, $grand_unsuccess_total], ['Delivery', 'Grand totals']))->download($request->date_from . " to " . $request->date_to . " Deliveries.xlsx");
        // return Excel::download(new DeliveryExport, 'Delivery.xlsx');
    }

    public function grand_total_success($data)
    {
        $grand_total = 0;
        if (count($data) != 0) {
            foreach ($data as $key => $delivery) {
                foreach ($delivery->details as $key => $value) {
                    if ($value->status == 1) {
                        $grand_total += $value->price->price * $value->quantity;
                    }
                }
            }
            return $grand_total;
        }
    }

    public function grand_total_unsuccess($data)
    {
        $grand_total = 0;
        if (count($data) != 0) {
            foreach ($data as $key => $delivery) {
                foreach ($delivery->details as $key => $value) {
                    if ($value->status == 0) {
                        $grand_total += $value->price->price * $value->quantity;
                    }
                }
            }
            return $grand_total;
        }
    }

    public function products($data)
    {
        if (count($data) != 0) {
            foreach ($data as $key => $value) {
                $array_sample[] =
                    'Name: ' . $value["product"]["product"]["name"] .
                    ', Quantity: ' . $value['quantity'] .
                    ', Price: ' . "PHP" . number_format($value['price'], 2);
            }
            return $array_sample;
        } else {
            return "--";
        }
    }

    public function products_total_success($data)
    {
        if (count($data) != 0) {
            $sum = 0;
            foreach ($data as $key => $value) {
                if ($value["status"] == 1) {
                    $sum += $value["price"]->price * $value["quantity"];
                }
            }
            return "PHP " . number_format($sum, 2);
        } else {
            return "--";
        }
    }

    public function products_total_unsuccessful($data)
    {
        if (count($data) != 0) {
            $sum = 0;
            foreach ($data as $key => $value) {
                if ($value["status"] == 0) {
                    $sum += $value["price"]->price * $value["quantity"];
                }
            }
            return "PHP " . number_format($sum, 2);
        } else {
            return "--";
        }
    }

    public function date_time_formatter($data)
    {
        $created_at = Carbon::parse($data);
        return $created_at;
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
        $temp_array = [];
        foreach ($request->selected_product as $key => $supplier) {
            // dd($supplier['supplier_id']);
            if (array_search($supplier['supplier']['supplier_name'], $temp_array) <= 0) {
                $temp_array[$supplier['supplier']['supplier_name']]["supplier_id"] = [$supplier['supplier_id']];

                $temp_array[$supplier['supplier']['supplier_name']]["products"][] = [$supplier];
            } else {
                $temp_array["products"][] = [$supplier];
            }
        }
        // dd($temp_array);
        foreach ($temp_array as $key => $supplier) {
            $delivery = Delivery::create([
                "supplier_id" => $supplier["supplier_id"][0],
                "remarks" => "",
                "status" => false
            ]);
            foreach ($supplier["products"] as $key => $product) {
                $order = Order::find($product[0]["id"]);
                // dd($order);
                $product = DeliveryDetail::create([
                    "product_id" => $product[0]["product_id"],
                    "delivery_id" => $delivery->id,
                    "status" => false,
                    "price_id" => $product[0]["price_id"],
                    "quantity" => $product[0]["quantity"],
                ]);

                $order->update([
                    "status" => true
                ]);
            }
        };
        return back();
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
    public function update_item_status(Request $request, DeliveryDetail $item)
    {
        $item->update([
            "status" => $request->status
        ]);
        return back();
    }

    public function authenticate(Request $request, Delivery $delivery)
    {
        $delivery->update([
            "status" => $request->status,
            "received_by" => Auth::user()->id
        ]);
        return back();
    }

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
