<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthorTest extends TestCase
{
    public function testGetAuthorsEndpoint()
    {

        // Act
        $response = $this->get('/api/authors/');

        // Assert
        $response->assertStatus(200);
    }
    public function testPostAuthorEndpoint()
    {
         // Generate new data for creating the user
         $authorData = [
            'name' => 'John Doe',
            'gender' => 'female',
            'age' => '12',
            'country' => 'Ugandan',
            'genre_of_book' => 'sci-fi ',
        ];

        // Send a POST request to store the user
        $response = $this->post('/api/author', $authorData);

        // Assert that the request was successful (status code 201)
        $response->assertStatus(201);

    }
    public function testGetAuthorEndpoint()
    {

        // Act
        $response = $this->get('/api/author/1');

        // Assert
        $response->assertStatus(200);
    }
    
    
}
