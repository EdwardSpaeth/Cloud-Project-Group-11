'use client';
import { useState } from 'react';
import styles from './ProductFilters.module.css';

export default function ProductFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [category, setCategory] = useState('all');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
    // Implement price filter logic here
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // Implement category filter logic here
  };

  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <select
        value={priceRange}
        onChange={handlePriceChange}
        className={styles.select}
      >
        <option value="all">All Prices</option>
        <option value="0-100">Under $100</option>
        <option value="100-500">$100 - $500</option>
        <option value="500+">$500+</option>
      </select>
      <select
        value={category}
        onChange={handleCategoryChange}
        className={styles.select}
      >
        <option value="all">All Categories</option>
        <option value="chairs">Chairs</option>
        <option value="tables">Tables</option>
        <option value="sofas">Sofas</option>
        <option value="beds">Beds</option>
        <option value="storage">Storage</option>
        <option value="lighting">Lighting</option>
      </select>
    </div>
  );
}

