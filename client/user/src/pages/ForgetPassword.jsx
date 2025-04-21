import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  forgetPasswordOtp,
  updatePassword,
  verifyOtp,
} from "../utils/dataPoster";
import { useToast } from "../context/ToastContext";

function ForgotPassword() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { mutate: sendOtpMutate, isPending: sentOtpPending } = useMutation({
    mutationFn: forgetPasswordOtp,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        handleNext();
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const { mutate: submitOtpMutate, isPending: submitOtpPending } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        handleNext();
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        navigate("/login");
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const steps = ["Email", "OTP Verification", "New Password"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    sendOtpMutate(formData.email);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    submitOtpMutate({ email: formData.email, otp: formData.otp });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    mutate({ email: formData.email, password: formData.password });
  };
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" onSubmit={handleEmailSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              disabled={sentOtpPending}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={sentOtpPending}
              sx={{ mt: 3, mb: 2 }}
            >
              {sentOtpPending ? "Sending OTP..." : "Send OTP"}
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box component="form" onSubmit={handleVerifyOtp}>
            <TextField
              fullWidth
              label="Enter OTP"
              name="otp"
              value={formData.otp}
              disabled={submitOtpPending}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={submitOtpPending}
              sx={{ mt: 3, mb: 2 }}
            >
              {submitOtpPending ? "Verifying..." : "Verify OTP"}
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box component="form" onSubmit={handleUpdatePassword}>
            <TextField
              fullWidth
              label="New Password"
              name="password"
              type="password"
              disabled={isPending}
              value={formData.password}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              disabled={isPending}
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isPending}
              sx={{ mt: 3, mb: 2 }}
            >
              {isPending ? "Updating..." : "Update Password"}
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          {/* <Typography component="h1" variant="h5" align="center" gutterBottom>
            BUILDER&apos;S NEED
          </Typography> */}
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Forgot Password
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mt: 3, mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography color="primary">Back to Login</Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
