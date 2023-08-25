import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "./components/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Items from "./components/Items";
import Home from "./components/Home";
import Orders from "./components/Orders";
import History from "./components/History";

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
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Sidebar
        toggleTheme={toggleTheme}
        theme={theme}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      {}
      {selectedIndex === -1 || selectedIndex === 6 ? <Home /> : ""}
    </ThemeProvider>
  );
}

export default App;
