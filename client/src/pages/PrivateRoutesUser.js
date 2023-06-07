// import necessary utility from rrd
import { Outlet, Navigate } from "react-router-dom";

// create component here
const PrivateRouteUser = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  // const isAdmin = localStorage.getItem("isAdmin");
  if (isAdmin) {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default PrivateRouteUser;

