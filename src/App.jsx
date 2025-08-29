  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Adminlogin from './Admin\'/Admin';
  import AdminDashboard from './Admin\'/Admindashboard';
  import Navbar from './Navbar/Navbar';
  import Home from './Home';
  import Dashboard2 from './Admin\'/Dahsboard2';
  import { TaskProvider } from './TaskContext';
  import UserDashboard from './User/UserDashboard';
  import Userlogin from './User/Userlogin';
  import PrivateRoute from '../PrivateRoute';
import ProductPage from './Products/Prouctpage1';
import ProductEle from './Products/ProductEle';
import Product2 from './Products/Product2';
import ProductDetails from './Products/ProductDetails';
import Cart from './Cart.jsx/Cart';



  export default function App() {
    return (
      <TaskProvider>
      <Router>
        <Navbar/>
      
       <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/adminlogin' element={<Adminlogin />} />
  <Route path='/dashboard2' element={<Dashboard2 />} />
  <Route path='/userdashboard' element={<UserDashboard />} />
  <Route path='/userlogin' element={<Userlogin />} />
  <Route path='/dashboard' element={<AdminDashboard/>}/>
  <Route path='/products' element={<ProductPage/>}/>
  <Route path='/product2' element={<Product2/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/product/:id' element={<ProductDetails/>}/>
  <Route path='/productel' element={<ProductEle/>}/>
 <Route path='/dashboard' element={
  <PrivateRoute>
    <AdminDashboard />
  </PrivateRoute>
} />

</Routes>

      </Router>
      </TaskProvider>
    );
  }
