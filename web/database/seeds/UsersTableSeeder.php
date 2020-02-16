<?php

use Illuminate\Database\Seeder;
use App\User;
use Carbon\Carbon;
use App\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $a = new User();
		$a->username = 'budi';
        $a->email = 'budi@gmail.com';
        $a->gender = 'Male';
		$a->password = bcrypt(md5('budi'));
        $a->role_id = 1;
        $a->dob = '1997-05-30 17:38:05';
        $a->height = 165;
        $a->weight = 70;
        $a->activity_id = 1;
        $a->image = '-';
        $a->diet_mode_id = 1;
        $a->eatCount = 3;
        $a->save();
    }
}
