<?php

use Illuminate\Database\Seeder;
use App\DietMode;

class DietModesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	/*
        1. ingin tetap menjaga berat badan 0%
		2. ingin turun perlahan -10%
		3. Ingin turun cepat -20%
		4. ingin turun sangat cepat -30%
		5. Menambahkan berat badan +500 Calories
		*/
		
		$names = ['Ingin tetap menjaga berat badan',
				'Ingin turun perlahan',
				'Ingin turun cepat',
				'Ingin turun sangat cepat',
				'Menambahkan berat badan'];
				
		foreach ($names as $name) {
			$dm = new DietMode();
			$dm->name = $name;
			$dm->save();
		}
    }
}
