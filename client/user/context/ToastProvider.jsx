import { useState } from "react";
import PropTypes from "prop-types";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ToastContext from "./ToastContext";

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
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
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{
            backgroundColor:
              toast.severity === "success"
                ? "#d4edda" // light green background
                : toast.severity === "error"
                ? "#f8d7da" // light red background
                : undefined,
            color:
              toast.severity === "success"
                ? "#155724" // dark green text
                : toast.severity === "error"
                ? "#721c24" // dark red text
                : undefined,
            border:
              toast.severity === "success"
                ? "1px solid #c3e6cb"
                : toast.severity === "error"
                ? "1px solid #f5c6cb"
                : undefined,
          }}
        >
          {toast.message}
        </MuiAlert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToastProvider;
