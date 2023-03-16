<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserContactForm extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'user_contact_forms';

    protected $fillable = [
        'first_name',
        'last_name',
        'full_name',
        'email',
        'contact_number',
        'status',
        'message',
    ];

    protected $dates = ['deleted_at'];
}
