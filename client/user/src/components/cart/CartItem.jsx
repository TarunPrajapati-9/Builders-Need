import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CartItem({ item, quantity, updateQuantity, removeItem, isPending }) {
  const productId = item.productId;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${productId}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card
        sx={{
          mb: 3,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
            transform: "translateY(-2px)",
          },
          cursor: "pointer",
        }}
        onClick={handleNavigate}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f9f9fb",
                p: 2,
              }}
            >
              <CardMedia
                component="img"
                image={item.productImage}
                alt={item.productName}
                sx={{
                  height: { xs: 120, sm: 150 },
                  objectFit: "contain",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, color: "#333" }}
                >
                  {item.productName}
                </Typography>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.productId);
                  }}
                  disabled={isPending}
                  sx={{
                    color: "error.light",
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "error.main",
                      bgcolor: "error.lighter",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Typography
                variant="body1"
                sx={{ color: "text.secondary", fontWeight: 500, mb: 2 }}
              >
                ₹{item.productPrice.toLocaleString()}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                  mt: { xs: 2, sm: 3 },
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    p: 0.5,
                  }}
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.productId, -1);
                    }}
                    disabled={quantity <= 1}
                    sx={{
                      color: "text.secondary",
                      bgcolor: "action.hover",
                      borderRadius: 1,
                      p: 0.5,
                      minWidth: 30,
                      height: 30,
                      mx: 0.5,
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    sx={{
                      fontWeight: 500,
                      mx: 1.5,
                      minWidth: 25,
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </Typography>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.productId, 1);
                    }}
                    sx={{
                      color: "text.secondary",
                      bgcolor: "action.hover",
                      borderRadius: 1,
                      p: 0.5,
                      minWidth: 30,
                      height: 30,
                      mx: 0.5,
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Typography sx={{ fontWeight: 600, color: "primary.dark" }}>
                  Total: ₹{(item.productPrice * quantity).toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </motion.div>
  );
}
CartItem.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productImage: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
};

export default CartItem;
