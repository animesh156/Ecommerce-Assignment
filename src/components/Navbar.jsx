import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  // Count of UNIQUE items
  const uniqueCount = useSelector((s) => Object.keys(s.cart.items).length);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        MiniShop
      </Link>

      <Link to="/cart" className="relative flex items-center gap-2">
        Cart

        {/* Show red badge ONLY if > 0 */}
        {uniqueCount > 0 && (
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {uniqueCount}
          </span>
        )}
      </Link>
    </header>
  );
}

export default Navbar;
