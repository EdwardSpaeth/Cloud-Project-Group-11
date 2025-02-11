"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5636/products/0");
        let data = await response.json();
        data = data.map((product, index) => ({ id: index + 1, ...product }));
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const sortProducts = (items, sortOption) => {
    switch (sortOption) {
      case "price-low":
        return [...items].sort((a, b) => Number(a.price) - Number(b.price));
      case "price-high":
        return [...items].sort((a, b) => Number(b.price) - Number(a.price));
      case "name":
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return items;
    }
  };

  const sortedProducts = sortProducts(products, sortBy);
  const filteredProducts = sortedProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="text-red-500 text-center py-8">{error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="text-sm text-gray-500">
          {loading ? (
            <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
          ) : (
            `Showing ${filteredProducts.length} products`
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm border rounded-md px-2 py-1 w-44"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border rounded-md px-2 py-1 w-44"
          >
            <option value="default">Default sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>

          <div className="flex gap-1">
            <button
              onClick={() => setView("list")}
              className={`p-2 ${view === "list" ? "text-black" : "text-gray-400"}`}
            >
              <GridIcon />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`p-2 ${view === "grid" ? "text-black" : "text-gray-400"}`}
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className={
            view === "list"
              ? "grid grid-cols-1 gap-y-4"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10"
          }
          layout
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProductCard product={product} viewType={view} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
  </svg>
);