<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Super Administrator',
            'fname' =>'Super',
            'mname' =>'',
            'lname' =>'Administrator',
            'sex' =>false,
            'bday' =>Carbon::now(),
            'address' =>'Bangcud, Malaybalay City',
            'contact_no'=>'09123456789',
            'status' =>true,
            'type' => 0,
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('password')
        ]);

        DB::table('cashier_statuses')->insert([
            'status' => false,
            'user_id'=> 1
        ]);
    }
}
