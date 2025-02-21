import { Box, Grid, Typography, Paper } from "@mui/material";
import PropTypes from "prop-types";

function BecomeSeller({ children }) {
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
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}

BecomeSeller.propTypes = {
  children: PropTypes.node.isRequired, // Prop type validation for children
};

export default BecomeSeller;
