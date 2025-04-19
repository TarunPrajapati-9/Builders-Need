import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../context/ToastContext";
import { getSingleItem } from "../utils/Items/dataGetter";
import { updateItem } from "../utils/Items/dataPutter";

const CATEGORIES = [
  "Flooring",
  "Plumbing",
  "Concrete&Masonry",
  "Electrical&Lighting",
  "Other",
];

export default function EditItem() {
  const { itemId } = useParams(); // get id from URL
  const navigate = useNavigate();
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
    existingImageUrl: "",
  });

  const [fieldErrors, setFieldErrors] = useState({}); // this will store error messages for each field

  const { data, isLoading } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getSingleItem(itemId),
  });

  const item = data?.data;

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        discount: item.discount,
        imageFile: null,
        imagePreview: item.imageUrl,
        existingImageUrl: item.imageUrl,
      });
    }
  }, [item]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateItem,
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

    // clear error for this field as user types
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields manually
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.price) newErrors.price = "Price is required.";
    if (!formData.quantity) newErrors.quantity = "Quantity is required.";

    setFieldErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // Stop submit if any error exists

    try {
      let imageUrl = formData.existingImageUrl;

      if (formData.imageFile) {
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
        const imageJson = await uploadResponse.json();
        imageUrl = imageJson.secure_url;
      }

      const itemData = {
        id: itemId,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        discount: Number(formData.discount),
        imageUrl: imageUrl,
      };

      mutate(itemData);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Box sx={{ p: 3, mx: "auto" }}>
      <Typography variant="h5" component="h1" sx={{ mb: 2 }} fontWeight="bold">
        Edit Item
      </Typography>

      <Card>
        <CardContent>
          {isLoading ? (
            <Typography>Loading item data...</Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                error={Boolean(fieldErrors.name)}
                helperText={fieldErrors.name}
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
                error={Boolean(fieldErrors.description)}
                helperText={fieldErrors.description}
              />

              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                margin="normal"
                error={Boolean(fieldErrors.category)}
                helperText={fieldErrors.category}
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
                error={Boolean(fieldErrors.price)}
                helperText={fieldErrors.price}
              />

              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                margin="normal"
                error={Boolean(fieldErrors.quantity)}
                helperText={fieldErrors.quantity}
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
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />

              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2, height: 56 }}
              >
                Upload New Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              {formData.imagePreview && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: 200 }}
                  />
                </Box>
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
                  {isPending ? "Updating..." : "Update Item"}
                </Button>
              </Box>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
