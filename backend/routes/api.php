<?php

use App\Http\Controllers\TaskController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return new UserResource($request->user());
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::patch('tasks/{task}/reorder', [TaskController::class, 'reorder']);
    Route::apiResource('tasks', TaskController::class);
});
