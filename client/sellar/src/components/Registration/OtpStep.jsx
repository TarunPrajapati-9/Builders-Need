import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp, sendOtp } from "../../utils/dataPoster";
import PropTypes from "prop-types";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

OtpStep.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default function OtpStep({ onNext, onBack }) {
  const [localOtp, setLocalOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { mutate: submitOtpMutate, isPending: submitOtpPending } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        onNext();
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const { mutate: sendOtpMutate } = useMutation({
    mutationFn: sendOtp,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const email = Cookies.get("email");
  if (!email) {
    navigate("/");
  }
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Start countdown for OTP resend
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...localOtp];
    newOtp[index] = value;

    setLocalOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace - focus previous input
    if (e.key === "Backspace" && !localOtp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResend = () => {
    // Reset OTP fields
    setLocalOtp(["", "", "", "", "", ""]);
    setError("");
    setResendDisabled(true);
    setCountdown(60);

    // Focus first input
    inputRefs[0].current.focus();
    sendOtpMutate(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpString = localOtp.join("");

    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setError("");
    const formData = {
      email: email,
      otp: otpString,
    };
    submitOtpMutate(formData);
  };

  // Paste OTP from clipboard
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");

    const newOtp = [...localOtp];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });

    setLocalOtp(newOtp);

    // Focus last filled input or the next empty one
    const lastIndex = Math.min(digits.length, 5);
    inputRefs[lastIndex].current.focus();
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
          Verify Your Email
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 1, textAlign: "center" }}
        >
          We&apos;ve sent a verification code to
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          {email}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={2} justifyContent="center">
              {localOtp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={inputRefs[index]}
                  variant="outlined"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      fontSize: "1.5rem",
                      padding: "12px",
                      textAlign: "center",
                      width: "45px",
                      height: "45px",
                    },
                  }}
                  autoFocus={index === 0}
                  error={!!error}
                />
              ))}
            </Stack>

            {error && (
              <Typography
                color="error"
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: "center",
                  mt: 1,
                }}
              >
                {error}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Button
              variant="text"
              color="primary"
              disabled={resendDisabled}
              onClick={handleResend}
              startIcon={<RestartAltIcon />}
            >
              {resendDisabled ? `Resend otp in ${countdown}s` : "Resend otp"}
            </Button>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={onBack}
              startIcon={<ArrowBackIcon />}
              sx={{ flex: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={submitOtpPending || localOtp.join("").length !== 6}
              endIcon={<ArrowForwardIcon />}
              sx={{
                flex: 2,
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
                  animation: submitOtpPending
                    ? "shimmer 1.5s infinite"
                    : "none",
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
            >
              {submitOtpPending ? "Verifying..." : "Verify & Continue"}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
