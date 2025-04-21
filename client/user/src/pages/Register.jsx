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
import { register, sendOtp, verifyOtp } from "../utils/dataPoster";
import Cookies from "js-cookie";
import { useToast } from "../context/ToastContext";

function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    name: "",
    phoneNumber: "",
    address: "",
    pincode: "",
    password: "",
    confirmPassword: "",
  });
  const { showToast } = useToast();

  const { mutate: sendOtpMutate, isPending: sentOtpPending } = useMutation({
    mutationFn: sendOtp,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        Cookies.set("email", res.email);
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
    mutationFn: register,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        Cookies.set("userToken", res.data.token);
        navigate("/");
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });
  const steps = ["Email", "OTP Verification", "Personal Details"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    sendOtpMutate(formData.email);
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    submitOtpMutate({
      email: formData.email,
      otp: formData.otp,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    mutate(formData);
  };
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" onSubmit={handleSubmitEmail} noValidate>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={sentOtpPending}
              required
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              disabled={sentOtpPending}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {sentOtpPending ? "Sending..." : "Send OTP"}
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box component="form" onSubmit={handleSubmitOtp}>
            <TextField
              fullWidth
              label="Enter OTP"
              name="otp"
              type="number"
              value={formData.otp}
              onChange={handleChange}
              required
              disabled={submitOtpPending}
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
          <Box component="form" onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              type="number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              type="number"
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
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
              sx={{ mt: 3, mb: 2 }}
              disabled={isPending}
            >
              {isPending ? "Registering..." : "Register"}
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
          mb: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          {/* <Typography component="h1" variant="h5" align="center" gutterBottom>
            BUILDER&apos;S NEED
          </Typography> */}
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Register
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
              <Typography color="primary">
                Already have an account? Login
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;
