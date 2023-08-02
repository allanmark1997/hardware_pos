<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // dd($request->search);
        $search = $request->search ?? '';
        $category = $request->category ?? '';
        $products = Product::with('user')->with('current_price')->when($search != null || $search != "", function($query) use($search){
            $query->where("name", "LIKE", "%{$search}%");
        })->when($category != null || $category != "", function($query) use($category){
            $query->where("id", "LIKE", "%{$category}%");
        })->paginate(10);
        $categories = Category::get();
        return Inertia::render('Products/Product',[
            "products" => $products,
            "search" => $search,
            "categories" => $categories,
            "category" => $category
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
        $request->validate([
            'name'=>"required",
            'description'=>"required",
            'remarks'=>"required",
            'price'=>"required",
            'category'=>"required",
            'product_image'=>"required",
        ]);
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
