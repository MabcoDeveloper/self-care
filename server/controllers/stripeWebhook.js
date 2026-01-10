import stripe from "stripe";
import Order from "../models/Order.js";
import User from "../models/User.js";

// handle stripe webhooks - DEVELOPMENT ONLY VERSION
export const stripeWebhooks = async (request, response) => {
  console.warn('⚠️  DEVELOPMENT MODE: Webhook verification disabled');
  
  let event;
  
  // Parse the event directly without verification
  try {
    event = typeof request.body === 'string' 
      ? JSON.parse(request.body) 
      : request.body;
  } catch (error) {
    console.error('❌ Failed to parse webhook body:', error);
    return response.status(400).json({ error: 'Invalid JSON' });
  }
  
  console.log(`🔔 Received event: ${event.type}`);
  
  // Handle checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log('💰 Payment succeeded for session:', session.id);
    
    const { orderId, userId } = session.metadata || {};
    
    if (!orderId) {
      console.error('❌ No orderId in metadata');
      return response.json({ received: true });
    }
    
    try {
      // Update order
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId, 
        { 
          isPaid: true,
          status: 'processing',
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent
        },
        { new: true }
      );
      
      if (!updatedOrder) {
        console.error(`❌ Order ${orderId} not found`);
      } else {
        console.log(`✅ Order ${orderId} updated successfully`);
      }
      
      // Clear user cart
      if (userId) {
        await User.findByIdAndUpdate(userId, { cartData: {} });
        console.log(`🛒 Cart cleared for user ${userId}`);
      }
      
    } catch (error) {
      console.error(`❌ Error processing order ${orderId}:`, error.message);
    }
  }
  
  response.json({ received: true, message: 'Webhook processed (dev mode)' });
};