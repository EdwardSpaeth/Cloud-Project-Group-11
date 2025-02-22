"use client";

export default function ProductFilters() {
  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-lg font-medium mb-4">Categories</h2>
        <div className="space-y-2">
          {['All', 'Living Room', 'Bedroom', 'Office', 'Kitchen'].map((category) => (
            <button
              key={category}
              className="block w-full text-left px-2 py-1.5 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
            >
              {category}
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
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>€0</span>
            <span>€1000+</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Colors</h2>
        <div className="flex flex-wrap gap-2">
          {['bg-black', 'bg-white', 'bg-gray-300', 'bg-brown-500', 'bg-blue-500'].map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 border-gray-200 ${color} hover:scale-110 transition-transform`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}