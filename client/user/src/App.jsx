import React from "react";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Home from "./components/Home";
import Orders from "./components/Orders";
import History from "./components/History";
import BottomBar from "./components/BottomBar/BottomBar";
import Signup from "./components/Accounts/Signup";
import SignIn from "./components/Accounts/SignIn";
import AboutUs from "./components/About/AboutUs";
import NavBar from "./components/NavBar/NavBar";
import Steel from "./components/Steel/Steel";
import SteelSellers from "./components/Steel/SteelSellers";
import SteelBuy from "./components/Steel/SteelBuy";
import Cart from "./components/UserCart/Cart";
import EmailInput from "./components/BecomeSeller/EmailInput";
import SellerType from "./components/BecomeSeller/SellerType";
import ProductSelection from "./components/BecomeSeller/ProductSelection";
import ToastProvider from "./components/Toast";

// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//   },
// });

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

function App() {
  const [queryClient] = React.useState(() => new QueryClient());
  // const [theme, setTheme] = React.useState("light");

  // const toggleTheme = (e) => {
  //   e.preventDefault();
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Router>
          {/* <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}> */}
          {/* <Sidebar toggleTheme={toggleTheme} theme={theme} /> */}
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route
              exact
              path="/becomeSeller/getEmail"
              element={<EmailInput />}
            />
            <Route
              exact
              path="/becomeSeller/sellerType"
              element={<SellerType />}
            />
            <Route
              exact
              path="/becomeSeller/productSelection"
              element={<ProductSelection />}
            />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/products/steel" element={<Steel />} />
            <Route
              exact
              path="/products/steel/sellers/:size"
              element={<SteelSellers />}
            />
            <Route
              exact
              path="/products/steel/sellers/:size/buy/:id"
              element={<SteelBuy />}
            />
            <Route exact path="/activeOrders" element={<Orders />} />
            <Route exact path="/history" element={<History />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/profile" element={<Home />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/signin" element={<SignIn />} />
          </Routes>
          <BottomBar />
          {/* </ThemeProvider> */}
        </Router>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
