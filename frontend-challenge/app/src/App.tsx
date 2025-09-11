import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CourtsListPage from './pages/CourtsListPage';
import CourtDetailPage from './pages/CourtDetailPage';

const router = createBrowserRouter([
  { path: '/', element: <CourtsListPage /> },
  { path: '/court/:id', element: <CourtDetailPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}



