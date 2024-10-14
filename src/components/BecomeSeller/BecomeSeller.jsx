import { useState } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import SellerType from "./SellerType";
import ProductSelection from "./ProductSelection";
import EmailInput from "./EmailInput";

function BecomeSeller() {
  const [selectedOption, setSelectedOption] = useState(""); // State to capture selected option
  const [step, setStep] = useState(1); // State to control the step
  const [selectedItems, setSelectedItems] = useState([]); // State to capture selected items
  const [email, setEmail] = useState(""); // State to capture email input

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update state when an option is clicked
  };

  const handleItemClick = (item) => {
    setSelectedItems(
      (prev) =>
        prev.includes(item)
          ? prev.filter((selected) => selected !== item) // Remove if already selected
          : [...prev, item] // Add to selected items
    );
  };
  console.log("Items " + selectedItems);

  const handleNext = () => {
    if (step === 1 && selectedOption) {
      setStep(2); // Go to the next step if an option is selected
    } else if (step === 2 && selectedItems.length > 0) {
      setStep(3); // Go to the email input step if items are selected
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1); // Go back to the first step
      setSelectedOption(""); // Reset selected option
    } else if (step === 3) {
      setStep(2); // Go back to the product selection step
      setSelectedItems([]); // Reset selected items
    }
  };

  const handleGetOtp = () => {
    alert(`OTP sent to: ${email}`); // Replace with your OTP logic
  };

  return (
    <Box
      sx={{
        p: 6,
        border: "2px solid rgba(0, 0, 0, 0.12)",
        borderRadius: 2,
        boxShadow: 2,
        margin: 4,
        userSelect: "none",
      }}
    >
      <Grid container spacing={4}>
        {/* Left Side: Steps */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
            Become a Seller on Builder&apos;s Need
          </Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Follow these steps:
          </Typography>

          {/* Step 1 */}
          <Paper sx={{ mt: 2, p: 2, boxShadow: 2 }}>
            <Typography variant="body1">
              1. Fill out the registration form.
            </Typography>
          </Paper>

          {/* Step 2 */}
          <Paper sx={{ mt: 2, p: 2, boxShadow: 2 }}>
            <Typography variant="body1">
              2. Our team will reach out to you within 2-3 business days.
            </Typography>
          </Paper>

          {/* Step 3 */}
          <Paper sx={{ mt: 2, p: 2, boxShadow: 2 }}>
            <Typography variant="body1">
              3. Builder&apos;s Need will onboard your products at
              pre-negotiated rates.
            </Typography>
          </Paper>
        </Grid>

        {/* Right Side: Dynamic Content */}
        <Grid item xs={12} md={6}>
          {/* Render different components based on step */}
          {step === 1 && (
            <SellerType
              selectedOption={selectedOption}
              handleOptionClick={handleOptionClick}
              handleNext={handleNext}
            />
          )}

          {step === 2 && (
            <ProductSelection
              selectedItems={selectedItems}
              handleItemClick={handleItemClick}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}

          {step === 3 && (
            <EmailInput
              email={email}
              setEmail={setEmail}
              handleGetOtp={handleGetOtp}
              handleBack={handleBack}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default BecomeSeller;
