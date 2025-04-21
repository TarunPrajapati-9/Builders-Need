import { Box, CircularProgress } from "@mui/material";

const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent white
        zIndex: 1300, // above dialogs and content
      }}
    >
      <CircularProgress color="primary" size={60} />
    </Box>
  );
};

export default FullScreenLoader;
