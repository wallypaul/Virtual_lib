<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Books;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BooksTest extends TestCase
{
    //TODO: Please uncomment the use RefreshDatabase after testing
    // use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function testGetBooksEndpoint()
    {

        // Act
        $response = $this->get('/api/books/');

        // Assert
        $response->assertStatus(200);
    }
    public function testPostBookEndpoint()
    {
         // Generate new data for creating the user
         $bookData = [
            'name' => 'John Doe',
            'ISBN' => '12-12-12-12',
            'author' => 'secret author',
        ];

        // Send a POST request to store the user
        $response = $this->post('/api/book', $bookData);

        // Assert that the request was successful (status code 201)
        $response->assertStatus(201);

    }
    public function testGetBookEndpoint()
    {

        // Act
        $response = $this->get('/api/book/1');

        // Assert
        $response->assertStatus(200);
    }

}
