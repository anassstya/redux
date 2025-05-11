import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import MainPage from './MainPage/MainPage.jsx';
import Counter from "./Counter/Counter.js";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: 'counter',
        element: <Counter />,
    },
]);

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);