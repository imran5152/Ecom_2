import React, { useState, useEffect } from "react";

const UserDashbo = () => {
  const [products, setProducts] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [product, setProduct] = useState({
    title: "",
    type: "",
    image: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch("http://localhost:1000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setError("Error fetching products"));
  }, []);


  const toggleRow = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };


  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };


  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (res.ok) {
        setProducts([...products, data]);
        setProduct({
          tite: "",
          type: "",
          image: "",
          description: "",
          price: "",
          category: "",
          stock: "",
        });
      } else {
        console.error("Server error:", data);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-8 text-indigo-700 border-b pb-2">
        User Dashboard
      </h2>

      <form
        onSubmit={handleProductSubmit}
        className="mb-10 p-4 bg-white rounded shadow"
      >
        <h3 className="text-xl font-semibold mb-4">Add Product</h3>

        <input
          name="title"
          type="text"
          placeholder="Product Name"
          value={product.title}
          onChange={handleProductChange}
          required
          className="w-full  p-2 border rounded mb-3"
        />

        <input
          name="type"
          type="text"
          placeholder="Product Type"
          value={product.type}
          onChange={handleProductChange}
          required
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="image"
          type="url"
          placeholder="Image URL"
          value={product.image}
          onChange={handleProductChange}
          required
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleProductChange}
          required
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={product.price}
          onChange={handleProductChange}
          required
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="category"
          type="text"
          placeholder="Category"
          value={product.category}
          onChange={handleProductChange}
          required
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleProductChange}
          required
          className="w-full p-2 border rounded mb-3"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Product
        </button>
      </form>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No products added yet.
        </p>
      ) : (
        <div className="max-h-96 overflow-y-auto border border-gray-300 rounded">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-indigo-100 sticky top-0 z-10">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <React.Fragment key={p._id || index}>
                  <tr
                    onClick={() => toggleRow(index)}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {p.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {p.type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-16 w-16 object-contain"
                      />
                    </td>
                  </tr>
                  {expandedIndex === index && (
                    <tr>
                      <td
                        colSpan={3}
                        className="border border-gray-300 px-4 py-2 bg-gray-50 text-gray-700"
                      >
                        <strong>Description:</strong> {p.description} <br />
                        <strong>Price:</strong> ₹{p.price} <br />
                        <strong>Category:</strong> {p.category} <br />
                        <strong>Stock:</strong> {p.stock}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashbo;
