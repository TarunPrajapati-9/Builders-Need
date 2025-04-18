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

const CATEGORIES = [
  "Flooring",
  "Plumbing",
  "Concrete&Masonry",
  "Electrical&Lighting",
  "Other",
];

export default function AddItem() {
  const navigate = useNavigate();
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
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
    setLoading(true);
    try {
      if (!formData.imageFile) {
        throw new Error("Please select an image");
      }

      // Upload image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", formData.imageFile);
      imageData.append("upload_preset", "your_upload_preset"); // Replace with your upload preset

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Replace with your cloud name
        {
          method: "POST",
          body: imageData,
        }
      );
      const imageJson = await uploadResponse.json();

      // Create item with uploaded image URL
      const itemData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        discount: Number(formData.discount),
        imageUrl: imageJson.secure_url,
      };

      // Add your create item API call here
      // await createItem(itemData)

      navigate("/items");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
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
              required
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
              required
            />

            <TextField
              fullWidth
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              margin="normal"
              required
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
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              margin="normal"
              required
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
            />

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2, height: 56 }}
            >
              Upload Image
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

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
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
                disabled={loading}
                sx={{ flex: 2 }}
              >
                {loading ? "Adding..." : "Add Item"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
