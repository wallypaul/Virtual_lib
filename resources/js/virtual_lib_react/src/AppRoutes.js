import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthorsPage from './pages/AuthorsPage';
// import BooksPage from './pages/BooksPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    loader: rootLoader,
   
  },
]);

const AppRoutes = () => {
  return (
    router
  );
};

export default AppRoutes;