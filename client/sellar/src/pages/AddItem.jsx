import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../context/ToastContext";
import { addItem } from "../utils/Items/dataPoster";
import FullScreenLoader from "../components/FullScreenLoader";

const CATEGORIES = [
  "Flooring",
  "Plumbing",
  "Concrete&Masonry",
  "Electrical&Lighting",
  "Other",
];

export default function AddItem() {
  const navigate = useNavigate();
  const [imageUploading, setImageUploading] = useState(false);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    discount: "0",
    imageFile: null,
    imagePreview: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const { mutate, isPending } = useMutation({
    mutationFn: addItem,
    onSuccess: (res) => {
      if (res.success) {
        showToast(res.message, "success");
        navigate("/items");
      } else {
        showToast("Error: " + res.message, "error");
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
      setFormErrors((prev) => ({ ...prev, imageFile: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.description.trim())
      errors.description = "Description is required.";
    if (!formData.category) errors.category = "Please select a category.";
    if (!formData.price || Number(formData.price) <= 0)
      errors.price = "Enter a valid price.";
    if (!formData.quantity || Number(formData.quantity) < 0)
      errors.quantity = "Enter a valid quantity.";
    if (Number(formData.discount) < 0)
      errors.discount = "Discount can't be negative.";
    if (!formData.imageFile) errors.imageFile = "Please upload an image.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setImageUploading(true);
      const imageData = new FormData();
      imageData.append("file", formData.imageFile);
      imageData.append("upload_preset", "buildersneed");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dfkodomj0/image/upload",
        {
          method: "POST",
          body: imageData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Image upload failed. Please try again.");
      }

      const imageJson = await uploadResponse.json();

      const itemData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        discount: Number(formData.discount),
        imageUrl: imageJson.secure_url,
      };
      setImageUploading(false);
      mutate(itemData);
    } catch (err) {
      setFormErrors({ general: err.message });
    }
  };
  if (isPending || imageUploading) {
    return <FullScreenLoader />;
  }
  return (
    <Box sx={{ p: 3, mx: "auto" }}>
      <Typography variant="h5" component="h1" sx={{ mb: 2 }} fontWeight="bold">
        Add New Item
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              error={!!formErrors.name}
              helperText={formErrors.name}
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              error={!!formErrors.description}
              helperText={formErrors.description}
            />

            <TextField
              fullWidth
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              margin="normal"
              error={!!formErrors.category}
              helperText={formErrors.category}
            >
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              error={!!formErrors.price}
              helperText={formErrors.price}
            />

            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              margin="normal"
              error={!!formErrors.quantity}
              helperText={formErrors.quantity}
            />

            <TextField
              fullWidth
              label="Discount"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              error={!!formErrors.discount}
              helperText={formErrors.discount}
            />

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2, height: 56 }}
              error={!!formErrors.imageFile}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {formErrors.imageFile && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {formErrors.imageFile}
              </Typography>
            )}

            {formData.imagePreview && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: 200 }}
                />
              </Box>
            )}

            {formErrors.general && (
              <Typography color="error" sx={{ mt: 2 }}>
                {formErrors.general}
              </Typography>
            )}

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/items")}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={isPending}
                sx={{ flex: 2 }}
              >
                {isPending ? "Adding..." : "Add Item"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
