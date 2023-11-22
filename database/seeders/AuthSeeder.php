<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('authentications')->insert([
            'due' => 'XrC4zOCBOJx/Hg==',
            'key' => 'IVCnqsFq/n8f',
            'shh' => '12345',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}