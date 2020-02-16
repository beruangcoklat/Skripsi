<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
// use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable //implements JWTSubject
{
	use Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getAge(){
        return Carbon::parse($this->dob)->age;
    }

    public function getBMR(){
        $gender = $this->gender;
        $height = $this->height;
        $weight = $this->weight;
        $activity_id = $this->activity_id;
        $diet_mode_id = $this->diet_mode_id;
        $age = $this->getAge();

        if($gender == 'Male'){
            $bmr = 66 + (13.7 * $weight) + (5 * $height) - (6.8 * $age);
        }else{
            $bmr = 655 + (9.6 * $weight) + (1.8 * $height) - (4.7 * $age);
        }
        
        $bmr = $bmr * $this->getActivityMultiplier($activity_id);

        /*
        1. ingin tetap menjaga berat badan 0%
        2. ingin turun perlahan -10%
        3. Ingin turun cepat -20%
        4. ingin turun sangat cepat -30%
        5. Menambahkan berat badan +500 Calories
        */
        
        if($diet_mode_id == 2)
            $bmr = $bmr - ($bmr / 10);
        else if($diet_mode_id == 3)
            $bmr = $bmr - ($bmr / 20);
        else if($diet_mode_id == 4)
            $bmr = $bmr - ($bmr / 30);
        else if($diet_mode_id == 5)
            return $bmr + 500;
        
        return $bmr;
    }

    private function getActivityMultiplier($activity_id){
        $multipliers = [1.2, 1.375, 1.550, 1.725, 1.900];
        return $multipliers[$activity_id - 1];
    }

    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        return [];
    }

    public static function findByEmail($email){
        return self::where('email', $email)->first();
    }

    public static function createUser($username, $email, $password, $gender, $dob, $height, $weight, $activity_id, $eatCount, $diet_mode_id){
        $u = new User();
        $u->username = $username;
        $u->email = $email;
        $u->password = $password;
        $u->gender = $gender;
        $u->dob = $dob;
        $u->role_id = 2;
        $u->height = $height;
        $u->weight = $weight;
        $u->activity_id = $activity_id;
        $u->image = '-';
        $u->eatCount = $eatCount;
        $u->diet_mode_id = $diet_mode_id;
        $u->save();
        return $u;
    }
}
