import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import { createClerkClient } from '@clerk/clerk-sdk-node';

// Initialize Clerk client
const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const authUser = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    let token = null;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies?.__session) {
      token = req.cookies.__session;
    } else if (req.cookies?.__session_ZV1tLnzc) {
      token = req.cookies.__session_ZV1tLnzc;
    }
    
    if (!token) {
      console.log('No authentication token found');
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }
    
    // Decode JWT to get userId
    const decoded = jwt.decode(token);
    const userId = decoded?.sub;
    
    if (!userId) {
      console.log('No userId found in token');
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    
    //console.log('Authenticating user:', userId);
    
    // Find existing user
    let user = await User.findById(userId);
    
    if (!user) {
      console.log('User not found in database, creating new record...');
      
      try {
        // Try to get user info from Clerk API
        const clerkUser = await clerk.users.getUser(userId);
        
        // Extract data from Clerk user
        const username = clerkUser.username || 
                        clerkUser.firstName || 
                        `user_${userId.substring(userId.length - 6)}`;
        
        const email = clerkUser.emailAddresses?.[0]?.emailAddress || 
                     `${userId}@clerk.user`;
        
        const image = clerkUser.imageUrl || 
                     "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGgtZ29vZ2xlL2ltZ18yZzVrWHhIbFBIdUJqVW1kOUJpTXFxVHhBOWUifQ";
        
        console.log('Creating user with Clerk data:', { username, email });
        
        // Create user with Clerk data
        user = await User.create({
          _id: userId,
          username: username,
          email: email,
          image: image,
          role: "user",
          cartData: {},
        });
        
        console.log('User created successfully with Clerk data');
        
      } catch (clerkError) {
        console.error('Error fetching from Clerk API:', clerkError.message);
        
        // Fallback: Create user with generated placeholder values
        const timestamp = Date.now();
        const username = `user_${timestamp.toString().slice(-6)}`;
        const email = `${username}@example.com`;
        const image = "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGgtZ29vZ2xlL2ltZ18yZzVrWHhIbFBIdUJqVW1kOUJpTXFxVHhBOWUifQ";
        
        console.log('Creating user with placeholder data:', { username, email });
        
        user = await User.create({
          _id: userId,
          username: username,
          email: email,
          image: image,
          role: "user",
          cartData: {},
        });
        
        console.log('User created successfully with placeholder data');
      }
    }
    
    // Auto promote to owner if email matches env ADMIN_EMAIL
    const ownerEmail = process.env.ADMIN_EMAIL;
    if (ownerEmail && user.email === ownerEmail && user.role !== "owner") {
      console.log('Promoting user to owner:', user.email);
      user = await User.findByIdAndUpdate(
        userId, 
        { role: "owner" }, 
        { new: true }
      );
    }
    
    req.user = user;
    // provide a convenience function expected by controllers
    req.auth = () => ({ userId: user._id.toString() });
    console.log('Authentication successful for user:', user.username);
    next();
    
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Provide more helpful validation error messages
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: `Validation failed: ${errors.join(', ')}` 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Authentication failed' 
    });
  }
};

export default authUser;