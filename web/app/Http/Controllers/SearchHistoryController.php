<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SearchHistory;
use Validator;

class SearchHistoryController extends Controller
{
    public function insert(Request $request){
		$rule = [
            'menu_category_id' => 'required|exists:menu_categories,id',
            'keyword' => 'required'
        ];

        $message = [
            'menu_category_id.required' => 'Menu Category id is required',
            'menu_category_id.exists' => 'Menu Category not found',
            'keyword' => 'Keyword is required'
        ];

        $validator = Validator::make($request->all(), $rule, $message);
        if($validator->fails()){
            return response($validator->errors()->first(), 404);
        }

        $menu_category_id = $request->menu_category_id;
        $keyword = $request->keyword;
        $user_id = $request->user()->id;

        $sh = new SearchHistory();
        $sh->menu_category_id = $menu_category_id;
        $sh->keyword = $keyword;
        $sh->user_id = $user_id;
        $sh->save();

        return response('Insert search history success', 200);
    }
}
