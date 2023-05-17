import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Pages/Shop';
import Home from './components/Layout/Home';
import Orders from './components/Pages/Orders';
import Inventory from './components/Pages/Inventory';
import LogIn from './components/Pages/LogIn';
import cartProductsLoader from './loaders/cartProductsLoader';
import Checkout from './components/Checkout';
import Signup from './components/Pages/Signup';
import AuthProvider from './components/providers/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>, 
    children: [
      {
        path: '/', 
        element: <Shop></Shop>, 
        loader: () => fetch('http://localhost:5000/totalProducts')
      }, 
      {
        path: '/orders', 
        element: <Orders></Orders>, 
        loader: cartProductsLoader, 
      }, 
      {
        path: '/inventory', 
        element: <Inventory></Inventory>, 
      }, 
      {
        path: '/checkout', 
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>, 
      }, 
      {
        path: '/login', 
        element: <LogIn></LogIn>, 
      }, 
      {
        path: '/signup', 
        element: <Signup></Signup>, 
      }, 
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
