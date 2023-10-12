<?php

namespace App\Http\Controllers;

use App\Models\TransactionDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use stdClass;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $year_today = date("Y");
        $day = date('w');
        $week_start = date('m-d-Y', strtotime('-' . $day . ' days'));
        $week_end = date('m-d-Y', strtotime('+' . (6 - $day) . ' days'));
        $month_start = date('Y-m-01');
        $month_end = date('Y-m-t');
        dd($month_end);
        if (Auth::user()->type != 0) {
            return Redirect::route('cashier.index');
        } else {
            $sale_year = TransactionDetail::with("product")->with("price")->with("sale_discount")->where("created_at", "LIKE", "%{$year_today}%")->get();
            $grouped_sales_raw = $sale_year->groupBy("product.name");
            $temp_array = [];
            $temp_counter = [];
            $temp_final = [];
            $months = [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ];
            foreach ($grouped_sales_raw as $key => $group) {
                foreach ($group as $key2 => $product) {
                    $temp_counter[$key][Carbon::parse($product->created_at)->format("F")][] = array("quantity" => $product->quantity, "price" => $product->price->price, "discount" => $product->sale_discount->discount / 100);
                }
            }
            foreach ($temp_counter as $key1 => $group_products) {
                $temp_all_quantity = 0;
                $temp_all_price = 0;
                foreach ($group_products as $key2 => $group_date) {
                    $temp_result_per_month = 0;
                    foreach ($group_date as $key3 => $product_quantity_price) {
                        $temp_result_per_month += $product_quantity_price["quantity"];
                        $temp_all_quantity += $product_quantity_price["quantity"];
                        $temp_all_price += $product_quantity_price["quantity"] * ($product_quantity_price["price"] - ($product_quantity_price["price"] * $product_quantity_price["discount"]));
                    }
                    $temp_array[$key1]["name"] = $key1;
                    $temp_array[$key1]["data"][$key2] = $temp_result_per_month;
                }
                $temp_array[$key1]["quantity"] = $temp_all_quantity;
                $temp_array[$key1]["total_sale"] = $temp_all_price;
            }
            foreach ($temp_array as $key => $value) {
                $temp_final[] = (object) array("name" => $value["name"],  "data" => (object) $value["data"], "quantity" => $value["quantity"], "total_sale" => $value["total_sale"]);
            }
            $sale_year_filtered = $this->sortByField($temp_final, 'quantity');
            $top_10_prod_year = array_slice($sale_year_filtered, 0, 10);

            $sample_array_months_jan_to_dec = [];
            foreach ($months as $key => $months_value) {
                foreach ($top_10_prod_year as $key2 => $value2) {
                    $sample_array_months_jan_to_dec[$key2]["name"] = $value2->name;
                    $sample_array_months_jan_to_dec[$key2]["data"][$months_value] = 0;
                    foreach ($value2->data as $key3 => $value3) {
                        if ($key3 == $months_value) {
                            $sample_array_months_jan_to_dec[$key2]["data"][$months_value] = $value3;
                        }
                    }
                }
            }
            return Inertia::render("Dashboard", [
                "sale_year" => $top_10_prod_year,
                "full_year_top_10_sales" => $sample_array_months_jan_to_dec,
                "current_year" => $year_today
            ]);
        }
    }

    // public function month($val)
    // {
    //     if ($val == 1) {
    //         return "Januray";
    //     } elseif ($val == 2) {
    //         return "February";
    //     } elseif ($val == 3) {
    //         return "March";
    //     } elseif ($val == 4) {
    //         return "April";
    //     } elseif ($val == 5) {
    //         return "May";
    //     } elseif ($val == 6) {
    //         return "June";
    //     } elseif ($val == 7) {
    //         return "July";
    //     } elseif ($val == 8) {
    //         return "August";
    //     } elseif ($val == 9) {
    //         return "September";
    //     } elseif ($val == 10) {
    //         return "October";
    //     } elseif ($val == 11) {
    //         return "November";
    //     } elseif ($val == 12) {
    //         return "December";
    //     }
    // }

    function sortByField($array, $field)
    {
        $length = count($array);
        for ($i = 0; $i < $length; $i++) {
            for ($j = $i + 1; $j < $length; $j++) {
                if ($array[$i]->$field < $array[$j]->$field) {
                    $temp = $array[$i];
                    $array[$i] = $array[$j];
                    $array[$j] = $temp;
                }
            }
        }
        return $array;
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
