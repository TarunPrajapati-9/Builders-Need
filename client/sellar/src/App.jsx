import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import ToastProvider from "./context/ToastProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgetPassword";
import AddItem from "./pages/AddItem";
import ItemList from "./pages/ItemList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  function AppContent() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <ItemList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-item"
            element={
              <ProtectedRoute>
                <AddItem />
              </ProtectedRoute>
            }
          />
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
