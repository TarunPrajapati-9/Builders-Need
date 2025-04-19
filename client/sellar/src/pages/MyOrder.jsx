import { useState } from "react";
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
} from "@mui/material";
import { Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";

const OrdersPage = () => {
  // Mock data - replace with actual API call
  const [orders, setOrders] = useState([
    {
      _id: "1",
      buyerName: "John Doe",
      buyerEmail: "john@example.com",
      buyerAddress: "123 Main St",
      buyerPhone: "555-0123",
      items: [{ itemId: "item1", quantity: 2 }],
      totalAmount: 299.98,
      status: "Pending",
      createdAt: "2024-02-20T10:00:00Z",
    },
  ]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    // Add API call to update status in backend
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={20} style={{ color: "yellowgreen" }} />;
      case "Confirmed":
        return <Package size={20} style={{ color: "blue" }} />;
      case "Shipped":
        return <Truck size={20} style={{ color: "purple" }} />;
      case "Delivered":
        return <CheckCircle size={20} style={{ color: "green" }} />;
      case "Cancelled":
        return <XCircle size={20} style={{ color: "red" }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="h1" sx={{ mb: 2 }} fontWeight="bold">
        Orders Management
      </Typography>

      <TableContainer component={Paper} elevation={2} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id} hover>
                <TableCell>{order._id}</TableCell>
                <TableCell>
                  <div>{order.buyerName}</div>
                  <div>{order.buyerAddress}</div>
                </TableCell>
                <TableCell>
                  <div>{order.buyerEmail}</div>
                  <div>{order.buyerPhone}</div>
                </TableCell>
                <TableCell align="right">
                  ₹{order.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {/* Get the status icon with the correct color */}
                    {getStatusIcon(order.status)}
                    <Select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      size="small"
                      sx={{ minWidth: 130 }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Confirmed">Confirmed</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersPage;
