<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BooksController;
use App\Http\Controllers\Api\AuthorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Books api end-point
Route::get('books', [BooksController::class, 'index']);
Route::post('book', [BooksController::class, 'store']);
Route::get('book/{id}', [BooksController::class, 'show']);
// Authors api end-point
Route::get('authors', [AuthorController::class, 'index']);
Route::post('author', [AuthorController::class, 'store']);
Route::get('author/{$id}', [AuthorController::class, 'show']);

