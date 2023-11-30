/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { sidebaritems } from "../../constants/sidebaritems";
import {
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Apartment } from "@mui/icons-material";
import { DrawerHeader, MaterialUISwitch } from "../../styles/navbarstyle";
import ProfilePopper from "../ProfilePopper";

export default function SideBar({ toggleTheme, theme }) {
  const [open, setOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleProfileModalOpen = (event) => {
    setProfileModalOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleProfileModalClose = () => {
    setProfileModalOpen(false);
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DrawerHeader>
        <Apartment />
        <Typography variant="h6" noWrap>
          &nbsp;Builder&apos;s Need
        </Typography>
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
    </>
  );
}
