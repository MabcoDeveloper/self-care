import React from "react";

function Features() {
  return (
    <section className="max-padd-container my-16 xl:my-28">
      {/* Grid: 2 cols on small, 3 cols on medium, 5 cols on large screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-12 items-center">
        <div className="flex justify-center items-center">
          <img
            src="./partOne.png"
            alt="Product Image 1"
            width={120}
            height={120}
            className="rounded-full object-cover w-28 h-28 border-4 border-secondary/30 shadow-lg"
          />
        </div>

        <div className="flex justify-center items-center">
          <img
            src="./imgFour.jpg"
            alt="Product Image 2"
            width={120}
            height={120}
            className="rounded-full object-cover w-28 h-28 border-4 border-secondary/30 shadow-lg"
          />
        </div>

        {/*  Quality Product */}
        <div className="p-4 flex flex-col items">
          <div className="medium-32 text-secondary mb-2">⭐</div>
          <h4 className="h4 capitalize !font-semibold text-tertiary">
            Quality Product
          </h4>
          <p className="text-sm text-tertiary/70 mt-1">
            Luxury beauty product crafted with care and excellence.
          </p>
        </div>

        {/* Fast Delivery */}
        <div className="p-4 flex flex-col items-center text-center">
          <div className="medium-32 text-secondary mb-2">🚀</div>
          <h4 className="h4 capitalize !font-semibold text-tertiary">
            Fast Delivery
          </h4>
          <p className="text-sm text-tertiary/70 mt-1">
            Luxury beauty product crafted with care and excellence.
          </p>
        </div>

        {/*  Secure Payment */}
        <div className="p-4 flex flex-col items-center text-center">
          <div className="medium-32 text-secondary mb-2">🔒</div>
          <h4 className="h4 capitalize !font-semibold text-tertiary">
            Secure Payment
          </h4>
          <p className="text-sm text-tertiary/70 mt-1">
            Luxury beauty product crafted with care and excellence.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
