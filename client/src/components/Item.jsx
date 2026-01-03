import React, { useState } from "react";
import { UseAppContext } from "../context/AppContext";

const Item = ({ product }) => {
  const { navigate, currency } = UseAppContext();
  if (!product) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isHovered, setIsHovered] = useState(false);
  const size = product?.sizes?.[0] ?? "";

  const images = Array.isArray(product?.image) ? product.image : [];
  const hasSecondImage = images.length > 1;

  const colors = ["#fef7f9", "#f9f0f2", "#f2f2f2"];
  const rawIdSlice = String(product?._id ?? "0").slice(-4);
  const parsed = Number.parseInt(rawIdSlice, 16);
  const idx =
    Number.isFinite(parsed) && !Number.isNaN(parsed)
      ? parsed % colors.length
      : 0;
  const bgcolor = colors[idx];

  let numericPrice;
  if (product?.price == null) {
    numericPrice = 0;
  } else if (typeof product.price === "number") {
    numericPrice = product.price;
  } else if (typeof product.price === "object") {
    numericPrice = product.price[size] ?? Object.values(product.price)[0];
  } else {
    numericPrice = Number(product.price) || 0;
  }
  const displayPrice = Number(numericPrice).toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden relative border border-gray-100 hover:shadow-xl">
      <div className="overflow-hidden">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flexCenter h-[220px] w-full transition-all duration-300 relative group"
          style={{ backgroundColor: bgcolor }}
        >
          <img
            src={
              hasSecondImage && isHovered
                ? images[1]
                : images[0] ?? "/placeholder.png"
            }
            alt={product?.name ?? product?.title ?? "product image"}
            width={160}
            height={160}
            className="object-contain h-full w-full p-6 group-hover:scale-[1.05] transition-transform duration-500"
            onError={(e) => (e.currentTarget.src = "/placeholder.png")}
          />

          <div className="absolute inset-0 flexCenter opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button
              className="btn-dark !py-3 !px-8 medium-14 !text-white transform hover:scale-105 transition-transform duration-300 shadow-xl"
              onClick={() => {
                navigate(`/collection/${product._id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Quick View
            </button>
          </div>

          <p className="absolute top-3 right-3 medium-13 px-3 py-1 bg-white/80 rounded-full text-tertiary shadow-sm backdrop-blur-sm">
            {product?.type ?? "NEW"}
          </p>

          <button className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-secondary/70">
            ♡
          </button>
        </div>

        <div className="pt-3 p-4">
          <div className="flexBetween items-start">
            <h5 className="h5 uppercase line-clamp-1 text-tertiary font-bold hover:text-secondary transition-colors duration-200">
              {product?.title ?? product?.name ?? "Untitled"}
            </h5>

            <p className="uppercase font-bold medium-18 text-secondary flex-shrink-0 ml-2">
              {currency}
              {displayPrice}
            </p>
          </div>

          <p className="line-clamp-2 pt-1 text-sm text-gray-500">
            {product?.description ?? "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
