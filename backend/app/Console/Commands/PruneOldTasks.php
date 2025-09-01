<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class PruneOldTasks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tasks:cleanup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete tasks older than 30 days and log the deletions';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $threshold = now()->subDays(30);
        $tasks = Task::where('created_at', '<', $threshold)->get();

        foreach ($tasks as $task) {

            Log::channel('task_deletions')->info("Deleting task", $task->toArray());
            $task->delete();
        }

        $this->info("Deleted {$tasks->count()} old tasks.");
        Log::channel('task_deletions')->info("Deleted {$tasks->count()} old tasks.");
        return Command::SUCCESS;
    }
}
