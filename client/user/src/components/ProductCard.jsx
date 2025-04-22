import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addItemToCart } from "../utils/dataPoster";
import { useToast } from "../context/ToastContext";

const StyledCard = styled(Card)(() => ({
  maxWidth: 345,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  overflow: "hidden",
}));

const DiscountBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 12,
  right: 12,
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  padding: "4px 8px",
  borderRadius: 4,
  fontWeight: "bold",
  zIndex: 1,
}));

// const FreeShippingBadge = styled(Chip)(({ theme }) => ({
//   position: "absolute",
//   top: 12,
//   left: 12,
//   backgroundColor: theme.palette.success.main,
//   color: theme.palette.common.white,
//   fontWeight: "bold",
//   zIndex: 1,
// }));

const ProductCard = ({ product }) => {
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  const { _id, name, sellerId, imageUrl, price, quantity, discount, ratings } =
    product;
  // console.log(
  //   _id,
  //   sellerId,
  //   createdAt,
  //   description,
  //   category,
  //   updatedAt,
  //   status
  // );
  const { showToast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: addItemToCart,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
      } else {
        showToast("Error: " + "kindly login first", "error");
      }
    },
  });
  const discountedPrice = discount ? price * (1 - discount / 100) : price;
  const total = ratings.reduce((sum, value) => sum + value, 0); // Adds all ratings
  const rating = ratings.length > 0 ? total / ratings.length : 0; // Calculates average
  const inStock = quantity > 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    mutate({
      productId: _id,
      quantity: 1,
      sellerId,
    });
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
  };

  const handleNavigate = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <StyledCard onClick={handleNavigate} sx={{ cursor: "pointer" }}>
      {discount > 0 && <DiscountBadge>{discount}% OFF</DiscountBadge>}

      {/* {freeShipping && <FreeShippingBadge size="small" label="Free Shipping" />} */}

      <CardMedia
        component="img"
        height="180"
        image={imageUrl}
        alt={name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            mb: 1,
            fontSize: "1rem",
            fontWeight: 500,
            height: "3rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating value={rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            ({rating})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          {discount > 0 ? (
            <>
              <Typography
                variant="h6"
                color="primary"
                sx={{ mr: 1, fontWeight: 600 }}
              >
                ₹{discountedPrice.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ₹{price.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              ₹{price.toFixed(2)}
            </Typography>
          )}
        </Box>

        {!inStock && (
          <Chip
            label="Out of Stock"
            size="small"
            color="default"
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>

      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", p: 2, pt: 0 }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          size="small"
          onClick={handleAddToCart}
          disabled={!inStock || isPending}
          sx={{
            flexGrow: 1,
            mr: 1,
            textTransform: "none",
          }}
        >
          Add to Cart
        </Button>

        <IconButton
          color={favorite ? "error" : "default"}
          onClick={toggleFavorite}
          sx={{
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};
ProductCard.propTypes = {
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
};

export default ProductCard;
