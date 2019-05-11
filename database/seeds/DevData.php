<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class DevData extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'name' => 'Food',
            'description' => 'Stuff handled by the kitchen'
        ]);
        DB::table('categories')->insert([
            'name' => 'Drinks',
            'description' => 'Stuff handled by the bar, shots and stuff...'
        ]);
        DB::table('categories')->insert([
            'name' => 'Desserts',
            'description' => 'Desserts are handled by the bar'
        ]);
        
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'name' => 'Bolognaise',
            'slug' => 'Bolognaise',
            'stock' => 1000,
            'orderNr' => 1,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'parent_id' => DB::table('items')->where('name', 'Bolognaise')->first()->id,
            'name' => 'Kleng',
            'slug' => 'Kleng',
            'orderNr' => 2,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'parent_id' => DB::table('items')->where('name', 'Bolognaise')->first()->id,
            'name' => 'All-you-can-eat',
            'slug' => 'Grouss',
            'available' => 0,
            'stock' => 200,
            'orderNr' => 3,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'name' => 'Pesto',
            'slug' => 'Pesto',
            'stock' => 1000,
            'orderNr' => 1,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'parent_id' => DB::table('items')->where('name', 'Pesto')->first()->id,
            'name' => 'Kleng',
            'slug' => 'Kleng',
            'orderNr' => 2,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'parent_id' => DB::table('items')->where('name', 'Pesto')->first()->id,
            'name' => 'All-you-can-eat',
            'slug' => 'Grouss',
            'available' => 0,
            'stock' => 200,
            'orderNr' => 3,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'name' => 'Arrabiata',
            'slug' => 'Arrabiata',
            'stock' => 1000,
            'orderNr' => 1,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'parent_id' => DB::table('items')->where('name', 'Arrabiata')->first()->id,
            'name' => 'Kleng',
            'slug' => 'Kleng',
            'orderNr' => 2,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'parent_id' => DB::table('items')->where('name', 'Arrabiata')->first()->id,
            'name' => 'All-you-can-eat',
            'slug' => 'Grouss',
            'available' => 0,
            'stock' => 200,
            'orderNr' => 3,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'name' => 'Spezial',
            'slug' => 'Spezial',
            'stock' => 1000,
            'orderNr' => 1,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'parent_id' => DB::table('items')->where('name', 'Spezial')->first()->id,
            'name' => 'Kleng',
            'slug' => 'Kleng',
            'orderNr' => 2,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'parent_id' => DB::table('items')->where('name', 'Spezial')->first()->id,
            'name' => 'All-you-can-eat',
            'slug' => 'Grouss',
            'available' => 0,
            'stock' => 200,
            'orderNr' => 3,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'name' => 'Carbonara',
            'slug' => 'Carbonara',
            'stock' => 1000,
            'orderNr' => 1,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'parent_id' => DB::table('items')->where('name', 'Carbonara')->first()->id,
            'name' => 'Kleng',
            'slug' => 'Kleng',
            'orderNr' => 2,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
            'parent_id' => DB::table('items')->where('name', 'Carbonara')->first()->id,
            'name' => 'All-you-can-eat',
            'slug' => 'Grouss',
            'available' => 0,
            'stock' => 200,
            'orderNr' => 3,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Drinks')->first()->id,
            'parent_id' => null,
            'name' => 'Coca-Cola',
            'slug' => 'Cola',
            'orderNr' => 1,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Drinks')->first()->id,
            'parent_id' => null,
            'name' => 'Fanta',
            'slug' => 'Fanta',
            'orderNr' => 2,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Drinks')->first()->id,
            'parent_id' => null,
            'name' => 'Äppeljus',
            'slug' => 'Äppeljus',
            'orderNr' => 3,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Desserts')->first()->id,
            'parent_id' => null,
            'name' => 'Schokelasmousse',
            'slug' => 'Schokomuss',
            'orderNr' => 1,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'category_id' => DB::table('categories')->where('name', 'Desserts')->first()->id,
            'parent_id' => null,
            'name' => 'Crème brûlée',
            'slug' => 'Kräm Brülé',
            'orderNr' => 2,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        $waiters = ['Thierry', 'Fränz'];
        $comments = ['Eng hallef portioun', 'All Zoossen', '','','', 'Bolo mat Carbonara'];
        
        // insert random orders
        for ($i=0;$i<37;$i++)
        {
            $id = DB::table('orders')->insertGetId([
                'waiter' => $waiters[array_rand($waiters)],
                'table' => strtoupper(Str::random(1)).rand(1, 9),
                'comment' => $comments[array_rand($comments)],
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);

            // insert 1 to 20 random items to orders
            for ($j=0;$j<rand(1,20);$j++)
            {
                DB::table('order_items')->insert([
                    'order_id' => $id,
                    'item_id' => DB::table('items')->where('category_id', DB::table('categories')->inRandomOrder()->first()->id)->inRandomOrder()->first()->id,
                    'quantity' => rand(1,3),
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ]);
            }

            // set random completion statuses for the just generated orders
            switch(rand(1,5))
            {
                // 1 = no completion yet
                case 1:
                    break;
                // 2 = kitchen done
                case 2:
                    DB::table('order_completions')->insert([
                        'order_id' => $id,
                        'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
                        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    ]);
                    break;
                // 3 = bar done
                case 3:
                    DB::table('order_completions')->insert([
                        'order_id' => $id,
                        'category_id' => DB::table('categories')->where('name', 'Drinks')->first()->id,
                        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    ]);
                    break;
                // 4 = all done
                case 4:
                    DB::table('order_completions')->insert([
                        'order_id' => $id,
                        'category_id' => DB::table('categories')->where('name', 'Food')->first()->id,
                        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    ]);
                    DB::table('order_completions')->insert([
                        'order_id' => $id,
                        'category_id' => DB::table('categories')->where('name', 'Drinks')->first()->id,
                        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    ]);
                    break;
            }
        }
    }
}
