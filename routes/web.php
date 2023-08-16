<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    
    Route::prefix('usermanagement')->name('users.')->group(function() {
        Route::get('/users', [User::class, 'index'])->name('index');
        Route::post('/users/add', [User::class, 'add_user'])->name('add_user');
        Route::put('/users/update/{user}', [User::class, 'update_user'])->name('update_user');
        Route::put('/users/update_position', [User::class, 'update_user_position'])->name('update_user_position');
    });

    Route::prefix('suppliermanagement')->name('suppliers.')->group(function() {
        Route::get('/suppliers', [SupplierController::class, 'index'])->name('index');
        // Route::post('/users/add', [User::class, 'add_user'])->name('add_user');
        // Route::put('/users/update/{user}', [User::class, 'update_user'])->name('update_user');
    });

    Route::prefix('products')->name('products.')->group(function() {
        Route::get('/products', [ProductController::class, 'index'])->name('index');
        Route::post('/add_products', [ProductController::class, 'store'])->name('store');
        Route::post('/update_products/{product}', [ProductController::class, 'update'])->name('update');
        Route::put('/remove_products/{product}', [ProductController::class, 'destroy'])->name('remove');
    });

    Route::prefix('categories')->name('categories.')->group(function() {
        Route::post('/add_cat', [CategoryController::class, 'store'])->name('store');
        Route::put('/update_cat/{category}', [CategoryController::class, 'update'])->name('update');
    });

    Route::prefix('delivery')->name('deliveries.')->group(function() {
        Route::get('/deliveries', [DeliveryController::class, 'index'])->name('index');
    });

    Route::prefix('cahier')->name('cashier.')->group(function() {
        Route::get('/cashier', [CashierController::class, 'index'])->name('index');
    });
});
