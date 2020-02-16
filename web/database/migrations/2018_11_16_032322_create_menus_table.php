<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('menus', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('menu_category_id')->unsigned();
            $table->integer('restaurant_id')->unsigned();
            $table->string('name');
            $table->string('image');
            $table->float('calory', 11, 3);
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('menu_category_id')->references('id')->on('menu_categories');
            $table->foreign('restaurant_id')->references('id')->on('restaurants');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('menus');
    }
}
