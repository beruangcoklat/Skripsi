<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(DietModesTableSeeder::class);
        $this->call(IngredientsTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(ActivitiesTableSeeder::class);
        $this->call(UsersTableSeeder::class);

        $this->call(RestaurantsTableSeeder::class);
        $this->call(MenuCategoriesSeeder::class);
        $this->call(MenusTableSeeder::class);
        $this->call(EatTransactionsTableSeeder::class);
    }
}
