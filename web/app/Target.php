<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Target extends Model
{
    use SoftDeletes;

    public static function createTarget($user){
    	$t = new Target();
        $t->user_id = $user->id;
        $t->target_calory = $user->getBMR();
        $t->save();
        return $t;
    }
}
