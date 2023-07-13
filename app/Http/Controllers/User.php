<?php

namespace App\Http\Controllers;

use App\Models\User as ModelsUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class User extends Controller
{
    public function index(){
        $users = ModelsUser::paginate(10);
        return Inertia::render('UserManagement/Users',[
            'users'=>$users
        ]);
    }
}
