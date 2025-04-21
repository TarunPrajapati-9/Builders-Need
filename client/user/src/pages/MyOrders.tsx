import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { Search, Filter, Calendar, ChevronRight, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import FullScreenLoader from "../components/FullScreenLoader";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../utils/dataGetter";
import PageHeader from "../components/orders/PageHeader";
import StatusBadge from "../components/orders/StatusBadge";

const MyOrdersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const { data, isLoading } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getMyOrders,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const orders = data?.data || [];

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.itemId.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const navigateToOrderDetails = (orderId: string) => {
    navigate(`/my-orders/${orderId}`);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
      <PageHeader
        title="My Orders"
        breadcrumbs={[{ label: "Home", link: "/" }, { label: "My Orders" }]}
      />

      {/* Filters and search */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search orders by ID or product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Select
            fullWidth
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <Filter size={18} />
              </InputAdornment>
            }
          >
            <MenuItem value="All">All Status</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Order count */}
      <Box
        sx={{
          mt: 3,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">
          {filteredOrders.length}{" "}
          {filteredOrders.length === 1 ? "order" : "orders"} found
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Calendar size={16} style={{ marginRight: "6px" }} />
          <Typography variant="body2" color="text.secondary">
            {new Date().toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric",
            })}
          </Typography>
        </Box>
      </Box>

      {/* Orders Grid */}
      {orders.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 10,
            textAlign: "center",
          }}
        >
          <Package size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            No Orders Yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start shopping to see your orders here
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/products")}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredOrders.map((order) => (
            <Grid item xs={12} md={6} key={order._id}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
                onClick={() => navigateToOrderDetails(order._id)}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Order #{order._id.substring(order._id.length - 8)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </Typography>
                    </Box>
                    <StatusBadge status={order.status} />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box
                      key={order.items[0]._id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // mb: index !== order.items.length - 1 ? 1 : 0,
                      }}
                    >
                      <img
                        src={order.items[0].itemId.imageUrl}
                        alt={order.items[0].itemId.name}
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginRight: "12px",
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" noWrap>
                          {order.items[0].itemId.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Qty: {order.items[0].quantity}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ ml: 2 }}>
                        ₹
                        {(
                          order.items[0].itemId.price * order.items[0].quantity
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="body2" sx={{ ml: 2 }}>
                      {order.items.length - 1 != 0
                        ? "+" + (order.items.length - 1) + " more"
                        : "-"}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Amount
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: 600 }}
                      >
                        ₹{order.totalAmount.toFixed(2)}
                      </Typography>
                    </Box>
                    <Button
                      endIcon={<ChevronRight size={16} />}
                      variant="outlined"
                      size="small"
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyOrdersPage;
