import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { DummyProducts } from "../assets/data";
import toast from "react-hot-toast";
import axios from "axios";
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const currency = "$";

  // clerk
  const { getToken } = useAuth();

  // get the user profile
  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setIsOwner(data.role === "owner");
        setCartItems(data.cartData || {});
      } else {
        //retry fetch user details after 5 seconds
        setTimeout(() => {
          getUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Cart:
  const [cartItems, setCartItems] = useState({});
  const [method, setMethod] = useState("COD");
  const delivery = 5; //five dollars
  //owner
  const [isOwner, setIsOwner] = useState(true);

  //adding products to the cart:
  const addToCart = (itemId, size) => {
    if (!size) {
      return toast.error("you have to select a size first");
    }
    let cartInfo = structuredClone(cartItems);
    cartInfo[itemId] = cartInfo[itemId] || {};
    cartInfo[itemId][size] = (cartInfo[itemId][size] || 0) + 1;
    setCartItems(cartInfo);
    toast.success("Added to cart!");
  };

  //Cart Count:
  const cartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  //Udating Cart Quantity:
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  //cart aount:
  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
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

  // fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    user,
    navigate,
    products,
    currency,
    searchQuery,
    setSearchQuery,
    cartItems,
    setCartItems,
    method,
    setMethod,
    delivery,
    addToCart,
    cartCount,
    updateQuantity,
    getCartAmount,
    isOwner,
    setIsOwner,
    fetchProducts,
    axios,
    getToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => useContext(AppContext);
