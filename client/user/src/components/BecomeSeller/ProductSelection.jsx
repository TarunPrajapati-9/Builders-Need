import { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check mark icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import back icon
import BecomeSeller from "./BecomeSeller";

const ProductSelection = () => {
  // State to manage selected items
  const [selectedItems, setSelectedItems] = useState([]);

  // Handle item selection
  const handleItemClick = (item) => {
    // Toggle item selection
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((i) => i !== item) // Remove if already selected
          : [...prevSelected, item] // Add if not selected
    );
  };

  // Handle Back button click
  const handleBack = () => {
    console.log("Back button clicked");
    // Add your logic here to navigate back or perform another action
  };

  // Handle Next button click
  const handleNext = () => {
    console.log("Next button clicked", selectedItems);
    // Add your logic here to go to the next step or process selected items
  };

  return (
    <BecomeSeller>
      <Typography variant="h4" gutterBottom className="text-center">
        What do you want to sell on Builder&apos;s Need?
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2, ml: 1 }}>
        {/* List of product categories */}
        {["Steel", "Cement", "Sand", "Aggregate", "Bricks"].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Button
              variant={selectedItems.includes(item) ? "contained" : "outlined"}
              fullWidth
              size="large"
              onClick={() => handleItemClick(item)} // Handle item click
              sx={{
                backgroundColor: selectedItems.includes(item)
                  ? "green"
                  : "transparent",
                color: selectedItems.includes(item) ? "white" : "inherit",
                "&:hover": {
                  backgroundColor: selectedItems.includes(item)
                    ? "green"
                    : "inherit",
                },
              }}
            >
              {item}
              {selectedItems.includes(item) && (
                <CheckCircleIcon
                  sx={{ color: "white", fontSize: 28 }} // Display tick mark when selected
                />
              )}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Back and Next Button */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          ml: 4,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack} // Handle back click
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "30%" }}
          disabled={selectedItems.length === 0} // Disable if no item selected
          onClick={handleNext} // Handle next click
        >
          Next
        </Button>
      </Box>
    </BecomeSeller>
  );
};

export default ProductSelection;
