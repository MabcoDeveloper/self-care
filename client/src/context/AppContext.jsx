import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from '@clerk/clerk-react';
import { DummyProducts } from "../assets/data";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
// Ensure browser sends Clerk session cookies to the backend so server-side Clerk middleware can read them
axios.defaults.withCredentials = true;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const currency = "$";

  //Cart:
  const [cartItems, setCartItems] = useState(() => {
    try {
      const cookie = Cookies.get("cart");
      return cookie ? JSON.parse(cookie) : {};
    } catch (e) {
      return {};
    }
  });
  const [method, setMethod] = useState("COD");
  const delivery = 5; //five dollars
  //owner
  const [isOwner, setIsOwner] = useState(true);

  //adding products to the cart:
  const addToCart = (itemId, size) => {
    if (!size) { return toast.error("you have to select a size first") }
    let cartInfo = structuredClone(cartItems)
    cartInfo[itemId] = cartInfo[itemId] || {}
    cartInfo[itemId][size] = (cartInfo[itemId][size] || 0) + 1
    setCartItems(cartInfo)
    toast.success("Added to cart!");
  }

  // persist cart to cookies whenever it changes
  useEffect(() => {
    try {
      Cookies.set("cart", JSON.stringify(cartItems), { expires: 7 });
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  //Cart Count:
  const cartCount = () => {
    let count = 0
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size]
      }
    }
    return count;
  }

  //Udating Cart Quantity:
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity
    setCartItems(cartData)

    if (user) {
      try {
        const { data } = await axios.post("/api/cart/update", { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${await getToken()}` } });

        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

  }

  //cart aount:
  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId);
      if (product) {
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];

          if (quantity > 0) {
            //Added a fallback (|| 0) to prevent NaN errors
            total += (product.price[size] || 0) * quantity;
          }
        }
      }
    }
    return total;
  };
  // القيمة اللي هتتبعت للـ context

  // fetch all products from backend, fallback to DummyProducts
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      if (data && data.success) {
        setProducts(data.products || []);
      } else {
        toast.error(data.message || "Failed to fetch products");
        setProducts(DummyProducts);
      }
    } catch (error) {
      // keep DummyProducts as a safe fallback so the UI remains populated
      toast.error(error.message || "Unable to reach server, using local data");
      setProducts(DummyProducts);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = { user, isSignedIn, navigate, products, currency, searchQuery, setSearchQuery, cartItems, setCartItems, method, setMethod, delivery, addToCart, cartCount, updateQuantity, getCartAmount, isOwner, setIsOwner, fetchProducts, axios, getToken };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => useContext(AppContext);
