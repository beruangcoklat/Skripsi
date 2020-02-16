<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Menu;
use Carbon\Carbon;
use DB;

class EatTransaction extends Model
{
    use SoftDeletes;
    
    public static function createEatTransaction($user_id, $data){
        $et = new EatTransaction();
        $et->user_id = $user_id;
        $et->data = serialize($data);
        $et->save();
        return $et;
    }

    public function menu(){
        return $this->belongsTo(Menu::class);
    }

    public static function eatTimes($user_id, $menu_id){
        $ets = self::where('user_id', $user_id)->get();
        $count = 0;
        foreach ($ets as $et) {
            $obj = unserialize($et->data);
            if($obj['type'] != 'menu') continue;
            if($menu_id == $obj['data']->id) $count++;
        }
        return $count;
    }

    public static function historyToday($user_id){
        $ets = self::where('user_id', $user_id)
            ->whereDate('created_at', Carbon::today())
            ->get();

        $ret = [];
        foreach ($ets as $et) {
            $obj = unserialize($et->data);
            $type = $obj['type'];
            $fileObject = $obj['data'];
            $data = null;

            if($type == 'menu'){
                $data = [
                    'type' => 'menu',
                    'data' => $fileObject,
                    'menu_name' => $fileObject->name,
                    'menu_calory' => $fileObject->calory,
                    'time' => DATE_FORMAT($et->created_at, 'H:i')
                ];
            }
            else if($type == 'ingredient'){
                $calory = 0;
                $name = 'Home made';
                foreach ($fileObject as $fo) $calory +=  $fo->calory;
                $data = [
                    'type' => 'ingredient',
                    'data' => $fileObject,
                    'menu_name' => $name,
                    'menu_calory' => $calory,
                    'time' => DATE_FORMAT($et->created_at, 'H:i')
                ];
            }

            array_push($ret, $data);
        }
        
        return $ret;
    }

    public static function history($month, $year, $user_id){
         $select = "
            DAY(eat_transactions.created_at) as day,
            targets.target_calory as target
        ";
        
        $datas = DB::table('eat_transactions')
            ->join('users', 'users.id', '=', 'eat_transactions.user_id')
            ->join('targets', 'targets.user_id', '=', 'users.id')
            ->where('eat_transactions.user_id', $user_id)
            ->whereYear('eat_transactions.created_at', $year)
            ->whereMonth('eat_transactions.created_at', $month)
            ->groupBy(DB::raw('DAY(eat_transactions.created_at)'))
            ->select(DB::raw($select))
            ->get();

        $ret = [];
        foreach ($datas as $data) {
            $day = $data->day;
            $target = $data->target;
            $calory = 0;

            $temp = self::where('user_id', $user_id)
                ->whereYear('created_at', $year)
                ->whereMonth('created_at', $month)
                ->whereDay('created_at', $day)
                ->select('data')
                ->get();

            foreach ($temp as $aaa) {
                $obj = unserialize($aaa->data);
                $type = $obj['type'];
                $fileObject = $obj['data'];
                if($type == 'menu') $calory += $fileObject->calory;
                else if($type == 'ingredient'){
                    $curr = 0;
                    foreach ($fileObject as $fo) $curr +=  $fo->calory;
                    $calory += $curr;
                }
            }

            array_push($ret, [
                'Day' => $day,
                'Calory' => $calory,
                'Target' => $target
            ]);
        }

        return $ret;
    }

     public static function todayStatistic($user_id){
        $need = User::find($user_id)->getBMR();
        $done = 0;

        $datas = self::whereDate('created_at', Carbon::today())->where('user_id', $user_id)->get();
        foreach ($datas as $data) {
            $obj = unserialize($data->data);
            $type = $obj['type'];
            $fileObject = $obj['data'];
            if($type == 'menu'){
                $done += $fileObject->calory;
            }
            else if($type == 'ingredient'){
                foreach ($fileObject as $fo) {
                    $done +=  $fo->calory;
                }
            }
        }

        $data = [
            'need' => $need,
            'done' => $done
        ];
        
        return $data;
    }

}
