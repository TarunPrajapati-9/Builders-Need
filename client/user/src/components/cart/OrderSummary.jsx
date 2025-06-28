import { Paper, Typography, Box, Button, Divider } from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

function OrderSummary({
  subtotal,
  deliveryFee,
  total,
  onCheckout,
  disabled = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          width: { xs: "100%", md: 320 },
          position: "sticky",
          top: 24,
          alignSelf: "flex-start",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Order Summary
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            color: "text.secondary",
          }}
        >
          <Typography>Subtotal</Typography>
          <Typography>₹{subtotal.toLocaleString()}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            color: "text.secondary",
          }}
        >
          <Typography>Delivery</Typography>
          <Typography>₹{deliveryFee.toLocaleString()}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6" color="primary.main">
            ₹{total.toLocaleString()}
          </Typography>
        </Box>

        <motion.div
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={onCheckout}
            disabled={disabled}
            sx={{
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: disabled ? "none" : "0 4px 12px rgba(0,0,0,0.15)",
              "&:hover": {
                boxShadow: disabled ? "none" : "0 6px 16px rgba(0,0,0,0.2)",
              },
              borderRadius: 2,
              opacity: disabled ? 0.6 : 1,
            }}
          >
            {disabled ? "Check Stock Availability" : "Proceed to Checkout"}
          </Button>
        </motion.div>
      </Paper>
    </motion.div>
  );
}

OrderSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  deliveryFee: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onCheckout: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default OrderSummary;
