<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('return_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId("transaction_id");
            $table->foreignId("transaction_detail_id");
            $table->foreignId("product_id");
            $table->integer("quantity");
            $table->foreignId("price_id");
            $table->foreignId("sale_discount_id");
            $table->string("remarks");
            $table->foreignId("proccessed_by");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('return_products');
    }
};
