<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Menu;
use App\EatTransaction;
use DB;

class TestController extends Controller
{
    public function test(Request $request){
        $menu = Menu::find(2);
        $a = $menu->delete();
        return response((string)$a, 200);
    }

    public function testAuth(Request $request){
        $data = EatTransaction::eatTimes(1, 1);
        return response($data, 200);
    }
}
