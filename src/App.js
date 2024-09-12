import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./Components/Login/Login";
import ResetPassword from "./Components/Login/ResetPassword";
import Signup from  "./Components/Login/Signup";
import Navpage from "./Components/Navpage/Navpage";
import Dashboard from './Components/Dashboard/Dashboard';
import Employee from "./Components/User Management/Employee";
import Dealer from "./Components/User Management/Dealer";
import Admin from './Components/User Management/Admin';
import Lead from "./Components/Lead/Lead";
import { AuthPrivateRouter, HomePrivateRouter } from './Components/Router/PrivateRouter';
import { useDispatch } from 'react-redux';
import { handleLogin } from './redux/reducers/AuthReducer';
import VerifyOtp from './Components/Login/VerifyOtp';

function App() {
  const token = localStorage.getItem('userdata');
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(handleLogin(JSON.parse(token)));
    }
  }, [token, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePrivateRouter />,
      children: [
        {
          path: "/",
          element: <Navpage />, 
          children: [
            {
              path: "dash",
              element: <Dashboard />,
            },
            {
              path: "admin",
              element: <Admin />,
            },
            {
              path: "employee",
              element: <Employee />,
            },
            {
              path: "dealer",
              element: <Dealer />,
            },
            {
              path: "lead", 
              element: <Lead />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <AuthPrivateRouter />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
      
        {
          path: "signup",
          element: <Signup />,
        },
       
        {
          path: "verify-otp",
          element: <VerifyOtp />,
        },

        {
          path: "reset",
          element: <ResetPassword/>,
        },



      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
