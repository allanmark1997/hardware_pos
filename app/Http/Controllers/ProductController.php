<?php

namespace App\Http\Controllers;

use App\Exports\ProductsExport;
use App\Models\BackOrder;
use App\Models\Category;
use App\Models\SpecialDiscount;
use App\Models\Price;
use App\Models\Tax;
use App\Models\product;
use App\Models\sale_discount;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (Auth::user()->type != 0) {
            return Redirect::route('cashier.index');
        } else {
            if (Auth::user()->type != 0 && Auth::user()->type != 1) {
                return Redirect::route('dashboard');
            } else {
                $search = $request->search ?? '';
                $category = $request->category ?? '';
                $products = product::with('user')->with('current_price')->with('current_discount')->when($search != null || $search != "", function ($query) use ($search) {
                    $query->where("name", "LIKE", "%{$search}%");
                })->when($category != null || $category != "", function ($query) use ($category) {
                    $query->where("category_id", "LIKE", $category);
                })->orderBy('created_at', 'desc')->paginate(12);
                $categories = Category::orderBy('name', 'asc')->get();
                $tax = Tax::orderBy('created_at', 'desc')->first();
                $special_discount = SpecialDiscount::orderBy('created_at', 'desc')->first();
                return Inertia::render('Products/Product', [
                    "products" => $products,
                    "search" => $search,
                    "categories" => $categories,
                    "category" => $category,
                    "tax" => $tax,
                    "special_discount" => $special_discount
                ]);
            }
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
            'name' => ["required", "unique:products", "max:255"],
            'barcode' => ["required",  "unique:products"],
            'price' => ["required", "regex:/^[0-9]+(\.[0-9][0-9]?)?$/"],
            'category' => "required",
            'text_image' => "required",
            'sale_discount' => ["required", "integer", "max:100"],
        ]);

        $imageName = $request->input('text_image');
        if ($request->hasfile('text_image')) {
            Product::initStorage();
            $photo = $request->file('text_image');
            $imageName = $photo->hashName();
            $photo->store('public/images/products');
        }

        $product = Product::create([
            'name' => $request->name,
            'barcode' => $request->barcode,
            'description' => $request->description,
            'category_id' => $request->category,
            'product_image' => env('APP_URL') . '/storage/images/products/' . $imageName,
            'quantity' => 0,
            'user_id' => Auth::user()->id
        ]);

        Price::create([
            'price' => $request->price,
            'product_id' => $product->id,
            'user_id' => Auth::user()->id
        ]);

        sale_discount::create([
            'discount' => $request->sale_discount,
            'type' => 1,
            'product_id' => $product->id,
            'user_id' => Auth::user()->id
        ]);
        return back();
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
        $product_current = Product::with("current_price")->with('current_discount')->where("id", $product->id)->first();
        $extracted_path = explode("/", $product_current->product_image);

        $request->validate([
            'name' => ["required", "max:30"],
            'barcode' => ["required"],
            'price' => ["required", "regex:/^[0-9]+(\.[0-9][0-9]?)?$/", "min:0"],
            'category' => "required",
            'sale_discount' => ["required", "integer", "min:0", "max:100"],
        ]);

        if ($request->hasfile('text_image')) {
            Product::initStorage();
            $photo = $request->file('text_image');
            $imageName = $photo->hashName();
            // dd(Storage::exists('public/images/products/'.$extracted_path[6]));
            if (Storage::exists('public/images/products/' . $extracted_path[6]) == true) {
                Storage::delete('public/images/products/' . $extracted_path[6]);
            }
            $photo->store('public/images/products');
            // $photo->storeAs('public/images/products', $extracted_path[6]); 
        }
        $new_image_name = null;
        try {
            $new_image_name = env('APP_URL') . '/storage/images/products/' . $imageName;
        } catch (\Throwable $th) {
            $new_image_name = $product_current->product_image;
        }

        $product->update([
            'name' => $request->name,
            'barcode' => $request->barcode,
            'description' => $request->description,
            'category_id' => $request->category,
            'product_image' => $new_image_name,
            'user_id' => Auth::user()->id
        ]);

        if (floatVal($request->price) != $product_current->current_price->price) {
            Price::create([
                'price' => $request->price,
                'product_id' => $product->id,
                'user_id' => Auth::user()->id
            ]);
        }

        if ($request->sale_discount != $product_current->current_discount->discount) {
            sale_discount::create([
                'discount' => $request->sale_discount,
                'type' => 1,
                'product_id' => $product->id,
                'user_id' => Auth::user()->id
            ]);
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return back();
    }

    public function back_order(Request $request, Product $product)
    {

        $request->validate([
            'quantity' => ["required", "max:30", "integer"],
        ]);

        $result = $product->quantity - $request->quantity;

        $product->update([
            "quantity" => $result
        ]);

        $back_order = BackOrder::create([
            "product_id" => $product->id,
            "price_id" => $product->current_price->id,
            "discount_id" => $product->current_discount->id,
            "user_id" => Auth::user()->id,
            "quantity" => $request->quantity,
            "remarks" => $request->remarks,
            "status" => false
        ]);

        return back();
    }

    public function export()
    {
        $products = product::with('user')->with('current_price')->with('current_discount')->with('category')->orderBy('created_at', 'asc')->get();
        $results = [];
        $results[] = ["", "PRODUCT NAME", "BARCODE", "DESCRIPTION DETAILS", "PRODUCT QUANTITY", "CURRENT DISCOUNT %", "CURRENT PRICE", "CATEGORY", "CREATED BY", "CREATED AT", "LAST UPDATED"];
        $sample = "";
        foreach ($products as $key => $product) {
            // dd($product->description["specification"]["spec_details"])
            $results[] =
                [
                    $key + 1,
                    $product->name,
                    strval($product->barcode),
                    $product->description["details"],
                    $product->quantity,
                    $product->current_discount->discount,
                    "PHP " . number_format($product->current_price->price, 2),
                    $product->category->name,
                    $product->user->name,
                    Carbon::parse($product->created_at)->format('d-m-Y'),
                    Carbon::parse($product->updated_at)->format('d-m-Y'),
                ];
            if ($product->description["specification"]["spec_title"] != null) {
                $results[] = [
                    "",
                    "",
                    "Specification title",
                    $product->description["specification"]["spec_title"],
                    "Specification Name",
                    "Specification Details",
                ];
            }
            if ($product->description["specification"]["spec_title"] != null) {
                foreach ($product->description["specification"]["spec_details"] as $key2 => $value) {
                    $results[] = [
                        "",
                        "",
                        "",
                        "",
                        $value["spec_name"],
                        $value["spec_details"],
                    ];
                }
            }
        }
        // dd($results);
        return (new ProductsExport([$results], ['Inventory']))->download("Inventories.xlsx");
    }
}
