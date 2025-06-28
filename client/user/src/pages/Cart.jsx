import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Container, Box, Typography, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { getCartItems, getProductById } from "../utils/dataGetter";
import {
  clearCart,
  deleteCartItem,
  updateProductQuantity,
} from "../utils/dataPutter";
import { useToast } from "../context/ToastContext";
import FullScreenLoader from "../components/FullScreenLoader";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import EmptyCart from "../components/cart/EmptyCart";
import { cartStyles } from "../styles/cardStyles";
import { placeOrder } from "../utils/dataPoster";
import Cookies from "js-cookie";
import PaymentGateway from "./Payment";
import { useNavigate } from "react-router-dom";

function Cart() {
  const token = Cookies.get("userToken");
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    enabled: !!token,
  });
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [quantities, setQuantities] = useState({});
  const [showGateway, setShowGateway] = useState(false);
  const [outOfStockItems, setOutOfStockItems] = useState([]);

  const timers = useRef({});
  const navigate = useNavigate();

  const { mutate: removeItemMutation, isPending } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        queryClient.invalidateQueries(["cart"]);
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const mutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: (res) => {
      if (res.success) {
        showToast("Order placed successfully!", "success");
        queryClient.invalidateQueries(["cart"]);
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries(["cart"]); // Refetch the cart data
        // showToast("Cart cleared successfully!", "success");
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  // Stock validation effect
  useEffect(() => {
    const validateStock = async () => {
      if (!data?.data || data.data.length === 0) {
        setOutOfStockItems([]);
        return;
      }

      const outOfStock = [];

      for (const item of data.data) {
        try {
          const productResponse = await getProductById(item.productId);
          if (productResponse.success && productResponse.data) {
            const currentQuantity = quantities[item.productId] || item.quantity;
            const availableStock = productResponse.data.quantity;

            if (currentQuantity > availableStock) {
              outOfStock.push({
                productId: item.productId,
                productName: item.productName,
                requestedQuantity: currentQuantity,
                availableStock: availableStock,
              });
            }
          }
        } catch (error) {
          console.error(
            `Error fetching stock for product ${item.productId}:`,
            error
          );
        }
      }

      setOutOfStockItems(outOfStock);
    };

    validateStock();
  }, [data?.data, quantities]);

  // Check if checkout should be disabled
  const isCheckoutDisabled = outOfStockItems.length > 0;

  // Function to update quantity with debounce logic
  const updateQuantity = (productId, change) => {
    setQuantities((prev) => {
      const currentQuantity =
        prev[productId] ||
        data?.data.find((item) => item.productId === productId)?.quantity ||
        1;
      const newQuantity = currentQuantity + change;

      // Prevent quantity going below 1
      if (newQuantity < 1) return prev;

      // Clear old timer if exists
      if (timers.current[productId]) {
        clearTimeout(timers.current[productId]);
      }

      // Set new timer to call API after 500ms
      timers.current[productId] = setTimeout(async () => {
        const response = await updateProductQuantity({
          productId: productId,
          quantity: newQuantity,
        });
        if (response.success) {
          queryClient.invalidateQueries(["cart"]);
        }
      }, 500);

      return { ...prev, [productId]: newQuantity };
    });
  };

  const removeItem = (id) => {
    removeItemMutation({ productId: id });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast("Your cart is empty!", "error");
      return;
    }

    if (isCheckoutDisabled) {
      showToast(
        "Some items in your cart are not available in the requested quantity. Please adjust quantities.",
        "error"
      );
      return;
    }

    setShowGateway(true); // Show fake gateway instead of placing order directly
  };

  const handleFakePaymentSuccess = async () => {
    setShowGateway(false); // close the modal

    const groupedOrders = {};
    cartItems.forEach((item) => {
      const sellerId = item.sellerId;
      if (!groupedOrders[sellerId]) {
        groupedOrders[sellerId] = [];
      }
      groupedOrders[sellerId].push({
        itemId: item.productId,
        quantity: item.quantity,
      });
    });

    let allOrdersSuccessful = true;

    try {
      for (const sellerId in groupedOrders) {
        const orderData = {
          sellerId: sellerId,
          items: groupedOrders[sellerId],
          totalAmount: calculateTotalForSeller(groupedOrders[sellerId]),
        };

        const res = await mutation.mutateAsync(orderData);

        if (!res.success) {
          allOrdersSuccessful = false;
          showToast("Error placing order: " + res.message, "error");
          break;
        }
      }

      if (allOrdersSuccessful) {
        showToast("order placed successfully!", "success");
        navigate("/my-orders");
        clearCartMutation.mutate();
      }
    } catch (error) {
      console.error(error);
      showToast("Something went wrong while placing order.", "error");
    }
  };

  // Helper to calculate total for seller
  const calculateTotalForSeller = (items) => {
    return items.reduce((total, item) => {
      const cartItem = cartItems.find((ci) => ci.productId === item.itemId);
      return total + cartItem.productPrice * item.quantity;
    }, 0);
  };

  if (isLoading) return <FullScreenLoader />;

  const cartItems = data?.data || [];
  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = quantities[item.productId] || item.quantity;
      return total + item.productPrice * quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  if (clearCartMutation.isPending || mutation.isPending) {
    return <FullScreenLoader />;
  }

  return (
    <Container maxWidth="lg" sx={cartStyles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={cartStyles.pageTitle}>
          Your Shopping Cart
        </Typography>

        {cartItems.length === 0 || !data?.data ? (
          <EmptyCart />
        ) : (
          <Box sx={cartStyles.cartContent}>
            {/* Stock Warning Messages */}
            {outOfStockItems.length > 0 && (
              <Box sx={{ mb: 2 }}>
                {outOfStockItems.map((item) => (
                  <Alert
                    key={item.productId}
                    severity="warning"
                    sx={{ mb: 1, borderRadius: 2 }}
                  >
                    <Typography variant="body2">
                      <strong>{item.productName}</strong> is not available as
                      per your demand. Requested: {item.requestedQuantity},
                      Available: {item.availableStock}
                    </Typography>
                  </Alert>
                ))}
              </Box>
            )}

            <Box sx={cartStyles.cartItemsContainer}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  quantity={quantities[item.productId] || item.quantity}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                  isPending={isPending}
                />
              ))}
            </Box>

            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              onCheckout={handleCheckout}
              disabled={isCheckoutDisabled}
            />
          </Box>
        )}
      </motion.div>
      <PaymentGateway
        open={showGateway}
        total={total}
        onClose={() => setShowGateway(false)}
        onSuccess={handleFakePaymentSuccess}
      />
    </Container>
  );
}

export default Cart;
