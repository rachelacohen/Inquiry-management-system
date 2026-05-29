<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;

Route::apiResource('tickets', TicketController::class);
Route::apiResource('users', UserController::class);
Route::put('tickets/{ticket}/update-status', [TicketController::class, 'updateStatus']);
Route::put('tickets/{ticket}/update-assigned-user', [TicketController::class, 'updateAssignedUser']);

