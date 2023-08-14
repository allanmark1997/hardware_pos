<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Price;
use App\Models\Product;
use App\Models\sale_discount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $products = Product::with('user')->with('current_price')->with('current_discount')->when($search != null || $search != "", function($query) use($search){
            $query->where("name", "LIKE", "%{$search}%");
        })->when($category != null || $category != "", function($query) use($category){
            $query->where("category_id", "LIKE", "%{$category}%");
        })->orderBy('created_at', 'desc')->paginate(12);
        $categories = Category::orderBy('name','asc')->get();
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
            'name'=>["required","max:30"],
            // 'title'=>["required","max:20"],
            // 'description'=>["required"],
            'price'=>["required", "regex:/^[0-9]+(\.[0-9][0-9]?)?$/"],
            'category'=>"required",
            'text_image'=>"required",
            'sale_discount'=>["required", "integer", "max:100"],
        ]);

        $imageName = $request->input('text_image');
        if($request->hasfile('text_image')){
            Product::initStorage();
            $photo = $request->file('text_image');
            $imageName = $photo->hashName();
            $photo->store('public/images/products'); 
        }

        $product = Product::create([
            'name'=>$request->name,
            'description'=>$request->description,
            'category_id'=>$request->category,
            'product_image'=>env('APP_URL').'/storage/images/products/'.$imageName,
            'quantity'=>0,
            'user_id'=> Auth::user()->id
        ]);

        Price::create([
            'price'=>$request->price,
            'product_id' => $product->id,
            'user_id'=> Auth::user()->id
        ]);

        sale_discount::create([
            'discount' => $request->sale_discount,
            'type'=>1,
            'product_id' => $product->id,
            'user_id'=> Auth::user()->id
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
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name'=>["required","max:30"],
            // 'description'=>"required",
            'price'=>["required", "regex:/^[0-9]+(\.[0-9][0-9]?)?$/"],
            'category'=>"required",
            'sale_discount'=>["required", "integer", "max:100"],
        ]);

        $product -> update([
            'name'=>$request->name,
            'description'=>$request->description,
            'category_id'=>$request->category,
            'user_id'=> Auth::user()->id
        ]);

        Price::create([
            'price'=>$request->price,
            'product_id' => $product->id,
            'user_id'=> Auth::user()->id
        ]);

        sale_discount::create([
            'discount' => $request->sale_discount,
            'type'=>1,
            'product_id' => $product->id,
            'user_id'=> Auth::user()->id
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product -> delete();
        return back();
    }
}
