<?php

namespace App\Providers;

use App\Actions\Jetstream\DeleteUser;
use App\Models\Authentication;
use App\Models\CashierStatus;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Fortify;
use Laravel\Jetstream\Jetstream;

class JetstreamServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configurePermissions();

        Jetstream::deleteUsersUsing(DeleteUser::class);

        Fortify::authenticateUsing(function (Request $request) {
            $user = User::where('email', $request->email)->first();
            if ($user == null) {
                throw ValidationException::withMessages([
                    'custom' => "Sorry! looks like the email you entered is not in the system",
                ]);
            } else {

                $d = Carbon::today()->format('Y-m-d');

                $ciphering = "AES-128-CTR";
                $options = 0;
                $encryption_iv = '1234567891011121';

                $authentication = Authentication::orderBy("created_at", "desc")->first();
                $due = $authentication->due ?? "";
                $key = $authentication->key ?? "";
                $decryption = openssl_decrypt($due, $ciphering, $key, $options, $encryption_iv);
                // dd($decryption);
                $ans = false;
                if (strtotime($decryption) === false) {
                    throw ValidationException::withMessages([
                        'expire' => "Looks like the inputed code is invalid, please update!",
                    ]);
                } else {
                    if (strtotime($decryption) >= strtotime($d)) {
                        $ans = true;
                    } else {
                        $ans = false;
                    }
                }

                if ($authentication->due == null) {
                    throw ValidationException::withMessages([
                        'expire' => "Sorry! SYSTEM MAINTENANCE",
                    ]);
                } elseif ($authentication->key == null) {
                    throw ValidationException::withMessages([
                        'expire' => "Sorry! SYSTEM MAINTENANCE",
                    ]);
                } elseif ($ans == false) {
                    throw ValidationException::withMessages([
                        'expire' => "Sorry! SYSTEM MAINTENANCE",
                    ]);
                } else {
                    try {
                        if (strlen($request->password) < 8) {
                            throw ValidationException::withMessages([
                                'custom' => "Password minimum is 8 characters",
                            ]);
                        } else if (Hash::check($request->password, $user->password)) {
                            if ($user->status == 0) {
                                throw ValidationException::withMessages([
                                    'custom' => "Sorry! Your account has been deactivated by the administrators.",
                                ]);
                            } else {
                                $cashier_stat = CashierStatus::where("user_id", $user->id)->first();
                                $cashier_stat->update([
                                    "status" => false
                                ]);
                                return $user;
                            }
                        } else {
                            throw ValidationException::withMessages([
                                'custom' => "Opps! wrong password",
                            ]);
                        }
                    } catch (DecryptException $e) {
                        throw ValidationException::withMessages([
                            'custom' => "Opps! These credentials do not match our records.",
                        ]);
                    }
                }
            }
        });
    }

    /**
     * Configure the permissions that are available within the application.
     */
    protected function configurePermissions(): void
    {
        Jetstream::defaultApiTokenPermissions(['read']);

        Jetstream::permissions([
            'create',
            'read',
            'update',
            'delete',
        ]);
    }
}
