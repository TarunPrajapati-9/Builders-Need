import { Box, CircularProgress } from "@mui/material";

function LoadingComponent() {
  return (
    <Box
      sx={{
        position: "fixed", // Fixes the position to the viewport
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)", // Apply blur effect to the background
        zIndex: 9999, // Ensure it appears above other components
      }}
    >
      {/* Circular Progress Spinner */}
      <CircularProgress size={60} thickness={5} color="primary" />
    </Box>
  );
}

export default LoadingComponent;
