<?php

namespace App\Models;

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'order',
    ];

    protected static function booted()
    {
        /* automatically add join_code before creating a group */
        static::creating(function ($task) {
            $order = Auth::user()->tasks()->count() + 1;
            $task->order = $order;
        });
    }

    protected function casts(): array
    {
        return  [
            'status'   => TaskStatus::class,
            'priority' => TaskPriority::class,
        ];
    }


    // Scope for filtering by status
    public function scopeStatus(Builder $query, TaskStatus| null $status): Builder
    {
        return $status ? $query->where('status', $status->value) : $query;
    }

    // Scope for filtering by priority
    public function scopePriority(Builder $query, TaskPriority | null $priority): Builder
    {
        return $priority ? $query->where('priority', $priority->value) : $query;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
