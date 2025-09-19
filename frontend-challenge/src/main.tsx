import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import CourtsList from "./pages/CourtsList";
import CourtDetail from "./pages/CourtDetail";

const router = createBrowserRouter([
  { path: '/', element: <CourtsList /> },
  { path: '/court/:id', element: <CourtDetail /> },
  { path: '*', element: <div className="container-default py-6">Not Found</div> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </React.StrictMode>
)
