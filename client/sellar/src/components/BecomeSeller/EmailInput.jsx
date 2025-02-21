import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email"; // Import email icon
import { sendOtp, verifyOtp } from "../../utils/seller/dataPoster";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Toast";
import BecomeSeller from "./BecomeSeller";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // State for storing OTP
  const navigate = useNavigate();
  const { showToast } = useToast(); // Get showToast function from context
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Mutation to send OTP
  const { mutate: sendOtpMutate, isPending: sentOtpPending } = useMutation({
    mutationFn: sendOtp,
    onSuccess: (res) => {
      if (res.success) {
        setIsOtpSent(true);
        showToast(res.message, "success");
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  // Mutation to verify OTP
  const { mutate: submitOtpMutate, isPending: submitOtpPending } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        navigate("/becomeSeller/sellerType");
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  // Function to send OTP
  const handleGetOtpClick = () => {
    sendOtpMutate(email);
  };

  // Function to submit OTP
  const handleSubmitOtp = () => {
    submitOtpMutate({
      email: email,
      otp: otp,
    });
  };

  return (
    <BecomeSeller>
      <Typography variant="h4" gutterBottom className="text-center">
        Enter your Email for OTP
      </Typography>

      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        disabled={sentOtpPending || isOtpSent}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mt: 2, ml: 4 }}
      />

      {/* Get OTP Button */}
      {!isOtpSent ? (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={sentOtpPending}
            onClick={handleGetOtpClick}
            sx={{ width: "30%" }}
          >
            {sentOtpPending ? <span>Loading...</span> : "Get OTP"}
          </Button>
        </Box>
      ) : (
        // Show OTP input after OTP is sent
        <>
          <TextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
            disabled={submitOtpPending}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mt: 2, ml: 4 }}
          />

          {/* Submit OTP Button */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitOtp}
              sx={{ width: "30%" }}
              disabled={!otp || submitOtpPending} // Disable if OTP input is empty
            >
              {submitOtpPending ? <span>Loading...</span> : "Submit OTP"}
            </Button>
          </Box>
        </>
      )}
    </BecomeSeller>
  );
};

export default EmailInput;
