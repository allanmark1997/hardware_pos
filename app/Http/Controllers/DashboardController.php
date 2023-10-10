<?php

namespace App\Http\Controllers;

use App\Models\TransactionDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $no_date = date("Y");
        $year_key = $no_date;
        if (Auth::user()->type != 0) {
            return Redirect::route('cashier.index');
        } else {
            // $months_user = [
            //     [1, 0],
            //     [2, 0],
            //     [3, 0],
            //     [4, 0],
            //     [5, 0],
            //     [6, 0],
            //     [7, 0],
            //     [8, 0],
            //     [9, 0],
            //     [10, 0],
            //     [11, 0],
            //     [12, 0],
            // ];
            // $sale = TransactionDetail::when($no_date, function ($query) use (
            //     $year_key
            // ) {
            //     $query
            //         ->where("created_at", "like", "%$year_key%")
            //         ->select(
            //             DB::raw("YEAR(created_at) as year"),
            //             DB::raw("Month(created_at) as month"),
            //             DB::raw("count(*) as count")

            //         )
            //         ->groupBy("year", "month")
            //         ->orderBy(DB::raw("Month(created_at)"));
            // })->get();
            // foreach ($months_user as $key => $months_value) {
            //     foreach ($sale->groupBy("month") as $key2 => $value2) {
            //         if ($value2[0]["month"] == $months_value[0]) {
            //             $months_user[$key][1] = $value2[0]["count"];
            //         }
            //     }
            //     $months_user[$key][0] = $this->month($months_value[0]);
            // }
            $sale_year = TransactionDetail::with("product")->get();
            $grouped_sales_raw = $sale_year->groupBy("product.name");
            $temp_array = [];
            foreach ($grouped_sales_raw as $key => $group) {
                $temp_array[$key]["name"] = $key;
                foreach ($group as $key2 => $product) {
                    // dd($key);
                    if (isset($temp_array[$key]["data"])) {
                        foreach ($temp_array[$key]["data"] as $key3 => $product_in_array) {
                            // dd(Carbon::parse($product->created_at)->format("Y-m") == $key3);
                            if (Carbon::parse($product->created_at)->format("Y-M") == $key3) {
                                $temp_array[$key]["data"][Carbon::parse($product->created_at)->format("Y-M")][$key2][] = $product;
                            } else {
                                $temp_array[$key]["data"][Carbon::parse($product->created_at)->format("Y-M")][$key2][][] = $product;
                            }
                        }
                    } else {
                        $temp_array[$key]["data"][Carbon::parse($product->created_at)->format("Y-M")][$key2][] = $product;
                    }
                }
            }
            // $months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            // $temp_prod = [];
            dd($temp_array);
            return Inertia::render("Dashboard", [
                // "dashboard" => "dash"
            ]);
        }
    }

    public function month($val)
    {
        if ($val == 1) {
            return "Januray";
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
