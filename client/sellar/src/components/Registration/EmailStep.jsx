import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PropTypes from "prop-types";
import { useToast } from "../../context/ToastContext";
import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../../utils/Profile/dataPoster";
import Cookies from "js-cookie";

EmailStep.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default function EmailStep({ onNext }) {
  const [localEmail, setLocalEmail] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const { mutate: sendOtpMutate, isPending: sentOtpPending } = useMutation({
    mutationFn: sendOtp,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        Cookies.set("email", localEmail);
        onNext();
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localEmail.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(localEmail)) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    sendOtpMutate(localEmail);
  };

  return (
    <Card
      sx={{
        overflow: "visible",
        opacity: 0,
        transform: "translateY(20px)",
        animation: "fadeInUp 0.5s forwards",
        "@keyframes fadeInUp": {
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: 3,
          }}
        >
          Let&apos;s Get Started
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: "center" }}
        >
          Enter your email address to begin the seller registration process
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={localEmail}
            onChange={(e) => {
              setLocalEmail(e.target.value);
              if (error) setError(""); // Clear error live
            }}
            error={!!error}
            helperText={error}
            autoFocus
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={sentOtpPending}
            size="large"
            sx={{
              mt: 2,
              height: 56,
              fontSize: "1rem",
              position: "relative",
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                animation: sentOtpPending ? "shimmer 1.5s infinite" : "none",
              },
              "@keyframes shimmer": {
                "0%": {
                  transform: "translateX(-100%)",
                },
                "100%": {
                  transform: "translateX(100%)",
                },
              },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            {sentOtpPending ? "Sending..." : "Continue"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
