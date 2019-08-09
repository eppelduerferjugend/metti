<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('number');
            $table->string('waiter');
            $table->string('table');
            $table->string('comment')->nullable()->default(null);
            $table->dateTime('completed_at')->nullable()->default(null);
            $table->unsignedBigInteger('destination_id');

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
        Schema::dropIfExists('orders');
    }
}
