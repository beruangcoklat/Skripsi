<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MenuCategory;
use Validator;

class MenuCategoryController extends Controller
{
    public function show(){
    	$menu_categories = MenuCategory::all();
    	return view('menu-category', compact('menu_categories'));
    }

    public function insert(Request $request){
        $rule = [
            'name' => 'required'
        ];

        $message = [
            'name.required' => 'Menu category name must be filled'
        ];

        $validator = Validator::make($request->all(), $rule, $message);
        if($validator->fails()){
            return response($validator->errors()->first(), 404);
        }

        $name = $request->name;        
        $mc = MenuCategory::createMenuCategory($name);
        return response($mc, 200);
    }

    public function update(Request $request){
        $rule = [
            'name' => 'required',
            'id' => 'required|exists:menu_categories,id'
        ];

        $message = [
            'name.required' => 'Menu category name must be filled',
            'id.required' => 'Menu category id is required',
            'id.exists' => 'Menu category not found'
        ];

        $validator = Validator::make($request->all(), $rule, $message);
        if($validator->fails()){
            return response($validator->errors()->first(), 404);
        }

        $id = $request->id;
        $name = $request->name;

    	$mc = MenuCategory::find($id);
    	$mc->name = $name;
    	$mc->save();
        return response('Update menu category success', 200);
    }

    public function delete($id){
        $mc = MenuCategory::find($id);

        if($mc == null){
            return response('Menu category not found', 404);
        }

    	$mc->delete();
        return response('Delete success', 200);
    }

    public function all(){
        return response(MenuCategory::all(), 200);
    }
}
