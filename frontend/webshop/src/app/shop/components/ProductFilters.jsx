"use client";

export default function ProductFilters({
  category = "All",
  maxPrice = 1000,
  selectedColors = [],
  onFilterChange = () => {},
}) {

  const categories = ["All", "Living Room", "Bedroom", "Office", "Kitchen"];
  const colorOptions = [
    "bg-black",
    "bg-white",
    "bg-gray-300",
    "bg-amber-500",
    "bg-blue-500",
    "bg-yellow-500",
  ];

  const handleCategoryClick = (newCat) => {
    onFilterChange({
      category: newCat,
      price: maxPrice,
      colors: selectedColors,
    });
  };

  const handlePriceChange = (e) => {
    onFilterChange({
      category,
      price: Number(e.target.value),
      colors: selectedColors,
    });
  };

  const handleToggleColor = (color) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    onFilterChange({
      category,
      price: maxPrice,
      colors: updatedColors,
    });
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-lg font-medium mb-4">Categories</h2>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`block w-full text-left px-2 py-1.5 text-gray-600 
                hover:text-black hover:bg-gray-50 rounded-md transition-colors
                ${category === cat ? "bg-gray-50 text-black" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b pb-4">
        <h2 className="text-lg font-medium mb-4">Price Range</h2>
        <div className="px-2">
          <input
            type="range"
            className="w-full accent-black"
            min="0"
            max="1000"
            step="50"
            value={maxPrice}
            onChange={handlePriceChange}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>€0</span>
            <span>€{maxPrice}+</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Colors</h2>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() => handleToggleColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-transform
                ${
                  selectedColors.includes(color)
                    ? "border-black"
                    : "border-gray-200"
                }
                ${color} hover:scale-110`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
