<?php

namespace App\Http\Controllers;

use App\Models\SupplierCategory;
use App\Models\SupplierProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search ?? "";
        $category = $request->category ?? "";
        $products = SupplierProduct::with("user")->with("product")->with("supplier")->with("price")->when($search != null || $search != "", function ($query) use ($search) {
            $query->whereHas("product", function ($query2) use ($search) {
                $query2->where("name", "LIKE", "%{$search}%");
            })->with(['product' => function ($query2) use ($search) {
                $query2->where("name", "LIKE", "%{$search}%");
            }]);
        })->when($category != null || $category != "", function ($query) use ($category) {
            $query->where('supplier_category_id', $category);
        })->paginate(20);
        // dd($products);
        $categories = SupplierCategory::orderBy("name", 'asc')->get();

        return Inertia::render('SupplierProducts/Product', [
            "products" => $products,
            "search" => $search,
            "categories" => $categories,
            "category" => $category,

        ]);
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
    public function show(SupplierProduct $supplierProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SupplierProduct $supplierProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SupplierProduct $supplierProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SupplierProduct $product)
    {
        $product->delete();
        return back();
    }
}
