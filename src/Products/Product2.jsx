import React, { useEffect, useState } from 'react';

const Product2 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null); 
  const [form, setForm] = useState({ title: '', price: '', category: '', description: '', image: '' });

  useEffect(() => {
    fetch('http://localhost:1000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`http://localhost:1000/products/${_id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      setProducts(prev => prev.filter(p => p._id !== _id));
    } catch (err) {
      setError('Delete error');
    }
  };

  const startEditing = (product) => {
    setEditing(product._id);
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:1000/products/${editing}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();

      const updatedList = products.map(product =>
        product._id === editing ? { ...product, ...form } : product
      );

      setProducts(updatedList);
      setEditing(null);
    } catch (err) {
      setError('Update error');
    }
  };

  const handleInputChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg mt-20 w-[90%] mx-auto shadow-lg">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-purple-600 text-white sticky top-0">
          <tr>
            {['Name', 'Price', 'Category', 'Description', 'Image', 'Actions'].map(header => (
              <th key={header} className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="6" className="text-center py-4">Loading...</td></tr>
          ) : error ? (
            <tr><td colSpan="6" className="text-center text-red-500 py-4">Error: {error}</td></tr>
          ) : products.length === 0 ? (
            <tr><td colSpan="6" className="text-center py-4">No products found.</td></tr>
          ) : (
            products.map(product => (
              <tr key={product._id} className="hover:bg-purple-50 transition cursor-pointer">
                <td className="border border-gray-300 px-4 py-3 text-sm">
                  {editing === product._id ? (
                    <input name="title" value={form.title} onChange={handleInputChange} />
                  ) : product.title}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm">
                  {editing === product._id ? (
                    <input name="price" value={form.price} onChange={handleInputChange} />
                  ) : `₹${product.price}`}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm">
                  {editing === product._id ? (
                    <input name="category" value={form.category} onChange={handleInputChange} />
                  ) : product.category}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm max-w-xs truncate" title={product.description}>
                  {editing === product._id ? (
                    <input name="description" value={form.description} onChange={handleInputChange} />
                  ) : product.description}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm">
                  {editing === product._id ? (
                    <input name="image" value={form.image} onChange={handleInputChange} />
                  ) : <img src={product.image} alt={product.title} className="h-10" />}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-sm space-x-2">
                  {editing === product._id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                        onClick={() => startEditing(product)}
                      >
                        Update
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Product2;
