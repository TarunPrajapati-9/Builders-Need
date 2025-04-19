import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  Divider,
  Grid,
  Fade,
  ButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import PropTypes from "prop-types";
import { Share } from "@mui/icons-material";

const ProductDetail = ({ product, open, onClose }) => {
  const [cartQuantity, setCartQuantity] = useState(1);

  if (!product) return null;
  const {
    _id,
    name,
    description,
    category,
    sellerId,
    imageUrl,
    price,
    quantity,
    discount,
    ratings,
    status,
    createdAt,
    updatedAt,
  } = product;
  console.log(_id, sellerId, createdAt, updatedAt, status);
  const discountedPrice = discount ? price * (1 - discount / 100) : price;
  const total = ratings.reduce((sum, value) => sum + value, 0); // Adds all ratings
  const rating = ratings.length > 0 ? total / ratings.length : 0; // Calculates average
  const inStock = quantity > 0;

  const handleAddToCart = () => {
    onClose();
  };

  const increaseQuantity = () => {
    setCartQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (cartQuantity > 1) {
      setCartQuantity((prev) => prev - 1);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div">
          Product Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={imageUrl}
              alt={name}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                mb: 2,
                objectFit: "cover",
              }}
            />
            <IconButton
              aria-label="share"
              sx={{
                position: "absolute",
                top: 80,
                right: 16,
                color: (theme) => theme.palette.grey[500],
              }}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
            >
              <Share />
            </IconButton>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="div" gutterBottom>
              {name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({rating})
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
              {discount > 0 ? (
                <>
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{ mr: 2, fontWeight: 600 }}
                  >
                    ${discountedPrice.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ${price.toFixed(2)}
                  </Typography>
                  <Chip
                    label={`${discount}% OFF`}
                    color="error"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </>
              ) : (
                <Typography
                  variant="h4"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                >
                  ${price.toFixed(2)}
                </Typography>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <Chip
                label={category}
                size="small"
                color="secondary"
                sx={{ mr: 1 }}
              />
              {inStock ? (
                <Chip
                  label="In Stock"
                  size="small"
                  color="success"
                  sx={{ mr: 1 }}
                />
              ) : (
                <Chip
                  label="Out of Stock"
                  size="small"
                  color="default"
                  sx={{ mr: 1 }}
                />
              )}
              {/* {freeShipping && (
                <Chip label="Free Shipping" size="small" color="success" />
              )} */}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" paragraph>
              {description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Quantity:
              </Typography>
              <ButtonGroup size="small" aria-label="quantity buttons">
                <Button onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <RemoveIcon />
                </Button>
                <Button disabled sx={{ px: 2 }}>
                  {quantity}
                </Button>
                <Button onClick={increaseQuantity}>
                  <AddIcon />
                </Button>
              </ButtonGroup>
            </Box>

            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCartIcon />}
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    sellerId: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number,
    discount: PropTypes.number,
    ratings: PropTypes.arrayOf(PropTypes.number),
    status: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ProductDetail;
