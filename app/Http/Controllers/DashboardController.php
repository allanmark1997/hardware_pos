<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
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
        $day_today = date("Y-m-d");
        $year_today = date("Y");
        $month_today = date("Y-m");
        $day = date('w');
        $week_start = date('Y-m-d', strtotime('-' . $day . ' days'));
        $week_end = date('Y-m-d', strtotime('+' . (6 - $day) . ' days'));
        $week_start_day = date('d', strtotime('-' . $day . ' days'));
        $week_end_day = date('d', strtotime('+' . (6 - $day) . ' days'));
        $month_start = date('Y-m-01');
        $month_end = date('t');
        if (Auth::user()->type == 2) {
            return Redirect::route('cashier.index');
        } else {
            $sale_day = TransactionDetail::with("product")->with("price")->with("sale_discount")->where("created_at", "LIKE", "%{$day_today}%")->where("status", 1)->get();
            $temp_current_day = [];
            $day_data = [];
            $day_with_quantity_price_total_data = [];
            $day_with_quantity_price_total_data_object = [];
            $day_with_quantity_price_total_data_pie = [];
            $day_with_quantity_price_total_data_column = [];
            $grouped_daily_sales_raw = $sale_day->groupBy("product.name");

            foreach ($grouped_daily_sales_raw as $product_name => $group_product) {
                $day_data[$product_name]["name"] = $product_name;
                $day_data[$product_name]["data"][Carbon::parse($day_today)->format("l")] = array("quantity" => 0);
                $day_data[$product_name]["data"][Carbon::parse($day_today)->format("l")]["price"] = 0;
                $day_data[$product_name]["data"][Carbon::parse($day_today)->format("l")]["discount"] = 0;
                $day_data[$product_name]["data"][Carbon::parse($day_today)->format("l")]["subtotal"] = 0;
                $day_data[$product_name]["data"][Carbon::parse($day_today)->format("l")]["total"] = 0;
                $day_quantity = 0;
                foreach ($group_product as $product_index => $product) {
                    $day_quantity += $product->quantity;

                    $day_data[$product_name]["data"][Carbon::parse($day_today)->format("l")] = array("quantity" => $day_quantity);
                    $day_data[$product_name]["data"][Carbon::parse($day_today)->format("l")]["price"] = $product->price->price;
                    $day_data[$product_name]["data"][Carbon::parse($day_today)->format("l")]["discount"] = $product->sale_discount->discount / 100;
                    $day_data[$product_name]["data"][Carbon::parse($day_today)->format("l")]["subtotal"] = $product->price->price - ($product->price->price * $product->sale_discount->discount / 100);
                    $day_data[$product_name]["data"][Carbon::parse($day_today)->format("l")]["total"] = ($product->price->price - ($product->price->price * $product->sale_discount->discount / 100)) * $day_quantity;
                }
            }

            $day_counter = 0;
            foreach ($day_data as $key1 => $group_products) {
                $day_quantity_all = 0;
                $day_grand_total_sale = 0;
                foreach ($group_products["data"] as $date => $date_value) {
                    $day_quantity_all += $date_value["quantity"];
                    $day_grand_total_sale += $date_value["total"];
                    $day_with_quantity_price_total_data[$day_counter]["name"] = $key1;
                    $day_with_quantity_price_total_data[$day_counter]["data"][$date] = $date_value["quantity"];
                    $day_with_quantity_price_total_data[$day_counter]["data_transparency"][$date] = array("sold" => $date_value["quantity"], "price" => $date_value["price"], "discount" => $date_value["discount"], "subtotal" => $date_value["subtotal"], "total" => $date_value["total"]);
                    $day_with_quantity_price_total_data[$day_counter]["total_quantity"] = $day_quantity_all;
                    $day_with_quantity_price_total_data[$day_counter]["week_grand_total_sale"] = $day_grand_total_sale;
                }
                $day_counter++;
            }

            foreach ($day_with_quantity_price_total_data as $key => $value) {
                $day_with_quantity_price_total_data_object[] = (object) array("name" => $value["name"],  "data" => (object) $value["data"], "data_transparency" => $value["data_transparency"], "total_quantity" => $value["total_quantity"], "grand_total_sale" => $value["week_grand_total_sale"]);
            }
            $sale_current_day_filtered = $this->sortByField($day_with_quantity_price_total_data_object, 'total_quantity');
            $top_10_prod_current_day = array_slice($sale_current_day_filtered, 0, 10);
            foreach ($top_10_prod_current_day as $key => $value) {
                $day_with_quantity_price_total_data_pie[] = array($value->name, $value->grand_total_sale);
                $day_with_quantity_price_total_data_column[] = array($value->name, $value->total_quantity);
            }

            $sale_week = TransactionDetail::with("product")->with("price")->with("sale_discount")->whereBetween("created_at", [$week_start, $week_end])->where("status", 1)->get();
            $temp_week_by_day = [];
            $week_day_data = [];
            $week_day_with_quantity_price_total_data = [];
            $week_day_with_quantity_price_total_data_object = [];
            $week_day_with_quantity_price_total_data_pie = [];
            $grouped_weekly_sales_raw = $sale_week->groupBy("product.name");
            $timestamp = strtotime('next Sunday');
            for ($i = 1; $i <= 7; $i++) {
                $temp_week_by_day[] = strftime('%A', $timestamp);
                $timestamp = strtotime('+1 day', $timestamp);
            }

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
                        if ($day == Carbon::parse($product->created_at)->format("l")) {
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

            $sale_month = TransactionDetail::with("product")->with("price")->with("sale_discount")->where("created_at", "LIKE", "%{$month_today}%")->where("status", 1)->get();
            $temp_month_by_day = [];
            $month_day_data = [];
            $month_day_with_quantity_price_total_data = [];
            $month_day_with_quantity_price_total_data_object = [];
            $month_day_with_quantity_price_total_data_pie = [];
            $grouped_monthly_sales_raw = $sale_month->groupBy("product.name");

            for ($i = 1; $i <= $month_end; $i++) {
                $temp_month_by_day[] = (int)$i;
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
            //
            $sale_year = TransactionDetail::with("product")->with("price")->with("sale_discount")->where("created_at", "LIKE", "%{$year_today}%")->where("status", 1)->get();
            $temp_year_by_month = [];
            $year_month_data = [];
            $year_month_with_quantity_price_total_data = [];
            $year_month_with_quantity_price_total_data_object = [];
            $year_month_with_quantity_price_total_data_pie = [];
            $grouped_yearly_sales_raw = $sale_year->groupBy("product.name");
            for ($i = 1; $i <= 12; $i++) {
                $temp_year_by_month[] = (int)$i;
            }

            foreach ($temp_year_by_month as $month_index => $month) {
                foreach ($grouped_yearly_sales_raw as $product_name => $group_product) {

                    $year_month_data[$product_name]["name"] = $product_name;
                    $year_month_data[$product_name]["data"][$month] = array("quantity" => 0);
                    $year_month_data[$product_name]["data"][$month]["price"] = 0;
                    $year_month_data[$product_name]["data"][$month]["discount"] = 0;
                    $year_month_data[$product_name]["data"][$month]["subtotal"] = 0;
                    $year_month_data[$product_name]["data"][$month]["total"] = 0;
                    $year_month_quantity = 0;
                    foreach ($group_product as $product_index => $product) {
                        if ($month == (int)Carbon::parse($product->created_at)->format("m")) {
                            $year_month_quantity += $product->quantity;

                            $year_month_data[$product_name]["data"][$month] = array("quantity" => $year_month_quantity);
                            $year_month_data[$product_name]["data"][$month]["price"] = $product->price->price;
                            $year_month_data[$product_name]["data"][$month]["discount"] = $product->sale_discount->discount / 100;
                            $year_month_data[$product_name]["data"][$month]["subtotal"] = $product->price->price - ($product->price->price * $product->sale_discount->discount / 100);
                            $year_month_data[$product_name]["data"][$month]["total"] = ($product->price->price - ($product->price->price * $product->sale_discount->discount / 100)) * $year_month_quantity;
                        }
                    }
                }
            }

            $counter = 0;
            foreach ($year_month_data as $key1 => $group_products) {
                $year_quantity_all = 0;
                $grand_total_sale = 0;
                foreach ($group_products["data"] as $date => $date_value) {
                    $year_quantity_all += $date_value["quantity"];
                    $grand_total_sale += $date_value["total"];
                    $year_month_with_quantity_price_total_data[$counter]["name"] = $key1;
                    $year_month_with_quantity_price_total_data[$counter]["data"][$this->month($date)] = $date_value["quantity"];
                    $year_month_with_quantity_price_total_data[$counter]["data_transparency"][$date] = array("sold" => $date_value["quantity"], "price" => $date_value["price"], "discount" => $date_value["discount"], "subtotal" => $date_value["subtotal"], "total" => $date_value["total"]);
                    $year_month_with_quantity_price_total_data[$counter]["total_quantity"] = $year_quantity_all;
                    $year_month_with_quantity_price_total_data[$counter]["grand_total_sale"] = $grand_total_sale;
                }
                $counter++;
            }

            foreach ($year_month_with_quantity_price_total_data as $key => $value) {
                $year_month_with_quantity_price_total_data_object[] = (object) array("name" => $value["name"],  "data" => (object) $value["data"], "data_transparency" => $value["data_transparency"], "total_quantity" => $value["total_quantity"], "grand_total_sale" => $value["grand_total_sale"]);
            }
            $sale_current_year_filtered = $this->sortByField($year_month_with_quantity_price_total_data_object, 'total_quantity');
            $top_10_prod_current_year = array_slice($sale_current_year_filtered, 0, 10);
            foreach ($top_10_prod_current_year as $key => $value) {
                $year_month_with_quantity_price_total_data_pie[] = array($value->name, $value->grand_total_sale);
            }
            $current_transaction = Transaction::with("accommodate_by")->with("tax")->with("special_discount")->with("transaction_details")->where("status", 1)->orderBy("created_at", "desc")->limit(10)->get();

            return Inertia::render("Dashboard", [
                "top_10_prod_current_day" => $top_10_prod_current_day,
                "day_with_quantity_price_total_data_pie" => $day_with_quantity_price_total_data_pie,
                "day_with_quantity_price_total_data_column" => $day_with_quantity_price_total_data_column,
                "top_10_prod_current_week" => $top_10_prod_current_week,
                "week_day_with_quantity_price_total_data_pie" => $week_day_with_quantity_price_total_data_pie,
                "top_10_current_month_sale" => $top_10_prod_current_month,
                "top_10_current_month_sale_money" => $month_day_with_quantity_price_total_data_pie,
                "top_10_current_year_sale" => $top_10_prod_current_year,
                "top_10_current_year_sale_money" => $year_month_with_quantity_price_total_data_pie,
                "current_year" => $year_today,
                "current_month" => Carbon::parse($month_today)->format("F"),
                "current_week" => $week_start . "/" . $week_end,
                "current_day" => Carbon::parse($day_today)->format("l"),
                "current_transaction" => $current_transaction
            ]);
        }
    }

    public function month($val)
    {
        if ($val == 1) {
            return "January";
        } elseif ($val == 2) {
            return "February";
        } elseif ($val == 3) {
            return "March";
        } elseif ($val == 4) {
            return "April";
        } elseif ($val == 5) {
            return "May";
        } elseif ($val == 6) {
            return "June";
        } elseif ($val == 7) {
            return "July";
        } elseif ($val == 8) {
            return "August";
        } elseif ($val == 9) {
            return "September";
        } elseif ($val == 10) {
            return "October";
        } elseif ($val == 11) {
            return "November";
        } elseif ($val == 12) {
            return "December";
        }
    }

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
