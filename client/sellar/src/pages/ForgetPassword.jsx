import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const STEPS = {
  EMAIL: "email",
  OTP: "otp",
  NEW_PASSWORD: "new_password",
};

export default function ForgotPassword() {
  const [step, setStep] = useState(STEPS.EMAIL);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  };

  const renderStep = () => {
    switch (step) {
      case STEPS.EMAIL:
        return (
          <form onSubmit={handleSubmitEmail}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
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
              type="submit"
              sx={{ mt: 3, height: 48 }}
            >
              Send OTP
            </Button>
          </form>
        );

      case STEPS.OTP:
        return (
          <form onSubmit={handleVerifyOTP}>
            <TextField
              fullWidth
              label="Enter 6-digit OTP"
              name="otp"
              margin="normal"
              value={formData.otp}
              onChange={handleChange}
              inputProps={{ maxLength: 6 }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 3, height: 48 }}
            >
              Verify OTP
            </Button>
          </form>
        );

      case STEPS.NEW_PASSWORD:
        return (
          <form onSubmit={handleResetPassword}>
            <TextField
              fullWidth
              label="New Password"
              name="password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 3, height: 48 }}
            >
              Reset Password
            </Button>
          </form>
        );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            textAlign="center"
            fontWeight="bold"
          >
            Reset Password
          </Typography>

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mt: 1, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}

          {renderStep()}
        </CardContent>
      </Card>
    </Box>
  );
}
