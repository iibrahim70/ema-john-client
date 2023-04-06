import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Cart = ({ cart, handleClearCart, children }) => {
  let totalPrice = 0; 
  let totalShipping = 0; 
  let quantity = 0;
  for(const product of cart){
    product.quantity = product.quantity || 1;
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping += product.shipping;
    quantity += product.quantity;
  }
  const tax = totalPrice*7/100; 
  const grandTotal = totalPrice + totalShipping + tax; 
  return (
    <div className='bg-orange-200 px-4 rounded py-5 h-auto sticky top-0'>
      <h1 className='capitalize text-xl font-normal leading-7 pb-8'>order summary</h1>
      <p className='font-normal leading-5 text-base pb-5'>Selected Items: {quantity}</p>
      <p className='font-normal leading-5 text-base pb-5'>Total Price: ${totalPrice}</p>
      <p className='font-normal leading-5 text-base pb-5'>Shipping: ${totalShipping}</p>
      <p className='font-normal leading-5 text-base pb-5'>Tax: ${tax.toFixed(2)}</p>
      <h6 className='font-bold leading-5 text-base pb-5'>Grand Total: ${grandTotal.toFixed(2)}</h6>
      <button onClick={handleClearCart} className='bg-red-500 text-white py-2 px-3 rounded flex justify-between items-center w-full mb-5'>
        <span>Clear Cart</span>
        <FontAwesomeIcon className='text-white' icon={faTrashAlt}/>
      </button>
      <div className='bg-orange-500 text-white py-2 px-3 rounded w-full '>{children}</div>
    </div>
  );
};

export default Cart;