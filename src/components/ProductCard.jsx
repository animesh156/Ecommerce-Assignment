import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function ProductCard({ p }) {
  return (
    <Link
      to={`/product/${p.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 border border-gray-100 hover:border-gray-300"
    >
      {/* IMAGE */}
      <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="h-full object-contain transform transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* TITLE */}
      <h3 className="mt-3 font-medium text-gray-800 text-sm line-clamp-2">
        {p.title}
      </h3>

      {/* PRICE + RATING */}
      <div className="mt-2 flex items-center justify-between">
        <p className="text-lg font-semibold text-green-700">${p.price}</p>

        {/* Rating badge — only if available */}
        {p.rating?.rate && (
          <span className="flex items-center gap-1 text-yellow-500 text-sm bg-yellow-50 px-2 py-1 rounded-lg">
            <FaStar size={12} />
            {p.rating.rate}
          </span>
        )}
      </div>
    </Link>
  );
}
