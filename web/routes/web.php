<?php

Route::get('/', 'AuthenticationController@showLogin');

Route::get('/restaurant', 'RestaurantController@show');
Route::get('/restaurant/insert', 'RestaurantController@showInsert');
Route::get('/restaurant/detail/{restaurant_id}', 'RestaurantController@showRestaurantDetail');

Route::get('/menu/insert/{restaurant_id}', 'MenuController@showInsert');
Route::get('/menu/detail/{menu_id}', 'MenuController@showDetail');
Route::get('/menu/{restaurant_id}', 'MenuController@show');

Route::get('/menuCategory', 'MenuCategoryController@show');