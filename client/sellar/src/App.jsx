import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import ToastProvider from "./context/ToastProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgetPassword";
import AddItem from "./pages/AddItem";
import ItemList from "./pages/ItemList";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/NavBar";
import EditItem from "./pages/EditItem";
import ProfilePage from "./pages/ProfilePage";
import MyOrders from "./pages/MyOrder";
import OrderDetailsPage from "./pages/OrderDetails";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  function AppContent() {
    const location = useLocation();
    const hideNavbar =
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/forgot-password";

    return (
      <>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes Group */}
          <Route element={<ProtectedRoute />}>
            <Route path="/items" element={<ItemList />} />
            <Route path="/edit-item/:itemId" element={<EditItem />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/my-orders/:orderId" element={<OrderDetailsPage />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </>
    );
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
