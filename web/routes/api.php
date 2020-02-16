<?php

use Illuminate\Http\Request;

// auth
Route::post('/login', 'AuthenticationController@login');

//user 
Route::post('/user/register', 'UserController@register');

// activity
Route::get('/activity/all', 'ActivityController@all');

// diet mode
Route::get('/dietMode/all', 'DietModeController@all');

// ingredient
Route::get('/ingredient/search/{ingredient_name}', 'IngredientController@search');

// restaurant
Route::get('/restaurant/find/{id}', 'RestaurantController@find');

// menu
Route::get('/menu/restaurant/{restaurant_id}/{menu_id}', 'MenuController@getByRestaurantId');
Route::get('/menu/find/{menu_id}', 'MenuController@find');
Route::get('/menu/search/{search}', 'MenuController@search');
Route::post('/menu/insert', 'MenuController@insert');

// menu category
Route::get('/menuCategory/all', 'MenuCategoryController@all');

// util
Route::get('/images/{filename}', 'ImageController@getImage');
Route::get('/test', 'TestController@test');


Route::middleware('jwt.auth')->group(function () {

	Route::post('/testAuth', 'TestController@testAuth');
	
	// auth
	Route::get('/me', 'AuthenticationController@me');
	Route::get('/logout', 'AuthenticationController@logout');

	// user
	Route::post('/user/changePassword', 'UserController@changePassword');
	Route::post('/user/updateProfile', 'UserController@updateProfile');

	// restaurant
	Route::post('/restaurant/insert', 'RestaurantController@insert');
	Route::post('/restaurant/update', 'RestaurantController@update');
	Route::get('/restaurant/delete/{id}', 'RestaurantController@delete');
	Route::get('/restaurant/search/{search}', 'RestaurantController@search');
	
	// menu
	Route::post('/menu/verify', 'MenuController@verify');
	Route::get('/menu/recommendation', 'MenuController@getRecommendation');
	Route::post('/menu/update', 'MenuController@update');
	Route::get('/menu/delete/{id}', 'MenuController@delete');
	Route::get('/menu/searchAll/{search}', 'MenuController@searchAll');

	// menu category
	Route::post('/menuCategory/insert', 'MenuCategoryController@insert');
	Route::post('/menuCategory/update', 'MenuCategoryController@update');
	Route::get('/menuCategory/delete/{id}', 'MenuCategoryController@delete');

	// eat transaction
	Route::get('/eatTransaction/history/{month}/{year}', 'EatTransactionController@history');
	Route::get('/eatTransaction/historyToday/{user_id}', 'EatTransactionController@historyToday');
	Route::get('/eatTransaction/todayStatistic', 'EatTransactionController@todayStatistic');
	Route::post('/eatTransaction/insert', 'EatTransactionController@insert');
	Route::post('/eatTransaction/insertIngredients', 'EatTransactionController@insertIngredients');

	// search history
	Route::post('/searchHistory/insert', 'SearchHistoryController@insert');
});