<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('slug')->nullable()->default(null);
            $table->string('color')->nullable()->default(null);
            $table->float('unit_price')->nullable()->default(null);
            $table->integer('sorting_nr');
            $table->unsignedBigInteger('parent_id')->nullable()->default(null);
            $table->unsignedBigInteger('destination_id');
            $table->unsignedBigInteger('category_id')->nullable()->default(null);

            // SQL transactions fir orders

            // all order nummer soll eng nummer kréien déi zB 8 ass wann scho 7 portiounen bestallt sinn


            $table->foreign('parent_id')
                ->references('id')
                ->on('items')
                ->onDelete('cascade');

            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade');

            $table->foreign('destination_id')
                ->references('id')
                ->on('destinations')
                ->onDelete('cascade');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
