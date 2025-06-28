import type React from "react";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings as AdminIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../../utils/dataPoster";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: adminLogin,
    onSuccess: (res) => {
      if (res.success) {
        Cookies.set("adminToken", res.data.token, { expires: 7 });
        navigate("/admin/payment-approves");
        showToast("Login successful", "success");
      } else {
        showToast(res.message || "Login failed", "error");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      showToast("Please enter both username and password", "error");
      return;
    }
    mutate({ username, password });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          borderRadius: 3,
          boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            color: "white",
            p: 4,
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              width: 64,
              height: 64,
              mx: "auto",
              mb: 2,
            }}
          >
            <AdminIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Admin Portal
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Secure access to payment management
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Sign In
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your credentials to access the admin dashboard
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isPending}
              startIcon={<LoginIcon />}
              sx={{
                background: "linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)",
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                mb: 3,
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1a3366 30%, #245085 90%)",
                },
              }}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
