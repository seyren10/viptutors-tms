<?php

declare(strict_types=1);

namespace App\Interfaces;

use App\Models\Task;
use App\Models\User;

interface TaskRepositoryInterface
{
    public function allForUser(array $filters = []);
    public function findForUser(int $id): ?Task;
    public function create(array $data): Task;
    public function update(Task $task, array $data): Task;
    public function delete(Task $task): bool;
    public function reorder(Task $task, int $newOrder): void;
}
