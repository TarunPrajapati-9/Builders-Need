import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Avatar,
  Chip,
  Divider,
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import {
  AccountBalanceWallet as WalletIcon,
  Add as AddIcon,
  QrCode as QrCodeIcon,
  History as HistoryIcon,
  ContentCopy as CopyIcon,
  Payment as PaymentIcon,
  ShoppingCart as ShoppingIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { useToast } from "../context/ToastContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWallet } from "../utils/dataGetter";
import Cookies from "js-cookie";
import { addMoneyToWallet, createWallet } from "../utils/dataPoster";
import FullScreenLoader from "../components/FullScreenLoader";
import { updateWalletPin } from "../utils/dataPutter";

export default function UserWallet() {
  const [addMoneyDialog, setAddMoneyDialog] = useState(false);
  const [pin, setPin] = useState("");
  const [qrDialog, setQrDialog] = useState(false);
  const [updatePinDialog, setUpdatePinDialog] = useState(false);
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [amount, setAmount] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const { showToast } = useToast();

  // This would be your site's payment UPI ID or payment gateway details
  const siteUpiId = "tarun.prajapati912@okhdfcbank";

  const token = Cookies.get("userToken");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["userWallet"],
    queryFn: getWallet,
    enabled: !!token,
  });

  const wallet = data?.data || {};
  const transactions = wallet.transactions || [];

  const { mutate, isPending } = useMutation({
    mutationFn: createWallet,
    onSuccess: (res) => {
      if (res.success) {
        showToast("Wallet created successfully!", "success");
        setPin("");
        queryClient.invalidateQueries({ queryKey: ["userWallet"] });
      } else {
        showToast(res.message || "Failed to create wallet", "error");
      }
    },
  });

  const { mutate: addMoney, isPending: isAddingMoney } = useMutation({
    mutationFn: addMoneyToWallet,
    onSuccess: (res) => {
      if (res.success) {
        showToast("Money added successfully!", "success");
        queryClient.invalidateQueries({ queryKey: ["userWallet"] });
        setAddMoneyDialog(false);
        setAmount("");
        setReferenceId("");
      } else {
        showToast(res.message || "Failed to add money", "error");
      }
    },
  });

  const { mutate: updatePin, isPending: isUpdatingPin } = useMutation({
    mutationFn: updateWalletPin,
    onSuccess: (res) => {
      if (res.success) {
        showToast("PIN updated successfully!", "success");
        setUpdatePinDialog(false);
        setOldPin("");
        setNewPin("");
        queryClient.invalidateQueries({ queryKey: ["userWallet"] });
      } else {
        showToast(res.message || "Failed to update PIN", "error");
      }
    },
  });

  const handleAddMoney = () => {
    if (!amount || !referenceId) {
      showToast("Please enter both amount and reference ID", "error");
      return;
    }
    addMoney({
      amount: parseFloat(amount),
      refId: referenceId,
    });
  };

  const handleUpdatePin = () => {
    if (!oldPin || !newPin) {
      showToast("Please enter both old and new PIN", "error");
      return;
    }
    if (oldPin.length !== 4 || newPin.length !== 4) {
      showToast("PIN must be 4 digits", "error");
      return;
    }
    if (oldPin === newPin) {
      showToast("New PIN must be different from old PIN", "error");
      return;
    }
    updatePin({
      oldPin,
      newPin,
    });
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(siteUpiId);
    showToast("UPI ID copied to clipboard", "success");
  };

  const handleCreateWallet = (pin: string) => {
    if (!pin) {
      showToast("Please set a 4-digit PIN", "error");
      return;
    }
    mutate(pin);
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
            My Wallet
          </Typography>
          <Typography variant="body1" color="rgba(129, 129, 129, 0.8)">
            Store and manage your money for site purchases
          </Typography>
        </Box>

        {!data?.success && (
          <Card
            sx={{
              borderRadius: 3,
              mb: 4,
              p: 4,
              maxWidth: 500,
              mx: "auto",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Avatar
                sx={{
                  bgcolor: "grey.200",
                  color: "primary.main",
                  width: 64,
                  height: 64,
                  mx: "auto",
                  mb: 2,
                }}
              >
                <WalletIcon sx={{ fontSize: 36 }} />
              </Avatar>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
              >
                You don't have an active wallet yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Click below to create your wallet and start managing your funds
                for purchases.
              </Typography>
              <TextField
                label="Set 4-digit PIN"
                type="password"
                inputProps={{
                  maxLength: 4,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                sx={{ mb: 3, width: "100%" }}
                value={pin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setPin(val);
                }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  borderRadius: 2,
                  px: 4,
                  background:
                    "linear-gradient(45deg, #2196f3 30%, #9c27b0 90%)",
                  fontWeight: "bold",
                }}
                onClick={() => handleCreateWallet(pin)}
                disabled={pin.length !== 4 || isPending}
              >
                Create Wallet
              </Button>
            </CardContent>
          </Card>
        )}

        {data?.success && (
          <Grid container spacing={3}>
            {/* Balance Card */}
            <Grid item xs={12}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  borderRadius: 3,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: "rgba(255,255,255,0.2)",
                          width: 56,
                          height: 56,
                        }}
                      >
                        <WalletIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Wallet Balance
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Available for purchases
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label="Active"
                      sx={{
                        bgcolor: "rgba(76, 175, 80, 0.2)",
                        color: "#4caf50",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>

                  <Typography variant="h3" fontWeight="bold" gutterBottom>
                    ₹ {wallet.balance?.toFixed(2) || "0.00"}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setAddMoneyDialog(true)}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                        borderRadius: 2,
                        px: 3,
                      }}
                    >
                      Add Money
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<QrCodeIcon />}
                      onClick={() => setQrDialog(true)}
                      sx={{
                        borderColor: "rgba(255,255,255,0.5)",
                        color: "white",
                        "&:hover": {
                          borderColor: "white",
                          bgcolor: "rgba(255,255,255,0.1)",
                        },
                        borderRadius: 2,
                        px: 3,
                      }}
                    >
                      Payment QR
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<PaymentIcon />}
                      onClick={() => setUpdatePinDialog(true)}
                      sx={{
                        borderColor: "rgba(255,255,255,0.5)",
                        color: "white",
                        "&:hover": {
                          borderColor: "white",
                          bgcolor: "rgba(255,255,255,0.1)",
                        },
                        borderRadius: 2,
                        px: 3,
                      }}
                    >
                      Update PIN
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Transactions */}
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <HistoryIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      Recent Transactions
                    </Typography>
                  </Box>
                  {transactions.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No transactions found. Start adding money to your wallet!
                    </Typography>
                  ) : (
                    <List sx={{ p: 0 }}>
                      {[...transactions]
                        .reverse()
                        .map((transaction, index, arr) => (
                          <Box key={transaction._id}>
                            <ListItem sx={{ px: 0, py: 2 }}>
                              <ListItemAvatar>
                                <Avatar
                                  sx={{
                                    bgcolor:
                                      transaction.type === "credit"
                                        ? "success.main"
                                        : "error.main",
                                    width: 40,
                                    height: 40,
                                  }}
                                >
                                  {transaction.type === "credit" ? (
                                    <QrCodeIcon />
                                  ) : (
                                    <ShoppingIcon />
                                  )}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                disableTypography
                                primary={
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <Typography
                                      variant="body1"
                                      fontWeight="medium"
                                    >
                                      {transaction.type === "credit"
                                        ? "Money added via QR payment"
                                        : "Shopping at Builder Needs"}
                                    </Typography>
                                    {transaction.type === "credit" &&
                                      transaction.status && (
                                        <Chip
                                          label={
                                            transaction.status === "pending"
                                              ? "Pending"
                                              : transaction.status ===
                                                "approved"
                                              ? "Approved"
                                              : transaction.status ===
                                                "rejected"
                                              ? "Rejected"
                                              : transaction.status
                                          }
                                          size="small"
                                          sx={{
                                            ml: 1,
                                            fontWeight: "bold",
                                            bgcolor:
                                              transaction.status === "pending"
                                                ? "warning.100"
                                                : transaction.status ===
                                                  "approved"
                                                ? "success.100"
                                                : transaction.status ===
                                                  "rejected"
                                                ? "error.100"
                                                : "grey.100",
                                            color:
                                              transaction.status === "pending"
                                                ? "warning.main"
                                                : transaction.status ===
                                                  "approved"
                                                ? "success.main"
                                                : transaction.status ===
                                                  "rejected"
                                                ? "error.main"
                                                : "text.secondary",
                                            textTransform: "capitalize",
                                          }}
                                        />
                                      )}
                                  </Box>
                                }
                                secondary={
                                  <>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      component="span"
                                      display="block"
                                    >
                                      {new Date(
                                        transaction.date
                                      ).toLocaleString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </Typography>

                                    {transaction.refId && (
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        component="span"
                                        display="block"
                                      >
                                        Ref ID:&nbsp;{transaction.refId}
                                      </Typography>
                                    )}
                                  </>
                                }
                              />
                              <ListItemSecondaryAction>
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  color={
                                    transaction.type === "credit" &&
                                    transaction.status === "approved"
                                      ? "success.main"
                                      : "error.main"
                                  }
                                >
                                  {transaction.type === "credit" ? "+" : "-"}₹
                                  {transaction.amount}
                                </Typography>
                              </ListItemSecondaryAction>
                            </ListItem>
                            {index < arr.length - 1 && <Divider />}
                          </Box>
                        ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Add Money Dialog */}
        <Dialog
          open={addMoneyDialog}
          onClose={() => setAddMoneyDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <AddIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Add Money to Wallet
                </Typography>
              </Box>
              <IconButton onClick={() => setAddMoneyDialog(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ pt: 2 }}>
            <Stack spacing={3}>
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                After making payment via QR code or UPI, enter the payment
                details below to add money to your wallet,&nbsp;
                <strong style={{ color: "red" }}>
                  Once the admin approves and verifies your payment, the money
                  will be added to your wallet.
                </strong>
              </Alert>

              <TextField
                fullWidth
                label="Amount Paid"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter the amount you paid"
                InputProps={{
                  startAdornment: (
                    <Typography sx={{ mr: 1, color: "text.secondary" }}>
                      ₹
                    </Typography>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Payment Reference ID"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                placeholder="Enter UPI transaction reference ID"
                helperText="You'll get this reference ID after completing the payment"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

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
                <Typography
                  variant="body2"
                  color="warning.main"
                  fontWeight="medium"
                  gutterBottom
                >
                  How to add money:
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="div"
                >
                  1. Use the Payment QR code or UPI ID: {siteUpiId}
                  <br />
                  2. Make the payment for desired amount
                  <br />
                  3. Enter the amount and reference ID here
                  <br />
                  4. Click submit to add money to your wallet
                </Typography>
              </Paper>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={() => setAddMoneyDialog(false)}
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddMoney}
              startIcon={<PaymentIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                background: "linear-gradient(45deg, #2196f3 30%, #9c27b0 90%)",
              }}
            >
              Add to Wallet
            </Button>
          </DialogActions>
        </Dialog>

        {/* Payment QR Code Dialog */}
        <Dialog
          open={qrDialog}
          onClose={() => setQrDialog(false)}
          maxWidth="sm"
          PaperProps={{
            sx: { borderRadius: 3 },
          }}
        >
          <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              Payment QR Code
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Scan this QR to add money to your wallet
            </Typography>
          </DialogTitle>

          <DialogContent sx={{ textAlign: "center", py: 3 }}>
            <Alert
              severity="success"
              sx={{ mb: 3, borderRadius: 2, textAlign: "left" }}
            >
              <Typography variant="body2" fontWeight="medium" gutterBottom>
                How to use this QR code:
              </Typography>
              <Typography variant="caption" component="div">
                • Share this QR with anyone who wants to add money to your
                wallet
                <br />• They can scan it with any UPI app to make payment
                <br />• After payment, use "Add Money" feature with reference ID
              </Typography>
            </Alert>

            <Box
              sx={{
                display: "inline-block",
                p: 3,
                bgcolor: "white",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                mb: 3,
              }}
            >
              <img
                src={"/QRcode.jpg"}
                alt="Payment QR Code"
                style={{
                  width: 350,
                  height: 450,
                  display: "block",
                }}
              />
            </Box>

            <Paper
              elevation={0}
              sx={{
                bgcolor: "grey.50",
                p: 2,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="caption" color="text.secondary">
                  Payment UPI ID
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {siteUpiId}
                </Typography>
              </Box>
              <IconButton onClick={copyUpiId} size="small">
                <CopyIcon />
              </IconButton>
            </Paper>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={() => setQrDialog(false)}
              variant="contained"
              sx={{ borderRadius: 2, px: 4 }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Update PIN Dialog */}
        <Dialog
          open={updatePinDialog}
          onClose={() => setUpdatePinDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <PaymentIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Update Wallet PIN
                </Typography>
              </Box>
              <IconButton onClick={() => setUpdatePinDialog(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ pt: 2 }}>
            <Stack spacing={3}>
              <Alert severity="warning" sx={{ borderRadius: 2 }}>
                Your PIN is used to secure your wallet transactions. Please keep
                it safe and don't share it with anyone.
              </Alert>

              <TextField
                fullWidth
                label="Current PIN"
                type="password"
                value={oldPin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setOldPin(val);
                }}
                placeholder="Enter your current 4-digit PIN"
                inputProps={{
                  maxLength: 4,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="New PIN"
                type="password"
                value={newPin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setNewPin(val);
                }}
                placeholder="Enter your new 4-digit PIN"
                inputProps={{
                  maxLength: 4,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                helperText="Choose a strong 4-digit PIN that you can remember"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              <Paper
                elevation={0}
                sx={{
                  bgcolor: "info.50",
                  border: 1,
                  borderColor: "info.200",
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="info.main"
                  fontWeight="medium"
                  gutterBottom
                >
                  PIN Security Tips:
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="div"
                >
                  • Use a unique 4-digit combination
                  <br />
                  • Don't use obvious patterns like 1234 or 0000
                  <br />
                  • Keep your PIN confidential and secure
                  <br />• Remember your new PIN for future transactions
                </Typography>
              </Paper>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={() => {
                setUpdatePinDialog(false);
                setOldPin("");
                setNewPin("");
              }}
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdatePin}
              disabled={
                !oldPin || !newPin || oldPin.length !== 4 || newPin.length !== 4
              }
              startIcon={<PaymentIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                background: "linear-gradient(45deg, #2196f3 30%, #9c27b0 90%)",
              }}
            >
              Update PIN
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
