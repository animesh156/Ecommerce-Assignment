import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <header className="bg-white shadow p-4 flex justify-between">
      <Link to="/" className="text-2xl font-bold">
        MiniShop
      </Link>
      <Link to="/cart">Cart </Link>
    </header>
  );
}

export default Navbar;
