import React, { useEffect, useState } from 'react';
import { FaSearch, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  
  useEffect(() => {
    fetch('http://localhost:1000/products')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  const toggleCategory = (cat) =>
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );


  const toggleBrand = (br) =>
    setSelectedBrands(prev =>
      prev.includes(br) ? prev.filter(b => b !== br) : [...prev, br]
    );


  const filtered = products.filter(p => {
    const titleName = (p.title || p.name || '').toLowerCase();
    const matchesSearch = titleName.includes(search.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    return matchesSearch && matchesCategory && matchesBrand;
  });

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-10 md:px-16">
      <div className="max-w-[92rem] mx-auto flex flex-col lg:flex-row gap-10">


        <aside className="hidden lg:block w-64 bg-white p-6 rounded-lg shadow-md sticky top-28 h-[calc(100vh-7rem)] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Filters</h2>


          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Category</h3>
            <label className="flex items-center mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.length === 0}
                onChange={() => setSelectedCategories([])}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span className="ml-3 text-gray-700">All Products</span>
            </label>
            {categories.map(cat => (
              <label key={cat} className="flex items-center mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
                <span className="ml-3 text-gray-700">{cat}</span>
              </label>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Brand</h3>
            <label className="flex items-center mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.length === 0}
                onChange={() => setSelectedBrands([])}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span className="ml-3 text-gray-700">All Brands</span>
            </label>
            {brands.map(br => (
              <label key={br} className="flex items-center mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(br)}
                  onChange={() => toggleBrand(br)}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
                <span className="ml-3 text-gray-700">{br}</span>
              </label>
            ))}
          </div>
        </aside>


        <div className="flex-1">
          <div className="flex items-center bg-white border rounded-xl px-6 py-4 shadow-sm mb-10">
            <FaSearch className="text-gray-400 mr-5 text-lg" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full focus:outline-none text-gray-800 text-lg placeholder-gray-400"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 text-xl mt-20 font-medium">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filtered.map(p => (
                <div
                  key={p._id || p.id}
                  onClick={() => navigate(`/product/${p._id || p.id}`)}
                  className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:scale-[1.02] border hover:border-purple-500"
                >

                  <img
                    src={p.image || 'https://via.placeholder.com/600x400'}
                    alt={p.title || p.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold text-gray-900 truncate">{p.title || p.name}</h2>
                    <div className="flex items-center text-yellow-400 space-x-1 text-base">
                      <FaStar />
                      <span className="font-semibold text-gray-700">4.5</span>
                    </div>
                    <p className="text-xl font-bold text-purple-700">
                      ₹{Number(p.price)?.toLocaleString?.() || 'N/A'}
                    </p>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold tracking-wide shadow-sm hover:shadow-md"
                    onClick={()=>addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage