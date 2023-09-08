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
        $transactions = Transaction::with("accommodate_by")->with("tax")->with("special_discount")->with("transaction_details")->when($date_from !=  null || $date_from != "" && $date_to != null || $date_to != "", function ($query) use ($date_from, $date_to) {
            $query->whereBetween('created_at', [$date_from, $date_to]);
        })->paginate(20);
        return Inertia::render('Transactions/Transaction', [
            "transactions" => $transactions,
            "date_from" => $date_from,
            "date_to" => $date_to
        ]);
    }

    public function export(Request $request)
    {
        $date_from = $request->date_from ?? "";
        $date_to = $request->date_to ?? "";
        $transactions = Transaction::with("accommodate_by")->with("tax")->with("special_discount")->with("transaction_details")->when($date_from !=  null || $date_from != "" && $date_to != null || $date_to != "", function ($query) use ($date_from, $date_to) {
            $query->whereBetween('created_at', [$date_from, $date_to]);
        })->get();
        $results = [];
        $results[] = ['DATE RANGES', 'From', 'To', 'Paid grand total', "Unsuccessful grand total"];
        // $results[] = ['', $request->date_from ?? "--", $request->date_to ?? '--', "PHP " . number_format($this->grand_total_success($transactions), 2), "PHP " . number_format($this->grand_total_unsuccess($transactions), 2)];
        $results[] = ['TRANSACTION ID', 'ACCOMMODATED BY', 'STATUS', 'PAYMENT METHOD', 'CUSTOMER TYPE', 'TAX IN PERCENT', 'SPECIAL DISCOUNT IN PERCENT', '', '', '', '', '', '', '', "TOTAL VAT ADDED", "TOTAL SPECIAL DISCOUNTED", "TOTAL PRICE PAID", "TOTAL BACK ORDER", 'CREATED AT'];

        foreach ($transactions as $key => $transaction) {
            // dd($transaction->accommodate_by);
            $results[] = [
                $transaction->id,
                $transaction->accommodate_by->name,
                $transaction->status == 1 ? "Success" : "Unsuccess",
                $transaction->payment_method == 0 ? "Cash" : "Other",
                $transaction->customer_type == 0 ? "Walk-in" : "Regular",
                $transaction->tax->tax / 100,
                $transaction->special_discount->discount / 100,
                "Product name",
                "Quantity",
                "Price",
                "Discount in percent",
                "Status",
                "Total Discount",
                "Sub-total",
                "VAT Added",
                "Total Special discount",
                "Total price paid",
                "Total back order",
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
                    $transaction_detail->price->price,
                    $transaction_detail->sale_discount->discount / 100,
                    $transaction_detail->status,
                    "Total Discount",
                    $transaction->quantity * $transaction_detail->price->price,
                    "",
                    "",
                    "",
                    "",
                    ""
                ];
            }
        }

        return (new TransactionsExport([$results], ['Transactions']))->download("Transactions.xlsx");
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
