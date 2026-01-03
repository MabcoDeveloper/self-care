import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="max-padd-container pt-20 pb-4 sm:pt-24 sm:pb-8">
      <div className="bg-[url('/2222.jpg')] bg-cover bg-center bg-no-repeat h-[80vh] w-full rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative mx-auto max-w-[1440px] px-4 h-full grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 gap-4">
          <div className="row-span-2 sm:row-span-1 sm:col-span-2 flex flex-col justify-center text-white pt-8 sm:pt-0">
            <div className="max-w-3xl">
              <h1 className="h1 !font-[400] capitalize leading-tight mb-4 drop-shadow-lg">
                Enhance Your
                <span className="!font-[700] text-secondary"> Look </span>
                With
                <span className="!font-[700] text-secondary"> Glam </span>
                Essentials
              </h1>

              <p className="text-white medium-16 !font-[300] max-w-xl mb-8 opacity-90">
                Discover premium beauty with our cosmetic collection, crafted to
                enhance your natural glow, boost confidence, and deliver
                flawless elegance every day with trusted, affordable products.
              </p>

              <div className="flex">
                <Link
                  to={`/Collection`}
                  className="bg-secondary text-white medium-15 capitalize pl-6 pr-1 py-1.5 rounded-full flexCenter gap-x-1 mt-2 group shadow-xl hover:bg-secondary/90 transition-all duration-300"
                >
                  Check Our Modern Collection
                  <div className="bg-white p-2 m-1 rounded-full flexCenter group-hover:translate-x-1 transition-all duration-300 shadow-md">
                    <img
                      src="/iconGo.png"
                      alt="Go Icon"
                      width={18}
                      className="w-4 h-4"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="row-span-1 sm:row-span-1 sm:col-span-1 flex items-end justify-center sm:justify-end pb-4">
            <div className="bg-white p-3 max-w-xs rounded-2xl shadow-2xl">
              <div className="h-32 overflow-hidden mb-2">
                <img
                  src="/headertoww.png"
                  alt="Product Highlight"
                  className="h-full object-cover w-full rounded-xl"
                />
              </div>
              <p className="text-[13px] text-tertiary">
                <b className="uppercase text-secondary">Unlock </b>your best
                look, one click at a time, your style upgrade starts here, shop
                today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
