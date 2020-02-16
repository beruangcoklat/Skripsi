<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Restaurant;
use App\Menu;
use Validator;

class RestaurantController extends Controller
{
    public function show(){
        $restaurants = Restaurant::all();
    	return view('restaurant', compact('restaurants'));
    }

    public function showInsert(){
    	return view('restaurant-insert');
    }

    public function showRestaurantDetail($restaurant_id){
        $restaurant = Restaurant::find($restaurant_id);
        return view('restaurant-detail', compact('restaurant'));
    }

    public function insert(Request $request){
        $rule = [
            'name' => 'required'
        ];

        $message = [
            'name.required' => 'Name must be filled'
        ];

        $validator = Validator::make($request->all(), $rule, $message);
        if($validator->fails()){
            return response($validator->errors()->first(), 404);
        }

        $name = $request->name;
        $image = '';
        if($request->hasFile('image')){
            $filename = $request->file('image')->store('images');
            $image = substr($filename, 7);
        }
        Restaurant::createRestaurant($name, $image);
        return response('Insert restaurant success', 200);
    }

    public function update(Request $request){
        $rule = [
            'id' => 'required|exists:restaurants,id',
            'name' => 'required'
        ];

        $message = [
            'id.required' => 'Restaurant id is required',
            'id.exists' => 'Restaurant not found',
            'name.required' => 'Name must be filled'
        ];

        $validator = Validator::make($request->all(), $rule, $message);
        if($validator->fails()){
            return response($validator->errors()->first(), 404);
        }

        $id = $request->id;
        $name = $request->name;

        $resto = Restaurant::find($id);
        $resto->name = $name;
        if($request->hasFile('image')){
            $filename = $request->file('image')->store('images');
            $resto->image = substr($filename, 7);
        }
        $resto->save();
        return response('Update restaurant success', 200);
    }

    public function delete($id){
        $r = Restaurant::find($id);

        if($r == null){
            return response('Restaurant not found', 404);
        }

    	$r->delete();
        return response('Delete success', 200);
    }

    public function find($id){
        $r = Restaurant::find($id);
        if($r != null){
            return response($r, 200);
        }else{
            return response('Restaurant not found', 400);
        }
    }

    public function search($search){
        $restaurants = Restaurant::where('name', 'like', "%$search%")->limit(3)->select('name')->get();
        return response($restaurants, 200);
    }

}
