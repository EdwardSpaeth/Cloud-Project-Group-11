"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [editedProducts, setEditedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    currency: "",
    brand: "",
    materials: "",
    colors: "",
    stock: "",
    image: "",
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    productKey: null,
    field: "",
  });

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageList, setImageList] = useState([]);

  const lowStockProducts = products.filter((p) => Number(p.stock) < 10);

  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io/messages"
      );
      const server_message = await response.json();
      if (!response.ok) throw new Error(server_message.message);
      setMessages(server_message);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleMessages = () => {
    setShowMessages((prev) => {
      if (!prev) {
        fetchMessages();
      }
      return !prev;
    });
  };

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(
        `https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io/messages/${id}`,
        {
          method: "DELETE",
        }
      );

      const server_answer = await response.json();
      if (!response.ok) throw new Error(server_answer.message);

      setMessages((prev) => prev.filter((msg) => msg.id !== id));

      alert(server_answer.message);
    } catch (err) {
      alert(err.message);
    }
  };

  // Fetch products from the backend using /products/0 (returns all products)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io/products/0"
        );
        if (!response.ok) throw new Error("Failed to load products");
        const data = await response.json();

        // Create an internal key and store the original backend id separately.
        const dataWithKeys = data.map((prod, index) => ({
          key: index + 1, // internal key that remains stable
          backendId: prod.id, // original id from the backend
          name: prod.name,
          category: prod.category,
          description: prod.description,
          price: prod.price,
          currency: prod.currency,
          brand: prod.brand,
          materials: Array.isArray(prod.materials) ? prod.materials : [],
          colors: Array.isArray(prod.colors) ? prod.colors : [],
          stock: prod.stock,
          image: prod.pictureUrl,
        }));

        setProducts(dataWithKeys);

        const initialEdits = {};
        dataWithKeys.forEach((prod) => {
          initialEdits[prod.key] = { ...prod };
        });
        setEditedProducts(initialEdits);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const images = [
      "accent-chair.webp",
      "bookshelf.webp",
      "coffee-table.webp",
      "dining-table.webp",
      "dresser.webp",
      "ergonomic-office-chair.webp",
      "floor-lamp.webp",
      "landing.jpg",
      "lounge-chair.webp",
      "modern-sofa.webp",
      "stock1.png",
      "stock2.png",
      "stock3.png",
    ];
    setImageList(images);
  }, []);

  // Handle changes for editable fields
  const handleFieldChange = (key, field, value) => {
    let processedValue = value;

    if (field === "price") {
      processedValue = parseFloat(value) || 0;
    } else if (field === "stock") {
      processedValue = parseInt(value) || 0;
    } else if (field === "materials" || field === "colors") {
      processedValue =
        typeof value === "string"
          ? value.split(",").map((item) => item.trim())
          : value;
    }

    // Prevent changes to the internal key or backendId
    if (field === "key" || field === "backendId") return;

    setEditedProducts((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: processedValue,
      },
    }));
  };

  const updateProduct = async (key) => {
    const productToUpdate = editedProducts[key];
    const backendId = productToUpdate.backendId;
    const updatedData = {
      ...productToUpdate,
      pictureUrl: productToUpdate.image,
      price: parseFloat(productToUpdate.price),
    };

    try {
      const response = await fetch(
        `https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io/products/${backendId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      const server_answer = await response.json();
      if (!response.ok) throw new Error(server_answer.message);

      const updatedProduct = {
        ...updatedData,
        key: key,
        backendId: backendId,
        image: updatedData.pictureUrl,
      };

      setProducts((prev) =>
        prev.map((p) => (p.key === key ? updatedProduct : p))
      );

      setEditedProducts((prev) => ({
        ...prev,
        [key]: updatedProduct,
      }));

      alert(server_answer.message);
    } catch (err) {
      alert(err.message);
    }
  };

  // Function to delete selected products
  const deleteSelectedProducts = async () => {
    const backendIds = products
      .filter((p) => selectedProducts.includes(p.key))
      .map((p) => p.backendId);

    const data = { ids: backendIds };
    try {
      const response = await fetch(
        `https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io/products`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const server_answer = await response.json();
      if (!response.ok) {
        throw new Error(server_answer.message);
      }

      setProducts((prev) =>
        prev.filter((p) => !selectedProducts.includes(p.key))
      );
      setSelectedProducts([]);

      alert(server_answer.message);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleNewProductChange = (field, value) => {
    let processedValue = value;

    if (field === "price") {
      const normalizedValue = value.replace(",", ".");
      const floatValue = parseFloat(normalizedValue);
      processedValue = isNaN(floatValue) ? 0 : floatValue;
    } else if (field === "stock") {
      // Convert to integer and handle invalid input
      const intValue = parseInt(value);
      processedValue = isNaN(intValue) ? 0 : intValue;
    }

    setNewProduct(prev => ({ ...prev, [field]: processedValue }));
  };

  // Add new product via the backend
  const addProduct = async () => {
    // Validate price is a number
    if (typeof newProduct.price !== 'number' || isNaN(newProduct.price)) {
      alert('Please enter a valid price');
      return;
    }

    const productToAdd = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      materials: newProduct.materials ? newProduct.materials.split(",").map((m) => m.trim()) : [],
      colors: newProduct.colors ? newProduct.colors.split(",").map((c) => c.trim()) : [],
    };

    try {
      const response = await fetch(
        "https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productToAdd),
        }
      );

      const server_answer = await response.json();
      if (!response.ok) throw new Error(server_answer.message);

      const newKey = products.length ? Math.max(...products.map((p) => p.key)) + 1 : 1;
      const addedProduct = {
        ...server_answer,
        key: newKey,
        backendId: server_answer.id,
        image: server_answer.pictureUrl,
        // Ensure materials and colors are arrays
        materials: Array.isArray(server_answer.materials) ? server_answer.materials : [],
        colors: Array.isArray(server_answer.colors) ? server_answer.colors : [],
      };

      setProducts((prev) => [...prev, addedProduct]);
      setEditedProducts((prev) => ({ ...prev, [newKey]: addedProduct }));
      setNewProduct({
        name: "",
        category: "",
        description: "",
        price: "",
        currency: "",
        brand: "",
        materials: "",
        colors: "",
        stock: "",
        image: "",
      });
      setShowNewProductForm(false);

      alert(server_answer.message);
    } catch (err) {
      alert(err.message);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminCredentials");
    router.push("/admin/login");
  };

  const openModal = (key, field) => {
    setModal({ isOpen: true, productKey: key, field });
  };

  const closeModal = () => {
    setModal({ isOpen: false, productKey: null, field: "" });
  };

  const handleSelectProduct = (key) => {
    setSelectedProducts((prev) =>
      prev.includes(key)
        ? prev.filter((productKey) => productKey !== key)
        : [...prev, key]
    );
  };

  const openImageModal = () => {
    setImageModalOpen(true);
  };

  const [editImageProduct, setEditImageProduct] = useState(null);

  const openImageModalForEdit = (productKey) => {
    setEditImageProduct(productKey);
    setImageModalOpen(true);
  };

  const selectImage = (image) => {
    if (editImageProduct) {
      handleFieldChange(editImageProduct, "image", image);
      setEditImageProduct(null);
    } else {
      setNewProduct((prev) => ({ ...prev, image }));
    }
    setImageModalOpen(false);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold mb-4 md:mb-0">
          Product Overview
        </h2>
        <div className="flex gap-4">
          <button
            onClick={handleToggleMessages}
            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
          >
            {showMessages ? "Hide Messages" : "Messages"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
          <button
            onClick={() => setShowNewProductForm((prev) => !prev)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {showNewProductForm ? "Cancel" : "Add New Product"}
          </button>
          {selectedProducts.length > 0 && (
            <button
              onClick={deleteSelectedProducts}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>

      {showMessages && (
        <div className="mt-4 mb-6 p-4 border rounded bg-white">
          <h3 className="text-xl font-semibold mb-2">Messages</h3>
          {messages.length === 0 ? (
            <div>No messages found.</div>
          ) : (
            <table className="min-w-full mb-4">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className="border-b">
                    <td className="px-4 py-2">{msg.name}</td>
                    <td className="px-4 py-2">{msg.email}</td>
                    <td className="px-4 py-2">{msg.subject}</td>
                    <td className="px-4 py-2">{msg.message}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded shadow">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Warning: The following products have low stock:{" "}
              {lowStockProducts
                .map(
                  (p) =>
                    `ID ${p.backendId} (${p.name} - Stock: ${p.stock})`
                )
                .join(", ")}
            </span>
          </div>
        </div>
      )}

      {/* New Product Form */}
      {showNewProductForm && (
        <div className="mb-6 p-6 bg-white rounded shadow-md border">
          <h3 className="text-2xl font-bold mb-4">New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Name", field: "name", type: "text" },
              { label: "Category", field: "category", type: "text" },
              { label: "Description", field: "description", type: "text" },
              { label: "Price", field: "price", type: "number", step: "0.01", min: "0" },
              { label: "Currency", field: "currency", type: "text" },
              { label: "Brand", field: "brand", type: "text" },
              { label: "Materials (comma separated)", field: "materials", type: "text" },
              { label: "Colors (comma separated)", field: "colors", type: "text" },
              { label: "Stock", field: "stock", type: "number", min: "0" },
            ].map((item) => (
              <div key={item.field}>
                <label className="block font-semibold">{item.label}</label>
                <input
                  type={item.type}
                  step={item.step}
                  min={item.min}
                  value={newProduct[item.field]}
                  onChange={(e) => handleNewProductChange(item.field, e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                />
              </div>
            ))}
            {/* Add Image Button */}
            <div>
              <label className="block font-semibold">Product Image</label>
              <button
                type="button"
                onClick={openImageModal}
                className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Add Image
              </button>
              {newProduct.image && (
                <div className="mt-2">
                  <img
                    src={`/images/${newProduct.image}`}
                    alt="Selected"
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              )}
            </div>
            {/* Submit Button */}
            <div className="col-span-2">
              <button
                onClick={addProduct}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Selection Modal */}
      {imageModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setImageModalOpen(false)}
            style={{ zIndex: 40 }}
          />
          {/* Modal Content */}
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 50 }}
          >
            <div
              className="relative bg-white p-6 rounded shadow-lg w-3/4 max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {editImageProduct
                    ? "Change Product Image"
                    : "Select an Image"}
                </h3>
                <button
                  onClick={() => setImageModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto p-4">
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square relative group cursor-pointer hover:opacity-90"
                    onClick={() => selectImage(image)}
                  >
                    <img
                      src={`/images/${image}`}
                      alt="Product"
                      className="w-full h-full object-cover rounded border border-gray-200"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded">
                      <span className="text-white text-sm font-medium">
                        Select
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedProducts(
                      e.target.checked ? products.map((p) => p.key) : []
                    )
                  }
                  checked={selectedProducts.length === products.length}
                />
              </th>
              {[
                "Image",
                "ID",
                "Name",
                "Category",
                "Description",
                "Price",
                "Brand",
                "Materials",
                "Colors",
                "Stock",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left uppercase text-sm tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...products]
              .sort((a, b) => a.key - b.key)
              .map((product) => (
                <tr key={product.key} className="hover:bg-gray-50">
                  {/* Checkbox cell */}
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.key)}
                      onChange={() => handleSelectProduct(product.key)}
                      className="rounded border-gray-300"
                    />
                  </td>

                  {/* Image cell */}
                  <td className="px-4 py-3">
                    <div className="relative group">
                      <img
                        src={`/images/${editedProducts[product.key]?.image}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                      <button
                        onClick={() => openImageModalForEdit(product.key)}
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"
                      >
                        <span className="text-white text-sm font-medium">
                          Change Image
                        </span>
                      </button>
                    </div>
                  </td>

                  {/* ID cell: show backendId */}
                  <td className="px-4 py-3">{product.backendId}</td>

                  {/* Name cell */}
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={
                        editedProducts[product.key]?.name ?? product.name
                      }
                      onChange={(e) =>
                        handleFieldChange(product.key, "name", e.target.value)
                      }
                      className="w-full border rounded p-1 text-sm"
                    />
                  </td>

                  {/* Category cell */}
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={
                        editedProducts[product.key]?.category ??
                        product.category
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          product.key,
                          "category",
                          e.target.value
                        )
                      }
                      className="w-full border rounded p-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <textarea
                      value={
                        editedProducts[product.key]?.description ??
                        product.description
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          product.key,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full border rounded p-1 text-sm"
                      rows={2}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={
                        editedProducts[product.key]?.price ?? product.price
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          product.key,
                          "price",
                          e.target.value
                        )
                      }
                      className="w-full border rounded p-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={
                        editedProducts[product.key]?.brand ?? product.brand
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          product.key,
                          "brand",
                          e.target.value
                        )
                      }
                      className="w-full border rounded p-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={
                        editedProducts[product.key]?.materials?.join(", ") ??
                        product.materials.join(", ")
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          product.key,
                          "materials",
                          e.target.value
                        )
                      }
                      className="w-full border rounded p-1 text-sm"
                      placeholder="Comma separated values"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={
                        editedProducts[product.key]?.colors?.join(", ") ??
                        product.colors.join(", ")
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          product.key,
                          "colors",
                          e.target.value
                        )
                      }
                      className="w-full border rounded p-1 text-sm"
                      placeholder="Comma separated values"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={
                        editedProducts[product.key]?.stock ?? product.stock
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          product.key,
                          "stock",
                          e.target.value
                        )
                      }
                      className="w-full border rounded p-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => updateProduct(product.key)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal for full field editing */}
      {modal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 w-11/12 md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">
              Edit Full{" "}
              {modal.field === "name" ? "Name" : "Description"}
            </h3>
            {modal.field === "description" ? (
              <textarea
                value={editedProducts[modal.productKey]?.description || ""}
                onChange={(e) =>
                  handleFieldChange(
                    modal.productKey,
                    "description",
                    e.target.value
                  )
                }
                className="w-full border rounded p-2"
                rows={10}
              />
            ) : (
              <textarea
                value={editedProducts[modal.productKey]?.name || ""}
                onChange={(e) =>
                  handleFieldChange(
                    modal.productKey,
                    "name",
                    e.target.value
                  )
                }
                className="w-full border rounded p-2"
                rows={3}
              />
            )}
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => {
                  updateProduct(modal.productKey);
                  closeModal();
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
