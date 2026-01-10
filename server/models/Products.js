import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    title_ar: { type: String },
    price: { type: Map, of: Number, required: true },
    description: { type: String, required: true },
    description_ar: { type: String },
    category: { type: String, required: true },
    category_ar: { type: String },
    type: { type: String, required: true },
    type_ar: { type: String },
    size: { type: [String], required: true },
    date: { type: Number, default: () => Date.now() },
    popular: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    image: { type: [String], required: true },
    
    // If you need to reference other products or items
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product'  // or another model name
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
