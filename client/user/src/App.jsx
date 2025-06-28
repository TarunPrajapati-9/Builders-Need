import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgetPassword";
import ToastProvider from "./context/ToastProvider";
import MyOrdersPage from "./pages/MyOrders";
import MyOrderDetailsPage from "./pages/OrderDetails";
import ProfilePage from "./pages/ProfilePage";
import Cart from "./pages/Cart";
import UserWallet from "./pages/MyWallet";
import AdminLogin from "./pages/admin/AdminLogin";
import { useLocation } from "react-router-dom";
import PaymentApproves from "./pages/admin/PaymentApproves";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  function AppContent() {
    const location = useLocation();
    const hideNavbar = location.pathname.startsWith("/admin");
    return (
      <>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-wallet" element={<UserWallet />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/my-orders/:orderId" element={<MyOrderDetailsPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/payment-approves" element={<PaymentApproves />} />
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
