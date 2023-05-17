import React, { useState } from 'react';
import Cart from '../Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
  const savedCart = useLoaderData()
  const [cart, setCart] = useState(savedCart)

  const handleRemoveFromCart = (id) => {
    const remaining = cart.filter(product => product._id !== id);
    setCart(remaining);
    removeFromDb(id);
  }

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  }
  return (
    <div className='grid grid-cols-16'>
      <div>
        {
          cart.map(product => <ReviewItem key={product._id} product={product} handleRemoveFromCart={handleRemoveFromCart}></ReviewItem>)
        }
      </div>
      <div>
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link to='/checkout'>
            <div className='w-full flex justify-between items-center'>
              <span>Proceed Checkout</span>
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;