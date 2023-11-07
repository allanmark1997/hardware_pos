<?php

namespace App\Http\Controllers;

use App\Models\CashierStatus;
use App\Models\User as ModelsUser;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class User extends Controller
{
    public function index(Request $request)
    {
        if (Auth::user()->type == 2) {
            return Redirect::route('cashier.index');
        } else {
            if (Auth::user()->type != 0 && Auth::user()->type != 1) {
                return Redirect::route('dashboard');
            } else {
                $search = $request->search ?? "";
                $users = ModelsUser::when($search != null || $search != "", function ($query) use ($search) {
                    $query->where("name", "LIKE", "%{$search}%");
                })->paginate(12);
                return Inertia::render('UserManagement/Users', [
                    'users' => $users,
                    'search' => $search
                ]);
            }
        }
    }

    public function add_user(Request $request)
    {
        $request->validate([
            'fname' => ['required', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
            'sex' => 'required',
            'birthday' => ['required', 'date'],
            'address' => 'required',
            'contact_no' => ['required', 'string', 'max:13'],
            'status' => 'required',
            'type' => 'required',
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => 'required',
            'photo' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1024'],

        ]);
        $fullname = $request->fname . ' ' . $request->mname . ' ' . $request->lname;

        $imageName = $request->input('image');
        if ($request->hasfile('image')) {
            ModelsUser::initStorage();
            $photo = $request->file('image');
            $imageName = $photo->hashName();
            $photo->store('public/profile-photos');
        }
        $user_created = ModelsUser::create([
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
            'email' =>  $request->email,
            'password' => Hash::make($request->password),
            'profile_photo_path' => "profile-photos/" . $imageName
        ]);

        $cashier_status = CashierStatus::create([
            "status" => false,
            "user_id" => $user_created->id
        ]);

        return Redirect::back();
    }

    public function update_user(Request $request, ModelsUser $user)
    {
        //    dd($request);

        $user->update([
            'status' => $request->status,
            'type' => $request->type,
        ]);
        return Redirect::back();
    }

    public function update_user_position(Request $request)
    {
        //    dd($request);
        $user = ModelsUser::find($request->id);
        $user->update([
            'type' => $request->type,
        ]);
        return Redirect::back();
    }

    public function authorize_user(Request $request)
    {
        $user = ModelsUser::where('id', 1)->first();
        try {
            if (strlen($request->password) < 8) {
                throw ValidationException::withMessages([
                    'message' => "Password is minimum of 8 characters",
                    "status" => 0
                ]);
            } else if (Hash::check($request->password, $user->password)) {
                return back();
            } else {
                throw ValidationException::withMessages([
                    'message' => "Wrong password",
                    "status" => 0
                ]);
            }
        } catch (DecryptException $e) {
            throw ValidationException::withMessages([
                'message' => "Opps! These credentials do not match our records.",
                "status" => 0
            ]);
        }
    }
}
