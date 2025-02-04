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
  });

  const [modal, setModal] = useState({
    isOpen: false,
    productId: null,
    field: "",
  });


  const lowStockProducts = products.filter((p) => Number(p.stock) < 10);

  // Fetch products from the backend using /products/0 (returns all products)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io/products/0");
        if (!response.ok) throw new Error("Error fetching products");
        const data = await response.json();
        const dataWithIds = data.map((prod, index) => ({ ...prod, id: index + 1 }));
        setProducts(dataWithIds);
        const initialEdits = {};
        dataWithIds.forEach((prod) => {
          initialEdits[prod.id] = { ...prod };
        });
        setEditedProducts(initialEdits);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle changes for editable fields
  const handleFieldChange = (id, field, value) => {
    setEditedProducts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // Update product in the backend and locally
  const updateProduct = async (id) => {
    const updatedData = editedProducts[id];
    try {
      const response = await fetch(`https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updatedData : p))
        );
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product");
      }
    } catch (err) {
      alert("Error updating product: " + err.message);
    }
  };

  // Handle input change for new product form
  const handleNewProductChange = (field, value) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  // Add new product via the backend (doesnt work, is just a skelleton!!!!! so dont message me if this not work, please!)
  const addProduct = async () => {
    const productToAdd = {
      ...newProduct,
      price: newProduct.price,
      stock: newProduct.stock,
      materials: newProduct.materials.split(",").map((m) => m.trim()),
      colors: newProduct.colors.split(",").map((c) => c.trim()),
    };
    try {
      const response = await fetch("https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io/products/0", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productToAdd),
      });
      if (!response.ok) throw new Error("Failed to add product");
      const addedProduct = await response.json();
      addedProduct.id = products.length + 1;
      setProducts((prev) => [...prev, addedProduct]);
      setEditedProducts((prev) => ({ ...prev, [addedProduct.id]: addedProduct }));
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
      });
      setShowNewProductForm(false);
      alert("New product added!");
    } catch (err) {
      alert(err.message);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminCredentials");
    router.push("/admin/login");
  };


  const openModal = (id, field) => {
    setModal({ isOpen: true, productId: id, field });
  };


  const closeModal = () => {
    setModal({ isOpen: false, productId: null, field: "" });
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold mb-4 md:mb-0">Product Overview</h2>
        <div className="flex gap-4">
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
        </div>
      </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Warning: The following products have low stock:{" "}
              {lowStockProducts.map((p) => `ID ${p.id} (${p.name} - Stock: ${p.stock})`).join(", ")}
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
              { label: "Name", field: "name" },
              { label: "Category", field: "category" },
              { label: "Description", field: "description" },
              { label: "Price", field: "price" },
              { label: "Currency", field: "currency" },
              { label: "Brand", field: "brand" },
              { label: "Materials (comma separated)", field: "materials" },
              { label: "Colors (comma separated)", field: "colors" },
              { label: "Stock", field: "stock" },
            ].map((item) => (
              <div key={item.field}>
                <label className="block font-semibold">{item.label}</label>
                <input
                  type="text"
                  value={newProduct[item.field]}
                  onChange={(e) => handleNewProductChange(item.field, e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                />
              </div>
            ))}
          </div>
          <button
            onClick={addProduct}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </div>
      )}
      {/* Products Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              {[
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
                <th key={header} className="px-4 py-3 text-left uppercase text-sm tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{product.id}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <div
                    onClick={() => openModal(product.id, "name")}
                    className="cursor-pointer hover:underline flex-1"
                  >
                    {editedProducts[product.id]?.name?.length > 20
                      ? editedProducts[product.id].name.slice(0, 20) + "..."
                      : editedProducts[product.id]?.name}
                  </div>
                  <button
                    onClick={() => openModal(product.id, "name")}
                    title="Edit full name"
                    className="p-1 hover:text-blue-500 self-center"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <div
                    onClick={() => openModal(product.id, "description")}
                    className="cursor-pointer hover:underline flex-1"
                  >
                    {editedProducts[product.id]?.description?.length > 50
                      ? editedProducts[product.id].description.slice(0, 50) + "..."
                      : editedProducts[product.id]?.description}
                  </div>
                  <button
                    onClick={() => openModal(product.id, "description")}
                    title="Edit full description"
                    className="p-1 hover:text-blue-500"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={`${editedProducts[product.id]?.price || 0} ${product.currency || ""}`}
                    onChange={(e) => handleFieldChange(product.id, "price", e.target.value)}
                    className="w-full border rounded p-1 text-sm"
                  />
                </td>
                <td className="px-4 py-3">{product.brand}</td>
                <td className="px-4 py-3">{product.materials.join(", ")}</td>
                <td className="px-4 py-3">{product.colors.join(", ")}</td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={editedProducts[product.id]?.stock || ""}
                    onChange={(e) => handleFieldChange(product.id, "stock", e.target.value)}
                    className="w-full border rounded p-1 text-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => updateProduct(product.id)}
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
              Edit Full {modal.field === "name" ? "Name" : "Description"}
            </h3>
            {modal.field === "description" ? (
              <textarea
                value={editedProducts[modal.productId]?.description || ""}
                onChange={(e) =>
                  handleFieldChange(modal.productId, "description", e.target.value)
                }
                className="w-full border rounded p-2"
                rows={10}
              />
            ) : (
              <textarea
                value={editedProducts[modal.productId]?.name || ""}
                onChange={(e) =>
                  handleFieldChange(modal.productId, "name", e.target.value)
                }
                className="w-full border rounded p-2"
                rows={3}
              />
            )}
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => {
                  updateProduct(modal.productId);
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