import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../utils/dataGetter";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

import {
  Package,
  Truck,
  CheckCircle,
  Calendar,
  ChevronLeft,
  Clock,
  XCircle,
} from "lucide-react";
import FullScreenLoader from "../components/FullScreenLoader";
import PageHeader from "../components/orders/PageHeader";
import StatusBadge from "../components/orders/StatusBadge";
import ProductRating from "../components/orders/ProductRating";
import OrderItemCard from "../components/orders/OrderItemCard";
import OrderSummaryCard from "../components/orders/OrderSummaryCard";

const MyOrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId as string),
    enabled: !!orderId,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError || !data?.data) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading order details. The order may not exist or there was a
          problem fetching the data.
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ChevronLeft />}
          onClick={() => navigate("/my-orders")}
        >
          Back to My Orders
        </Button>
      </Box>
    );
  }

  const order = data.data;
  console.log(order);

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock style={{ color: "yellow" }} />;
      case "Confirmed":
        return <Package style={{ color: "#3B82F6" }} />;
      case "Shipped":
        return <Truck style={{ color: "#9333EA" }} />;
      case "Delivered":
        return <CheckCircle style={{ color: "#22C55E" }} />;
      case "Cancelled":
        return <XCircle style={{ color: "#EF4444" }} />;
      default:
        return <Clock style={{ color: "#9ACD32" }} />;
    }
  };

  const getTimelineColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Confirmed":
        return "info";
      case "Shipped":
        return "secondary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "grey";
    }
  };

  const orderStatuses = ["Pending", "Confirmed", "Shipped", "Delivered"];
  const currentStatusIndex = orderStatuses.indexOf(order.status);

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
      <PageHeader
        title="Order Details"
        backLink="/my-orders"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "My Orders", link: "/my-orders" },
          { label: `Order #${order._id.substring(order._id.length - 8)}` },
        ]}
      />

      {/* Order Status Card */}
      <Card
        sx={{
          mb: 3,
          background: "linear-gradient(145deg, #f0f0f0 0%, #ffffff 100%)",
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Order ID
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  #{order._id.substring(order._id.length - 8)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Calendar size={14} style={{ marginRight: "6px" }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: { xs: "left", md: "right" } }}
            >
              <StatusBadge status={order.status} size="large" />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Expected Delivery:{" "}
                {new Date(
                  new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Order Timeline */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Timeline position={isMobile ? "right" : "alternate"}>
              {orderStatuses.map((status, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;

                return (
                  <TimelineItem key={status}>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          bgcolor: isCompleted
                            ? getTimelineColor(status)
                            : "grey.300",
                          p: 1,
                        }}
                      >
                        {getTimelineIcon(status)}
                      </TimelineDot>
                      {index < orderStatuses.length - 1 && (
                        <TimelineConnector
                          sx={{
                            bgcolor: isCompleted
                              ? getTimelineColor(status)
                              : "grey.300",
                          }}
                        />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography
                        variant="h6"
                        component="span"
                        color={isCurrent ? "primary" : "text.primary"}
                      >
                        {status}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {isCurrent
                          ? "Current Status"
                          : isCompleted
                          ? "Completed"
                          : "Pending"}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </Paper>
        </Grid>

        {/* Order Items */}
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Order Items ({order.items.length})
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {order.items.map((item) => (
              <Box key={item._id}>
                <OrderItemCard item={item} />
                {order.status === "Delivered" && (
                  <Box sx={{ mt: 1, mb: 2, pl: 2 }}>
                    <ProductRating
                      productId={item.itemId._id}
                      productName={item.itemId.name}
                      currentRating={item.itemId.ratings}
                    />
                  </Box>
                )}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <OrderSummaryCard order={order} />

          {/* Shipping Address */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Shipping Address
              </Typography>
              <Typography variant="body1">{order.userId.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {order.userId.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pincode: {order.userId.pincode}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Phone: {order.userId.phoneNumber}
              </Typography>
            </CardContent>
          </Card>

          {/* Need Help Card */}
          <Card
            sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Need Help?
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Having issues with your order? We're here to help!
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "grey.100",
                  },
                }}
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyOrderDetailsPage;
