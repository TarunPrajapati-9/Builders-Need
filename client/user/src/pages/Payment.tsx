import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Radio,
  Typography,
  Box,
  Stack,
  Divider,
  IconButton,
  CircularProgress,
  Chip,
  Paper,
  FormControlLabel,
} from "@mui/material";
import {
  Close as CloseIcon,
  Security as SecurityIcon,
  AccountBalanceWallet as WalletIcon,
  LocalShipping as TruckIcon,
  CheckCircle as CheckCircleIcon,
  Lock as LockIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import { getWallet } from "../utils/dataGetter";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import FullScreenLoader from "../components/FullScreenLoader";
import { useToast } from "../context/ToastContext";
import { debitMoneyFromWallet } from "../utils/dataPoster";

export default function PaymentGateway({ open, onClose, onSuccess, total }) {
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [pin, setPin] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const token = Cookies.get("userToken");
  const { showToast } = useToast();

  const { data: walletData, isLoading: walletLoading } = useQuery({
    queryKey: ["userWallet"],
    queryFn: getWallet,
    enabled: !!token,
  });

  const { mutate, isPending: debitMoneyPending } = useMutation({
    mutationFn: debitMoneyFromWallet,
    onSuccess: (res) => {
      if (res.success) {
        setIsSuccess(true);
        showToast("Payment successful", "success");
        onSuccess();
      } else {
        showToast(res.message || "Payment failed", "error");
      }
    },
  });

  const handlePayment = async () => {
    if (paymentMethod === "wallet" && total > walletData?.data.balance) {
      showToast(
        "Insufficient wallet balance, please recharge your wallet",
        "error"
      );
      return;
    }

    mutate({
      amount: total,
      pin: pin,
    });
  };

  if (walletLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Card elevation={0}>
            <CardHeader
              sx={{
                background: "linear-gradient(45deg, #2196f3 30%, #9c27b0 90%)",
                color: "white",
                pb: 2,
              }}
              title={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SecurityIcon />
                    <Typography variant="h6" fontWeight="bold">
                      SecurePay Gateway
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={onClose}
                    sx={{
                      color: "white",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              }
              subheader={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  <LockIcon fontSize="small" />
                  <Typography variant="body2">256-bit SSL Encrypted</Typography>
                </Box>
              }
            />

            <CardContent sx={{ p: 3 }}>
              {isSuccess ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <CheckCircleIcon
                    sx={{ fontSize: 64, color: "success.main", mb: 2 }}
                  />
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="success.main"
                    gutterBottom
                  >
                    Payment Successful!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Your order has been confirmed
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={3}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Total (include Shipping)
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      ₹{total?.toFixed(2)}
                    </Typography>
                  </Box>

                  {/* Payment Methods */}
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Choose Payment Method
                    </Typography>

                    {/* Wallet Option */}
                    <Paper
                      elevation={0}
                      onClick={() => setPaymentMethod("wallet")}
                      sx={{
                        border: 1,
                        borderColor:
                          paymentMethod === "wallet"
                            ? "primary.main"
                            : "grey.300",
                        borderRadius: 2,
                        p: 0,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "grey.50" },
                        transition: "all 0.2s",
                      }}
                    >
                      <FormControlLabel
                        value="wallet"
                        control={<Radio checked={paymentMethod === "wallet"} />}
                        sx={{
                          m: 0,
                          p: 2,
                          width: "100%",
                        }}
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              ml: 1,
                            }}
                          >
                            <Box
                              sx={{
                                background:
                                  "linear-gradient(45deg, #4caf50 30%, #2e7d32 90%)",
                                p: 1,
                                borderRadius: 1.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <WalletIcon
                                sx={{ color: "white", fontSize: 20 }}
                              />
                            </Box>
                            <Box>
                              <Typography variant="body1" fontWeight="medium">
                                Digital Wallet
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Pay instantly from your wallet
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </Paper>

                    {/* COD Option */}
                    {/* <Paper
                      elevation={0}
                      onClick={() => setPaymentMethod("cod")}
                      sx={{
                        border: 1,
                        borderColor:
                          paymentMethod === "cod" ? "primary.main" : "grey.300",
                        borderRadius: 2,
                        p: 0,
                        mt: 1,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "grey.50" },
                        transition: "all 0.2s",
                      }}
                    >
                      <FormControlLabel
                        value="cod"
                        control={<Radio checked={paymentMethod === "cod"} />}
                        sx={{
                          m: 0,
                          p: 2,
                          width: "100%",
                        }}
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              ml: 1,
                            }}
                          >
                            <Box
                              sx={{
                                background:
                                  "linear-gradient(45deg, #ff9800 30%, #f57c00 90%)",
                                p: 1,
                                borderRadius: 1.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <TruckIcon
                                sx={{ color: "white", fontSize: 20 }}
                              />
                            </Box>
                            <Box>
                              <Typography variant="body1" fontWeight="medium">
                                Cash on Delivery
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Pay ₹{total?.toFixed(2)} when your order arrives
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </Paper> */}
                  </Box>

                  {/* Details */}
                  {paymentMethod === "wallet" && (
                    <Stack spacing={2}>
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "primary.50",
                          border: 1,
                          borderColor: "primary.200",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <WalletIcon color="primary" />
                          <Typography
                            variant="body1"
                            fontWeight="medium"
                            color="primary.main"
                          >
                            Wallet Balance: {walletData?.data.balance} ₹
                          </Typography>
                        </Box>
                        {total > walletData?.data.balance ? (
                          <>
                            <Typography variant="body2" color="error.main">
                              Insufficient balance, please recharge your
                              wallet,&nbsp;
                              <Link to="/my-wallet">Recharge Wallet</Link>
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="body2" color="primary.main">
                            You will pay ₹{total.toFixed(2)} from your wallet
                          </Typography>
                        )}
                      </Paper>

                      <TextField
                        fullWidth
                        label="Wallet PIN"
                        type="password"
                        value={pin}
                        onChange={(e) => {
                          const val = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 4);
                          setPin(val);
                        }}
                        placeholder="Enter your wallet 4-digit PIN"
                        inputProps={{
                          maxLength: 4,
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                      />
                    </Stack>
                  )}

                  {paymentMethod === "cod" && (
                    <Stack spacing={2}>
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: "warning.50",
                          border: 1,
                          borderColor: "warning.200",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <TruckIcon color="warning" />
                          <Typography
                            variant="body1"
                            fontWeight="medium"
                            color="warning.main"
                          >
                            Cash on Delivery
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="warning.main">
                          Pay ₹{total?.toFixed(2)} when your order arrives,
                          <strong style={{ color: "red" }}>
                            &nbsp;Seller can ask you for advance money by your
                            contact details
                          </strong>
                        </Typography>
                      </Paper>
                    </Stack>
                  )}

                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: "success.50",
                      border: 1,
                      borderColor: "success.200",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <SecurityIcon color="success" fontSize="small" />
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="success.main"
                      >
                        Your payment is secured with bank-level encryption
                      </Typography>
                    </Box>
                  </Paper>

                  <Stack spacing={1.5}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handlePayment}
                      disabled={
                        debitMoneyPending ||
                        (paymentMethod === "wallet" &&
                          total > walletData?.data.balance)
                      }
                      startIcon={
                        debitMoneyPending ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <PaymentIcon />
                        )
                      }
                      sx={{
                        background:
                          "linear-gradient(45deg, #2196f3 30%, #9c27b0 90%)",
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: "bold",
                        boxShadow: "0 8px 32px rgba(33, 150, 243, 0.3)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #1976d2 30%, #7b1fa2 90%)",
                          boxShadow: "0 12px 40px rgba(33, 150, 243, 0.4)",
                        },
                      }}
                    >
                      {debitMoneyPending
                        ? "Processing..."
                        : paymentMethod === "wallet"
                        ? "Pay from Wallet"
                        : "Confirm Order"}
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      onClick={onClose}
                      sx={{ py: 1.5, borderRadius: 2 }}
                    >
                      Cancel
                    </Button>
                  </Stack>

                  <Box sx={{ pt: 2, borderTop: 1, borderColor: "grey.200" }}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Chip
                        icon={<SecurityIcon />}
                        label="SSL Secured"
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem" }}
                      />
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="PCI Compliant"
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem" }}
                      />
                      <Chip
                        icon={<LockIcon />}
                        label="256-bit Encryption"
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    </Stack>
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
