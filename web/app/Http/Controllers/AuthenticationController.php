<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Hash;
use JWTAuth;

class AuthenticationController extends Controller
{
    public function login(Request $request){
		$email = $request->email;
		$password = $request->password;
		$user = User::findByEmail($email);
		
		if(!$user){
			return response('User doesn\'t exist', 404);
		}
		
		if(!Hash::check($password, $user->password)){
			return response('Password mismatch', 404);
		}

		$credentials = $request->only('email', 'password');
		$token = JWTAuth::attempt($credentials);
		return response([
			'token' => $token,
			'user' => $user
		], 200);
	}

	public function logout(Request $request){
		$token = $request->bearerToken();

		try {
			JWTAuth::invalidate($token);
		} catch (JWTException $exception) {
			return response('Logout failed', 401);
		}

		return response('You have been successfully logged out!', 200);
	}

	public function me(Request $request){
		$token = $request->bearerToken();
		$user = JWTAuth::toUser($token);
		return response($user, 200);
	}
	
	public function showLogin(){
    	return view('login');	
    }
}
