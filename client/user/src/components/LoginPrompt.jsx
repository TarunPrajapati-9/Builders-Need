import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

function LoginPrompt() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AccountCircleIcon
            sx={{ fontSize: 80, color: "text.disabled", mb: 2 }}
          />
        </motion.div>

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Login Required!
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: 4, maxWidth: 400 }}
        >
          To view your profile, please login to your account.
        </Typography>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/login")}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Go to Login
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default LoginPrompt;
