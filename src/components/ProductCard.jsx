import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ p }) {
  return (
    <Link
      to={`/product/${p.id}`}
      className="bg-white shadow p-4 rounded block hover:shadow-lg"
    >
      <img src={p.image} className="h-40 w-full object-contain" />
      <h3 className="text-sm mt-2 line-clamp-2">{p.title}</h3>
      <p className="font-bold mt-2">${p.price}</p>
    </Link>
  );
}

export default ProductCard;
