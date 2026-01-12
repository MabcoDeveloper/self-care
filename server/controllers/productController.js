import { v2 as cloundinary } from "cloudinary"
import Product from "../models/Products.js"

// controller function for adding product [POST '/']
export const createProduct = async (req,res) => {
    try {
        const productData = JSON.parse(req.body.productData || '{}')
        const files = req.files || []

        // Debug info to help diagnose missing sizes/images
        console.log('createProduct payload:', {
            productDataPreview: {
                title: productData.title,
                sizes: productData.sizes || productData.size || null,
                price: productData.price || null
            },
            filesCount: files.length,
            fileNames: files.map(f => f.originalname)
        })

        //upload images to cloudinary (if any)
        const imagesUrl = await Promise.all(
            files.map(async (item)=> {
                const result = await cloundinary.uploader.upload(item.path, {resource_type: "image"})
                return result.secure_url
            })
        )

        // Normalize incoming fields to match schema and prefer actual uploaded files when available
        const productToCreate = {
            ...productData,
            size: productData.sizes || productData.size || [],
            image: (imagesUrl && imagesUrl.length > 0) ? imagesUrl : (productData.image || productData.images || [])
        }

        // Remove `sizes`/`images` if present to avoid duplicate/confusing fields
        if (productToCreate.sizes) delete productToCreate.sizes
        if (productToCreate.images) delete productToCreate.images

        // Validation: require at least one size and one image
        if (!productToCreate.size || productToCreate.size.length === 0) {
            return res.status(400).json({success:false, message: 'Please provide at least one size'})
        }
        if (!productToCreate.image || productToCreate.image.length === 0) {
            return res.status(400).json({success:false, message: 'Please upload at least one image'})
        }

        await Product.create(productToCreate)

        res.json({success:true, message: "Product Added"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}


// controller function for get product list [GET '/']
export const listProduct = async(req,res) => {
    try {
        const products = await Product.find({})
        res.json({success:true, products})

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}

// controller function for get single product  [GET '/single']
export const singleProduct = async(req,res) => {
    try {
        const {productId} = await req.body
        const product = await Product.findById(productId)
        res.json({success:true, product}) 
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}

// controller function for toggle stock [POST '/toogleStock']
export const toggleStock = async(req,res) => {
    try {
        const {productId, inStock} = req.body
        await Product.findByIdAndUpdate(productId, {inStock})
        res.json({success:true, message :"Stock Updated"})
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}

