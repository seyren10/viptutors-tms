<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'is_admin'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_admin' => 'boolean',
            'password' => 'hashed',
        ];
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Scope to include task stats (total, completed, pending).
     */
    public function scopeWithTaskStats(Builder $query): Builder
    {
        return $query->withCount([
            'tasks',
            'tasks as completed_tasks_count' => function (Builder $q) {
                $q->where('status', TaskStatus::COMPLETED);
            },
            'tasks as pending_tasks_count' => function (Builder $q) {
                $q->where('status', TaskStatus::PENDING);
            },
        ]);
    }

    public function loadTaskStats(): static
    {
        return $this->loadCount([
            'tasks',
            'tasks as completed_tasks_count' => fn($q) => $q->where('status', TaskStatus::COMPLETED),
            'tasks as pending_tasks_count'   => fn($q) => $q->where('status', TaskStatus::PENDING),
        ]);
    }
}
