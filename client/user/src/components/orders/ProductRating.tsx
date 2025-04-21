import React from "react";
import {
  Box,
  Rating,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Star } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rateProduct } from "../../utils/dataGetter";

interface ProductRatingProps {
  productId: string;
  productName: string;
  currentRating: number[];
  onRatingSubmit?: () => void;
}

const ProductRating: React.FC<ProductRatingProps> = ({
  productId,
  productName,
  currentRating,
  onRatingSubmit,
}) => {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState<number | null>(null);
  const queryClient = useQueryClient();

  const averageRating =
    currentRating.length > 0
      ? currentRating.reduce((a, b) => a + b, 0) / currentRating.length
      : 0;

  const rateMutation = useMutation({
    mutationFn: ({
      productId,
      rating,
    }: {
      productId: string;
      rating: number;
    }) => rateProduct(productId, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      if (onRatingSubmit) {
        onRatingSubmit();
      }
      setOpen(false);
    },
  });

  const handleRatingSubmit = () => {
    if (rating !== null) {
      rateMutation.mutate({ productId, rating });
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating
            value={averageRating}
            precision={0.1}
            size="medium"
            readOnly
          />

          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({currentRating.length})
          </Typography>
        </Box>
        <Button size="small" onClick={() => setOpen(true)} variant="outlined">
          Rate Product
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Rate {productName}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 2,
            }}
          >
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
              icon={<Star fill="currentColor" />}
              emptyIcon={<Star />}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {rating === null
                ? "Select your rating"
                : `You rated ${rating} star${rating !== 1 ? "s" : ""}`}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleRatingSubmit}
            disabled={rating === null || rateMutation.isPending}
            variant="contained"
          >
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductRating;
