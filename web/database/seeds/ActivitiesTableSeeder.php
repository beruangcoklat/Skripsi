<?php

use Illuminate\Database\Seeder;
use App\Activity;

class ActivitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = ['Sangat jarang olahraga', 
        			'Jarang olahraga (1-3 hari/ minggu)', 
        			'Normal olahraga (3-5 hari/ minggu)', 
        			'Sering olahraga (6-7 hari/ minggu)', 
        			'Sangat sering olahraga (setiap hari bisa dua kali dalam sehari)'];
        $multiplyBy = [1.2, 1.375, 1.55, 1.725, 1.9];

        for ($i=0; $i < count($names) ; $i++) { 
        	$a = new Activity();
        	$a->name = $names[$i];
        	// $a->multiplyBy = $multiplyBy[$i];
        	$a->save();
        }
    }
}
