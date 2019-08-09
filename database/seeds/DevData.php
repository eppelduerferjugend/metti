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
        // Destinations
        DB::table('destinations')->insert([
            'name' => 'Kichen',
            'description' => 'Alles wat an d\'Kichen gehéiert'
        ]);
        DB::table('destinations')->insert([
            'name' => 'bar',
            'description' => 'Alles wat an d\'Bar gehéiert, Gedrénks, Desserten,...'
        ]);

        // Categories
        DB::table('categories')->insert([
            'name' => 'Soft Drink',
            'description' => 'Gedrénks ouni Alkohol'
        ]);
        DB::table('categories')->insert([
            'name' => 'Wäin',
            'description' => 'Wäin'
        ]);

        // Items
        // Food
        DB::table('items')->insert([
            'name' => 'Bolognaise',
            'slug' => 'Bolognaise',
            'sorting_nr' => 1,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'Kleng',
            'slug' => 'Kleng',
            'sorting_nr' => 2,
            'parent_id' => DB::table('items')->where('name', 'Bolognaise')->first()->id,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'All-you-can-eat',
            'slug' => 'Grouss',
            'sorting_nr' => 3,
            'parent_id' => DB::table('items')->where('name', 'Bolognaise')->first()->id,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        DB::table('items')->insert([
            'name' => 'Pesto',
            'slug' => 'Pesto',
            'sorting_nr' => 4,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'Kleng',
            'slug' => 'Kleng',
            'sorting_nr' => 5,
            'parent_id' => DB::table('items')->where('name', 'Pesto')->first()->id,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'All-you-can-eat',
            'slug' => 'Grouss',
            'sorting_nr' => 6,
            'parent_id' => DB::table('items')->where('name', 'Pesto')->first()->id,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        DB::table('items')->insert([
            'name' => 'Arrabiata',
            'slug' => 'Arrabiata',
            'sorting_nr' => 7,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'Kleng',
            'slug' => 'Kleng',
            'sorting_nr' => 8,
            'parent_id' => DB::table('items')->where('name', 'Arrabiata')->first()->id,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'All-you-can-eat',
            'slug' => 'Grouss',
            'sorting_nr' => 9,
            'parent_id' => DB::table('items')->where('name', 'Arrabiata')->first()->id,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        DB::table('items')->insert([
            'name' => 'Carbonara',
            'slug' => 'Carbonara',
            'sorting_nr' => 10,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'Kleng',
            'slug' => 'Kleng',
            'sorting_nr' => 11,
            'parent_id' => DB::table('items')->where('name', 'Carbonara')->first()->id,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'All-you-can-eat',
            'slug' => 'Grouss',
            'sorting_nr' => 12,
            'parent_id' => DB::table('items')->where('name', 'Carbonara')->first()->id,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        DB::table('items')->insert([
            'name' => 'Spezial',
            'slug' => 'Spezial',
            'sorting_nr' => 13,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'Kleng',
            'slug' => 'Kleng',
            'sorting_nr' => 14,
            'parent_id' => DB::table('items')->where('name', 'Spezial')->first()->id,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'All-you-can-eat',
            'slug' => 'Grouss',
            'sorting_nr' => 15,
            'parent_id' => DB::table('items')->where('name', 'Spezial')->first()->id,
            'destination_id' => DB::table('destinations')->where('name', 'Kichen')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        // Drinks
        DB::table('items')->insert([
            'name' => 'Coca-Cola',
            'slug' => 'Cola',
            'unit_price' => 2,
            'sorting_nr' => 1,
            'destination_id' => DB::table('destinations')->where('name', 'Bar')->first()->id,
            'category_id' => DB::table('categories')->where('name', 'Soft Drink')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'Fanta',
            'slug' => 'Fanta',
            'unit_price' => 2,
            'sorting_nr' => 2,
            'destination_id' => DB::table('destinations')->where('name', 'Bar')->first()->id,
            'category_id' => DB::table('categories')->where('name', 'Soft Drink')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'Äppeljus',
            'slug' => 'Äppeljus',
            'unit_price' => 1.5,
            'sorting_nr' => 3,
            'destination_id' => DB::table('destinations')->where('name', 'Bar')->first()->id,
            'category_id' => DB::table('categories')->where('name', 'Soft Drink')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'Glas Wäisse Wäin',
            'slug' => 'W-Wäin Glas',
            'unit_price' => 3.5,
            'sorting_nr' => 3,
            'destination_id' => DB::table('destinations')->where('name', 'Bar')->first()->id,
            'category_id' => DB::table('categories')->where('name', 'Wäin')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        // Deserts
        DB::table('items')->insert([
            'name' => 'Schokelasmousse',
            'slug' => 'Schokomuss',
            'unit_price' => 4,
            'sorting_nr' => 1,
            'destination_id' => DB::table('destinations')->where('name', 'Bar')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        DB::table('items')->insert([
            'name' => 'Crème brûlée',
            'slug' => 'Kräm Brülé',
            'unit_price' => 7,
            'sorting_nr' => 2,
            'destination_id' => DB::table('destinations')->where('name', 'Bar')->first()->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        $waiters = ['Thierry', 'Fränz'];
        $comments = ['Eng hallef portioun', 'All Zoossen', '','','', 'Bolo mat Carbonara'];

        // insert random orders
        for ($i=0;$i<7;$i++)
        {
            $rnd_destination = DB::table('destinations')->inRandomOrder()->first()->id;
            $id = DB::table('orders')->insertGetId([
                'waiter' => $waiters[array_rand($waiters)],
                'table' => strtoupper(Str::random(1)).rand(1, 9),
                'comment' => $comments[array_rand($comments)],
                'number' => rand(1,10),
                'destination_id' => $rnd_destination,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);

            // insert 1 to 20 random items to orders
            for ($j=0;$j<rand(1,20);$j++)
            {
                DB::table('order_items')->insert([
                    'order_id' => $id,
                    'item_id' => DB::table('items')->where('destination_id', $rnd_destination)->inRandomOrder()->first()->id,
                    'quantity' => rand(1,5),
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ]);
            }

            // set random completion statuses for the just generated orders
            /*switch(rand(1,5))
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
                        'category_id' => DB::table('categories')->where('name', 'Bar')->first()->id,
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
                        'category_id' => DB::table('categories')->where('name', 'Bar')->first()->id,
                        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    ]);
                    break;
            }*/
        }
    }
}
