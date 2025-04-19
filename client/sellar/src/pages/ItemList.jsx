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
import { useQuery } from "@tanstack/react-query";
import { getSellerItems } from "../utils/Items/dataGetter";
import { Delete } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { deleteItem } from "../utils/Items/dataPutter";

export default function ItemList() {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["items"],
    queryFn: getSellerItems,
  });

  const sellerItems = data?.data || [];

  const queryClient = useQueryClient();

  const { mutate: deleteItemMutate } = useMutation({
    mutationFn: deleteItem,
    onSuccess: (res) => {
      if (res.success) {
        Swal.fire(
          "Deleted!",
          res.message || "Item has been deleted.",
          "success"
        );
        queryClient.invalidateQueries(["items"]); // Refresh item list
      } else {
        Swal.fire("Error", res.message || "Failed to delete item.", "error");
      }
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong while deleting.", "error");
    },
  });

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItemMutate(id);
      }
    });
  };

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
        <Typography
          variant="h5"
          component="h1"
          sx={{ mb: 2 }}
          fontWeight="bold"
        >
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
        {isError ? (
          <Typography
            variant="body1"
            color="error"
            textAlign="center"
            sx={{ width: "100%" }}
          >
            {error.message || "Error fetching items"}
          </Typography>
        ) : isLoading ? (
          <Typography variant="body1" textAlign="center" sx={{ width: "100%" }}>
            Loading items...
          </Typography>
        ) : sellerItems.length === 0 ? (
          <Typography variant="body1" textAlign="center" sx={{ width: "100%" }}>
            No items found. Please add some items.
          </Typography>
        ) : (
          sellerItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item._id || index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imageUrl || ""}
                  alt={item.name || "Item Image"}
                  style={{
                    objectFit: "contain",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
                <CardContent sx={{ userSelect: "none" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* Item Name */}
                    <Typography
                      variant="h6"
                      component="h2"
                      gutterBottom
                      sx={{
                        maxWidth: "270px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name || "N/A"}
                    </Typography>

                    {/* Edit & Delete Buttons */}
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigate(`/edit-item/${item._id || index}`)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteItem(item._id || index)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {item.description || "N/A"}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Chip label={item.category} size="small" />
                    <Chip
                      label={item.status || "N/A"}
                      size="small"
                      color={getStatusColor(item.status || "")}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Rating
                      value={getAverageRating(item.ratings || [])}
                      readOnly
                      precision={0.5}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({item.ratings.length || 0})
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
                        ₹{item.price || "0.00"}
                      </Typography>
                      {item.discount > 0 && (
                        <Typography
                          variant="body2"
                          color="error"
                          sx={{ ml: 1 }}
                        >
                          -{item.discount || 0}%
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="body2">
                      Stock: {item.quantity || "N/A "}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
