// ToastContext.js
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' or 'error'
  });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000} // Close after 3 seconds
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert onClose={handleCloseToast} severity={toast.severity}>
          {toast.message}
        </MuiAlert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired, // Prop type validation for children
};

export default ToastProvider;
