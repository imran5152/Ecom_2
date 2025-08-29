import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white text-gray-900">

     
      <section className="flex-1 flex flex-col-reverse md:flex-row items-center justify-between px-6 py-24 max-w-7xl mx-auto gap-16">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-800 mb-6 leading-tight">
            Build & Scale Your Online Store Effortlessly
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Empower your eCommerce business with intuitive product management, insightful analytics, and seamless order tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg transition duration-300">
              Get Started Free
            </button>

         
            <Link to="/products">
              <button className="bg-white border border-purple-600 text-purple-700 text-lg font-semibold px-8 py-4 rounded-lg shadow transition duration-300 hover:bg-purple-50">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
            alt="E-commerce Dashboard"
            className="rounded-xl shadow-2xl max-w-full h-auto"
          />
        </div>
      </section>

      
      <section className="flex-1 flex flex-col-reverse md:flex-row items-center justify-between px-6 py-24 max-w-7xl mx-auto gap-16">
        <div>
          <img
            src="https://www.seekpng.com/png/full/774-7744281_samsung-electronics-samsung-electronic-product-png.png"
            alt="E-commerce Dashboard"
            className="rounded-xl shadow-2xl max-w-full h-auto"
          />
        </div>
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-800 mb-6 leading-tight">
            Build & Scale Your Online Store Effortlessly
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Empower your eCommerce business with intuitive product management, insightful analytics, and seamless order tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          

        
             <Link to="/productel">
              <button className="bg-white border border-purple-600 text-purple-700 text-lg font-semibold px-8 py-4 rounded-lg shadow transition duration-300 hover:bg-purple-50">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
        
      </section>
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold text-purple-800 mb-12 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4 text-purple-700">Easy Product Management</h3>
            <p className="text-gray-700">Add, edit, and organize your products with an intuitive dashboard designed for your convenience.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4 text-purple-700">Insightful Analytics</h3>
            <p className="text-gray-700">Track sales, monitor customer behavior, and make data-driven decisions with powerful analytics.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4 text-purple-700">Seamless Order Tracking</h3>
            <p className="text-gray-700">Keep your customers informed with real-time updates on their orders from purchase to delivery.</p>
          </div>
        </div>
      </section>

   
      <section className="bg-purple-100 py-16 px-6">
        <h2 className="text-4xl font-extrabold text-purple-800 mb-12 text-center">What Our Clients Say</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <blockquote className="bg-white p-6 rounded-2xl shadow-md italic text-gray-700">
            “The platform transformed our online store experience. Managing products is now a breeze and sales have increased significantly!”
            <footer className="mt-4 font-semibold text-purple-700">— Ayesha K.</footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-2xl shadow-md italic text-gray-700">
            “Insightful analytics helped us target the right customers and boost our revenue in months. Highly recommend this service.”
            <footer className="mt-4 font-semibold text-purple-700">— Raj Patel</footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-2xl shadow-md italic text-gray-700">
            “Order tracking keeps my customers happy and reduces support requests. Great tool for any ecommerce business.”
            <footer className="mt-4 font-semibold text-purple-700">— Sneha Verma</footer>
          </blockquote>
        </div>
      </section>

     
     
      <footer className="bg-purple-700 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} YourCompany. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-purple-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-purple-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-purple-300 transition">Contact</a>
          </div>
        </div>


        <div className="max-w-7xl mx-auto px-6 mt-6 flex justify-center space-x-8">
          <a href="#" aria-label="Twitter" className="hover:text-purple-300 transition text-2xl">🐦</a>
          <a href="#" aria-label="Facebook" className="hover:text-purple-300 transition text-2xl">📘</a>
          <a href="#" aria-label="Instagram" className="hover:text-purple-300 transition text-2xl">📸</a>
          <a href="#" aria-label="LinkedIn" className="hover:text-purple-300 transition text-2xl">🔗</a>
        </div>
      </footer>

    </div>
  );
};
   
export default Home;
