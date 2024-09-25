import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./Components/Login/Login";
import ResetPassword from "./Components/Login/ResetPassword";
import Signup from "./Components/Login/Signup";
import Navpage from "./Components/Navpage/Navpage";
import Dashboard from "./Components/Dashboard/Dashboard";
import Employee from "./Components/User Management/Employee";
import Dealer from "./Components/User Management/Dealer";
import Admin from "./Components/User Management/Admin";
import Lead from "./Components/Lead/Lead";
import CategoryMaster from "./Components/Master/CatogoryMaster"; // Renaming the import
import EnquiryTypeMaster from "./Components/Master/EnquiryTypeMaster"; // Renaming the import
import RequirementsMaster from "./Components/Master/RequirementsMaster"; // Renaming the import
import {
  AuthPrivateRouter,
  HomePrivateRouter,
} from "./Components/Router/PrivateRouter";
import { useDispatch } from "react-redux";
import { handleLogin } from "./redux/reducers/AuthReducer";
import VerifyOtp from "./Components/Login/VerifyOtp";
import { Category } from "@mui/icons-material";
import Addlead from "./Components/Lead/Addlead";
import { useType } from "./Utility/hooks";
import Editlead from "./Components/Lead/Editlead";

function App() {
  const token = localStorage.getItem("userdata");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(handleLogin(JSON.parse(token)));
    }
  }, [token, dispatch]);

  const userRoutes = [
    {
      path: "employee",
      element: <Employee />,
    },
    {
      path: "lead",
      element: <Lead />,
    },
    {
      path: "Addlead",
      element: <Addlead />,
    },
    {
      path: "Editlead",
      element: <Editlead />,
    },
  ];
  const userType = useType();
  if (userType === "2" || userType === "1") {
    userRoutes.push(
      {
        path: "admin",
        element: <Admin />,
      },

      {
        path: "dealer",
        element: <Dealer />,
      },

      {
        path: "category",
        element: <CategoryMaster />, // Updated
      },
      {
        path: "requirements",
        element: <RequirementsMaster />, // Updated
      },
      {
        path: "enquiry",
        element: <EnquiryTypeMaster />, // Updated
      }
    );
  }

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
            ...userRoutes,
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
          element: <ResetPassword />,
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
