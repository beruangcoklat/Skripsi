<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Menu;
use App\EatTransaction;
use Hash;
use Validator;

class UserController extends Controller
{
    public function register(Request $request){
        $rule = [
            'username' => 'required|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'gender' => 'required|in:Male,Female',
            'dob' => 'required|date',
            'height' => 'required|numeric',
            'weight' => 'required|numeric',
            'activity_id' => 'required|exists:activities,id',
            'diet_mode_id' => 'required|exists:diet_modes,id',
            'eatCount' => 'required|numeric'
        ];

        $message = [
            'username.required' => 'Username must be filled',
            'username.unique' => 'Username already exists',
            'email.required' => 'Email must be filled',
            'email.email' => 'Email format invalid',
            'email.unique' => 'Email already exists',
            'password.required' => 'Password must be filled',
            'gender.required' => 'Gender must be filled',
            'gender.in' => 'Gender must be Male or Female',
            'dob.required' => 'Date of birth must be filled',
            'dob.date' => 'Date of birth format invalid',
            'height.required' => 'Height must be filled',
            'height.numeric' => 'Height must be a number',
            'weight.required' => 'Weight must be filled',
            'weight.numeric' => 'Weight must be a number',
            'activity_id.required' => 'Activity must be filled',
            'activity_id.exists' => 'Activity not found',
            'diet_mode_id.required' => 'Diet Mode must be filled',
            'diet_mode_id.exists' => 'Diet Mode not found',
            'eatCount.required' => 'Eat count must be filled',
            'eatCount.numeric' => 'Eat count must be a number'
        ];

        $validator = Validator::make($request->all(), $rule, $message);
        if($validator->fails()){
            return response($validator->errors()->first(), 404);
        }

        $username = $request->username;
        $email = $request->email;
        $password = bcrypt($request->password);
        $gender = $request->gender;
        $dob = $request->dob;
        $height = $request->height;
        $weight = $request->weight;
        $activity_id = $request->activity_id;
        $eatCount = $request->eatCount;
        $diet_mode_id = $request->diet_mode_id;

        User::createUser($username, $email, $password, $gender, $dob, $height, $weight, $activity_id, $eatCount, $diet_mode_id);

        return response($u, 200);
    }

    public function changePassword(Request $request){
        $rule = [
            'old' => 'required',
            'new' => 'required',
            'confirm' => 'required'
        ];

        $message = [
            'old.required' => 'Old password must be filled',
            'new.required' => 'New password must be filled',
            'confirm.required' => 'Confirm password must be filled'
        ];

        $validator = Validator::make($request->all(), $rule, $message);
        if($validator->fails()){
            return response($validator->errors()->first(), 404);
        }

        $old = $request->old;
        $new = $request->new;
        $confirm = $request->confirm;
        $oldFix = $request->user()->password;

        if(!Hash::check($old, $oldFix)){
            return response('Old password is wrong', 400);
        }

        if($new !== $confirm){
            return response('New password not match', 400);
        }

        $user = User::find($request->user()->id);
        $user->password = bcrypt($new);
        $user->save();
        return response('Change password success', 200);
    }

    public function updateProfile(Request $request){
        $rule = [
            'email' => 'required|email',
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
            'eatCount' => 'required|numeric',
            'activity_id' => 'required|exists:activities,id',
            'diet_mode_id' => 'required|exists:diet_modes,id',
        ];

        $message = [
            'email.required' => 'Email must be filled',
            'email.email' => 'Email format invalid',
            'weight.required' => 'Weight must be filled',
            'weight.numeric' => 'Weight must be a number',
            'height.required' => 'Height must be filled',
            'height.numeric' => 'Height must be a number',
            'eatCount.required' => 'Eat Count must be filled',
            'eatCount.numeric' => 'Eat Count must be a number',
            'activity_id.required' => 'Activity id is required',
            'activity_id.exists' => 'Activity not found',
            'diet_mode_id.required' => 'Diet Mode id is required',
            'diet_mode_id.exists' => 'Diet Mode not found',
        ];

        $validator = Validator::make($request->all(), $rule, $message);
        if($validator->fails()){
            return response($validator->errors()->first(), 404);
        }

        $logged_user = $request->user();
        $email = $request->email;
        $weight = $request->weight;
        $height = $request->height;
        $activity_id = $request->activity_id;
        $diet_mode_id = $request->diet_mode_id;
        $eatCount = $request->eatCount;

        $user = User::find($logged_user->id);
        $user->email = $email;
        $user->weight = $weight;
        $user->height = $height;
        $user->activity_id = $activity_id;
        $user->diet_mode_id = $diet_mode_id;
        $user->eatCount = $eatCount;
        
        if($request->hasFile('image')){
            $filename = $request->file('image')->store('images');
            $user->image = substr($filename, 7);
        }

        $user->save();

        return response('Update profile success', 200);
    }
}
