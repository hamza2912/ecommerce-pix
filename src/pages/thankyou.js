import React from "react"
import { useNavigate, useLocation   } from 'react-router-dom';



function Thankyou() {

    let navigate = useNavigate();
    const {state} = useLocation();
    const { order_number, delivery_date } = state;


  return (
   
    <section className="container">
        <div className="flex flex-col items-center mt-10">
            <div className="bg-gray-100 w-1/2 p-6 rounded-md">
                <h1 className="text-2xl w-full text-center">Thank you for placing your order. Your order number is <span className="font-semibold">{order_number}</span>. Your expected delivery date is <span className="font-semibold">{delivery_date}</span>.</h1>
            </div>
            <button onClick={()=>navigate('/')} className='w-1/5 mt-5 mx-auto border-2 border-gray-800 text-gray-800 font-semibold px-3 py-2 text-base mt-2 hover:bg-gray-800 hover:text-white transition-all'>Shop More</button>
        </div>
    </section>
 

  );
}

export default Thankyou;
