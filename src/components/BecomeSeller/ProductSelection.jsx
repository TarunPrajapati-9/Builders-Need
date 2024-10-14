// ProductSelection.js
import PropTypes from "prop-types"; // Import PropTypes
import { Box, Grid, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check mark icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import back icon

const ProductSelection = ({
  selectedItems,
  handleItemClick,
  handleNext,
  handleBack,
}) => {
  return (
    <>
      <Typography variant="h4" gutterBottom className="text-center">
        What do you want to sell on Builder&apos;s Need?
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2, ml: 1 }}>
        {["Steel", "Cement", "Sand", "Aggregate", "Bricks"].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Button
              variant={selectedItems.includes(item) ? "contained" : "outlined"}
              fullWidth
              size="large"
              onClick={() => handleItemClick(item)}
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
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "30%" }}
          disabled={selectedItems.length === 0}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

// Define PropTypes for the component
ProductSelection.propTypes = {
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleItemClick: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};

export default ProductSelection;
