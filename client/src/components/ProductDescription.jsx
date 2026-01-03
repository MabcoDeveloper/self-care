import React from "react";

function ProductDescription() {
  return (
    <div className="max-padd-container mt-14 rounded-2xl shadow-lg border border-primary-dark/50">
      {/* Tabs Header */}
      <div className="flex gap-x-2 bg-primary rounded-t-2xl p-0.5">
        <button className="medium-16 p-3 w-36 border-b-2 border-secondary bg-white text-tertiary rounded-t-xl transition-all">
          Description
        </button>

        <button className="medium-16 p-3 w-36 text-tertiary/70 hover:text-secondary hover:bg-primary-dark rounded-t-xl transition-all">
          Ingredients
        </button>
        <button className="medium-16 p-3 w-36 text-tertiary/70 hover:text-secondary hover:bg-primary-dark rounded-t-xl transition-all">
          How to Use
        </button>

        {/* شريط فارغ للتأكد من أن الحدود السفلية متناسقة */}
        <div className="flex-1 border-b-2 border-primary-dark"></div>
      </div>

      <hr className="h-[1px] w-full border-t-0 border-primary-dark" />

      {/* Description Content */}
      <div className="flex flex-col gap-6 p-6 bg-white rounded-b-2xl">
        {/* Section: Details */}
        <div>
          <h5 className="h5 text-tertiary mb-3">Product Details</h5>
          <p className="regular-16 text-tertiary/80 mb-3">
            This premium formulation delivers deep hydration and visibly
            enhances your skin's radiance. It is light-weight, non-greasy, and
            absorbs quickly to provide long-lasting moisture.
          </p>
          <p className="regular-16 text-tertiary/80">
            Expertly crafted with a blend of natural extracts and potent active
            ingredients, designed for daily use on all skin types.
          </p>
        </div>

        {/* Section: Benefits */}
        <div>
          <h5 className="h5 text-tertiary mb-3">Key Benefits</h5>
          <ul className="list-disc pl-5 regular-16 text-tertiary/80 flex flex-col gap-2">
            <li className="text-secondary/80">
              <span className="text-tertiary/80">
                Hydrates and nourishes the skin deeply.
              </span>
            </li>
            <li className="text-secondary/80">
              <span className="text-tertiary/80">
                Reduces the appearance of fine lines and dullness.
              </span>
            </li>
            <li className="text-secondary/80">
              <span className="text-tertiary/80">
                Enhances natural glow and elasticity.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
