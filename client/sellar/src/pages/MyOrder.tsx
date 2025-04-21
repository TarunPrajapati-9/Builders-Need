import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Typography,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
} from "@mui/material";
import { Search, ChevronRight, Filter, SortDesc, Calendar } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSellerOrders } from "../utils/Orders/dataGetter";
import FullScreenLoader from "../components/FullScreenLoader";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/Orders/StatusBadge";
import PageHeader from "../components/Orders/PageHeader";

const MyOrders = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getSellerOrders,
  });

  // const updateStatusMutation = useMutation({
  //   mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
  //     updateOrderStatus(orderId, status),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["orders"] });
  //   },
  // });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // updateStatusMutation.mutate({ orderId, newStatus });
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const orders = data?.data || [];

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const navigateToOrderDetails = (orderId: string) => {
    navigate(`/my-orders/${orderId}`);
  };

  // Desktop table view
  const renderTable = () => (
    <TableContainer
      component={Paper}
      elevation={1}
      sx={{
        marginTop: 2,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            {/* <TableCell align="center">Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow
              key={order._id}
              hover
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              onClick={() => navigateToOrderDetails(order._id)}
            >
              <TableCell
                sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
              >
                {order._id.substring(order._id.length - 8)}
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body2" fontWeight={500}>
                    {order.userId.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {order.userId.address}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body2">
                    {order.userId.phoneNumber}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {order.userId.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={600}>
                  ₹{order.totalAmount.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body2">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <StatusBadge status={order.status} />
                </Box>
              </TableCell>
              {/* <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    size="small"
                    sx={{
                      minWidth: 130,
                      height: 36,
                      fontSize: "0.875rem",
                    }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Confirmed">Confirmed</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </Box>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Mobile card view
  const renderCards = () => (
    <Box sx={{ mt: 2 }}>
      {filteredOrders.map((order) => (
        <Card
          key={order._id}
          sx={{
            mb: 2,
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 3,
            },
          }}
          onClick={() => navigateToOrderDetails(order._id)}
        >
          <CardContent sx={{ p: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Order ID: {order._id.substring(order._id.length - 8)}
              </Typography>
              <StatusBadge status={order.status} size="small" />
            </Box>

            <Typography variant="body1" fontWeight={500} mb={1}>
              {order.userId.name}
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" fontWeight={600} color="primary">
                ₹{order.totalAmount.toFixed(2)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Chip
                label={`${order.items.length} items`}
                size="small"
                variant="outlined"
                sx={{ borderRadius: "4px" }}
              />

              <Box
                sx={{ display: "flex", alignItems: "center" }}
                onClick={(e) => e.stopPropagation()}
              >
                <Select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  size="small"
                  sx={{ height: 32, fontSize: "0.8rem", mr: 1 }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Confirmed">Confirmed</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>

                <IconButton size="small" color="primary">
                  <ChevronRight size={16} />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
      <PageHeader
        title="Orders Management"
        breadcrumbs={[{ label: "Dashboard", link: "/" }, { label: "Orders" }]}
      />

      {/* Filters and search */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by order ID or customer name"
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
        <Grid item xs={6} md={3}>
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
        <Grid item xs={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<SortDesc size={18} />}
            sx={{ height: "40px" }}
          >
            Sort by Date
          </Button>
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
          Showing {filteredOrders.length}{" "}
          {filteredOrders.length === 1 ? "order" : "orders"}
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

      {orders.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 10,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            No Orders Found
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Keep adding your items to get orders.
          </Typography>
        </Box>
      ) : (
        <>{isTablet ? renderCards() : renderTable()}</>
      )}
    </Box>
  );
};

export default MyOrders;
