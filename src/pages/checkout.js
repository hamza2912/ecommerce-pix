import React from 'react';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';


const CheckOut = () => {
  
  const { isEmpty, totalUniqueItems, items, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
  let navigate = useNavigate();

  function placeOrder(){
    emptyCart();
    navigate('/thankyou', { state: { order_number: 'XYZ-12567', delivery_date: '12-05-2022' } });
  }

  
  return (
    <section className='container'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='w-full'>
          <h1 className='text-2xl mt-10'>Order Details</h1>
          <div className='mt-2 p-5 bg-gray-100'>
            <div className="w-full">
                <p>Total Items: <span className='font-semibold'>{totalItems}</span></p>
                <p>Unique Items: <span className='font-semibold'>{totalUniqueItems}</span></p>
                <ul className='flex flex-col w-4/5 pl-0 mt-2 overflow-y-auto max-h-32'>
                    {items.map((item, index) => {
                        return(
                            <li className='grid grid-cols-4 gap-2 bg-white rounded-md p-2 mt-2 fadeIn'>
                                <img src={item.img} alt="image" className='w-4/5 h-auto' />
                                <div className='flex flex-col col-span-2 -ml-3'>
                                    <p className='mb-0'>{item.title}</p>
                                    <p className='font-semibold text-sm mb-0'>${item.price}</p>
                                    <p className='font-semibold text-sm mb-0'>Qty: {item.quantity}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex justify-end'>
                                        <i className='fas fa-times text-gray-400 text-xs cursor-pointer' onClick={() =>removeItem(item.id)}></i>
                                    </div>
                                    <div className='flex gap-1 justify-center mt-2'>
                                        <button className='bg-gray-700 text-white w-7 h-7 rounded-md ms-1 ' onClick={() => updateItemQuantity(item.id, item.quantity -1)}
                                        >-</button>
                                        <button className='bg-gray-700 text-white w-7 h-7 rounded-md ms-1' onClick={() => updateItemQuantity(item.id, item.quantity +1)}>+</button>
                                    </div>           
                                </div>
                            </li>
                        )     
                    })}
                </ul> 
            </div>
          <div className='w-full grid grid-cols-3 pt-3 pb-2'>
              <div>
                  <p className='text-sm mb-0'>Product Charges: </p>
                  <p className='text-sm mb-0'>Shipping Charges: </p>
                  <p>Expected Delivery:</p>
                  <h2 className='text-lg mb-0'>Total Price: </h2>
              </div>
              <div>
                  <p className='text-sm mb-0'> ${cartTotal}</p>
                  <p className='text-sm mb-0'> ${12}</p>
                  <p className='text-sm mb-0'> 12-05-2022</p>
                  <h2 className='text-lg mb-0'>${cartTotal+12}</h2>
              </div>
          </div>
          </div>
        </div>
        <div className='w-full'>
          <h1 className='text-2xl mt-10'>User Details</h1>
          <div className='mt-2 p-5 bg-gray-100 grid grid-cols-2 gap-4 outline-none'>
              <input className='bg-white p-2 rounded-md outline-none' placeholder='First Name' type="text" />
              <input className='bg-white p-2 rounded-md outline-none' placeholder='Last Name' type="text" />
              <input className='bg-white p-2 rounded-md outline-none' placeholder='Email' type="email" />
              <input className='bg-white p-2 rounded-md outline-none' placeholder='Mobile' type="number" />
              <input className='bg-white p-2 rounded-md outline-none' placeholder='City' type="text" />
              <input className='bg-white p-2 rounded-md outline-none' placeholder='Country' type="text" />
              <input className='bg-white p-2 rounded-md outline-none col-span-2' placeholder='Delivery Address' type="text" />
              <input className='bg-white p-2 rounded-md outline-none' placeholder='Postal Code' type="number" />
              
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={placeOrder} className='w-1/3 mx-auto border-2 border-gray-800 text-gray-800 font-semibold px-3 py-2 text-base mt-2 hover:bg-gray-800 hover:text-white transition-all'>Pay ${cartTotal+12}</button>
      </div>
    </section>
  )
}

export default CheckOut