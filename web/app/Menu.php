<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\MenuCategory;
use App\Restaurant;
use App\EatTransaction;
use App\SearchHistory;
use DB;

class Menu extends Model
{
    use SoftDeletes;

    public function category(){
        return $this->belongsTo(MenuCategory::class, 'menu_category_id');
    }

    public function restaurant(){
        return $this->belongsTo(Restaurant::class);
    }

    public static function getByRestaurantId($restaurant_id, $menu_id){
        return self::where('restaurant_id', $restaurant_id)
            ->orderByRaw("id = $menu_id desc, name asc")
            ->paginate(10);
    }

    public static function findByName($name){
        return self::where('name', 'like', "%$name%")->limit(10)->get();
    }

    public static function findByNameAll($name, $user_id){
        $menus = self::where('name', 'like', "%$name%")->paginate(10);
        foreach ($menus as $menu) {
            $menu['eatTimes'] = EatTransaction::eatTimes($user_id, $menu->id);
        }        
        return $menus;
    }

    public static function getRecommendation($user_id, $page, $min_calory, $max_calory){ 
        $map = [];
        $ets = EatTransaction::where('user_id', $user_id);
        foreach ($ets as $et) {
            $obj = unserialize($et->data);
            $type = $obj['type'];
            if($type != 'menu') continue;
            
            $fileObject = $obj['data'];
            $category = $fileObject->menu_category_id;
            if(!isset($map[$category])) $map[$category] = 0;
            $map[$category]++;
        }

        $search_histories = DB::table('search_histories')
            ->where('user_id', $user_id)
            ->groupBy('menu_category_id')
            ->select(DB::raw('menu_category_id, COUNT(menu_category_id) as count'))
            ->get();

        foreach ($search_histories as $row) {
            $category = $row->menu_category_id;
            $count = $row->count;
            if(!isset($map[$category])) $map[$category] = 0;
            $map[$category] += $count;
        }

        // preprocess map
        $collection = [];
        foreach ($map as $key => $value) {
            array_push($collection, [
                'menu_category_id' => $key,
                'count' => $value
            ]);
        }
        $collection = collect($collection);
        $sorted = $collection->sortByDesc('count');
        $sorted = $sorted->values()->all();

        $priority = '';
        $len = count($sorted);
        for($i=0 ; $i<$len ; $i++){
            $curr = $sorted[$i];
            $id = $curr['menu_category_id'];
            $row = "menu_category_id = $id DESC";
            if($i != $len-1){
                $row .= ', ';
            }
            $priority .= $row;
        }

        $menus = Menu::whereBetween('calory', [$min_calory, $max_calory])
            ->orderByRaw($priority)
            ->get();

        foreach ($menus as $menu) {
            $menu['eatTimes'] = EatTransaction::eatTimes($user_id, $menu->id);
        }

        return $menus;
    }

    public static function createMenu($menu_name, $menu_calory, $restaurant_id, $menu_category_id, $image){
        $menu = new Menu();
        $menu->name = $menu_name;
        $menu->calory = $menu_calory;
        $menu->restaurant_id = $restaurant_id;
        $menu->menu_category_id = $menu_category_id;
        $menu->image = $image;
        $menu->save();
        return $menu;
    }
}
