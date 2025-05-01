import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  InputBase,
  Button,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import {
  Login,
  Logout,
  MenuOpen,
  Storefront,
  Widgets,
} from "@mui/icons-material";
import Cookies from "js-cookie";

// Styled search component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// Logo component
const Logo = styled(Typography)(() => ({
  fontWeight: 700,
  letterSpacing: ".5px",
  color: "inherit",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get("userToken"));

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(Cookies.get("userToken"));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const handleCategoryMenuOpen = (event) => {
  //   setCategoryMenuAnchor(event.currentTarget);
  // };

  // const handleCategoryMenuClose = () => {
  //   setCategoryMenuAnchor(null);
  // };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleNavigate = (path) => () => {
    setMobileDrawerOpen(false);
    handleMenuClose();
    navigate(path);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleNavigate("profile")}>Profile</MenuItem>
      <MenuItem onClick={handleNavigate("my-orders")}>My Orders</MenuItem>
      <MenuItem onClick={handleNavigate("/wishlist")}>Wishlist</MenuItem>
      <Divider />
      {token && (
        <MenuItem
          onClick={() => {
            Cookies.remove("userToken");
            navigate("/login");
          }}
        >
          Sign out
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {!token ? (
        <MenuItem onClick={handleNavigate("/login")}>
          <IconButton size="large" color="inherit">
            <Badge color="error">
              <Login />
            </Badge>
          </IconButton>
          <p>Sign In</p>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            Cookies.remove("userToken");
            navigate("/login");
          }}
        >
          <IconButton size="large" color="inherit">
            <Badge color="error">
              <Logout />
            </Badge>
          </IconButton>
          <p>Sign Out</p>
        </MenuItem>
      )}

      <MenuItem onClick={() => navigate("/cart")}>
        <IconButton size="large" color="inherit">
          <Badge color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>My Account</p>
      </MenuItem>
    </Menu>
  );

  const mobileDrawer = (
    <Drawer anchor="left" open={mobileDrawerOpen} onClose={toggleMobileDrawer}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleMobileDrawer}>
        <List>
          <ListItem>
            <Logo variant="h5">BUILDER&apos;S NEED</Logo>
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem component={Link} to="/wishlist">
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Wishlist" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/profile">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="default"
        sx={{ backgroundColor: "white" }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleMobileDrawer}
              sx={{ mr: 1 }}
            >
              <MenuOpen />
            </IconButton>
          )}
          <Logo variant="h5">BUILDER&apos;S NEED</Logo>
          {!isMobile && (
            <>
              <Button
                color="inherit"
                sx={{ ml: 3 }}
                LinkComponent={Link}
                to="/"
              >
                Products
              </Button>
            </>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                navigate(`?query=${e.target.value}`);
              }}
            />
          </Search>
          {/* badgeContent={getCartCount()} */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              color="inherit"
              LinkComponent={Link}
              to="https://seller-buildersneed.vercel.app"
              startIcon={<Storefront />}
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Seller
            </Button>
            {!token ? (
              <Button
                color="inherit"
                onClick={handleNavigate("/login")}
                startIcon={<Login />}
              >
                Sign In
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                startIcon={<Logout />}
                onClick={() => {
                  Cookies.remove("userToken");
                  navigate("/login");
                }}
              >
                Sign Out
              </Button>
            )}
            <Button
              color="inherit"
              component={Link}
              to="/cart"
              startIcon={<ShoppingCartIcon />}
            >
              Cart
            </Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Badge color="error">
                <Widgets />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {mobileDrawer}
      <Toolbar /> {/* Empty toolbar to create space */}
    </Box>
  );
};

export default Navbar;
