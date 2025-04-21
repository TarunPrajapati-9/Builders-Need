import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Paper,
} from "@mui/material";
import { Order } from "../../types/order";

interface OrderSummaryCardProps {
  order: Order;
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ order }) => {
  // Calculate subtotal (without discounts)
  const subtotal = order.items.reduce((sum, item) => {
    return sum + item.itemId.price * item.quantity;
  }, 0);

  // Calculate total discount amount
  const totalDiscount = subtotal - order.totalAmount;

  return (
    <Card sx={{ boxShadow: 2, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Order Summary
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Subtotal (
              {order.items.reduce((acc, item) => acc + item.quantity, 0)} items)
            </Typography>
            <Typography variant="body2">₹{subtotal.toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Discount
            </Typography>
            <Typography variant="body2" color="error">
              -₹{totalDiscount.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Shipping
            </Typography>
            <Typography variant="body2">Free</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" fontWeight={600}>
              Total Amount
            </Typography>
            <Typography variant="body1" fontWeight={700} color="primary">
              ₹{order.totalAmount.toFixed(2)}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            fontWeight={700}
            color="red"
            sx={{ mt: 1, mx: 0.5 }}
          >
            Builder&apos;s Need Received 5% of the total amount.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{ mt: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
        >
          <Typography variant="body2" color="text.secondary">
            Order placed on:{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Order ID: {order._id}
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
