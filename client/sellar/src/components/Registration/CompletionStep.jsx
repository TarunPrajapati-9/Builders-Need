import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StoreIcon from "@mui/icons-material/Store";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../utils/Profile/dataGetter";

export default function CompletionStep() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
  });
  console.log(data);
  const seller = data?.data?.seller || {};
  console.log(seller);

  if (isLoading) {
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "success.main",
              mb: 2,
              animation: "scaleIn 0.5s ease-out",
              "@keyframes scaleIn": {
                "0%": {
                  transform: "scale(0)",
                },
                "60%": {
                  transform: "scale(1.2)",
                },
                "100%": {
                  transform: "scale(1)",
                },
              },
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 50 }} />
          </Avatar>

          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, textAlign: "center" }}
          >
            Registration Successful!
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Your seller account has been created successfully. You can now
            access your seller dashboard.
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "background.default",
            borderRadius: 2,
            p: 2,
            mb: 4,
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Account Information
          </Typography>

          <List dense>
            <ListItem>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Name"
                secondary={seller.name || "N/A"}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
                secondaryTypographyProps={{ variant: "body1", fontWeight: 500 }}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Email"
                secondary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {seller.email || "N/A"}
                    <VerifiedIcon
                      color="success"
                      sx={{ ml: 1, fontSize: 18 }}
                    />
                  </Box>
                }
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
                secondaryTypographyProps={{ variant: "body1", fontWeight: 500 }}
              />
            </ListItem>

            <Divider component="li" sx={{ my: 1 }} />

            <ListItem>
              <ListItemIcon>
                <LocationOnIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Location"
                secondary={seller.location || "N/A"}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
                secondaryTypographyProps={{ variant: "body1", fontWeight: 500 }}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <StoreIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Seller Type"
                secondary={
                  seller.sellerType.charAt(0).toUpperCase() +
                    seller.sellerType.slice(1) || "N/A"
                }
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
                secondaryTypographyProps={{ variant: "body1", fontWeight: 500 }}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <PhoneIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Phone"
                secondary={seller.phone || "N/A"}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
                secondaryTypographyProps={{ variant: "body1", fontWeight: 500 }}
              />
            </ListItem>
          </List>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          href="/items"
          sx={{
            height: 56,
            fontSize: "1rem",
            fontWeight: 500,
            boxShadow: (theme) => theme.shadows[4],
            "&:hover": {
              boxShadow: (theme) => theme.shadows[8],
            },
          }}
        >
          Go to Seller Dashboard
        </Button>
      </CardContent>
    </Card>
  );
}
