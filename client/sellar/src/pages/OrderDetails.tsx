import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrderById } from "../utils/Orders/dataGetter";
import { updateOrderStatus } from "../utils/Orders/dataPutter";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { Printer, Mail, Share2, Calendar, ChevronLeft } from "lucide-react";
import FullScreenLoader from "../components/FullScreenLoader";
import PageHeader from "../components/Orders/PageHeader";
import StatusBadge from "../components/Orders/StatusBadge";
import OrderItemCard from "../components/Orders/OrderItemCard";
import CustomerInfoCard from "../components/Orders/CustomerInfo";
import OrderSummaryCard from "../components/Orders/OrderSummaryCard";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  console.log(orderId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId as string),
    enabled: !!orderId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleStatusChange = (newStatus: string) => {
    if (order) {
      updateStatusMutation.mutate({ orderId: order._id, status: newStatus });
    }
  };

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
          Back to Orders
        </Button>
      </Box>
    );
  }

  const order = data.data;

  return (
    <>
      {order && (
        <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
          <PageHeader
            title="Order Details"
            backLink="/my-orders"
            breadcrumbs={[
              { label: "Dashboard", link: "/" },
              { label: "Orders", link: "/my-orders" },
              { label: `Order #${order._id.substring(order._id.length - 8)}` },
            ]}
          />

          {/* Order Header */}
          <Card
            sx={{
              mb: 3,
              p: 1,
              background: "linear-gradient(145deg, #f0f0f0 0%, #ffffff 100%)",
            }}
          >
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Order ID
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {order._id}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                    >
                      <Calendar size={14} style={{ marginRight: "6px" }} />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    textAlign: { xs: "left", md: "center" },
                    borderLeft: { xs: "none", md: "1px solid" },
                    borderRight: { xs: "none", md: "1px solid" },
                    borderColor: "divider",
                    py: { xs: 1, md: 2 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: { xs: "flex-start", md: "center" },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Status
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <StatusBadge status={order.status} size="large" />
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select
                          value={order.status}
                          onChange={(e) => handleStatusChange(e.target.value)}
                          size="small"
                          disabled={
                            updateStatusMutation.isPending ||
                            order.status === "Delivered" ||
                            order.status === "Cancelled"
                          }
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Confirmed">Confirmed</MenuItem>
                          <MenuItem value="Shipped">Shipped</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ textAlign: { xs: "left", md: "right" } }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "flex-start", md: "flex-end" },
                      gap: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<Printer />}
                      size={isMobile ? "small" : "medium"}
                    >
                      Print
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Mail />}
                      size={isMobile ? "small" : "medium"}
                    >
                      Email
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Share2 />}
                      size={isMobile ? "small" : "medium"}
                    >
                      Share
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            {/* Left column: Order items and summary */}
            <Grid item xs={12} md={8}>
              <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Order Items ({order.items.length})
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {order.items.map((item) => (
                  <OrderItemCard key={item._id} item={item} />
                ))}
              </Paper>

              {/* Order Timeline - Mobile Only */}
              {isMobile && (
                <Grid item xs={12}>
                  <OrderSummaryCard order={order} />
                </Grid>
              )}
            </Grid>

            {/* Right column: Customer info and order summary */}
            <Grid item xs={12} md={4}>
              <CustomerInfoCard customer={order.userId} />

              {/* Order Summary - Desktop Only */}
              {!isMobile && <OrderSummaryCard order={order} />}
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default OrderDetailsPage;
