import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Members from "./views/Members.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Contributions from "./views/Contributions.jsx";
import UserForm from "./views/UserForm.jsx";
import ContributionForm from "./views/ContributionForm.jsx";
import IndividualContributions from "./views/IndividualContributions.jsx";

const router = createBrowserRouter( [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/users" />
      },
      {
        path: '/users',
        element: <Members />
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/user-contributions/:id',
        element: <IndividualContributions key="userContributions" />
      },
      {
        path: '/contributions',
        element: <Contributions />
      },
      {
        path: '/contributions/new',
        element: <ContributionForm key="contributionCreate" />
      }
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
