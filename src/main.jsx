import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'

import './index.scss'
import App from './App.jsx'

import { Dashboard, Login, Object, Register } from './routes';

function requireAuth() {
  const token = localStorage.getItem('tokendgvSDfghsdghdrhgzdfrh');
  if (!token) {
    throw redirect('/login');
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
    loader: requireAuth,
  },
  {
    // path: "/object/:id",
    path: "/object/:slug",
    element: (
      <Object />
    ),
    loader: requireAuth,
  },
  {
    path: "/login",
    element: (
      <Login />
    ),
  },
  {
    path: "/register",
    element: (
      <Register />
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Dashboard />
    ),
    loader: requireAuth,
  },
]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)