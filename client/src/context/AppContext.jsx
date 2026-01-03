import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import { DummyProducts } from "../assets/data";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider = ( { children } ) =>
{
  const [ searchQuery, setSearchQuery ] = useState( "" );
  const [ products, setProducts ] = useState( [] );
  const { user } = useUser();
  const navigate = useNavigate();
  const currency = "$";

  //Cart:
  const [ cartItems, setCartItems ] = useState( {} );
  const [ method, setMethod ] = useState( "COD" );
  const delivery = 5; //five dollars
   //owner
  const [ isOwner, setIsOwner ] = useState( true );

  //adding products to the cart:
  const addToCart = (itemId, size) =>
  {
    if ( !size ) {return toast.error( "you have to select a size first" )}
    let cartInfo = structuredClone( cartItems )
    cartInfo[ itemId ] = cartInfo[ itemId ] || {}
    cartInfo[ itemId ][ size ] = ( cartInfo[ itemId ][ size ] || 0 ) + 1
    setCartItems( cartInfo )
    toast.success("Added to cart!");
  }

  //Cart Count:
  const cartCount = () =>
  {
    let count = 0 
    for ( const itemId in cartItems )
    {
      for ( const size in cartItems[ itemId ] )
      {
        count += cartItems[itemId][size]
      }
    }
    return count;
  }
  
  //Udating Cart Quantity:
  const updateQuantity = ( itemId, size, quantity ) =>
  {
    let cartData = structuredClone( cartItems )
    cartData[ itemId ][ size ] = quantity
    setCartItems(cartData)
  }

  //cart aount:
  const getCartAmount = () => {
  let total = 0;
  for (const itemId in cartItems) {
    const product = products.find(p => p._id === itemId);
        if (product) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[ itemId ][ size ];
        
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
    setProducts(DummyProducts);
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const value = { user, navigate, products, currency, searchQuery, setSearchQuery, cartItems, setCartItems, method, setMethod, delivery, addToCart, cartCount, updateQuantity, getCartAmount, isOwner, setIsOwner, fetchProducts };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const UseAppContext = () => useContext(AppContext);
