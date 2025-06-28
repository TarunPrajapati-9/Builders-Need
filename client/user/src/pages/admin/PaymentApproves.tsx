import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  AppBar,
  Toolbar,
  Badge,
  Stack,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
  Pending as PendingIcon,
  AccountBalanceWallet as WalletIcon,
  Person as PersonIcon,
  Receipt as ReceiptIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

interface PaymentRequest {
  id: number;
  userId: string;
  userName: string;
  referenceId: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  userEmail: string;
}

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPaymentApproval } from "../../utils/dataGetter";
import { approvePayment } from "../../utils/dataPutter";
import { useToast } from "../../context/ToastContext";
import { u } from "framer-motion/client";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function PaymentApproves({ onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["paymentRequests"],
    queryFn: getPaymentApproval,
  });
  const paymentRequests = data?.data || [];

  const [selectedRequest, setSelectedRequest] = useState<PaymentRequest | null>(
    null
  );
  const [currentTab, setCurrentTab] = useState(0);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    action: "approve" | "reject" | null;
  }>({
    open: false,
    action: null,
  });

  const pendingCount = paymentRequests.filter(
    (req) => req.status === "pending"
  ).length;

  const approvedCount = paymentRequests.filter(
    (req) => req.status === "approved"
  ).length;

  const rejectedCount = paymentRequests.filter(
    (req) => req.status === "rejected"
  ).length;

  const getFilteredRequests = () => {
    switch (currentTab) {
      case 0:
        return paymentRequests.filter((req) => req.status === "pending");
      case 1:
        return paymentRequests.filter((req) => req.status === "approved");
      case 2:
        return paymentRequests.filter((req) => req.status === "rejected");
      default:
        return paymentRequests;
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleAction = (
    request: PaymentRequest,
    action: "approve" | "reject"
  ) => {
    setSelectedRequest(request);
    setActionDialog({ open: true, action });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: approvePayment,
    onSuccess: (res) => {
      if (res.success) {
        showToast(`Action Perform successfully`, "success");
        setActionDialog({ open: false, action: null });
        queryClient.invalidateQueries({ queryKey: ["paymentRequests"] });
        setSelectedRequest(null);
      } else {
        showToast(res.message || "Action failed", "error");
      }
    },
  });

  const confirmAction = () => {
    if (!selectedRequest || !actionDialog.action) return;

    console.log(selectedRequest);
    console.log(actionDialog.action);

    if (actionDialog.action === "approve") {
      mutate({
        userId: selectedRequest.userId,
        referenceId: selectedRequest.referenceId,
        status: "approved",
      });
    } else if (actionDialog.action === "reject") {
      mutate({
        userId: selectedRequest.userId,
        referenceId: selectedRequest.referenceId,
        status: "rejected",
      });
    }

    setActionDialog({ open: false, action: null });
    setSelectedRequest(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <PendingIcon />;
      case "approved":
        return <ApproveIcon />;
      case "rejected":
        return <RejectIcon />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const adminToken = Cookies.get("adminToken");
    if (!adminToken) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", mr: 2 }}>
            <AdminIcon />
          </Avatar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Admin Dashboard
          </Typography>
          <Badge badgeContent={pendingCount} color="error" sx={{ mr: 2 }}>
            <WalletIcon />
          </Badge>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            sx={{ borderRadius: 2 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {/* Stats Cards */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ mb: 4 }}
        >
          <Card
            sx={{
              flex: 1,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "warning.main" }}>
                  <PendingIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="warning.main"
                  >
                    {pendingCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Requests
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              flex: 1,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "success.main" }}>
                  <ApproveIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="success.main"
                  >
                    {approvedCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Approved
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              flex: 1,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "error.main" }}>
                  <RejectIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="error.main">
                    {rejectedCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rejected
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Stack>

        {/* Payment Requests Table */}
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <WalletIcon color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Payment Requests
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                sx={{ borderRadius: 2 }}
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                sx={{
                  "& .MuiTab-root": {
                    fontWeight: "medium",
                    textTransform: "none",
                    minWidth: 120,
                  },
                }}
              >
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PendingIcon fontSize="small" />
                      <Typography>Pending</Typography>
                      <Chip
                        label={pendingCount}
                        size="small"
                        color="warning"
                        sx={{ height: 20, fontSize: "0.75rem" }}
                      />
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ApproveIcon fontSize="small" />
                      <Typography>Approved</Typography>
                      <Chip
                        label={approvedCount}
                        size="small"
                        color="success"
                        sx={{ height: 20, fontSize: "0.75rem" }}
                      />
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <RejectIcon fontSize="small" />
                      <Typography>Rejected</Typography>
                      <Chip
                        label={rejectedCount}
                        size="small"
                        color="error"
                        sx={{ height: 20, fontSize: "0.75rem" }}
                      />
                    </Box>
                  }
                />
              </Tabs>
            </Box>

            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ border: 1, borderColor: "grey.200", borderRadius: 2 }}
            >
              <Table>
                <TableHead sx={{ bgcolor: "grey.50" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      User Details
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Reference ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Submitted</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getFilteredRequests().length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        sx={{ textAlign: "center", py: 4 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "grey.100",
                              width: 64,
                              height: 64,
                            }}
                          >
                            <WalletIcon
                              sx={{ fontSize: 32, color: "grey.400" }}
                            />
                          </Avatar>
                          <Typography variant="h6" color="text.secondary">
                            No{" "}
                            {currentTab === 0
                              ? "pending"
                              : currentTab === 1
                              ? "approved"
                              : "rejected"}{" "}
                            requests found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {currentTab === 0
                              ? "All payment requests have been processed."
                              : currentTab === 1
                              ? "No requests have been approved yet."
                              : "No requests have been rejected yet."}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    getFilteredRequests().map((request) => (
                      <TableRow key={request.referenceId} hover>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "primary.main",
                                width: 40,
                                height: 40,
                              }}
                            >
                              <PersonIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="body1" fontWeight="medium">
                                {request.userName}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                ID: {request.userId}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {request.userEmail}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <ReceiptIcon fontSize="small" color="action" />
                            <Typography variant="body2" fontFamily="monospace">
                              {request.referenceId}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="primary.main"
                          >
                            ₹{request.amount.toLocaleString("en-IN")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            // icon={getStatusIcon(request.status)}
                            label={request.status.toUpperCase()}
                            color={getStatusColor(request.status) as any}
                            size="small"
                            sx={{ fontWeight: "bold" }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(request.date).toLocaleString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                              timeZone: "Asia/Kolkata",
                            })}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {request.status === "pending" ? (
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleAction(request, "approve")}
                                sx={{
                                  bgcolor: "success.50",
                                  color: "success.main",
                                  "&:hover": { bgcolor: "success.100" },
                                }}
                              >
                                <ApproveIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleAction(request, "reject")}
                                sx={{
                                  bgcolor: "error.50",
                                  color: "error.main",
                                  "&:hover": { bgcolor: "error.100" },
                                }}
                              >
                                <RejectIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              {request.status === "approved"
                                ? "Approved"
                                : "Rejected"}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={actionDialog.open}
        onClose={() => setActionDialog({ open: false, action: null })}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor:
                  actionDialog.action === "approve"
                    ? "success.main"
                    : "error.main",
              }}
            >
              {actionDialog.action === "approve" ? (
                <ApproveIcon />
              ) : (
                <RejectIcon />
              )}
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              {actionDialog.action === "approve" ? "Approve" : "Reject"} Payment
              Request
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          {selectedRequest && (
            <Box>
              <Alert
                severity={
                  actionDialog.action === "approve" ? "success" : "error"
                }
                sx={{ mb: 3, borderRadius: 2 }}
              >
                Are you sure you want to {actionDialog.action} this payment
                request?
              </Alert>

              <Paper
                elevation={0}
                sx={{ bgcolor: "grey.50", p: 2, borderRadius: 2 }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Payment Details:
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">User:</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {selectedRequest.userName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Amount:</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    ₹{selectedRequest.amount.toLocaleString("en-IN")}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">Reference ID:</Typography>
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    fontFamily="monospace"
                  >
                    {selectedRequest.referenceId}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setActionDialog({ open: false, action: null })}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={confirmAction}
            color={actionDialog.action === "approve" ? "success" : "error"}
            sx={{ borderRadius: 2, px: 3 }}
          >
            {actionDialog.action === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
