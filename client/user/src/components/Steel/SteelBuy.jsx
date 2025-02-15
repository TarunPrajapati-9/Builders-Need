import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

// Sample sellers data based on steel sizes (assuming we have the same data here)
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
  "20mm": [
    { id: 6, name: "Steel Supplier F", location: "City F", pricePerKg: "490" },
  ],
};

function SteelBuy() {
  const { size, id } = useParams(); // Get the 'size' and 'id' from URL params

  // Find the seller based on the size and id
  const seller = sampleSellersData[size]?.find(
    (seller) => seller.id === parseInt(id)
  );

  const [quantity, setQuantity] = useState(1); // State to track the quantity
  const pricePerKg = seller ? parseFloat(seller.pricePerKg) : 0; // Seller's price per kg

  // Calculate total price
  const totalPrice = quantity * pricePerKg;

  // Handle increasing and decreasing quantity
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!seller) {
    return <Typography variant="h6">Seller not found</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Buy {size} Steel from {seller.name}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {seller.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Location: {seller.location}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Price per kg: ₹{pricePerKg}
              </Typography>

              {/* Quantity Selector */}
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Typography variant="h6" sx={{ mx: 2 }}>
                  {quantity} kg
                </Typography>
                <Button variant="outlined" onClick={handleIncrease}>
                  +
                </Button>
              </Box>

              {/* Total Price */}
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Total Price: ₹{totalPrice.toFixed(2)}
              </Typography>

              {/* Add to Cart Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 3 }}
                onClick={() =>
                  alert(`Added ${quantity} kg of ${size} steel to cart!`)
                }
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SteelBuy;
