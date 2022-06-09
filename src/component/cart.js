import React, { useState } from 'react'
import { useCart } from 'react-use-cart';
import { useNavigate   } from 'react-router-dom';


const Cart = ({ showCart, setshowCart }) => {
    
    const [checkoutEffect, setcheckoutEffect] = useState(false);
    let navigate = useNavigate();
    const { isEmpty, totalUniqueItems, items, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
    
    return (
        <section className='fixed p-10 lg:w-1/3 w-full bg-white h-screen right-0 top-0 z-10 fadeRight'>
            { !isEmpty ?
            <div className='row justify-content-center'>
                <div className="col-12">
                    <h5>Cart ({totalUniqueItems})</h5>
                    <p>{totalItems} items in the bucket</p>
                    <ul className='flex flex-col w-full pl-0 mt-3 overflow-y-auto max-h-96'>
                        {items.map((item, index) => {
                            return(
                                <li className='grid grid-cols-4 gap-2 bg-gray-100 rounded-md p-2 mt-2 fadeIn'>
                                    <img src={item.img} alt="image" className='w-4/5 h-auto' />
                                    <div className='flex flex-col col-span-2 -ml-3'>
                                        <p className='mb-0'>{item.title}</p>
                                        <p className='font-semibold text-sm mb-0'>${item.price}</p>
                                        <p className='font-semibold text-sm mb-0'>Qty: {item.quantity}</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='flex justify-end'>
                                            <i className='fas fa-times text-gray-400 text-xs cursor-pointer' onClick={() =>   removeItem(item.id)}></i>
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
                <div className='w-full grid grid-cols-3 absolute bottom-5 left-0 lg:px-10 px-5 py-3 bg-gray-100'>
                    <div>
                        <p className='text-sm mb-0'>Product Charges: </p>
                        <p className='text-sm mb-0'>Shipping Charges: </p>
                        <h2 className='text-lg mb-0'>Total Price: </h2>
                    </div>
                    <div>
                        <p className='text-sm mb-0'> ${cartTotal}</p>
                        <p className='text-sm mb-0'> ${12}</p>
                        <h2 className='text-lg mb-0'>${cartTotal+12}</h2>
                    </div>
                    <div className="flex flex-col justfy-end">
                        {/* <button className='btn btn-danger m-2' onClick={() => emptyCart()}>Clear Cart</button> */}
                        <div onClick={()=>{navigate('/checkout'); setshowCart(false);}} onMouseEnter={()=>setcheckoutEffect(true)} onMouseLeave={()=>setcheckoutEffect(false)} className='flex gap-2 mt-4 cursor-pointer'>
                            <h1 className={checkoutEffect ? 'text-xl transition-all' : 'text-lg transition-all'}>Checkout</h1>
                            <i className={checkoutEffect ? 'fas fa-angle-right ml-3 text-xl transition-all': 'fas fa-angle-right text-xl transition-all'}></i>
                        </div>
                    </div>
                </div>
                
            </div> : <p>Your cart is empty</p>     
            }
            <i class="fas fa-times cursor-pointer absolute top-5 right-5 text-black z-10" onClick={()=> setshowCart(!showCart)}></i>
        </section>
        )
}

export default Cart;
