import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Edit,
  Save,
  X,
  Star,
  MapPin,
  Phone,
  Mail,
  Building,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "../utils/Profile/dataGetter";
import { updateProfile } from "../utils/Profile/dataPutter";
import { useToast } from "../context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        queryClient.invalidateQueries(["Profile"]); // Refresh profile data
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });
  // console.log(data);
  const profile = data?.data?.seller || {};
  // console.log(profile);

  const [editedProfile, setEditedProfile] = useState(profile);
  const [errors, setErrors] = useState({});

  const handleEdit = () => {
    setEditedProfile(profile);
    setErrors({});
    setIsEditing(true);
  };

  const handleSave = () => {
    const newErrors = validateForm(editedProfile);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setOpenDialog(true);
  };

  const confirmSave = () => {
    setIsEditing(false);
    setOpenDialog(false);
    mutate(editedProfile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    setErrors({});
  };

  const handleChange = (field, value) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error on typing
  };

  const validateForm = (data) => {
    const err = {};
    if (!data.name.trim()) err.name = "Name is required.";
    if (!data.email.trim()) {
      err.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      err.email = "Invalid email format.";
    }
    if (!data.phone.trim()) {
      err.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(data.phone)) {
      err.phone = "Phone must be 10 digits.";
    }
    if (!data.location.trim()) err.location = "Location is required.";
    if (!data.sellerType.trim()) err.sellerType = "Seller type is required.";
    return err;
  };

  if (isLoading || isPending) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <Alert severity="error">
          {error?.response?.data?.message || "Something went wrong!"}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ margin: "auto", padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={profile.profileImage}
              alt={profile.name}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h5" fontWeight="bold">
              {profile.name}
              {profile.isVerified && (
                <Chip
                  label="Verified"
                  color="success"
                  size="small"
                  sx={{ ml: 2 }}
                />
              )}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              <Building size={16} style={{ marginRight: 5 }} />
              {profile.sellerType.charAt(0).toUpperCase() +
                profile.sellerType.slice(1)}
            </Typography>
            <Box display="flex" gap={2} mt={1}>
              <Chip
                label={profile.status}
                color={profile.status === "active" ? "success" : "warning"}
                size="small"
              />
              <Box display="flex" alignItems="center" gap={1}>
                <Star size={16} color="#facc15" />
                <Typography variant="body2">
                  {profile.rating.toFixed(1)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            {!isEditing ? (
              <Button
                variant="outlined"
                startIcon={<Edit size={18} />}
                onClick={handleEdit}
              >
                Edit Profile
              </Button>
            ) : (
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<X size={18} />}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save size={18} />}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={4} mt={3}>
          <Grid item xs={12} md={6}>
            {isEditing ? (
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  fullWidth
                  label="Email"
                  disabled
                  value={editedProfile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <TextField
                  fullWidth
                  label="Name"
                  value={editedProfile.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  value={editedProfile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
                <FormControl fullWidth error={Boolean(errors.location)}>
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={editedProfile.location}
                    label="Location"
                    onChange={(e) => handleChange("location", e.target.value)}
                  >
                    <MenuItem value="SURAT">SURAT</MenuItem>
                    <MenuItem value="AHMADABAD">AHMADABAD</MenuItem>
                    <MenuItem value="VADODARA">VADODARA</MenuItem>
                    <MenuItem value="RAJKOT">RAJKOT</MenuItem>
                  </Select>
                  {errors.location && (
                    <Typography color="error" variant="caption">
                      {errors.location}
                    </Typography>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(errors.sellerType)}>
                  <InputLabel>Seller Type</InputLabel>
                  <Select
                    value={editedProfile.sellerType}
                    label="Seller Type"
                    onChange={(e) => handleChange("sellerType", e.target.value)}
                  >
                    <MenuItem value="manufacturer">Manufacturer</MenuItem>
                    <MenuItem value="distributor">Distributor</MenuItem>
                  </Select>
                  {errors.sellerType && (
                    <Typography color="error" variant="caption">
                      {errors.sellerType}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            ) : (
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Mail size={16} />
                  <Typography>{profile.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Phone size={16} />
                  <Typography>{profile.phone}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <MapPin size={16} />
                  <Typography>{profile.location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Building size={16} />
                  <Typography>{profile.sellerType}</Typography>
                </Box>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              sx={{ padding: 2, backgroundColor: "#f9fafb" }}
            >
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member Since
              </Typography>
              <Typography>
                {new Date(profile.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Account Status
              </Typography>
              <Chip
                label={profile.status}
                color={profile.status === "active" ? "success" : "warning"}
                size="small"
              />
              <Typography variant="body2" color="text.secondary" mt={2}>
                Verification Status
              </Typography>
              <Chip
                label={profile.isVerified ? "Verified" : "Unverified"}
                color={profile.isVerified ? "success" : "default"}
                size="small"
              />
            </Paper>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Changes</DialogTitle>
          <DialogContent>
            Are you sure you want to save these changes to your profile?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={confirmSave} variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
