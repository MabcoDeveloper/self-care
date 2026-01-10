import React from "react";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import PopilarProducts from "../components/PopilarProducts";
import Testimonial from "../components/Testimonial";
import Features from "../components/Features";
const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <NewArrivals />
      <PopilarProducts />

      <div className="sm-block max-padd-container mt-28 bg-[url('/container.jpg')] bg-cover bg-center  bg-no-repeat h-[288px]" />
      <Testimonial />
    </>
  );
};

export default Home;
