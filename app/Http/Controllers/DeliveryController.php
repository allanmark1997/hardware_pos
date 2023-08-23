<?php

namespace App\Http\Controllers;

use App\Exports\DeliveryExport;
use App\Models\Delivery;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Maatwebsite\Excel\Facades\Excel;

class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $deliveries = Delivery::with("details")->with("supplier")->with("user_receiver")->get();
        return Inertia::render('Delivery/Delivery',[
            "deliveries" => $deliveries
        ]);
    }

    public function export()
    {
        // dd('ok');
        // return Excel::download(new DeliveryExport, 'deliveries.xlsx');
        $deliveries = Delivery::with("details")->with("supplier")->with("user_receiver")->get();
        $results = [];
        $results[] = ['DATE RANGES', 'From', 'To'];
        $results[] = ['', '--', '--'];
        $results[] = ['SUPPLIER NAME', 'RECEIVED BY', 'STATUS', 'PRODUCTS', 'REMARKS','TOTAL','CREATED AT'];
        foreach ($deliveries as $key => $delivery) {
            $results[]=
            [
                $delivery->supplier->supplier_name??"--",
                $delivery->user_receiver->name??'--',
                $delivery->status == 1 ? 'Delivered' : "Unsucessful",
                $this->products($delivery->details),
                $delivery->remarks ?? '--',
                $this->products_total($delivery->details),
                $this->date_time_formatter($delivery->created_at)
            ];
        }
        return (new DeliveryExport([$results], ['Delivery']))->download("Deliveries.xlsx");
        // return Excel::download(new DeliveryExport, 'Delivery.xlsx');
    }

    public function products($data){
        if (count($data)!= 0) {
            foreach ($data as $key => $value) {
                $array_sample[] = 
                'Name: '.$value["product"]["name"].
                ', Quantity: '.$value['quantity'].
                ', Price: '."PHP".number_format($value['price'],2);
            }
            return $array_sample;
        }
        else{
            return "--";
        }
    }

    public function products_total($data){
        if (count($data)!= 0) {
            $sum=0;
            foreach ($data as $key => $value) {
                $sum +=$value["price"]*$value["quantity"];
            }
            return "PHP".number_format($sum,2);
        }
        else{
            return "--";
        }
    }

    public function date_time_formatter($data){
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
