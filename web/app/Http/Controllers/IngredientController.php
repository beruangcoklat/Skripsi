<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ingredient;

class IngredientController extends Controller
{
    public function search($ingredient_name){
    	$ingredients = Ingredient::where('name', 'like', "%$ingredient_name%")->limit(5)->get();
    	return response($ingredients, 200);
    }
}
