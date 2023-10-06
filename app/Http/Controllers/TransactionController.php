<?php

namespace App\Http\Controllers;

use App\Exports\TransactionsExport;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date_from = $request->date_from ?? "";
        $date_to = $request->date_to ?? "";
        $search = $request->search ?? "";
        $transactions = Transaction::with("accommodate_by")->has("accommodate_by")->with("tax")->with("special_discount")->with("transaction_details")->when($date_from !=  null || $date_from != "" && $date_to != null || $date_to != "", function ($query) use ($date_from, $date_to) {
            $query->whereBetween('created_at', [$date_from, $date_to]);
        })->when($search != null || $search != "", function ($query) use ($search) {
            $query->whereHas("accommodate_by", function ($query2) use ($search) {
                $query2->where("name", "LIKE", "%{$search}%");
            })->with(['accommodate_by' => function ($query2) use ($search) {
                $query2->where("name", "LIKE", "%{$search}%");
            }]);
        })->orderBy("created_at", "desc")->paginate(20);
        return Inertia::render('Transactions/Transaction', [
            "transactions" => $transactions,
            "date_from" => $date_from,
            "date_to" => $date_to,
            "search" => $search
        ]);
    }

    public function export(Request $request)
    {
        $date_from = $request->date_from ?? "";
        $date_to = $request->date_to ?? "";
        $search = $request->search ?? "";

        $transactions = Transaction::with("accommodate_by")->has("accommodate_by")->with("tax")->with("special_discount")->with("transaction_details")->when($date_from !=  null || $date_from != "" && $date_to != null || $date_to != "", function ($query) use ($date_from, $date_to) {
            $query->whereBetween('created_at', [$date_from, $date_to]);
        })->when($search != null || $search != "", function ($query) use ($search) {
            $query->whereHas("accommodate_by", function ($query2) use ($search) {
                $query2->where("name", "LIKE", "%{$search}%");
            })->with(['accommodate_by' => function ($query2) use ($search) {
                $query2->where("name", "LIKE", "%{$search}%");
            }]);
        })->get();
        // dd($transactions);
        $results = [];
        $grand_unsuccess_total = [];
        // $results[] = ['DATE RANGES', 'From', 'To', 'Paid grand total', "Unsuccessful grand total"];
        // $results[] = ['', $request->date_from ?? "--", $request->date_to ?? '--', "PHP " . number_format($this->grand_total_success($transactions), 2), "PHP " . number_format($this->grand_total_unsuccess($transactions), 2)];
        $grand_unsuccess_total[] = ['Paid grand total', "Unsuccessful grand total"];
        $grand_unsuccess_total[] = ["PHP " . number_format($this->grand_total_success($transactions), 2), "PHP " . number_format($this->grand_total_unsuccess($transactions), 2)];

        $results[] = ['TRANSACTION ID', 'ACCOMMODATED BY', 'STATUS', 'PAYMENT METHOD', 'CUSTOMER TYPE', 'TAX IN PERCENT', 'SPECIAL DISCOUNT IN PERCENT', '', '', '', '', '', '', '', "TOTAL VAT ADDED", "TOTAL SPECIAL DISCOUNTED", "TOTAL PRICE PAID", "CUSTOMER CASH", "CUSTOMER CHANGE", "TOTAL BACK ORDER", 'CREATED AT'];

        foreach ($transactions as $key => $transaction) {
            // dd($transaction->accommodate_by);
            $results[] = [
                $transaction->id,
                $transaction->accommodate_by->name,
                $transaction->status == 1 ? "Success" : "Unsuccess",
                $transaction->payment_method == 0 ? "Cash" : "Other",
                $transaction->customer_type == 0 ? "Walk-in" : "Regular",
                $transaction->tax->tax / 100,
                $transaction->special_discount?->discount ? $transaction->special_discount->discount:0 / 100,
                count($transaction->transaction_details) != 0 ? "Product name" : "--",
                count($transaction->transaction_details) != 0 ? "Quantity" : "--",
                count($transaction->transaction_details) != 0 ? "Price" : "--",
                count($transaction->transaction_details) != 0 ? "Discount in percent" : "--",
                count($transaction->transaction_details) != 0 ? "Status" : "--",
                count($transaction->transaction_details) != 0 ? "Total Discount" : "--",
                count($transaction->transaction_details) != 0 ? "Sub-total" : "--",
                "PHP " . number_format($this->calculate_vat_special_discounted($transaction->transaction_details, $transaction->tax->tax, $transaction->special_discount?->discount ? $transaction->special_discount->discount:0, 0, $transaction->status), 2),
                "PHP " . number_format($this->calculate_vat_special_discounted($transaction->transaction_details, $transaction->tax->tax, $transaction->special_discount?->discount ? $transaction->special_discount->discount:0, 1, $transaction->status), 2),
                "PHP " . number_format($this->calculate_vat_special_discounted($transaction->transaction_details, $transaction->tax->tax, $transaction->special_discount?->discount ? $transaction->special_discount->discount:0, 2, $transaction->status), 2),
                "PHP " . number_format($transaction->cash, 2),
                "PHP " . number_format(($transaction->cash - $this->calculate_vat_special_discounted($transaction->transaction_details, $transaction->tax->tax, $transaction->special_discount?->discount ? $transaction->special_discount->discount:0, 2, $transaction->status)), 2),
                "PHP " . number_format($this->calculate_vat_special_discounted($transaction->transaction_details, $transaction->tax->tax, $transaction->special_discount?->discount ? $transaction->special_discount->discount:0, 3, $transaction->status), 2),

                Carbon::parse($transaction->created_at)->format('d-m-Y')
            ];
            foreach ($transaction->transaction_details as $key => $transaction_detail) {
                $results[] = [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    $transaction_detail->product->name,
                    $transaction_detail->quantity,
                    "PHP " . number_format($transaction_detail->price->price),
                    $transaction_detail->sale_discount->discount / 100,
                    $transaction_detail->status == 1 ? "Success" : "Unsuccess",
                    "PHP " . number_format($this->calculate_sub_total_discounted_amount($transaction_detail->price->price, $transaction_detail->sale_discount->discount, $transaction_detail->quantity, $transaction_detail->status), 2),
                    "PHP " . number_format($this->calculate_sub_total_discounted($transaction_detail->price->price, $transaction_detail->sale_discount->discount, $transaction_detail->quantity, $transaction_detail->status), 2),
                    "",
                    "",
                    "",
                    "",
                    ""
                ];
            }
        }

        return (new TransactionsExport([$results, $grand_unsuccess_total], ['Transactions', 'Grand Totals']))->download($date_from . " to " . $date_to . "Transactions.xlsx");
    }

    private function calculate_sub_total_discounted($price, $discount, $quantity, $status)
    {
        $temp_result = 0;
        $temp_discount = $discount / 100;
        $temp_ammount_discounted = $price * $temp_discount;
        if ($status == 1) {
            for ($i = 0; $i < $quantity; $i++) {
                $temp_result += $price - $temp_ammount_discounted;
            }
        } else {
            for ($i = 0; $i < $quantity; $i++) {
                $temp_result += $price;
            }
        }

        return $temp_result;
    }

    private function calculate_sub_total_discounted_amount($price, $discount, $quantity, $status)
    {
        $temp_result = 0;
        $temp_discount = $discount / 100;
        $temp_amount_discounted = $price * $temp_discount;
        if ($status == 1) {
            for ($i = 0; $i < $quantity; $i++) {
                $temp_result += $temp_amount_discounted;
            }
        }

        return $temp_result;
    }

    private function calculate_vat_special_discounted($details, $vat, $special_discount, $type, $status)
    {
        $temp_result = 0;
        $temp_result_unsuccess = 0;
        $temp_discount = 0;
        $temp_amount_discounted = 0;

        $converted_vat = $vat / 100;
        $total_vat_amount = 0;

        $converted_sd = $special_discount / 100;
        $total_sd_amount = 0;

        $price_discounted = 0;

        $price_total = 0;

        foreach ($details as $key => $detail) {
            $temp_discount = $detail->sale_discount->discount / 100;

            if ($detail->status == 1) {
                for ($i = 0; $i < $detail->quantity; $i++) {
                    $temp_amount_discounted = $detail->price->price * $temp_discount;
                    $temp_result += $detail->price->price - $temp_amount_discounted;
                }
            }
            if ($detail->status == 0) {
                for ($i = 0; $i < $detail->quantity; $i++) {
                    $temp_result_unsuccess += $detail->price->price;
                }
            }
        }
        $total_sd_amount = $temp_result * $converted_sd;
        $price_discounted = $temp_result - $total_sd_amount;
        $total_vat_amount = $price_discounted * $converted_vat;
        $price_total = $price_discounted + $total_vat_amount;

        if ($type == 0) {
            return $total_vat_amount;
        } else if ($type == 1) {
            return $total_sd_amount;
        } else if ($type == 2) {
            return $price_total;
        } else if ($type == 3) {
            return $temp_result_unsuccess;
        }
    }

    private function grand_total_success($transactions)
    {
        $grand_total = 0;
        foreach ($transactions as $key => $transaction) {
            $grand_total += $this->calculate_vat_special_discounted($transaction->transaction_details, $transaction->tax->tax, $transaction->special_discount?->discount ? $transaction->special_discount?->discount: 0, 2, $transaction->status);
        }
        return $grand_total;
    }

    private function grand_total_unsuccess($transactions)
    {
        $grand_total = 0;
        foreach ($transactions as $key => $transaction) {
            $grand_total += $this->calculate_vat_special_discounted($transaction->transaction_details, $transaction->tax->tax, $transaction->special_discount?->discount ? $transaction->special_discount?->discount: 0, 3, $transaction->status);
        }
        return $grand_total;
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
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
