import { isObjectIdOrHexString } from "mongoose";
import User from "../models/User.js";
import Product from "../models/Products.js";

// adding to cart [POST '/add']
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const { userId } = req.auth();
    const userData = await User.findById(userId);
    const cartData = await userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// add to cart by product id [POST '/add-by-id']
export const addToCartById = async (req, res) => {
  try {
    const { productId, size: requestedSize, quantity = 1 } = req.body;
    const { userId } = req.auth();

    if (!productId) return res.json({ success: false, message: "productId is required" });

    // fetch product to determine default size if not provided
    const product = await Product.findById(productId);
    if (!product) return res.json({ success: false, message: "Product not found" });

    const size = requestedSize || (Array.isArray(product.size) && product.size.length > 0 ? product.size[0] : "default");

    const userData = await User.findById(userId);
    const cartData = (userData && userData.cartData) || {};

    cartData[productId] = cartData[productId] || {};
    cartData[productId][size] = (cartData[productId][size] || 0) + Number(quantity);

    await User.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//update the cart [POST '/update']
export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const { userId } = req.auth();

    const userData = await User.findById(userId);
    const cartData = await userData.cartData || {}; // intialize if undifined

    if (quantity <= 0) {
      delete cartData[itemId][size]; // delete only the specific size
      // clean up empty itemId objects 
      if (Object.keys(cartData[itemId]).length === 0)
        delete cartData[itemId]
    } else {
      cartData[itemId] = cartData[itemId] || {};
      cartData[itemId][size] = quantity;
    }
    await User.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
