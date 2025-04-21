import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { User } from "../../types/order";

interface CustomerInfoCardProps {
  customer: User;
}

const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({ customer }) => {
  if (!customer || !customer.name) {
    return <Typography variant="body2">Customer info not available</Typography>;
  }

  return (
    <>
      {customer && (
        <Card
          sx={{
            boxShadow: 2,
            mb: 3,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 3,
            },
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 40,
                  height: 40,
                  mr: 2,
                }}
              >
                {customer?.name.charAt(0) || "N/A"}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {customer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Customer
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body2">
                  {customer?.email || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Phone
                </Typography>
                <Typography variant="body2">
                  {customer?.phoneNumber || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Shipping Address
                </Typography>
                <Typography variant="body2">
                  {customer?.address || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Pincode: {customer?.pincode || "N/A"}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CustomerInfoCard;
