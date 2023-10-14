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
        $month_today = date("Y-m");
        $day = date('w');
        $week_start = date('Y-m-d', strtotime('-' . $day . ' days'));
        $week_end = date('Y-m-d', strtotime('+' . (6 - $day) . ' days'));
        $week_start_day = date('d', strtotime('-' . $day . ' days'));
        $week_end_day = date('d', strtotime('+' . (6 - $day) . ' days'));
        $month_start = date('Y-m-01');
        $month_end = date('t');
// dd($week_start);
        if (Auth::user()->type != 0) {
            return Redirect::route('cashier.index');
        } else {
            $sale_week = TransactionDetail::with("product")->with("price")->with("sale_discount")->whereBetween("created_at",[$week_start, $week_end])->get();
            $temp_week_by_day = [];
            $week_day_data = [];
            $week_day_with_quantity_price_total_data = [];
            $week_day_with_quantity_price_total_data_object = [];
            $week_day_with_quantity_price_total_data_pie = [];
            $grouped_weekly_sales_raw = $sale_week->groupBy("product.name");
            for ($i = $week_start_day; $i <= $week_end_day; $i++) {
                $temp_week_by_day[] = (int)$i;
            }
            // dd($temp_week_by_day);
            foreach ($temp_week_by_day as $day_index => $day) {
                foreach ($grouped_weekly_sales_raw as $product_name => $group_product) {
                    $week_day_data[$product_name]["name"] = $product_name;
                    $week_day_data[$product_name]["data"][$day] = array("quantity" => 0);
                    $week_day_data[$product_name]["data"][$day]["price"] = 0;
                    $week_day_data[$product_name]["data"][$day]["discount"] = 0;
                    $week_day_data[$product_name]["data"][$day]["subtotal"] = 0;
                    $week_day_data[$product_name]["data"][$day]["total"] = 0;
                    $week_day_quantity = 0;
                    foreach ($group_product as $product_index => $product) {
                        if ($day == Carbon::parse($product->created_at)->format("d")) {
                            $week_day_quantity += $product->quantity;

                            $week_day_data[$product_name]["data"][$day] = array("quantity" => $week_day_quantity);
                            $week_day_data[$product_name]["data"][$day]["price"] = $product->price->price;
                            $week_day_data[$product_name]["data"][$day]["discount"] = $product->sale_discount->discount / 100;
                            $week_day_data[$product_name]["data"][$day]["subtotal"] = $product->price->price - ($product->price->price * $product->sale_discount->discount / 100);
                            $week_day_data[$product_name]["data"][$day]["total"] = ($product->price->price - ($product->price->price * $product->sale_discount->discount / 100)) * $week_day_quantity;
                        }
                    }
                }
            }

            $week_counter = 0;
            foreach ($week_day_data as $key1 => $group_products) {
                $week_quantity_all = 0;
                $week_grand_total_sale = 0;
                foreach ($group_products["data"] as $date => $date_value) {
                    $week_quantity_all += $date_value["quantity"];
                    $week_grand_total_sale += $date_value["total"];
                    $week_day_with_quantity_price_total_data[$week_counter]["name"] = $key1;
                    $week_day_with_quantity_price_total_data[$week_counter]["data"][$date] = $date_value["quantity"];
                    $week_day_with_quantity_price_total_data[$week_counter]["data_transparency"][$date] = array("sold" => $date_value["quantity"], "price" => $date_value["price"], "discount" => $date_value["discount"], "subtotal" => $date_value["subtotal"], "total" => $date_value["total"]);
                    $week_day_with_quantity_price_total_data[$week_counter]["total_quantity"] = $week_quantity_all;
                    $week_day_with_quantity_price_total_data[$week_counter]["week_grand_total_sale"] = $week_grand_total_sale;
                }
                $week_counter++;
            }

            foreach ($week_day_with_quantity_price_total_data as $key => $value) {
                $week_day_with_quantity_price_total_data_object[] = (object) array("name" => $value["name"],  "data" => (object) $value["data"], "data_transparency" => $value["data_transparency"], "total_quantity" => $value["total_quantity"], "grand_total_sale" => $value["week_grand_total_sale"]);
            }
            $sale_current_week_filtered = $this->sortByField($week_day_with_quantity_price_total_data_object, 'total_quantity');
            $top_10_prod_current_week = array_slice($sale_current_week_filtered, 0, 10);
            foreach ($top_10_prod_current_week as $key => $value) {
                $week_day_with_quantity_price_total_data_pie[] = array($value->name, $value->grand_total_sale);
            }

// dd($sale_week);
            $sale_month = TransactionDetail::with("product")->with("price")->with("sale_discount")->where("created_at", "LIKE", "%{$month_today}%")->get();
            $temp_month_by_day = [];
            $month_day_data = [];
            $month_day_with_quantity_price_total_data = [];
            $month_day_with_quantity_price_total_data_object = [];
            $month_day_with_quantity_price_total_data_pie = [];
            $grouped_monthly_sales_raw = $sale_month->groupBy("product.name");

            for ($i = 1; $i <= $month_end; $i++) {
                $temp_month_by_day[] = $i;
            }

            foreach ($temp_month_by_day as $day_index => $day) {
                foreach ($grouped_monthly_sales_raw as $product_name => $group_product) {
                    $month_day_data[$product_name]["name"] = $product_name;
                    $month_day_data[$product_name]["data"][$day] = array("quantity" => 0);
                    $month_day_data[$product_name]["data"][$day]["price"] = 0;
                    $month_day_data[$product_name]["data"][$day]["discount"] = 0;
                    $month_day_data[$product_name]["data"][$day]["subtotal"] = 0;
                    $month_day_data[$product_name]["data"][$day]["total"] = 0;
                    $month_day_quantity = 0;
                    foreach ($group_product as $product_index => $product) {
                        if ($day == Carbon::parse($product->created_at)->format("d")) {
                            $month_day_quantity += $product->quantity;

                            $month_day_data[$product_name]["data"][$day] = array("quantity" => $month_day_quantity);
                            $month_day_data[$product_name]["data"][$day]["price"] = $product->price->price;
                            $month_day_data[$product_name]["data"][$day]["discount"] = $product->sale_discount->discount / 100;
                            $month_day_data[$product_name]["data"][$day]["subtotal"] = $product->price->price - ($product->price->price * $product->sale_discount->discount / 100);
                            $month_day_data[$product_name]["data"][$day]["total"] = ($product->price->price - ($product->price->price * $product->sale_discount->discount / 100)) * $month_day_quantity;
                        }
                    }
                }
            }
            $counter = 0;
            foreach ($month_day_data as $key1 => $group_products) {
                $month_quantity_all = 0;
                $grand_total_sale = 0;
                foreach ($group_products["data"] as $date => $date_value) {
                    $month_quantity_all += $date_value["quantity"];
                    $grand_total_sale += $date_value["total"];
                    $month_day_with_quantity_price_total_data[$counter]["name"] = $key1;
                    $month_day_with_quantity_price_total_data[$counter]["data"][$date] = $date_value["quantity"];
                    $month_day_with_quantity_price_total_data[$counter]["data_transparency"][$date] = array("sold" => $date_value["quantity"], "price" => $date_value["price"], "discount" => $date_value["discount"], "subtotal" => $date_value["subtotal"], "total" => $date_value["total"]);
                    $month_day_with_quantity_price_total_data[$counter]["total_quantity"] = $month_quantity_all;
                    $month_day_with_quantity_price_total_data[$counter]["grand_total_sale"] = $grand_total_sale;
                }
                $counter++;
            }

            foreach ($month_day_with_quantity_price_total_data as $key => $value) {
                $month_day_with_quantity_price_total_data_object[] = (object) array("name" => $value["name"],  "data" => (object) $value["data"], "data_transparency" => $value["data_transparency"], "total_quantity" => $value["total_quantity"], "grand_total_sale" => $value["grand_total_sale"]);
            }
            $sale_current_month_filtered = $this->sortByField($month_day_with_quantity_price_total_data_object, 'total_quantity');
            $top_10_prod_current_month = array_slice($sale_current_month_filtered, 0, 10);
            foreach ($top_10_prod_current_month as $key => $value) {
                $month_day_with_quantity_price_total_data_pie[] = array($value->name, $value->grand_total_sale);
            }

            // $sale_this_year = TransactionDetail::with("product")->with("price")->with("sale_discount")->where("created_at", "LIKE", "%{$year_today}%")->get();
            // $grouped_this_year_sales_raw = $sale_this_year->groupBy("product.name");
            // $temp_year_by_month = [];
            // $month_data = [];

            // for ($i = 1; $i <= 12; $i++) {
            //     $temp_year_by_month[] = $i;
            // }
            // $total_quantity_month = 0;
            // $grand_price_total_this_year = 0;
            // foreach ($temp_year_by_month as $month_index => $month) {
            //     foreach ($grouped_this_year_sales_raw as $product_name => $group_product) {
            //         $month_data[$product_name]["name"] = $product_name;
            //         $month_data[$product_name]["data"][$month] = 0;
            //         $month_quantity = 0;
            //         foreach ($group_product as $product_index => $product) {
            //             if ($month == Carbon::parse($product->created_at)->format("m")) {
            //                 $month_quantity += $product->quantity;
            //                 $total_quantity_month += $product->quantity;
            //                 $grand_price_total_this_year += $product->quantity * ($product->price->price - ($product->price->price * ($product->sale_discount->discount / 100)));

            //                 $month_data[$product_name]["data"][$month] = $month_quantity;
            //                 $month_data[$product_name]["total_quantity"] = $total_quantity_month;
            //                 $month_data[$product_name]["total_sale"] = $grand_price_total_this_year;
            //             }
            //         }
            //     }
            // }

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
            // dd($top_10_prod_current_month);
            return Inertia::render("Dashboard", [
                "sale_year" => $top_10_prod_year,
                "top_10_prod_current_week" => $top_10_prod_current_week,
                "week_day_with_quantity_price_total_data_pie" => $week_day_with_quantity_price_total_data_pie,
                "top_10_current_month_sale" => $top_10_prod_current_month,
                "top_10_current_month_sale_money" => $month_day_with_quantity_price_total_data_pie,
                "full_year_top_10_sales" => $sample_array_months_jan_to_dec,
                "current_year" => $year_today,
                "current_month" => Carbon::parse($month_today)->format("F"),
                "current_week"=>$week_start."/".$week_end
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
