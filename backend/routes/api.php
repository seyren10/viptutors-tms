<?php

use App\Enums\TaskStatus;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\CheckAdmin;
use App\Http\Resources\UserResource;
use App\Services\AdminService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return new UserResource($request->user()->loadTaskStats());
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::patch('tasks/{task}/reorder', [TaskController::class, 'reorder']);
    Route::apiResource('tasks', TaskController::class);

    Route::middleware([CheckAdmin::class])
        ->controller(AdminController::class)
        ->prefix('users')
        ->group(function () {
            Route::get('', 'getUsers');
            Route::get('{user}', 'getUser');
            Route::get('{user}/tasks', 'getUserTasks');
        });
});
