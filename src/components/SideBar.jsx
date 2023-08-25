/* eslint-disable react/prop-types */
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Avatar,
} from "@mui/material";

import {
  Apartment,
  Cancel,
  Widgets,
  LocalShipping,
  WorkHistoryOutlined,
  AccountCircle,
  Info,
  ContactPage,
  DarkMode,
} from "@mui/icons-material";
import Items from "./Items";
import Orders from "./Orders";
import History from "./History";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const MuiAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function PersistentDrawerLeft({
  toggleTheme,
  theme,
  selectedIndex,
  setSelectedIndex,
}) {
  const [open, setOpen] = React.useState(false);

  const menuitem = [
    "Your Profile",
    "Items",
    "Your Orders",
    "History",
    "About Us",
    "Contact Us",
    "Dark Mode",
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
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
        variant="persistent"
        anchor="left"
        open={open}
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
          {menuitem.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleListItemClick(index)}>
                <ListItemIcon>
                  {index === 0 ? (
                    <AccountCircle />
                  ) : index === 1 ? (
                    <Widgets />
                  ) : index === 2 ? (
                    <LocalShipping />
                  ) : index === 3 ? (
                    <WorkHistoryOutlined />
                  ) : index === 4 ? (
                    <Info />
                  ) : index === 5 ? (
                    <ContactPage />
                  ) : index === 6 ? (
                    <DarkMode />
                  ) : null}
                </ListItemIcon>
                <ListItemText primary={text} />
                {index === 6 ? (
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    onClick={toggleTheme}
                    checked={theme === "dark"} // Ensure the switch reflects the current theme
                  />
                ) : null}
              </ListItemButton>
              <Divider />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        {selectedIndex === 1 && <Items />}
        {selectedIndex === 2 && <Orders />}
        {selectedIndex === 3 && <History />}
      </Main>
    </Box>
  );
}
