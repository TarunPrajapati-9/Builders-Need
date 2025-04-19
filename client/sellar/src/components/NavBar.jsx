import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Store,
  Package,
  PlusCircle,
  ShoppingCart,
  UserCircle,
  LogOut,
  Menu as MenuIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // Define nav items to reduce repetition
  const navItems = [
    { to: "/items", text: "Your Items", icon: <Package size={24} /> },
    { to: "/add-item", text: "Add Items", icon: <PlusCircle size={24} /> },
    { to: "/my-orders", text: "My Orders", icon: <ShoppingCart size={24} /> },
    { to: "/profile", text: "Profile", icon: <UserCircle size={24} /> },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Remove all cookies
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    navigate("/login");
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const sidebarContent = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem component={Link} to={item.to} key={item.to}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem onClick={handleLogout}>
          <ListItemIcon>
            <LogOut size={24} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff" }}>
      <Toolbar>
        {/* Logo Part */}
        <Store size={32} color="#1976d2" />
        <Typography
          variant="h6"
          component="div"
          sx={{ ml: 2, color: "#1976d2" }}
        >
          Builder&apos;s Need <Typography>Seller</Typography>
        </Typography>

        {/* Empty space to push buttons to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Mobile View - Hamburger Menu Icon on Right Side */}
        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
            sx={{ color: "#1976d2" }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            {/* Desktop View - Navigation Buttons */}
            <Box sx={{ ml: 4, flexGrow: 0 }}>
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  startIcon={item.icon}
                  sx={{ color: "#555", mr: 2 }}
                  component={Link}
                  to={item.to}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            {/* Desktop View - Avatar Profile Icon */}
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#1976d2" }}>
                S
              </Avatar>
            </IconButton>
          </>
        )}
      </Toolbar>

      {/* Dropdown Menu for Profile */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout}>
          <LogOut size={20} style={{ marginRight: 8 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Drawer for Mobile Sidebar */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        {sidebarContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
