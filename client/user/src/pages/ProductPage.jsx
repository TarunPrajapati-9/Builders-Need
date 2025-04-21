import {
  Box,
  Typography,
  IconButton,
  Chip,
  Rating,
  Divider,
  Grid,
  Button,
  Alert,
  ButtonGroup,
  Container,
} from "@mui/material";
import { Share } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../utils/dataGetter";
import FullScreenLoader from "../components/FullScreenLoader";

const ProductPage = () => {
  const [cartQuantity, setCartQuantity] = useState(1);
  const { productId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
  });

  const product = data?.data;

  const discountedPrice = product?.discount
    ? product?.price * (1 - product?.discount / 100)
    : product?.price;

  const total = product?.ratings.reduce((sum, value) => sum + value, 0);
  const rating =
    product?.ratings.length > 0 ? total / product?.ratings.length : 0;

  const inStock = product?.quantity > 0;

  const handleAddToCart = () => {
    alert("Product added to cart!");
  };

  const increaseQuantity = () => {
    setCartQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (cartQuantity > 1) {
      setCartQuantity((prev) => prev - 1);
    }
  };

  // Loader — Centered
  if (isLoading) {
    return <FullScreenLoader />;
  }

  // Error — Centered
  if (!data?.success || !data?.data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Alert severity="error">
          {data?.message || "Something went wrong!"}
        </Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} sx={{ position: "relative" }}>
          <Box
            component="img"
            src={product?.imageUrl}
            alt={product?.name}
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
              top: 20,
              right: 20,
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
          <Typography variant="h4" component="div" gutterBottom>
            {product?.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating value={rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({rating.toFixed(1)})
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
            {product?.discount > 0 ? (
              <>
                <Typography
                  variant="h4"
                  color="primary"
                  sx={{ mr: 2, fontWeight: 600 }}
                >
                  ₹{discountedPrice.toFixed(2)}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  ₹{product?.price.toFixed(2)}
                </Typography>
                <Chip
                  label={`${product?.discount}% OFF`}
                  color="error"
                  size="small"
                  sx={{ ml: 2 }}
                />
              </>
            ) : (
              <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                ₹{product?.price.toFixed(2)}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Chip
              label={product?.category}
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
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" paragraph>
            {product?.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Quantity:
            </Typography>
            <ButtonGroup size="small" aria-label="quantity buttons">
              <Button onClick={decreaseQuantity} disabled={cartQuantity <= 1}>
                <RemoveIcon />
              </Button>
              <Button disabled sx={{ px: 2 }}>
                {cartQuantity}
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
    </Container>
  );
};

export default ProductPage;
