import React, { useEffect, useState } from "react";
import Titel from "./Titel";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper/modules";
import { UseAppContext } from "../context/AppContext";
import Item from "./Item";

const RelatedProducts = ({ product, productId }) => {
  const { products } = UseAppContext();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => item.category === product.category && productId !== item._id
      );
      setRelatedProducts(productsCopy.slice(0, 6));
    }
  }, [products]);
  return (
    <section className=" mt-28">
      <Titel titel1={"Related"} titel2={`Products`} titelStyles={"pb-10"} />

      {/*Containar*/}

      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          555: {
            slidesPerView: 1,
          },

          1022: {
            slidesPerView: 3,
          },
          1350: {
            slidesPerView: 4,
          },
        }}
        modules={[Autoplay]}
        className="min-h-[399px]"
      >
        {relatedProducts.map((products) => (
          <SwiperSlide key={products._id}>
            <Item key={products._id} product={products} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RelatedProducts;
