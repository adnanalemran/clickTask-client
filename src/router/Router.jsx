import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../layout/Home/Home";
import Dashboard from "../layout/Dashboard/Dashboard";
import SignIn from "../components/AuthComponets/SignIn";
import SignUp from "../components/AuthComponets/SignUp";
import PrivateRoute from "./PrivateRoute";

import AllTask from "../layout/Dashboard/AllTask";
import AddTask from "../layout/Dashboard/AddTask/AddTask";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/Dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/Dashboard/task",
        element: <AllTask />,
      },
      {
        path: "/Dashboard/add-task",
        element: <AddTask />,
      },
    ],
  },
]);
export default router;
