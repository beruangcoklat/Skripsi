<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Menu;

class Restaurant extends Model
{
    use SoftDeletes;

    public function menus(){
        return $this->hasMany(Menu::class);
    }

    public static function findByName($name){
    	return self::where('name', $name)->first();
    }

    public static function createRestaurant($name, $image){
        $resto = new Restaurant();
        $resto->name = $name;
        $resto->image = $image;
        $resto->save();
        return $resto;
    }
}
