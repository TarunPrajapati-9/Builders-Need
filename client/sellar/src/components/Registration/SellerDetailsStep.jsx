import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  InputAdornment,
  IconButton,
  Grid,
  Stack,
  FormHelperText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StoreIcon from "@mui/icons-material/Store";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { registerSeller } from "../../utils/dataPoster";
import { useToast } from "../../context/ToastContext";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

// Define possible options
const locations = ["SURAT", "AHMADABAD", "VADODARA", "RAJKOT"];
const sellerTypes = ["distributor", "manufacturer"];

SellerDetailsStep.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default function SellerDetailsStep({ onNext }) {
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    location: "",
    sellerType: "",
    phone: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerSeller,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        Cookies.set("sellerToken", res.data.token);
        onNext();
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.location) {
      newErrors.location = "Please select a location";
    }

    if (!formData.sellerType) {
      newErrors.sellerType = "Please select a seller type";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const email = Cookies.get("email");
    if (!email) {
      navigate("/");
    }

    const finalData = {
      ...formData,
      email: email,
    };

    console.log("Submitted Data:", finalData);
    mutate(finalData);
  };

  return (
    <Card
      sx={{
        overflow: "visible",
        opacity: 0,
        transform: "translateY(20px)",
        animation: "fadeInUp 0.5s forwards",
        "@keyframes fadeInUp": {
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, textAlign: "center", mb: 3 }}
        >
          Complete Your Profile
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: "center" }}
        >
          Tell us about your business to set up your seller account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                required
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
              />
              <FormHelperText sx={{ ml: 1.5 }}>
                Must be at least 8 characters long
              </FormHelperText>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Location"
                name="location"
                variant="outlined"
                value={formData.location}
                onChange={handleChange}
                error={!!errors.location}
                helperText={errors.location}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                {locations.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Seller Type"
                name="sellerType"
                variant="outlined"
                value={formData.sellerType}
                onChange={handleChange}
                error={!!errors.sellerType}
                helperText={errors.sellerType}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <StoreIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                {sellerTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            {/* <Button
              variant="outlined"
              onClick={onBack}
              startIcon={<ArrowBackIcon />}
              sx={{ flex: 1 }}
            >
              Back
            </Button> */}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isPending}
              endIcon={<CheckCircleIcon />}
              sx={{
                flex: 2,
                height: 56,
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  animation: isPending ? "shimmer 1.5s infinite" : "none",
                },
                "@keyframes shimmer": {
                  "0%": { transform: "translateX(-100%)" },
                  "100%": { transform: "translateX(100%)" },
                },
              }}
            >
              {isPending ? "Submitting..." : "Complete Registration"}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
