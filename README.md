
# Project Name
Virtual lib
## Introduction
A virtual library showcasing boobks and it's authors

## Requirements

- PHP >= 7.3
- Composer
- Laravel >= 8.0
- Xampp

## Installation

Clone the repository:

```bash
git clone https://github.com/wallypaul/Virtual_lib.git

## Go to the project directory:

cd Virtual_lib

## Install dependencies:
```bash
composer install

## Copy the example env file and make the required configuration changes in the .env file:

```bash
cp .env.example .env

## Run the database migrations (Set the database connection in .env before migrating):

```bash
php artisan migrate

## Usage

Start the local development server:
```bash
php artisan serve

You can now access the server at http://localhost:8000

## Running Tests

To run the tests, run:
```bash
php artisan test