import { Link, useParams } from "react-router-dom";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

// Sample sellers data based on steel sizes with IDs
const sampleSellersData = {
  "8mm": [
    { id: 1, name: "Steel Supplier A", location: "City A", pricePerKg: "500" },
    { id: 2, name: "Steel Supplier B", location: "City B", pricePerKg: "480" },
  ],
  "10mm": [
    { id: 3, name: "Steel Supplier C", location: "City C", pricePerKg: "450" },
    { id: 4, name: "Steel Supplier D", location: "City D", pricePerKg: "470" },
  ],
  "12mm": [
    { id: 5, name: "Steel Supplier E", location: "City E", pricePerKg: "460" },
  ],
  "16mm": [],
  "20mm": [
    { id: 6, name: "Steel Supplier F", location: "City F", pricePerKg: "490" },
  ],
  "25mm": [
    { id: 7, name: "Steel Supplier G", location: "City G", pricePerKg: "520" },
    { id: 8, name: "Steel Supplier H", location: "City H", pricePerKg: "510" },
  ],
  "32mm": [
    { id: 9, name: "Steel Supplier I", location: "City I", pricePerKg: "530" },
  ],
};

function SteelSellers() {
  const { size } = useParams(); // Capture the 'size' from the URL (e.g., '8mm', '10mm')

  // Get sellers for the given size from the sample data
  const sellers = sampleSellersData[size] || [];

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ marginBottom: 2 }}
      >
        Sellers for {size} Steel
      </Typography>
      <Grid container spacing={2}>
        {sellers.length > 0 ? (
          sellers.map((seller) => (
            <Grid item xs={12} sm={6} md={4} key={seller.id}>
              <Link
                to={`/products/steel/sellers/${size}/buy/${seller.id}`} // Dynamic URL based on size and seller ID
                style={{ textDecoration: "none", color: "inherit" }} // Remove link styling
              >
                <Card
                  sx={{
                    minWidth: 275,
                    boxShadow: 2,
                    ":hover": { boxShadow: 3, backgroundColor: "#f5f5f5" },
                    cursor: "pointer",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {seller.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Location: {seller.location}
                    </Typography>
                    <Typography variant="body2">
                      Price per kg: <strong>₹{seller.pricePerKg}</strong>
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center" color="text.secondary">
            No sellers available for {size} steel.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default SteelSellers;
