import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import EmailInput from "./components/BecomeSeller/EmailInput";
import SellerType from "./components/BecomeSeller/SellerType";
import ProductSelection from "./components/BecomeSeller/ProductSelection";
import ToastProvider from "./components/Toast";
import Home from "./components/Home";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
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
          </Routes>
        </Router>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
