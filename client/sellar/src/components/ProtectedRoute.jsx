import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
const ProtectedRoute = () => {
  const isAuthenticated = Cookies.get("sellerToken"); // or your auth logic

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
