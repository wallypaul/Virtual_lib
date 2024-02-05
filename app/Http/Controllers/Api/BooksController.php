<?php

namespace App\Http\Controllers\Api;

use App\Models\Books;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BooksController extends Controller
{
    //
    public function index() {
        $books = Books::all();
        if ($books->count() > 0) {
            return response()->json([
                'status' => 202,
                'data' => $books
                ], 200);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => "No books found"
                ], 404);
        }
                
        }
}