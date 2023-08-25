import * as React from "react";

import {
  Apartment,
  Widgets,
  LocalShipping,
  WorkHistoryOutlined,
  AccountCircle,
  Info,
  ContactPage,
  DarkMode,
} from "@mui/icons-material";

export const sidebaritems = [
  {
    title: "Home",
    path: "/",
    icon: <Apartment />,
  },
  {
    title: "Items",
    path: "items",
    icon: <Widgets />,
  },
  {
    title: "Active Orders",
    path: "activeOrders",
    icon: <LocalShipping />,
  },
  {
    title: "History",
    path: "history",
    icon: <WorkHistoryOutlined />,
  },
  {
    title: "About",
    path: "about",
    icon: <Info />,
  },
  {
    title: "Contact Us",
    path: "contact",
    icon: <ContactPage />,
  },
  {
    title: "Profile",
    path: "profile",
    icon: <AccountCircle />,
  },
  {
    title: "Dark Mode",
    path: "/",
    icon: <DarkMode />,
  },
];
