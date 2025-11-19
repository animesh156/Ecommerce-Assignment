import React, { useState, useEffect } from "react";
import { getProducts, getCategories } from "../api/products";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import SkeletonGrid from "../components/SkeletonGrid";
import toast from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  // Fetch categories + products
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [cats, prods] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);

        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        toast.error("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter results
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(query.toLowerCase());
    const matchCategory = category === "all" || p.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-8">
      {/* Search + Category dropdown */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-4 text-gray-500" size={16} />
          <input
            className="border w-full rounded-lg p-3 pl-10 shadow-sm focus:border-2 transition"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <select
          className="border rounded-lg p-3 shadow-sm w-full md:w-1/3 cursor-pointer focus:border-2 transition"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Loading skeleton */}
      {loading && <SkeletonGrid />}

      {/* Product Grid */}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}

      {/* No results */}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No products found. Try another search or category.
        </p>
      )}
    </div>
  );
}
