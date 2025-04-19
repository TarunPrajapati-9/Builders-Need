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
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../context/ToastContext";
import {
  forgetPasswordOtp,
  updatePassword,
  verifyOtp,
} from "../utils/Profile/dataPoster";
import { useNavigate } from "react-router-dom";

const STEPS = {
  EMAIL: "email",
  OTP: "otp",
  NEW_PASSWORD: "new_password",
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.EMAIL);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  const { mutate: sendOtpMutate, isPending: sentOtpPending } = useMutation({
    mutationFn: forgetPasswordOtp,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        setStep(STEPS.OTP);
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
        setStep(STEPS.NEW_PASSWORD);
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const { mutate: updatePwd, isPending: updatePwdPending } = useMutation({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    sendOtpMutate(formData.email);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (formData.otp.length !== 6) {
      newErrors.otp = "Please enter a valid 6-digit OTP";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    submitOtpMutate({ email: formData.email, otp: formData.otp });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updatePwd({
      email: formData.email,
      password: formData.password,
    });
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
              error={!!errors.email}
              helperText={errors.email}
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
              disabled={sentOtpPending}
              sx={{ mt: 3, height: 48 }}
            >
              {sentOtpPending ? "Sending OTP..." : "Send OTP"}
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
              error={!!errors.otp}
              helperText={errors.otp}
              inputProps={{ maxLength: 6 }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={submitOtpPending}
              sx={{ mt: 3, height: 48 }}
            >
              {submitOtpPending ? "Verifying OTP..." : "Verify OTP"}
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
              error={!!errors.password}
              helperText={errors.password}
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
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
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
              disabled={updatePwdPending}
              sx={{ mt: 3, height: 48 }}
            >
              {updatePwdPending ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        );
      default:
        return null;
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
          {renderStep()}
        </CardContent>
      </Card>
    </Box>
  );
}
