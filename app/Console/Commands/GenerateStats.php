<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\StatisticsController;

class GenerateStats extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'metti:stats';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    protected $stats;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(StatisticsController $stats)
    {
        parent::__construct();

        $this->stats = $stats;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->stats->pushToInflux();
    }
}
