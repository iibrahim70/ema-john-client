import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/Shop';
import Home from './components/Layout/Home';
import Orders from './components/Orders';
import Inventory from './components/Inventory';
import LogIn from './components/LogIn';
import cartProductsLoader from './loaders/cartProductsLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>, 
    children: [
      {
        path: '/', 
        element: <Shop></Shop>, 
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
        path: '/login', 
        element: <LogIn></LogIn>, 
      }, 
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
