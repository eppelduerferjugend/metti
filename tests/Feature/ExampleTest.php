<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $response = $this->get('/stats');

        $response->assertStatus(200)
            ->assertJson([
                'orders' => [
                    'placed' => [],
                    'queue' => [],
                    'completed' => [],
                ],
                'tables' => [],
            ]);

    }
}
