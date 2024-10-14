// SellerType.js
import PropTypes from "prop-types"; // Import PropTypes
import { Box, Grid, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check mark icon

const SellerType = ({ selectedOption, handleOptionClick, handleNext }) => {
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        className="text-red-800 text-center"
      >
        You are a?
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2, maxWidth: "80%", ml: 5 }}>
        {["Dealer", "Distributor", "Manufacturer"].map((option) => (
          <Grid item xs={12} key={option}>
            <Button
              variant={selectedOption === option ? "contained" : "outlined"}
              fullWidth
              size="large"
              onClick={() => handleOptionClick(option)}
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
          disabled={!selectedOption}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

// Define PropTypes for the component
SellerType.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default SellerType;
