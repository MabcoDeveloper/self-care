import React from "react";
import { blogs } from "../assets/data";

function Blog() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-padd-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-10 text-center">
          Latest Blog Posts
        </h2>

        {/* Blog Posts Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col"
            >
              {/* Image Container: Uses object-cover for a nice header image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  // w-full h-full ensures it fills the container
                  // object-cover ensures it covers the area without distortion
                  className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Category and Title */}
                <p className="text-sm font-medium text-pink-600 mb-1 uppercase tracking-wider">
                  {blog.category}
                </p>
                <h5 className="text-xl font-bold text-gray-900 mt-0 mb-3 line-clamp-2">
                  {blog.title}
                </h5>

                {/* Description */}
                <p className="text-gray-600 text-base mb-4 flex-grow line-clamp-3">
                  {blog.description}
                </p>

                {/* Read More Link/Button */}
                <button className="self-start text-sm font-semibold text-pink-600 hover:text-pink-800 transition duration-150 mt-2">
                  Continue reading &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
