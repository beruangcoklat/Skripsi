<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DietMode;

class DietModeController extends Controller
{
    public function all(){
    	return response(DietMode::all(), 200);
    }
}
