<?php

namespace App\Providers;

use App\Interfaces\TaskRepositoryInterface;
use App\Models\Task;
use App\Repositories\TaskRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(TaskRepositoryInterface::class, TaskRepository::class);

        Route::bind('task', function (string $taskId) {
            if (Auth::user()->is_admin) {
                return Task::findOrFail($taskId);
            }
            return Auth::user()->tasks()->findOrFail($taskId);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {}
}
