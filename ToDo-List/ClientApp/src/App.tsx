import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "pages/Layout";
import { Home } from "pages/home/Home";
import { homeRoute, newListRoute, routes } from "routes";
import { NewList } from "pages/NewList";
import { ErrorPage } from "pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes[homeRoute],
        element: <Home />
      },
      {
        path: routes[newListRoute],
        element: <NewList />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
