// EmailInput.js
import PropTypes from "prop-types"; // Import PropTypes
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email"; // Import email icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import back icon

const EmailInput = ({ email, setEmail, handleGetOtp, handleBack }) => {
  const [otp, setOtp] = useState(""); // State for storing OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP is sent

  const handleGetOtpClick = () => {
    handleGetOtp(); // Call the parent function to handle OTP logic
    setIsOtpSent(true); // Set state to indicate OTP is sent
  };

  const handleSubmitOtp = () => {
    // Implement OTP submission logic here
    alert(`Submitting OTP: ${otp}`);
    // Add logic for validation, etc.
  };

  return (
    <>
      <Typography variant="h4" gutterBottom className="text-center">
        Enter your Email for OTP
      </Typography>

      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
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
            onClick={handleGetOtpClick}
            sx={{ width: "30%" }}
          >
            Get OTP
          </Button>
        </Box>
      ) : (
        // Show OTP input after OTP is sent
        <>
          <TextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
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
              disabled={!otp} // Disable if OTP input is empty
            >
              Submit OTP
            </Button>
          </Box>
        </>
      )}

      {/* Back Button */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          ml: 4,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Box>
    </>
  );
};

// Define PropTypes for the component
EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  handleGetOtp: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};

export default EmailInput;
