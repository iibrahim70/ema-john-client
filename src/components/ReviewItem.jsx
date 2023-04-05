import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({ product, handleRemoveFromCart }) => {
  const {id, img, price, name, quantity} = product
  return (
    <div className='w-1/2 border-gray-300 border-2 rounded-lg mx-auto mb-5 mt-5 p-2 pr-5 flex items-center'>
      <img className='w-20 h-20 rounded-lg' src={img} alt="" />
      <div className='mx-3 my-0 text-start grow'>
        <h1 className='font-normal text-xl leading-6 tracking-wide'>{name}</h1>
        <p className='font-normal text-base leading-5 tracking-wide; '>Price: <span className='text-orange-500'>${price}</span></p>
        <p className='font-normal text-base leading-5 tracking-wide; '>Order Quantity: <span className='text-orange-500'>{quantity}</span></p>
      </div>
      <div className='w-14'>
        <button onClick={() => handleRemoveFromCart(id)} className='ml-auto w-8 h-8 bg-red-200 flex justify-center items-center rounded-full'><FontAwesomeIcon className='text-red-500' icon={faTrashAlt} /></button>
      </div>
    </div>
  );
};

export default ReviewItem;