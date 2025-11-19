import React, { useState, useEffect } from "react";
import { getProducts, getCategories } from "../api/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError("Failed to load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter by search + category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      category === "all" ? true : p.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search + Category */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <input
          className="border p-2 rounded w-full"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Category Dropdown */}
        <select
          className="border p-2 rounded w-full md:w-1/3"
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

      {/* Loading */}
      {loading && <p className="text-center text-gray-600">Loading products...</p>}

      {/* Error */}
      {error && (
        <p className="text-center text-red-600 bg-red-100 p-2 rounded">
          {error}
        </p>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}

      {/* No products found */}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-center mt-4 text-gray-600">
          No products found. Try a different search or category.
        </p>
      )}
    </div>
  );
}
