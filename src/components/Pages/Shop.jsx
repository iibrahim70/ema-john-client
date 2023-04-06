import React, { useEffect, useState } from 'react'
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart';
import Product from '../Layout/Product';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] =  useState([]);

  useEffect(() =>{
    fetch('products.json')
    .then(res => res.json())
    .then(data => setProducts(data))
  },[]); 

  useEffect(() =>{
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step 1: get id 
    for(const id in storedCart){
    // step 2: get the product by using id
      const addedProduct = products.find(product => product.id === id)
    // step 3: get quantity of the product
      if(addedProduct){
        const quantity = storedCart[id]
        addedProduct.quantity = quantity
    // step 4: add the product to the cart
        savedCart.push(addedProduct);
      }
    }
    // step 5: set the cart
    setCart(savedCart);
  }, [products])
  const handleAddToCart = product => {
    const newCart = [...cart, product];
    setCart(newCart)
    addToDb(product.id);
  }

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  }
  return (
    <div className='grid grid-cols-16'>
      <div className='grid grid-cols-3 mt-10 mx-5'>
        {
          products.map(product => <Product key= {product.id} product= {product} handleAddToCart= {handleAddToCart}></Product>)
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
  );
};

export default Shop;