import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const uniqueCount = useSelector((s) => Object.keys(s.cart.items).length);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        MiniShop
      </Link>

      <Link to="/cart" className="relative">
        <FaShoppingCart size={26} className="text-gray-700 hover:text-black transition" />

        {/* Red circular bubble */}
        {uniqueCount > 0 && (
          <span
            className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow"
          >
            {uniqueCount}
          </span>
        )}
      </Link>
    </header>
  );
}

export default Navbar;
