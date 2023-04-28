import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
  const {img, name, seller, ratings, price} = props.product;
  const handleAddToCart = props.handleAddToCart; 
  return (
    <div className='mb-10 w-72 h-auto relative rounded-lg border-gray-300 border'>
      <img className='px-2 py-2 h-40 w-full' src={img} alt="" />
      <div className='product-info ps-5'>
        <h6 className='font-normal text-xl leading-6 tracking-wide mb-3'>{name}</h6>
        <p className='font-normal text-base leading-5 tracking-wide mb-5'>Price: ${price}</p>
        <p className='font-normal text-sm leading-5 tracking mb-3'>
        Manufacturer: {seller}</p>
        <p className='font-normal text-sm leading-5 tracking mb-3'>Rating: {ratings} Star</p>
      </div>
      <button onClick={() => handleAddToCart(props.product)} className='bg-orange-100 hover:bg-orange-400 hover:text-white w-full border-gray-300 border absolute bottom-0 rounded-b-lg py-1'>Add To Cart <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

export default Product;