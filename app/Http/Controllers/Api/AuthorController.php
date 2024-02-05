<?php

namespace App\Http\Controllers\Api;

use App\Models\Author;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
        //
        public function index() {
            $authors = Author::all();
            if ($authors->count() > 0) {
                return response()->json([
                    'status' => 202,
                    'data' => $authors
                    ], 200);
            }
            else {
                return response()->json([
                    'status' => 404,
                    'message' => "No author found"
                    ], 404);
            }
                    
            }
            public function show($id) {
                $authors = Author::find($id);
                
                if (!$authors) {
                    return response()->json([
                        'status' => 400,
                        'message' => "The book with the given id is not available."
                        ], 400);
                }
        
                return response()->json([
                    'status' => 200,
                    'data' => $authors
                    ], 200);
            }
            
            public function store(Request $request) {
                try {
                    $validator = Validator::make($request->all(), [
                        'name' => 'required|string',
                        'gender' => 'required|string',
                        'age' => 'required|string',
                        'country' => 'required|string',
                        'genre_of_book' => 'required|string'
                        
                    ]);
                    
                    if ($validator->fails()) {
                        return response()->json([
                            'status' => 400,
                            'errors' => $validator->errors()
                        ], 400);
                    }
                    
                    $author = Author::create([
                        'name' => $request->name,
                        'gender' => $request->gender,
                        'age' => $request->age,
                        'country'=> $request->country,
                        'genre_of_book'=> $request->genre_of_book,
                    ]);
                    if($author){
                        return response()->json([
                            'status'=>201,
                            'data'=>'Succefull added to database'
                        ],201);
    
                    }
                    else {
                        return response()->json([
                            'status'=>500,
                            'data'=>'Data entry was unsuccessful'
                        ],500);
    
                    }
                    
                    return response()->json([
                        'status' => 201,
                        'data' => $book,
                        'message' => 'Book created successfully.'
                    ], 201);
                }
                catch (Exception $e){
                    echo $e->getMessage();
                    return response()->json([
                        'status' => 500,
                        'message' => 'Internal server error. Please try again later.'
                    ], 500);
                }
            }
            
}
