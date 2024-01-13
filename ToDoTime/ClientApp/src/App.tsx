import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "pages/Layout";
import { Home } from "pages/home/Home";
import {
  homeRoute,
  listsRoute,
  newListRoute,
  routes,
  taskDetailRoute,
  tasksListDetailsRoute
} from "routes";
import { NewList } from "pages/newList/NewList";
import { ErrorPage } from "pages/ErrorPage";
import { TaskDetail } from "pages/TaskDetail";
import { Lists } from "pages/Lists";
import { TasksListDetails } from "pages/tasksListDetails/TasksListDetails";
import { tasksListDetailsLoader } from "routesLoader/tasksListDetailsLoader";
import { QueryClient, QueryClientProvider } from "react-query";

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
      },
      {
        path: routes[tasksListDetailsRoute],
        element: <TasksListDetails />,
        loader: tasksListDetailsLoader
      }
    ]
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
