import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "pages/Layout";
import { Home } from "pages/home/Home";
import { homeRoute, listsRoute, newListRoute, routes, taskDetailRoute } from "routes";
import { NewList } from "pages/NewList";
import { ErrorPage } from "pages/ErrorPage";
import { TaskDetail } from "pages/TaskDetail";
import { Lists } from "pages/Lists";

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
      },
      {
        path: routes[listsRoute],
        element: <Lists />
      },
      {
        path: routes[taskDetailRoute],
        element: <TaskDetail />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
