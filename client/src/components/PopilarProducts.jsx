import React, { useEffect, useState } from "react";
import Titel from "./Titel";
import { UseAppContext } from "../context/AppContext";
import Item from "./Item";

const PopilarProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const { products } = UseAppContext();

  useEffect(() => {
    const data = products.filter((item) => item.popular && item.inStock);

    setPopularProducts(data.slice(0, 4));
  }, [products]);

  return (
    <section className="max-padd-container">
      <Titel titel1={"Popular"} titel2={`products`} titelStyles={"pb-10"} />
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {popularProducts.map((products) => (
          <div key={products._id}>
            <Item key={products._id} product={products} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopilarProducts;
