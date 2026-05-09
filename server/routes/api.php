<?php

use App\Http\Controllers\API\v1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::apiResource('users', UserController::class);

// The routes now include:

// GET /api/users - index (list all users)
// POST /api/users - store (create user)
// GET /api/users/{id} - show (get single user)
// PUT /api/users/{id} - update (update user)
// DELETE /api/users/{id} - destroy (delete user)
