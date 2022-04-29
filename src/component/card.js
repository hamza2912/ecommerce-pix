import React from 'react'
import {useCart} from "react-use-cart"
import { useNavigate   } from 'react-router-dom';

const Card = (props) => {
  const { addItem } = useCart();
  let navigate = useNavigate();
    return (
        <>
        
          <div className='w-full'>
            <div className="card p-0 overflow-hidden h-full shadow-lg">
              <a onClick={()=>navigate(`/product:${props.item.id}`)}><img src={props.item.img} className="card-img-top img-fluid" alt="..."/></a>
                <div className="p-5">
                  <h5 className="text-lg font-semibold">{props.item.title}</h5>
                  <p className="card-text">${props.item.price}</p>
                  <p className="card-text">{props.item.desc}</p>
                  <button className="bg-gray-800 text-white px-3 py-2 text-xs mt-2" onClick={()=> addItem(props.item)}>Add To Cart</button>
                </div>
            </div>
          </div>
        </>
    )
}

export default Card;
