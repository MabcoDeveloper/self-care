import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import RelatedProducts from "../components/RelatedProducts";
import { UseAppContext } from "../context/AppContext";

function ProductDetails() {
  const { products, currency, addToCart} = UseAppContext();
  const [image, setImage] = useState(null);
  const [size, setSize] = useState(null);

  const { productId } = useParams();

  const product = products.find((item) => item._id === productId);

  useEffect(() => {
    if (product) {
      // Set initial size and image if available
      if (product.size && product.size.length > 0) {
        setSize(product.size[0]);
      }
      if (product.image && product.image.length > 0) {
        setImage(product.image[0]);
      }
    }
  }, [product]);
  // Basic check for products data
  if (!products || products.length === 0) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="max-padd-container pt-20 bg-white">
      {" "}
      {/* Use clean white background for the page */}
      {/* Product Data */}
      <div className="flex gap-8 md:gap-10 flex-col xl:flex-row mt-3 mb-10">
        {/* === 1. Image Display Section (Clean Background) === */}
        <div className="flex flex-1 gap-x-3 max-w-full xl:max-w-[533px]">
          {/* Thumbnails */}
          <div className="flex-1 flexCenter flex-col gap-2 max-h-full overflow-y-auto">
            {product.image.map((item, i) => (
              <div
                key={i}
                // Use primary-dark for the hover/active ring, but keep bg-white for cleanliness
                className={`bg-white rounded-xl p-1 cursor-pointer transition-all hover:ring-2 hover:ring-primary-dark ${
                  item === image
                    ? "ring-2 ring-secondary"
                    : "ring-1 ring-slate-100"
                }`}
                onClick={() => setImage(item)}
              >
                <img
                  src={item}
                  alt={`Product Thumbnail ${i + 1}`}
                  className="w-full h-auto max-w-[80px] object-cover aspect-square rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex flex-[4] bg-primary rounded-2xl overflow-hidden shadow-sm">
            {" "}
            {/* Use soft primary for image background */}
            <img
              src={image}
              alt={product.title}
              className="w-full h-full object-contain p-8" // Increased padding for visual spacing
            />
          </div>
        </div>

        {/* === 2. Product Info Section (Clean Card) === */}
        <div className="flex-1 px-6 py-6 bg-white rounded-2xl shadow-lg border border-primary-dark">
          {" "}
          {/* Clean white card with subtle border/shadow */}
          {/* Title */}
          <h1 className="h2 leading-snug text-tertiary">
            {product.title}
          </h1>{" "}
          {/* Use H2 for prominence */}
          <p className="medium-15 text-slate-500 mb-2">
            Essential Skincare Range
          </p>
          {/* Rating & Price */}
          <div className="flex flex-wrap items-center gap-x-4 pt-2">
            <div className="flex gap-x-1 text-yellow-500">
              {/* Star icons */}
              <img src="/star.png" alt="Star Rating" width={20} />
              <img src="/star.png" alt="Star Rating" width={20} />
              <img src="/star.png" alt="Star Rating" width={20} />
              <img src="/star.png" alt="Star Rating" width={20} />
              <img src="/star.png" alt="Star Rating" width={20} />
            </div>
            <p className="medium-14 text-slate-500"> (222 Reviews) </p>
          </div>
          {/* Price */}
          <div className="flex items-baseline gap-4 my-4">
            <h2 className="bold-40 text-secondary">
              {" "}
              {/* Bold font for price */}
              {currency}
              {product.price[size] ? product.price[size].toFixed(2) : "N/A"}
            </h2>
          </div>
          {/* Description */}
          <p className="max-w-[555px] regular-16 mb-6 text-slate-700">
            {" "}
            {/* Softer text color */}
            {product.description}
          </p>
          {/* Size Selection */}
          <div className="flex flex-col gap-3 my-4">
            <h4 className="h5 text-tertiary">Choose Size:</h4>
            <div className="flex gap-2">
              {product.size.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSize(item)}
                  // Use secondary for selected state, btn-outline for others
                  className={`${
                    item === size
                      ? "bg-secondary text-white shadow-md"
                      : "btn-outline bg-white hover:bg-primary" // Use btn-outline for unselected
                  } !ring-slate-300 medium-14 h-10 w-20 transition-all duration-200 cursor-pointer rounded-xl`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Action Buttons (Add to Cart & Favorite) */}
          <div className="flex items-center gap-x-3 mt-8">
            {/* Using btn-dark which uses secondary color, as defined in your CSS */}
            <button   onClick={()=>addToCart(productId,size)} className="btn-dark flexCenter gap-x-2 capitalize w-full max-w-[220px] shadow-lg">
              < img src="/card.png" alt="Shopping Cart" width={19} /> Add to Cart
            </button>
            <button className="btn-light !p-3">
              {" "}
              {/* Use btn-light (soft pink hover) for favorite */}
              <img src="/favorte.png" alt="Favorite" width={24} />
            </button>
          </div>
          {/* Delivery & Guarantees */}
          <div className="flex items-center gap-x-2 mt-4 text-slate-600">
            <img src="/delivery.png" alt="Delivery" width={30} />
            <span className="medium-14">
              Free Delivery on orders over 500{currency}
            </span>
          </div>
          <hr className="my-4 w-full border-primary-dark" />
          <div className="mt-2 flex flex-col gap-1 regular-14 text-slate-500">
            <p>✅ **Authenticity** you can trust</p>
            <p>💰 **Cash on Delivery** for your convenience</p>
            <p>🔄 Easy Returns and Exchanges within **7 Days**</p>
          </div>
        </div>
      </div>
      {/* Product Information Tabs */}
      <ProductDescription />
      <ProductFeatures />
      {/* Related Products */}
      <RelatedProducts product={product} productId={productId} />
    </div>
  );
}

export default ProductDetails;
