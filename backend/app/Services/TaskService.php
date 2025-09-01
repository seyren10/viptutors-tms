<?php

namespace App\Services;

use App\Models\Task;
use App\DTO\TaskCreateDTO;
use App\DTO\TaskUpdateDTO;
use App\Interfaces\TaskRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class TaskService
{
    public function __construct(
        protected TaskRepositoryInterface $repo
    ) {}

    public function list(User $user, array $filters = [])
    {
        if (empty($filters))
            return Cache::remember(
                "tasks_user_{$user->id}_all",
                60,
                fn() => $this->repo->allForUser($filters)
            );

        return $this->repo->allForUser($filters);
    }

    public function show(int $id): Task
    {
        return $this->repo->findForUser($id);
    }

    public function store(array $data): Task
    {
        $user = Auth::user();
        Cache::forget("tasks_user_{$user->id}_all");
        return $this->repo->create($data);
    }

    public function update(Task $task, array $data): Task
    {
        $user = Auth::user();
        Cache::forget("tasks_user_{$user->id}_all");
        return $this->repo->update($task, $data);
    }

    public function destroy(Task $task): bool
    {
        $user = Auth::user();
        Cache::forget("tasks_user_{$user->id}_all");
        return $this->repo->delete($task);
    }

    public function reorder(Task $task, int $newOrder): void
    {
        $user = Auth::user();
        Cache::forget("tasks_user_{$user->id}_all");
        $this->repo->reorder($task, $newOrder);
    }
}
