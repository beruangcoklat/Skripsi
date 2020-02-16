<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->integer('role_id')->unsigned();
            $table->integer('activity_id')->unsigned();
            $table->integer('diet_mode_id')->unsigned();
            $table->string('username');
            $table->string('password');
            $table->string('image');
            $table->integer('weight');
            $table->integer('height');
            $table->datetime('dob');
            $table->string('gender');
            $table->integer('eatCount');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('role_id')->references('id')->on('roles');
            $table->foreign('activity_id')->references('id')->on('activities');
            $table->foreign('diet_mode_id')->references('id')->on('diet_modes');
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
        Schema::dropIfExists('users');
    }
}
