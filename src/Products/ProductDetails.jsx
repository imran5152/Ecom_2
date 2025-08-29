
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:1000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-20 text-lg">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-lg shadow">
        <img src={product.image} alt={product.title} className="w-72 h-72 object-contain" />
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-500 mb-2 capitalize">{product.category}</p>
          <p className="text-purple-700 text-2xl font-bold mb-4">₹{product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <p>
            
          </p>
          <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
