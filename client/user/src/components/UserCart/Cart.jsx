import { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  CardActions,
} from "@mui/material";

const Cart = () => {
  // Pre-selected sample cart items
  const initialCartItems = [
    { id: 1, name: "Product A", price: 100, quantity: 2 },
    { id: 2, name: "Product B", price: 200, quantity: 1 },
    { id: 3, name: "Product C", price: 300, quantity: 3 },
  ];

  // State to manage cart items
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Remove item from cart
  const removeFromCart = (id) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
  };

  // Calculate total price of all cart items
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={3}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">Price: ₹{item.price}</Typography>
                  <Typography variant="body2">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    Subtotal: ₹{item.price * item.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove from Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">Your cart is empty.</Typography>
        )}
      </Grid>

      {/* Display total price */}
      {cartItems.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Typography variant="h5">Total: ₹{getTotalPrice()}</Typography>
        </div>
      )}
    </div>
  );
};

export default Cart;
