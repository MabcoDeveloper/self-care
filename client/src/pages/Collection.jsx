import React, { useEffect, useMemo, useState } from "react";
import Item from "../components/Item";
import { UseAppContext } from "../context/AppContext";
import SearchInput from "../components/SearchInput";

const Collection = () => {
  const { products = [], searchQuery = "" } = UseAppContext();
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [selectedSort, setSelectedSort] = useState("relevant");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableTypes, setAvailableTypes] = useState([]);
  const itemsPerPage = 8;

  const allCategories = useMemo(
    () => ["Hair Care", "Body Care", "Face Care"],
    []
  );

  const togglleFilter = (value, setValue) => {
    setValue((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    const selectedCats = category.length > 0 ? category : allCategories;
    const filterpreds = (products || []).filter((p) =>
      selectedCats.includes(p.category)
    );
    const typeSet = new Set(filterpreds.map((p) => p.type));
    const newAvailableTypes = [...typeSet].sort();
    setAvailableTypes(newAvailableTypes);
    setType((prev) => prev.filter((t) => typeSet.has(t)));
  }, [category, products, allCategories]);

  const applyFilters = () => {
    let filtered = [...products];

    filtered = filtered.filter((p) => p.inStock);

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category.length) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      );
    }
    if (type.length) {
      filtered = filtered.filter((product) => type.includes(product.type));
    }
    return filtered;
  };

  const applySorting = (productsList) => {
    switch (selectedSort) {
      case "low":
        return [...productsList].sort(
          (a, b) =>
            Math.min(...Object.values(a.price)) -
            Math.min(...Object.values(b.price))
        );

      case "high":
        return [...productsList].sort(
          (a, b) =>
            Math.min(...Object.values(b.price)) -
            Math.min(...Object.values(a.price))
        );

      default:
        return productsList;
    }
  };

  useEffect(() => {
    let filtered = applyFilters();
    let sorted = applySorting(filtered);
    setFilteredProducts(sorted);
    setCurrentPage(1);
  }, [category, type, selectedSort, products, searchQuery]);

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="max-padd-container mt-25">
      {/* Search Bar - Removed px-0 to maintain padding around the page */}
      <SearchInput />

      <div className="flex flex-col sm:flex-row gap-10 mt-6 mb-16">
        {/* Filters Option - Left Side (تصميم أنظف وأكثر حداثة) */}
        {/* خلفية بيضاء مع ظل واضح وحواف دائرية ناعمة */}
        <div className="min-w-72 bg-white p-5 rounded-2xl shadow-xl border border-primary-dark/30 h-fit">
          {/* Sort By Price Box */}
          <div className="pb-4 border-b border-primary-dark/30 mb-5">
            <h4 className="h4 text-tertiary mb-3">Sort By Price</h4>{" "}
            {/* استخدام h4 */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              // تصميم أكثر أناقة لحقل الاختيار
              className="border border-primary-dark/50 outline-none text-tertiary medium-15 h-11 w-full px-4 rounded-xl transition-all focus:ring-2 focus:ring-secondary focus:border-secondary"
            >
              <option value="relevant">Relevant</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Categories Filter Box */}
          <div className="pb-4 border-b border-primary-dark/30 mb-5">
            <h4 className="h4 text-tertiary mb-4">Categories</h4>
            <div className="flex flex-col gap-3 regular-15 text-tertiary">
              {allCategories.map((cat) => (
                <label
                  key={cat}
                  className="flex gap-3 items-center medium-15 text-tertiary cursor-pointer transition-colors hover:text-secondary"
                >
                  <input
                    onChange={(e) => togglleFilter(e.target.value, setCategory)}
                    type="checkbox"
                    value={cat}
                    checked={category.includes(cat)}
                    // تصميم مربع تحديد مستوحى من لون التمييز
                    className="w-4 h-4 rounded-sm appearance-none border-2 border-primary-dark checked:bg-secondary checked:border-secondary transition-all focus:ring-1 focus:ring-secondary"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type Filter Box */}
          <div>
            <h4 className="h4 text-tertiary mb-4">Product Type</h4>
            <div className="flex flex-col gap-3 regular-15 text-tertiary">
              {availableTypes.map((typ) => (
                <label
                  key={typ}
                  className="flex gap-3 items-center medium-15 text-tertiary cursor-pointer transition-colors hover:text-secondary"
                >
                  <input
                    type="checkbox"
                    onChange={(e) => togglleFilter(e.target.value, setType)}
                    checked={type.includes(typ)}
                    value={typ}
                    className="w-4 h-4 rounded-sm appearance-none border-2 border-primary-dark checked:bg-secondary checked:border-secondary transition-all focus:ring-1 focus:ring-secondary"
                  />
                  <span>{typ}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Filtered Products and Pagination */}
        <div className="flex-1">
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getPaginatedProducts().length > 0 ? (
              getPaginatedProducts().map((product) => (
                <Item key={product._id} product={product} />
              ))
            ) : (
              <p className="bold-28 text-secondary/80 mt-10">
                Sorry, no products match your selection! 😔
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flexCenter flex flex-wrap mt-16 gap-3">
            {/* Previous Button */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              // تصميم أزرار التصفح أكثر نعومة
              className={`btn-outline !text-[15px] !py-2 !px-4 ${
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Previous
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                // استخدام btn-secondary للزر النشط
                className={`!text-[15px] !py-2 !px-4 medium-15 transition-all ${
                  currentPage === index + 1 ? "btn-secondary" : "btn-light"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`btn-outline !text-[15px] !py-2 !px-4 ${
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
