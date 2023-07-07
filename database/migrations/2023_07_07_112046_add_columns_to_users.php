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
            $table->string("fname")->after("name");
            $table->string("mname")->nullable()->after("fname");
            $table->string("lname")->after("mname");
            $table->boolean("sex")->after("lname");
            $table->date("bday")->after("sex");
            $table->string("address")->after("bday");
            $table->string("contact_no")->after("address");
            $table->boolean("status")->after("contact_no");
            $table->integer("type")->after("status");
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
