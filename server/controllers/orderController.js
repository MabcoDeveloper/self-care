import transporter from "../config/nodemailer.js";
import Order from "../models/Order.js";
import Product from "../models/Products.js";
import User from "../models/User.js";

//Global variable for payment

const currency = "usd";
const delivery_charges = 10; // 10 dollars
const taxPrecentage = 0.02; // 2% tax charges

// place order using COD [POST '/cod']
export const placedOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const { userId } = req.auth();

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "please add product first" });
    }

    // calculate amount using items
    let subtotal = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Product not found " });
      }

      // product.price is a Mongoose Map; use .get() or fallback to object access
      const unitPrice = (typeof product.price.get === 'function')
        ? product.price.get(item.size)
        : product.price[item.size];
      if (!unitPrice && unitPrice !== 0) {
        return res.json({ success: false, message: "Invalid size selected" });
      }

      subtotal += unitPrice * item.quantity;
    }

    // calculate total amount by adding tax and delivery charges

    const taxAmount = subtotal * taxPrecentage;
    const totalAmount = subtotal + taxAmount + delivery_charges;

    const order = await Order.create({
      userId,
      items,
      amount: totalAmount,
      address,
      PaymentMethod: "COD",
    });
    // clear user Cart after placing order

    await User.findByIdAndUpdate(userId, { cartData: {} });

    // send confirmation email for COD
  // In placedOrderCOD function:
const populatedOrder = await Order.findById(order._id).populate(
  "items.product address"  // Changed from "item.product" to "items.product"
);
    const user = await User.findById(userId);

    const productTitles = populatedOrder.items
      .map((item) => item.product?.title || "Unkown")
      .join(", ");
    const addressString = populatedOrder.address
      ? `${populatedOrder.address.street || "N/A"}, ${
          populatedOrder.address.city || "N/A"
        }, ${populatedOrder.address.state || "N/A"}, ${
          populatedOrder.address.country || "N/A"
        }`
      : "No address";

    const mailOption = {
      from: process.env.SMTP_SENDER_EMAIL,
      to: user.email,
      subject: "Order Details (COD)",
      html: `
      <h2>Your Delivery Details</h2>
      <p>Thank You For Your Order! Below Are Your Order Details: </p>
      <ul>
      <li><strong> Order ID : </strong>${populatedOrder._id}</li>
      <li><strong> Products Name : </strong>${productTitles}</li>
      <li><strong> Address : </strong>${addressString}</li>
      <li><strong> Total Amount : </strong>${process.env.CURRENCY || "$"}${
        populatedOrder.amount
      }</li>
      </ul>
      <p>You Will get your delivery in 1-2 days. pay on delivery.</p>
      `,
    };
    // send email in background, do not await to avoid blocking response on SMTP timeouts
    transporter.sendMail(mailOption)
      .then(() => console.log('Order confirmation email sent'))
      .catch((mailErr) => console.error('Failed to send order confirmation email:', mailErr.message));

    return res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
// place order using stripe [POST '/stripe']
export const placedOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const { userId } = req.auth();
    const { origin } = req.headers;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "please add product first" });
    }

    let subtotal = 0;
    let productData = [];
    // calculate subtotal and prepare productdata
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Product not found " });
      }

      // product.price is a Mongoose Map; use .get() or fallback to object access
      const unitPrice = (typeof product.price.get === 'function')
        ? product.price.get(item.size)
        : product.price[item.size];
      if (!unitPrice && unitPrice !== 0) {
        return res.json({ success: false, message: "Invalid size selected" });
      }

      subtotal += unitPrice * item.quantity;

      productData.push({
        name: product.title, // Ensure this matches the product Schema
        price: unitPrice,
        quantity: item.quantity,
      });
    }

    // calculate total amount by adding tax and delivery charges

    const taxAmount = subtotal * taxPrecentage;
    const totalAmount = subtotal + taxAmount + delivery_charges;
    // Create Order in DB and mark as paid since Stripe integration is skipped
    const order = await Order.create({
      userId,
      items,
      amount: totalAmount,
      address,
      PaymentMethod: "online",
      isPaid: true,
    });

    // Clear user's cart
    await User.findByIdAndUpdate(userId, { cartData: {} });

    // Send confirmation email similar to COD flow
    const populatedOrder = await Order.findById(order._id).populate(
      "item.product address"
    );
    const user = await User.findById(userId);

    const productTitles = populatedOrder.items
      .map((item) => item.product?.title || "Unkown")
      .join(", ");
    const addressString = populatedOrder.address
      ? `${populatedOrder.address.street || "N/A"}, ${populatedOrder.address.city || "N/A"}, ${populatedOrder.address.state || "N/A"}, ${populatedOrder.address.country || "N/A"}`
      : "No address";

    const mailOption = {
      from: process.env.SMTP_SENDER_EMAIL,
      to: user.email,
      subject: "Order Details",
      html: `
      <h2>Your Delivery Details</h2>
      <p>Thank You For Your Order! Below Are Your Order Details: </p>
      <ul>
      <li><strong> Order ID : </strong>${populatedOrder._id}</li>
      <li><strong> Products Name : </strong>${productTitles}</li>
      <li><strong> Address : </strong>${addressString}</li>
      <li><strong> Total Amount : </strong>${process.env.CURRENCY || "$"}${populatedOrder.amount}</li>
      </ul>
      <p>Your order is confirmed and will be processed shortly.</p>
      `,
    };
    // send email in background for online orders as well
    transporter.sendMail(mailOption)
      .then(() => console.log('Order confirmation email (online) sent'))
      .catch((mailErr) => console.error('Failed to send order confirmation email (online):', mailErr.message));

    // Return success to client
    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log("Stripe Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// All Orders data of a user [POST '/userorders']
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.auth();
    const orders = await Order.find({
      userId,
      $or: [{ PaymentMethod: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// All Orders data for Admin  [POST '/allOrders']
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ PaymentMethod: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (acc, o) => acc + (o.isPaid ? o.amount : 0),
      0
    );

    res.json({
      success: true,
      dashboardData: { totalOrders, totalRevenue, orders },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// update order status for the admin [POST '/status']
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
