import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Object, required:true},
    size: {type:[String], required:true},
    images: {type:[String], required:true},
    catagory: {type:String, required:true},
    type: {type:String, required:true},
    popular: {type:Boolean, default:false},
    inStock: {type:Boolean, default:true},
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)

export default Product 
