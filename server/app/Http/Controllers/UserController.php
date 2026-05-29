<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\UserRequest;
class UserController
{
    //
    public function index()
    {
        //
        $users = User::all();
        return UserResource::collection($users);
    }

    public function show(User $user)
    {
        //
        return new UserResource($user);
    }

    public function store(UserRequest $request)
    {
        //
        $user = User::create($request->validated());
        return new UserResource($user);
    }
    
}
