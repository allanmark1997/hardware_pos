<?php

namespace App\Http\Controllers;

use App\Models\User as ModelsUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class User extends Controller
{
    public function index(Request $request){
        // dd($request->search);
        $search = $request->search ?? "";
        $users = ModelsUser::when($search != null || $search != "", function($query) use($search){
            $query->where("name", "LIKE", "%{$search}%");
        })->paginate(10);
        return Inertia::render('UserManagement/Users',[
            'users'=>$users,
            'search'=>$search
        ]);
    }

    public function add_user(Request $request){
        $request->validate([
            'fname' => ['required', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
            'sex' => 'required',
            'birthday' => ['required', 'date'],
            'address' => 'required',
            'contact_no' => 'required',
            'status' => 'required',
            'type' => 'required',
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => 'required',
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

    public function update_user(Request $request, ModelsUser $user){
    //    dd($request);
        
        $user -> update([
            'status' => $request->status,
            'type' => $request->type,
        ]);
        return Redirect::back();

    }

    public function update_user_position(Request $request){
        //    dd($request);
            $user = ModelsUser::find($request->id);
            $user -> update([
                'type' => $request->type,
            ]);
            return Redirect::back();
    
        }
}
