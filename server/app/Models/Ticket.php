<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class Ticket extends Model
{
    //
    protected $fillable = [
        'id',
        'title',
        'description',
        'status',
        'priority',
        'assigned_user_id',
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }
}
