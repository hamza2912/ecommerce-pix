import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { useParams } from 'react-router-dom';
import GetData from '../component/data';
import {useCart} from "react-use-cart";
       

const Product = ()=>{

  let { id } = useParams();
  const { addItem } = useCart();
  const data = GetData('product', '', 1, id.substring(1))
  const [productDetails, setproductDetails] = React.useState(GetData('product', '', 1, id.substring(1)));

  console.log(data);

  const stars = [];

  if(data){
    for (var i = 0; i < data.ratings; i++) {
        stars.push(
            <i className='fas fa-star text-xs text-yellow-400'></i>
        )
    }
  }

  React.useEffect(() => {

      setproductDetails(data)

  }, []);
 
  return (
    <section className='container py-10'>
      <div className='grid grid-cols-3 gap-0'>
      {/* <OwlCarousel className='owl-theme' loop margin={0} items={1}> */}
          {/* <div class="item"> */}
            <img className='w-4/5 h-auto' src={data ? data.img : null} alt="" />
          {/* </div> */}
          {/* <div class="item"> */}
            {/* <img className='w-full h-auto' src={data ? data.img : null} alt="" /> */}
          {/* </div> */}
      {/* </OwlCarousel> */}
      { data ?
        <div className='-ml-10'>
          <h1 className='text-3xl font-semibold'>{data ? data.title : null}</h1>
          <p className='text-sm text-yellow-400 mt-1'>{stars.length > 0 ? stars : 'No Ratings'}</p>
          <p className='mt-2'>{data ? data.title : null}</p> 
          <p className='mt-2'>{data ? data.desc : null}</p> 
          <p>Price: ${data ? data.price : null}</p>     
          <div className="col-auto">
            <button  onClick={()=> addItem(data)} className='w-1/2 border-2 border-gray-800 text-gray-800 font-semibold px-3 py-2 text-xs mt-2 hover:bg-gray-800 hover:text-white transition-all'>Add To Cart</button>
          </div>
        </div>
        : <div className="loader mx-auto"></div>     
      }
      </div> 
    </section>
  )
}

export default Product