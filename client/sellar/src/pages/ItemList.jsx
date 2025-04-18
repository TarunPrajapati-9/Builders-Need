import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Rating,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

export default function ItemList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Add your fetch items API call here
    // const fetchItems = async () => {
    //   const response = await getItems()
    //   setItems(response.data)
    // }
    // fetchItems()

    // Temporary mock data
    setItems([
      {
        id: 1,
        name: "Sample Item",
        description: "This is a sample item description",
        category: "Flooring",
        imageUrl: "https://via.placeholder.com/300",
        price: 99.99,
        quantity: 50,
        discount: 10,
        ratings: [4, 5, 3],
        status: "active",
      },
    ]);
  }, []);

  const getAverageRating = (ratings) => {
    if (!ratings.length) return 0;
    return ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "out-of-stock":
        return "error";
      case "discontinued":
        return "default";
      default:
        return "primary";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Your Items
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/add-item")}
        >
          Add New Item
        </Button>
      </Box>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.imageUrl}
                alt={item.name}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="h6" component="h2" gutterBottom>
                    {item.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/edit-item/${item.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {item.description}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Chip label={item.category} size="small" />
                  <Chip
                    label={item.status}
                    size="small"
                    color={getStatusColor(item.status)}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Rating
                    value={getAverageRating(item.ratings)}
                    readOnly
                    precision={0.5}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({item.ratings.length})
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6" component="span" color="primary">
                      ${item.price}
                    </Typography>
                    {item.discount > 0 && (
                      <Typography variant="body2" color="error" sx={{ ml: 1 }}>
                        -{item.discount}%
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2">
                    Stock: {item.quantity}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
