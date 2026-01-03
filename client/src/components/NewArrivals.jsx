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

const NewArrivals = () => {
  const { products } = UseAppContext();

  const [NewArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const data = products.filter((item) => item.inStock).slice(0, 10);

    setNewArrivals(data);
  }, [products]);

  return (
    <section className="max-padd-container mt-28">
      <Titel titel1={"New"} titel2={`Arrivals`} titelStyles={"pb-10"} />

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
        {NewArrivals.map((products) => (
          <SwiperSlide key={products._id}>
            <Item key={products._id} product={products} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewArrivals;
