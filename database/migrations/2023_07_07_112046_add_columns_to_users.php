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
        Schema::table('users', function (Blueprint $table) {
            $table->string("fname")->after("name")->nullable();
            $table->string("mname")->nullable()->after("fname");
            $table->string("lname")->after("mname")->nullable();
            $table->boolean("sex")->after("lname")->nullable();
            $table->date("bday")->after("sex")->nullable();
            $table->string("address")->after("bday")->nullable();
            $table->string("contact_no")->after("address")->nullable();
            $table->boolean("status")->after("contact_no")->nullable();
            $table->integer("type")->after("status")->nullable();
            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
