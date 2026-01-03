import React from "react";
import { UseAppContext } from "../context/AppContext";

function SearchInput() {
  const { searchQuery, setSearchQuery } = UseAppContext();

  return (
    <div className="py-4 bg-primary">
      <div className="max-padd-container">
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white ring-2 ring-primary-dark w-full max-w-lg shadow-sm">
            <div>
              <img
                src="./iconSearch1.png"
                alt="Search Icon"
                width={18}
                className="text-tertiary mr-2 opacity-70"
              />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, categories, or brands..."
              className="border-none outline-none w-full text-sm placeholder:text-tertiary/60 text-tertiary bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
