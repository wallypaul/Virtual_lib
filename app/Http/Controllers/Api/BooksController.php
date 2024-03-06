<?php

namespace App\Http\Controllers\Api;

use App\Models\Books;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BooksController extends Controller
{
    //
    public function index() {

        $books = Books::where('status', 1)->get();
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
        public function show($id) {
            $book = Books::find($id)->where('status', 1);
            
            if (!$book) {
                return response()->json([
                    'status' => 400,
                    'message' => "The book with the given id is not available."
                    ], 400);
            }
    
            return response()->json([
                'status' => 200,
                'data' => $book
                ], 200);
        }
        
        public function store(Request $request) {
            try {
                $validator = Validator::make($request->all(), [
                    'name' => 'required|string',
                    'ISBN' => 'required|string',
                    'author' => 'required|string',
                    
                ]);
                
                if ($validator->fails()) {
                    return response()->json([
                        'status' => 400,
                        'errors' => $validator->errors()
                    ], 400);
                }
                
                $books = Books::create([
                    'name' => $request->name,
                    'ISBN' => $request->ISBN,
                    'author'=> $request->author
                ]);
                if($books){
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
        //add the code to update the status in the books table to 0
        public function destroy($id) {
            $book = Books::find($id);
        
            if (!$book) {
                return response()->json([
                    'status' => 404,
                    'message' => "The book with the given id is not available."
                ], 404);
            }
        
            $book->status = 0;
            $book->save();
        
            return response()->json([
                'status' => 200,
                'message' => 'Book status deleted successfully.'
            ], 200);
        }
    }         