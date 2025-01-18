"use client";

import { useState } from 'react';
import styles from './ProductFilters.module.css';
import { Search, ChevronDown } from 'lucide-react';

const priceOptions = [
  { value: 'all', label: 'All Prices' },
  { value: '0-50', label: '$0 - $50' },
  { value: '51-100', label: '$51 - $100' },
  { value: '101-200', label: '$101 - $200' },
  { value: '201+', label: '$201+' },
];

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'home', label: 'Home & Garden' },
];

export default function ProductFilters({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [category, setCategory] = useState('all');
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const toggleDropdown = (type) => {
    if (type === 'price') {
      setIsOpenPrice(!isOpenPrice);
      setIsOpenCategory(false);
    } else {
      setIsOpenCategory(!isOpenCategory);
      setIsOpenPrice(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, priceRange, category });
    // implement Search functionality here
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    setIsOpenPrice(false);
    onFilterChange({ searchTerm, priceRange: value, category });
    // implement Price filter functionality here
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setIsOpenCategory(false);
    onFilterChange({ searchTerm, priceRange, category: value });
    // implement Category filter functionality here
  };

  return (
    <div className={styles.filters}>
      <div className={styles.searchWrapper}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.dropdownWrapper}>
        <div className={styles.dropdownContainer}>
          <button
            className={styles.dropdownTrigger}
            onClick={() => toggleDropdown('price')}
          >
            {priceOptions.find((option) => option.value === priceRange)?.label}
            <ChevronDown
              className={`${styles.chevron} ${
                isOpenPrice ? styles.chevronOpen : ''
              }`}
            />
          </button>
          <div className={`${styles.dropdownMenu} ${isOpenPrice ? styles.open : ''}`}>
            {priceOptions.map((option) => (
              <button
                key={option.value}
                className={`${styles.dropdownItem} ${
                  priceRange === option.value ? styles.selected : ''
                }`}
                onClick={() => handlePriceChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.dropdownContainer}>
          <button
            className={styles.dropdownTrigger}
            onClick={() => toggleDropdown('category')}
          >
            {categoryOptions.find(
              (option) => option.value === category
            )?.label}
            <ChevronDown
              className={`${styles.chevron} ${
                isOpenCategory ? styles.chevronOpen : ''
              }`}
            />
          </button>
          <div className={`${styles.dropdownMenu} ${isOpenCategory ? styles.open : ''}`}>
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                className={`${styles.dropdownItem} ${
                  category === option.value ? styles.selected : ''
                }`}
                onClick={() => handleCategoryChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}