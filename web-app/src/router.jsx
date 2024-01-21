import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Members from "./views/Members.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Contributions from "./views/Contributions.jsx";

const router = createBrowserRouter( [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/members" />
      },
      {
        path: '/members',
        element: <Members />
      },
      {
        path: '/contributions',
        element: <Contributions />
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },

    ]
  },

    {
      path:'*',
      element: <NotFound />
    }

    ])

export default router;
