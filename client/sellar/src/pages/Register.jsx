import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import EmailStep from "../components/Registration/EmailStep";
import OtpStep from "../components/Registration/OtpStep";
import RegistrationStepper from "../components/Registration/RegistrationStepper";
import SellerDetailsStep from "../components/Registration/SellerDetailsStep";
import CompletionStep from "../components/Registration/CompletionStep";
import SellerRegistrationHeader from "../components/Registration/SellerRegistrationHeader";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("sellerToken");
    if (token) {
      navigate("/items");
    }
  }, [navigate]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Render the current step
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <EmailStep onNext={handleNext} />;
      case 1:
        return <OtpStep onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <SellerDetailsStep onNext={handleNext} />;
      case 3:
        return <CompletionStep />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: (theme) => theme.palette.background.default,
      }}
    >
      <SellerRegistrationHeader />
      <Container maxWidth="sm" sx={{ flex: 1, py: 4 }}>
        <RegistrationStepper activeStep={activeStep} />
        <Box
          sx={{
            mt: 4,
            mb: 8,
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          {renderStep()}
        </Box>
      </Container>
    </Box>
  );
}

export default Register;
