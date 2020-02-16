<?php

use Illuminate\Database\Seeder;
use App\MenuCategory;

class MenuCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = ['Western','Chinese','Indonesia', 'Jepang', 'Korea'];
        foreach ($categories as $cat) {
        	$mc = new MenuCategory();
        	$mc->name = $cat;
        	$mc->save();
        }
    }
}
