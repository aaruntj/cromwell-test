import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/Homepage/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const apiUrl = 'http://localhost:8080';

interface ApiUrlProps {
  apiUrl: string;
}

const App: React.FC = () => {

  const Layout: React.FC = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/home" />
    },
    {
      path: "/home",
      element: <HomePage />
    },
    {
      element: <Layout />,
      children: [
        {
          path: "/register",
          element: <RegistrationPage apiUrl={apiUrl} />
        },
        {
          path: "/login",
          element: <LoginPage apiUrl={apiUrl} />
        },
        {
          path: "/landing",
          element: <LandingPage apiUrl={apiUrl} />
        },
        {
          path: "*",
          element: <ErrorPage />
        }
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
