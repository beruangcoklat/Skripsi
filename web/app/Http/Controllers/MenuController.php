<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Menu;
use App\Restaurant;
use App\MenuCategory;
use App\User;
use App\EatTransaction;
use Validator;
use JWTAuth;
use Carbon\Carbon;

class MenuController extends Controller
{
    public function showInsert(Request $request, $restaurant_id){
    	$restaurant = Restaurant::find($restaurant_id);
    	$categories = MenuCategory::all();
        return view('menu-insert', compact('restaurant', 'categories'));
    }

    public function showDetail($menu_id){
        $menu = Menu::find($menu_id);
    	$categories = MenuCategory::all();
        return view('menu-detail', compact('menu', 'categories'));
    }

    public function show($restaurant_id){
        $restaurant = Restaurant::find($restaurant_id);
        $menus = Menu::where('restaurant_id', $restaurant_id)->get();
        return view('menu', compact('restaurant', 'menus'));
    }

    public function insert(Request $request){
        $rule = [
            'name' => 'required',
            'calory' => 'required|numeric',
            'menu_category_id' => 'required|exists:menu_categories,id',
            'restaurant_id' => 'required|exists:restaurants,id'
        ];

        $message = [
            'name.required' => 'Name must be filled',
            'calory.required' => 'Calory must be filled',
            'calory.numeric' => 'Calory must be numeric',
            'menu_category_id.required' => 'Menu category must be filled',
            'menu_category_id.exists' => 'Menu category not found',
            'restaurant_id.required' => 'Restaurant Id must be filled',
            'restaurant_id.exists' => 'Restaurant not found'
        ];

        $validator = Validator::make($request->all(), $rule, $message);
        if($validator->fails()){
            return response($validator->errors()->first(), 404);
        }

        $name = $request->name;
        $calory = $request->calory;
        $menu_category_id = $request->menu_category_id;
        $restaurant_id = $request->restaurant_id;

        $token = $request->bearerToken();
        $user = JWTAuth::toUser($token);

        $image = '-';
        if($request->hasFile('image')){
            $filename = $request->file('image')->store('images');
            $image = substr($filename, 7);
        }
        Menu::createMenu($name, $calory, $restaurant_id, $menu_category_id, $image);

        return response('Insert menu success', 200);
    }

    public function update(Request $request){
        $rule = [
            'id' => 'required|exists:menus,id',
            'name' => 'required',
            'calory' => 'required|numeric',
            'menu_category_id' => 'required|exists:menu_categories,id'
        ];

        $message = [
            'id.required' => 'Menu id is required',
            'id.exists' => 'Menu not found',
            'name.required' => 'Name must be filled',
            'calory.required' => 'Calory must be filled',
            'calory.numeric' => 'Calory must be numeric',
            'menu_category_id.required' => 'Menu category must be filled',
            'menu_category_id.exists' => 'Menu category not found'
        ];

        $validator = Validator::make($request->all(), $rule, $message);
        if($validator->fails()){
            return response($validator->errors()->first(), 404);
        }

        $menu_id = $request->id;
        $menu_name = $request->name;
        $menu_calory = $request->calory;
        $menu_category_id = $request->menu_category_id;

        $menu = Menu::find($menu_id);
        $menu->name = $menu_name;
        $menu->calory = $menu_calory;
        $menu->menu_category_id = $request->menu_category_id;

        if($request->hasFile('image')){
            $filename = $request->file('image')->store('images');
            $menu->image = substr($filename, 7);
        }
        $menu->save();
        return response('Update menu success', 200);
    }

    public function getRecommendation(Request $request){
        $token = $request->bearerToken();
        $user = JWTAuth::toUser($token);
        $user_id = $user->id;
        $page = $request->page;

        $eatCount = $user->eatCount;
        $eatCount_done = EatTransaction::where('user_id', $user_id)->whereDate('created_at', Carbon::today())->count();
        $eatCount_need = $eatCount - $eatCount_done;

        $today_statistic = EatTransaction::todayStatistic($user_id);

        $calory_need = $today_statistic['need']  - $today_statistic['done'];
        if($eatCount_need > 0) $calory_need /= $eatCount;

        $tolerance = 30;
        $min_calory = $calory_need - $tolerance;
        $max_calory = $calory_need + $tolerance;
        $data = Menu::getRecommendation($user_id, $page, $min_calory, $max_calory);
        return response($data, 200);
    }

    public function search($search){
        $search = trim($search);
        $menus = Menu::findByName($search);
        return response($menus, 200);
    }

    public function searchAll(Request $request, $search){
        $search = trim($search);
        $user = $request->user();
        $menus = Menu::findByNameAll($search, $user->id);
        return response($menus, 200);
    }

    public function getByRestaurantId($restaurant_id, $menu_id){
        $menus = Menu::getByRestaurantId($restaurant_id, $menu_id);
        return response($menus, 200);
    }

    public function find($menu_id){
        $menu = Menu::find($menu_id);
        if($menu == null){
            return response('Menu not found', 404);   
        }
        return response($menu, 200);
    }

    public function delete($id){
        $m = Menu::find($id);
    	$m->delete();
        return response('Delete success', 200);
    }
}
