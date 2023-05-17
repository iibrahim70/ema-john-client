import React, { useEffect, useState } from 'react'
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart';
import Product from '../Layout/Product';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [cart, setCart] = useState([]);
  const { totalProducts } = useLoaderData();

  const totalPages = Math.ceil(totalProducts / itemsPerPage); 
  const pageNumbers = [...Array(totalPages).keys()];

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const selectedProductId = Object.keys(storedCart); 
    fetch(`http://localhost:5000/productsById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(selectedProductId)
    })  
      .then(res => res.json())
      .then(cardProducts => {
        const savedCart = [];
        // step 1: get id 
        for (const id in storedCart) {
          // step 2: get the product by using id
          const addedProduct = cardProducts.find(product => product._id === id)
          // step 3: get quantity of the product
          if (addedProduct) {
            const quantity = storedCart[id]
            addedProduct.quantity = quantity
            // step 4: add the product to the cart
            savedCart.push(addedProduct);
          }
        }
        // step 5: set the cart
        setCart(savedCart);
    })

  }, [])
  const handleAddToCart = product => {
    const newCart = [...cart, product];
    setCart(newCart)
    addToDb(product._id);
  }

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  }

  const options = [5, 10, 20]; 
  const handleSelectChange = e => {
    setItemsPerPage(parseInt(e.target.value)); 
    setCurrentPage(0); 
  }

  return (
    <>
      <div className='grid grid-cols-16'>
        <div className='grid grid-cols-3 mt-10 mx-5'>
          {
            products.map(product => <Product key={product._id} product={product} handleAddToCart={handleAddToCart}></Product>)
          }
        </div>
        <div>
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link to='/orders'>
              <div className='w-full flex justify-between items-center'>
                <span>Review Orders</span>
                <FontAwesomeIcon className='text-white' icon={faArrowRight} />
              </div>
            </Link>
          </Cart>
        </div>
      </div>
      {/* pagination */}
      <div className='text-center mb-5 space-x-5'>
        {
          pageNumbers.map(number => <button className={currentPage === number ? 'bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-2' : ''} key={number} onClick={() => setCurrentPage(number)}>{number + 1}</button>)
        }
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map(option => (<option key={option} value={option}>{option}</option>))}
        </select>
      </div>
    </>
  );
};

export default Shop;  