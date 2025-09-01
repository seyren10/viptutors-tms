<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => Str::convertCase($this->name, MB_CASE_TITLE),
            'email' => $this->email,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'isAdmin' => $this->when($request->user()->is_admin, $this->is_admin),
            'tasksStats' => $this->when($request->user()->is_admin, [
                'total'     => $this->tasks_count,
                'completed' => $this->completed_tasks_count,
                'pending'   => $this->pending_tasks_count,
            ])
        ];
    }
}
