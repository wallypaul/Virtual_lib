import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthorsPage from './pages/AuthorsPage';
// import BooksPage from './pages/BooksPage';

const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
   
  },
]);

export default routers;