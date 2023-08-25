/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { sidebaritems } from "../constants/sidebaritems";
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Apartment, Cancel } from "@mui/icons-material";
import {
  MuiAppBar,
  DrawerHeader,
  MaterialUISwitch,
} from "../styles/navbarstyle";

const drawerWidth = 240;

export default function PersistentDrawerLeft({ toggleTheme, theme }) {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MuiAppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <Apartment />
              <Typography variant="h6" noWrap component="div">
                &nbsp;Builder&apos;s Need
              </Typography>
            </IconButton>
          </div>
          <Avatar alt="Remy Sharp" />
        </Toolbar>
      </MuiAppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DrawerHeader>
          <Apartment />
          <Typography variant="h6" noWrap>
            &nbsp;Builder&apos;s Need
          </Typography>
          &nbsp;&nbsp;
          <IconButton onClick={handleDrawerClose}>
            <Cancel />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebaritems.map((item, index) => (
            <ListItem key={item.title + index} disablePadding>
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton onClick={handleDrawerClose}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {item.title === "Dark Mode" ? (
                    <MaterialUISwitch
                      sx={{ m: 1 }}
                      onClick={toggleTheme}
                      checked={theme === "dark"}
                    />
                  ) : null}
                </ListItemButton>
              </Link>
              <Divider />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
