import React from "react";

function ProductFeatures() {
  return (
    <div className="max-padd-container mt-12 rounded-2xl p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex gap-x-6 p-4 bg-white rounded-xl shadow-md">
          <div className="flex-shrink-0">
            <img
              src="/easyReturn.png"
              alt="Easy Returns"
              width={60}
              className="text-secondary"
            />
          </div>

          <div>
            <h4 className="h5 capitalize text-tertiary">Easy Returns</h4>
            <p className="regular-14 text-tertiary/80 mt-1">
              Shop with confidence. Easily return products within 7 days of
              delivery.
            </p>
          </div>
        </div>

        <div className="flex gap-x-6 p-4 bg-white rounded-xl shadow-md">
          <div className="flex-shrink-0">
            <img
              src="/securePayment.png"
              alt="Secure Payment"
              width={60}
              className="text-secondary"
            />
          </div>

          <div>
            <h4 className="h5 capitalize text-tertiary">Secure Payment</h4>
            <p className="regular-14 text-tertiary/80 mt-1">
              Your transactions are 100% secure and encrypted.
            </p>
          </div>
        </div>

        <div className="flex gap-x-6 p-4 bg-white rounded-xl shadow-md">
          <div className="flex-shrink-0">
            <img
              src="/fastDelivery.png"
              alt="Fast Delivery"
              width={60}
              className="text-secondary"
            />
          </div>

          <div>
            <h4 className="h5 capitalize text-tertiary">Fast Delivery</h4>
            <p className="regular-14 text-tertiary/80 mt-1">
              Get your products quickly with our expedited shipping options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFeatures;
