<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuCategory extends Model
{
    use SoftDeletes;

    public static function createMenuCategory($name){
    	$mc = new MenuCategory();
        $mc->name = $name;
        $mc->save();
        return $mc;
    }
}
