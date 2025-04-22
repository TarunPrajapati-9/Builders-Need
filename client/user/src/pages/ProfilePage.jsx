import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { Edit, Save, X, Phone, Mail, MapPin } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../context/ToastContext";
import { getProfile } from "../utils/dataGetter";
import Cookies from "js-cookie";
import LoginPrompt from "../components/LoginPrompt";

const ProfilePage = () => {
  const token = Cookies.get("userToken");
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: getProfile,
    enabled: !!token,
  });

  const { mutate, isPending } = useMutation({
    // mutationFn: updateUserProfile,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        queryClient.invalidateQueries(["UserProfile"]);
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const profile = data?.data?.user || {};

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
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (data) => {
    const err = {};
    if (!data.name.trim()) err.name = "Name is required.";
    if (!data.email.trim()) {
      err.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      err.email = "Invalid email format.";
    }
    if (!data.phoneNumber.trim()) {
      err.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(data.phoneNumber)) {
      err.phoneNumber = "Phone must be 10 digits.";
    }
    if (!data.address.trim()) err.address = "Address is required.";
    if (!data.pincode) err.pincode = "Pincode is required.";
    return err;
  };

  if (isLoading || isPending) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!data?.success || !data?.data?.user) {
    return <LoginPrompt />;
  }

  return (
    <Box sx={{ margin: "auto", padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 100, height: 100 }}>
              {profile.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h5" fontWeight="bold">
              {profile.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              User Profile
            </Typography>
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
                  label="Phone Number"
                  value={editedProfile.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  error={Boolean(errors.phoneNumber)}
                  helperText={errors.phoneNumber}
                />
                <TextField
                  fullWidth
                  label="Address"
                  value={editedProfile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  error={Boolean(errors.address)}
                  helperText={errors.address}
                />
                <TextField
                  fullWidth
                  label="Pincode"
                  type="number"
                  value={editedProfile.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                  error={Boolean(errors.pincode)}
                  helperText={errors.pincode}
                />
              </Box>
            ) : (
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Mail size={16} />
                  <Typography>{profile.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Phone size={16} />
                  <Typography>{profile.phoneNumber}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <MapPin size={16} />
                  <Typography>
                    {profile.address} - {profile.pincode}
                  </Typography>
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
                Last Updated
              </Typography>
              <Typography>
                {new Date(profile.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Update</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to save these changes?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="error">
              Cancel
            </Button>
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
