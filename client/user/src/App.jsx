import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgetPassword";
import Cart from "./pages/cart";
import ToastProvider from "./context/ToastProvider";
import MyOrdersPage from "./pages/MyOrders";
import MyOrderDetailsPage from "./pages/OrderDetails";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  function AppContent() {
    // const location = useLocation();
    // const hideNavbar =
    //   location.pathname === "/register" ||
    //   location.pathname === "/login" ||
    //   location.pathname === "/forget-password";
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/my-orders/:orderId" element={<MyOrderDetailsPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
