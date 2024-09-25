import { Outlet, Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

export const AuthPrivateRouter = () => {
  // const userdata = Cookies.get('userdata');
  const userdata = localStorage.getItem("userdata");
  return !userdata ? <Outlet /> : <Navigate to={"/dash"} />;
};

export const HomePrivateRouter = () => {
  // const userdata = Cookies.get('userdata');
  const userdata = localStorage.getItem("userdata");
  return userdata ? <Outlet /> : <Navigate to={"/login"} />;
};
