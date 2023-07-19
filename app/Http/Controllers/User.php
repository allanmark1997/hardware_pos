<?php

namespace App\Http\Controllers;

use App\Models\User as ModelsUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class User extends Controller
{
    public function index(){
        $users = ModelsUser::paginate(10);
        return Inertia::render('UserManagement/Users',[
            'users'=>$users
        ]);
    }

    public function add_user(Request $request){
        $request->validate([
            'fname' => 'required',
            'lname' => 'required',
            'fname' => 'required',
        ]);
        $fullname = $request->fname.' '.$request->mname.' '.$request->lname;
        ModelsUser::create([
            'name' => $fullname,
            'fname' => $request->fname,
            'mname' => $request->mname,
            'lname' => $request->lname,
            'sex' => $request->sex,
            'bday' => $request->birthday,
            'address' => $request->address,
            'contact_no' => $request->contact_no,
            'status' => $request->status,
            'type' => $request->type,
            'email'=>  $request->email,
            'password'=> Hash::make($request->password),
        ]);
        return Redirect::back();

    }
}
