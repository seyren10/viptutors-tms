<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Interfaces\TaskRepositoryInterface;
use App\Models\Task;
use App\DTO\TaskCreateDTO;
use App\DTO\TaskUpdateDTO;
use App\Enums\TaskStatus;
use App\Enums\TaskPriority;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TaskRepository implements TaskRepositoryInterface
{
    public function allForUser(array $filters = [])
    {
        /**
         * @var Task Task
         */
        $tasks = Auth::user()->tasks();

        return $tasks
            ->status(isset($filters['status']) ? TaskStatus::from($filters['status']) : null)
            ->priority(isset($filters['priority']) ? TaskPriority::from($filters['priority']) : null)
            ->orderBy('order')
            ->get();
    }

    public function findForUser(int $id): ?Task
    {
        return Auth::user()->tasks()->findOrFail($id);
    }

    public function create(array $data): Task
    {
        $user = Auth::user();

        return $user->tasks()->create(
            $data
        )->fresh();
    }

    public function update(Task $task, array $data): Task
    {
        $task->update($data);
        return $task;
    }

    public function delete(Task $task): bool
    {
        return !!$task->delete();
    }

    public function reorder(Task $task, int $newOrder): void
    {

        if ($task->order === $newOrder) return;

        $conflict = Auth::user()->tasks()->where('order', $newOrder)->first();
        if ($conflict !== null) {
            $conflict->update(['order' => $task->order]);
        }

        $task->order = $newOrder;
        $task->save();
    }
}
