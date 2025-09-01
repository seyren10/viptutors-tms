<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskReorderRequest;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function __construct(
        protected TaskService $service
    ) {}

    public function index(TaskUpdateRequest $request)
    {
        $user = Auth::user();
        $tasks = $this->service->list($user, $request->validated() ?? []);
        return TaskResource::collection($tasks);
    }

    public function store(TaskStoreRequest $request)
    {
        $task = $this->service->store($request->validated());
        return new TaskResource($task);
    }

    public function show(Request $request, Task $task)
    {
        return new TaskResource($task);
    }

    public function update(TaskUpdateRequest $request, Task $task)
    {
        $task = $this->service->update($task, $request->validated());
        return new TaskResource($task);
    }

    public function destroy(Task $task): JsonResponse
    {
        $this->service->destroy($task);
        return response()->json(['message' => 'Task deleted']);
    }

    public function reorder(TaskReorderRequest $request, Task $task): JsonResponse
    {
        $validated = $request->validated();

        $this->service->reorder($task, $validated['order']);
        return response()->json(['message' => 'Tasks reordered']);
    }
}
