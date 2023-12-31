<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Auth::user()->type == 2) {
            return Redirect::route('cashier.index');
        } else {
            $search = $request->search ?? "";
            $suppliers = Supplier::when($search != null || $search != "", function ($query) use ($search) {
                $query->where("supplier_name", "LIKE", "%{$search}%");
            })->paginate(12);
            return Inertia::render('SupplierManangement/Suppliers', [
                'suppliers' => $suppliers,
                'search' => $search
            ]);
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
        $request->validate([
            'supplier_name' => ['required', 'string', 'max:255', 'unique:suppliers'],
            'address' => 'required',
            'mobile_no' => ['required', 'string', 'max:13'],
            'status' => 'required',
            'image' => ['mimes:jpg,jpeg,png', 'max:1024', 'required'],

        ]);

        $imageName = $request->input('image');
        if ($request->hasfile('image')) {
            Supplier::initStorage();
            $photo = $request->file('image');
            $imageName = $photo->hashName();
            $photo->store('public/supplier-photos');
        }
        Supplier::create([
            'supplier_name' => $request->supplier_name,
            'address' => $request->address,
            'mobile_no' => $request->mobile_no,
            'status' => $request->status,
            'image' => env('APP_URL') . '/storage/supplier-photos/' . $imageName
        ]);
        return Redirect::back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supplier $supplier)
    {
        $supplier->update([
            'status' => $request->status
        ]);
        return Redirect::back();
    }

    public function update_details(Request $request, Supplier $supplier)
    {
        $supplier_current = Supplier::where("id", $supplier->id)->first();
        $extracted_path = explode("/", $supplier_current->image);
        $request->validate([
            'supplier_name' => ['required', 'string', 'max:255'],
            'address' => 'required',
            'mobile_no' => ['required', 'string', 'max:13'],
            // 'image' => ['mimes:jpg,jpeg,png', 'max:1024'],
        ]);
        if ($request->hasfile('image')) {
            Supplier::initStorage();
            $photo = $request->file('image');
            $imageName = $photo->hashName();
            if (Storage::exists('public/supplier-photos/' . $extracted_path[5]) == true) {
                Storage::delete('public/supplier-photos/' . $extracted_path[5]);
            }
            $photo->store('public/supplier-photos');
        }
        $new_image_name = null;
        try {
            $new_image_name = env('APP_URL') . '/storage/supplier-photos/' . $imageName;
        } catch (\Throwable $th) {
            $new_image_name = $supplier_current->image;
        }
        $supplier->update([
            "supplier_name" => $request->supplier_name,
            "address" => $request->address,
            "mobile_no" => $request->mobile_no,
            "image" => $new_image_name
        ]);
        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        //
    }
}
