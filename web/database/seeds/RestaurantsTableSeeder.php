<?php

use Illuminate\Database\Seeder;
use App\Restaurant;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $restaurants = ['Rocky', 'Efata', 'Loving Hut', 'Oku Tei Sushi', 
                        'Oriental Chicken Rice', 'Haku - Ya', 'Bakso Super Makaliwe', 
                        'Omon\'s Corner', 'Big Bab', 'My Crepes', 'Cross Road Café', 
                        'A&W', 'HokBen', 'Ciz n\' Chic', 'Ayam Blenger PSP', 'Waroeng Western', 
                        'Wakacao Beef Pepper Rice', 'Ayam Keprabon Express'];

        for($i=0 ; $i<count($restaurants) ; $i++) {
        	$r = new Restaurant();
        	$r->name = $restaurants[$i];
            $r->image = '-';
        	$r->save();
        }
    }
}
