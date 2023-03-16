<?php

namespace App\Http\Controllers;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        $response = [
            'success' => false,
            'message' => __('general_fail'),
            'data' => [],
        ];
        try {
            $rules = [
                'email' => 'required|email:rfc,dns',
                'password' => 'required',
            ];
            $customMessages = [
                'email.required' => __('required',['Email']),
                'email.email' => __('email',['Email']),
                'password.required' => __('required',['Password']),
            ];
            $validator = Validator::make($request->all(), $rules, $customMessages);
            if ($validator->fails()) {
                $response['message'] = $validator->errors()->first();
                return response($response, 200);
            }
            $user = User::where([
                ['email', '=', $request->email]
            ])->first();
            if (!$user) {
                $response['message'] = __('invalid_credentials');
                return response($response, 200);
            }
            if (!Hash::check($request->password, $user->password)) {
                $response['message'] = __('invalid_credentials');
                return response($response, 200);
            }
            $input = $request->only('email', 'password');
            if (Auth::attempt($input, true)) {
                $token = $user->createToken('authToken')->accessToken;
                $data = [
                    'token' => $token,
                    'user' => $user['name'],
                    'email' => $user['email'],
                ];
                $response['success'] = true;
                $response['message'] = __('login_success');
                $response['data'] = $data;
                return response($response, 200);
            } else {
                $response['message'] = __('invalid_credentials');
                return response($response, 200);
            }
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
            return response($response, 200);
        }
    }
    
    public function logout(Request $request) {
        $response = [
            'success' => false,
            'message' => __('general_fail'),
            'data' => [],
        ];
        try {
            $token = $request->user()->token();
            $token->revoke();
            $response['success'] = true;
            $response['message'] = __('logout_success');
            return response($response, 200);
        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
            return response($response, 200);
        }
    }
}
