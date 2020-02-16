<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\EatTransaction;
use App\Target;
use App\Menu;
use App\Ingredient;
use Carbon\Carbon;
use DB;
use Validator;
use JWTAuth;

class EatTransactionController extends Controller
{
    public function insert(Request $request){
        $rule = [
            'menu_id' => 'required|exists:menus,id'
        ];

        $message = [
            'menu_id.required' => 'Menu id is required',
            'menu_id.exists' => 'Menu not found'
        ];

        $validator = Validator::make($request->all(), $rule, $message);
        if($validator->fails()){
            return response($validator->errors()->first(), 404);
        }

        $token = $request->bearerToken();
        $user = JWTAuth::toUser($token);
        $user_id = $user->id;
        $menu_id = $request->menu_id;
        $menu = Menu::find($menu_id);

        $data = [ 'data' => $menu, 'type' => 'menu' ];
        EatTransaction::createEatTransaction($user_id, $data);

        if(Target::whereDate('created_at', Carbon::today())->count() == 0){
            Target::createTarget($user);   
        }

        return response($menu, 200);
    }

    public function insertIngredients(Request $request){
        $token = $request->bearerToken();
        $user = JWTAuth::toUser($token);
        $user_id = $user->id;
        $ingredient_ids = json_decode($request->ingredient_ids);
        $ingredients = [];

        foreach ($ingredient_ids as $ingredient_id) {
            $ingredient = Ingredient::find($ingredient_id);
            if($ingredient == null){
                return response('Ingredient not found', 404);
            }
            array_push($ingredients, $ingredient);
        }


        $data = [ 'data' => $ingredients, 'type' => 'ingredient' ];
        EatTransaction::createEatTransaction($user_id, $data);

        if(Target::whereDate('created_at', Carbon::today())->count() == 0){
            Target::createTarget($user);   
        }

        return response($ingredients, 200);

    }

    public function historyToday($user_id){
        $data = EatTransaction::historyToday($user_id);
        return response($data, 200);
    }

    public function history(Request $request, $month, $year){
        $user_id = $request->user()->id;
        $data = EatTransaction::history($month, $year, $user_id);
        return response($data, 200);
    }

    public function todayStatistic(Request $request){
        $user_id = $request->user()->id;    
        $data = EatTransaction::todayStatistic($user_id);        
        return response($data, 200);
    }

}