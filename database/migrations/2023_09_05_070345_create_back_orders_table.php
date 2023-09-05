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
        Schema::create('back_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId("product_id");
            $table->foreignId("price_id");
            $table->foreignId("discount_id");
            $table->foreignId("user_id");
            $table->integer("quantity");
            $table->boolean("status");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('back_orders');
    }
};
