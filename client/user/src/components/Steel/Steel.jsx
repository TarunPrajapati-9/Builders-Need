import { Box, Grid, Typography, Card, CardContent, Fade } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// List of steel sizes
const steelSizes = [8, 10, 12, 16, 20, 25, 32];

const Steel = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* Heading for the component */}
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ marginBottom: 4 }}
      >
        Available Steel Sizes (mm)
      </Typography>

      {/* Grid layout for steel sizes */}
      <Grid container spacing={2}>
        {steelSizes.map((size, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {/* Wrap the Card with Link and pass the size dynamically */}
            <Fade in timeout={1000 + index * 200}>
              <div>
                {" "}
                {/* Add a div to act as a wrapper for Fade */}
                <Link
                  to={`/products/steel/sellers/${size}mm`} // Dynamic URL based on size
                  style={{ textDecoration: "none", color: "inherit" }} // Remove link styling
                >
                  <Card
                    variant="outlined"
                    sx={{
                      border: 1,
                      borderRadius: 2,
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 3, // Slight elevation on hover
                        backgroundColor: "#f5f5f5", // Light gray background on hover
                      },
                      cursor: "pointer",
                    }}
                  >
                    <CardContent>
                      {/* Typography for displaying the steel size */}
                      <Typography variant="h6" align="center">
                        {size} mm
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Steel;
