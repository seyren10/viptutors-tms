<?php

namespace App\Http\Controllers;

use App\Enums\TaskStatus;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserTasksResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function getUsers(Request $request)
    {
        $users = User::withCount([
            'tasks',
            'tasks as completed_tasks_count' => function (Builder $query) {
                return $query->where('status', TaskStatus::COMPLETED);
            },
            'tasks as pending_tasks_count' => function (Builder $query) {
                return $query->where('status', TaskStatus::PENDING);
            }
        ])->simplePaginate(30);
        return UserResource::collection($users);
    }


    public function getUserTasks(Request $request, User $user)
    {
        return $user->tasks()->get();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
