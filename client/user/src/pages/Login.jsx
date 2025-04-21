import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login, sendOtp, verifyOtp } from "../utils/dataPoster";
import { useToast } from "../context/ToastContext";
import Cookies from "js-cookie";

function Login() {
  const [step, setStep] = useState(1);
  const [loginMethod, setLoginMethod] = useState(""); // 'password' or 'otp'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const { showToast } = useToast();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
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

  const { mutate: sendOtpMutate, isPending: sentOtpPending } = useMutation({
    mutationFn: sendOtp,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        Cookies.set("email", res.email);
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
        mutate({
          email,
          otp,
        });
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    mutate({
      email,
      password,
    });
    console.log("Login with password:", { email, password });
  };

  const handleOtpVerified = (e) => {
    e.preventDefault();
    submitOtpMutate({
      email,
      otp,
    });
    console.log("Verify OTP for:", { email, otp });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setLoginMethod("otp");
    if (!email) {
      showToast("Please enter your email first", "error");
      return;
    }
    sendOtpMutate(email);
    console.log("Sending OTP to:", email);
  };

  return (
    <Container maxWidth="sm">
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
            Login
          </Typography>

          {step === 1 && (
            <Box component="form" onSubmit={handleEmailSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Continue
              </Button>
            </Box>
          )}

          {step === 2 && !loginMethod && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body1" gutterBottom>
                Choose Login Method
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={sentOtpPending}
                sx={{ mt: 1 }}
                onClick={() => setLoginMethod("password")}
              >
                Login with Password
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSendOtp}
                disabled={sentOtpPending}
              >
                {sentOtpPending ? "Sending OTP..." : "Login with OTP"}
              </Button>

              <Button
                fullWidth
                variant="text"
                sx={{ mt: 3 }}
                onClick={() => {
                  setStep(1); // Back to email input
                }}
              >
                Back
              </Button>
            </Box>
          )}

          {loginMethod === "password" && (
            <Box component="form" onSubmit={handlePasswordLogin} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                disabled={isPending}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {isPending ? "Logging in..." : "Login"}
              </Button>
              <Button
                fullWidth
                variant="text"
                onClick={() => setLoginMethod("")}
              >
                Back
              </Button>
            </Box>
          )}

          {loginMethod === "otp" && (
            <Box component="form" onSubmit={handleOtpVerified} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
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
              <Button
                fullWidth
                variant="text"
                onClick={() => setLoginMethod("")}
              >
                Back
              </Button>
            </Box>
          )}

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography color="primary">
                Don&apos;t have an account? Register
              </Typography>
            </Link>
          </Box>
          <Box sx={{ mt: 1, textAlign: "center" }}>
            <Link to="/forgot-password" style={{ textDecoration: "none" }}>
              <Typography color="primary">Forgot Password?</Typography>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
