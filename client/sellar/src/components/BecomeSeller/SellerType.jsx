import { useState } from "react"; // Import React and useState
import { Box, Grid, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check mark icon
import BecomeSeller from "./BecomeSeller";

const SellerType = () => {
  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle option click
  const handleOptionClick = (option) => {
    setSelectedOption(option); // Set the selected option
  };

  // Handle Next button click
  const handleNext = () => {
    console.log("Next button clicked with option:", selectedOption);
    // Add your logic here for the next step
  };

  return (
    <BecomeSeller>
      <Typography
        variant="h4"
        gutterBottom
        className="text-red-800 text-center"
      >
        You are a?
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2, maxWidth: "80%", ml: 5 }}>
        {["Manufacturer", "Distributor"].map((option) => (
          <Grid item xs={12} key={option}>
            <Button
              variant={selectedOption === option ? "contained" : "outlined"}
              fullWidth
              size="large"
              onClick={() => handleOptionClick(option)} // Handle option click
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor:
                  selectedOption === option ? "green" : "transparent",
                color: selectedOption === option ? "white" : "inherit",
                "&:hover": {
                  backgroundColor:
                    selectedOption === option ? "green" : "inherit",
                },
              }}
            >
              {option}
              {selectedOption === option && (
                <CheckCircleIcon
                  sx={{ color: "white", fontSize: 28 }} // Display tick mark when selected
                />
              )}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Next Button */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "30%" }}
          disabled={!selectedOption} // Disable button if no option selected
          onClick={handleNext} // Handle next button click
        >
          Next
        </Button>
      </Box>
    </BecomeSeller>
  );
};

export default SellerType;
