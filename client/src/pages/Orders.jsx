import React, { useEffect, useState } from "react";
import Titel from "../components/Titel";
import { UseAppContext } from "../context/AppContext";

const Orders = () => {
  const { user, currency, axios, getToken } = UseAppContext();
  const [orders, setOrders] = useState([]);

  const loadOrdersData = async () => {
    if (!user) return;
    try {
      const { data } = await axios.post(
        "/api/orders/userorders",
        {},
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      loadOrdersData();
    }
  }, [user]);

  // Format payment method for display
  const formatPaymentMethod = (method) => {
    if (!method) return "COD";
    if (method.toLowerCase().includes("card")) return "Card";
    if (method.toLowerCase().includes("paypal")) return "PayPal";
    return method;
  };

  const formatOrderStatus = (status) => {
    if (!status) return "Processing";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  return (
    <div className="mac-padd-container py-16 pt-25 bg-primary px-5">
      <Titel titel1={"Delivery"} titel2={"Information"} titelStyles={"pb-6"} />

      {/* Fixed Payment Status Table - Now properly structured */}
      <div className="mb-6 bg-white rounded-2xl p-4 overflow-x-auto shadow-sm">
        <h3 className="text-lg font-semibold text-secondary mb-4">Order Summary</h3>
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">Date</th>
              <th scope="col" className="px-4 py-3">Amount</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3">Method</th>
              <th scope="col" className="px-4 py-3">Order ID</th>
              <th scope="col" className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 align-middle whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 align-middle font-medium">
                    {currency}{order.amount}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.isPaid 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {formatPaymentMethod(order.paymentMethod)}
                  </td>
                  <td className="px-4 py-3 align-middle font-mono text-xs truncate-id max-w-[120px]">
                    {order._id}
                  </td>
                  <td className="px-4 py-3 align-middle text-right">
                    <button 
                      onClick={() => {
                        // Add your track order logic here
                        console.log('Track order:', order._id);
                      }} 
                      className="btn-secondary !py-1 !px-3 !text-xs rounded-md hover:opacity-90 transition-opacity"
                    >
                      Track
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detailed Order Cards */}
      {orders.map((order) => (
        <div key={order._id} className="mb-5 bg-white p-6 rounded-2xl shadow-sm">
          {/* Order Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
            <div>
              <h4 className="h4 text-secondary">Order #{order._id.slice(-8)}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.createdAt).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.isPaid 
                  ? 'badge-paid' 
                  : 'badge-pending'
              }`}>
                {order.isPaid ? 'Payment Completed' : 'Payment Pending'}
              </span>
              <p className="text-lg font-bold">{currency}{order.amount}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h5 className="font-medium text-gray-700 mb-4">Order Items</h5>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 bg-primary rounded-xl">
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.title}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h6 className="font-medium text-gray-800 line-clamp-1">{item.product.title}</h6>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Size:</span>
                        <span>{item.size}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Qty:</span>
                        <span>{item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Price:</span>
                        <span>{currency}{item.product.price[item.size]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Total:</span>
                        <span className="font-semibold">
                          {currency}{item.product.price[item.size] * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Footer */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t border-gray-200">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Order ID:</span>
                <span className="text-gray-500 font-mono text-xs">{order._id}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">Payment Method:</span>
                  <span className="text-gray-500">{formatPaymentMethod(order.paymentMethod)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">Order Status:</span>
                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-500' : 
                      order.status === 'shipped' ? 'bg-blue-500' : 
                      order.status === 'processing' ? 'bg-yellow-500' : 
                      'bg-gray-500'
                    }`}></span>
                    <span className="text-gray-500">{formatOrderStatus(order.status)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="text-secondary hover:text-primary font-medium text-sm px-4 py-2 rounded-lg hover:bg-primary transition-colors">
                View Details
              </button>
              <button 
                onClick={() => console.log('Track order:', order._id)}
                className="btn-secondary !py-2 !px-5 !text-sm rounded-lg"
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;