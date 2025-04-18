import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function ProtectedRoute({ children }) {
  const token = Cookies.get("sellerToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
