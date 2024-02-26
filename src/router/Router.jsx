import { createBrowserRouter } from "react-router-dom";
import SignIn from "../components/AuthComponets/SignIn";
import SignUp from "../components/AuthComponets/SignUp";
import Dashboard from "../layout/Dashboard/Dashboard";
import Home from "../layout/Home/Home";
import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute";

import AllNote from "../layout/Dashboard/Note/AllNote";
import AddTask from "../layout/Dashboard/Task/AddTask";
import AllTask from "../layout/Dashboard/Task/AllTask";
 
 
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
      // task releted 
      {
        path: "/Dashboard/task",
        element: <AllTask />,
      },
      {
        path: "/Dashboard/add-task",
        element: <AddTask />,
      }, 
      //note releted
      {
        path: "/Dashboard/note",
        element: <AllNote />,
      },     
    ],
  },
]);
export default router;
