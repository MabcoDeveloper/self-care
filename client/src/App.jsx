import React from "react";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Blog from "./pages/Blog";
import Contact from "./pages/contact";
import Cart from "./pages/Cart";
import AddressForm from "./pages/AddressForm";
import Orders from "./pages/Orders";
import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "./context/AppContext";
import { ClerkProvider } from "@clerk/clerk-react";
import Sidebar from "./components/owner/Sidebar";
import AddProduct from "./pages/owner/AddProduct";
import Dashboard from "./pages/owner/Dashboard";
import ListProduct from "./pages/owner/ListProduct";
const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes("owner");
  return (
    <main className="overflow-hidden text-tertiary">
        {!isOwnerPath && <Header />}
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/Collection/:productId" element={<ProductDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/cart" element={<Cart />} />
          <Route path="/address-form" element={<AddressForm />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="owner" element={<Sidebar />}>   
            <Route index element={<Dashboard />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="list-product" element={<ListProduct />} />
          </Route>
        </Routes>
        {!isOwnerPath && <Footer />}
    </main>
  );
};
export default App;
