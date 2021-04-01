<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodolistController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Lists Routes
Route::group([
    'prefix' => '/lists',
    'middleware' => ['auth']
], function (){
    Route::get('/', [TodolistController::class, 'getListsByUser']);
    Route::get('/{list_id}', [TodolistController::class, 'getListById']);
    Route::post('/', [TodolistController::class, 'createList'])
        ->middleware('checkListTitle');
    Route::put('/{list_id}', [TodolistController::class, 'updateList'])
        ->middleware('checkListTitle');
    Route::delete('/{list_id}', [TodolistController::class, 'delete']);
    Route::get('/predefined/{predefined}', [TodolistController::class, 'getPredefinedLists']);
});

//Tasks Routes
Route::group([
    'prefix' => '/tasks',
    'middleware' => ['auth']
], function (){
    Route::get('/list/{list_id}', [TaskController::class, 'getByListId']);
    Route::get('/{task_id}', [TaskController::class, 'getById']);
    Route::post('/', [TaskController::class, 'create'])
        ->middleware('checkTaskTitle');
    Route::put('/{task_id}', [TaskController::class, 'update'])
        ->middleware('checkTaskTitle');
    Route::delete('/{task_id}', [TaskController::class, 'delete']);
});


//Users Routes
Route::group([
    'prefix' => '/api/user',
//    'middleware' => ['auth']
], function (){
    Route::get('/all', [UserController::class, 'getAllUsers']);
    Route::get('/{user_id}', [UserController::class, 'getUserById']);
    Route::get('/', 'UserController@getCurrentUser');
});
