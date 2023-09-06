import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "./components/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Items from "./components/Items";
import Home from "./components/Home";
import Orders from "./components/Orders";
import History from "./components/History";
import BottomBar from "./components/BottomBar/BottomBar";
import Signup from "./components/Accounts/Signup";
import SignIn from "./components/Accounts/SignIn";
import AboutUs from "./components/AboutUs";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Sidebar toggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/items" element={<Items />} />
          <Route exact path="/activeOrders" element={<Orders />} />
          <Route exact path="/history" element={<History />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/contact" element={<Items />} />
          <Route exact path="/profile" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<SignIn />} />
        </Routes>
        <BottomBar />
      </ThemeProvider>
    </Router>
  );
}

export default App;
