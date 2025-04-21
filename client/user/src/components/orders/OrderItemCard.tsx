import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { OrderItem } from "../../types/order";

interface OrderItemCardProps {
  item: OrderItem;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ item }) => {
  const { itemId, quantity } = item;
  const effectivePrice = itemId.price * (1 - itemId.discount / 100);
  const totalPrice = effectivePrice * quantity;

  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        overflow: "hidden",
        boxShadow: 1,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: 80, sm: 100, md: 120 },
          height: { xs: 80, sm: 100, md: 120 },
          objectFit: "cover",
        }}
        image={itemId.imageUrl}
        alt={itemId.name}
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto", p: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={9}>
              <Typography component="div" variant="h6" fontWeight={600}>
                {itemId.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {itemId.category}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Quantity: {quantity}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              sx={{ textAlign: { xs: "left", sm: "right" } }}
            >
              <Box>
                {itemId.discount > 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ₹{itemId.price.toFixed(2)}
                  </Typography>
                )}
                <Typography variant="body1" color="primary" fontWeight={600}>
                  ₹{effectivePrice.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ my: 1, display: { xs: "block", sm: "none" } }} />
              <Typography variant="body1" fontWeight={700} sx={{ mt: 1 }}>
                ₹{totalPrice.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
};

export default OrderItemCard;
