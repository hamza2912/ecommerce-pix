import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GetData from '../component/data';
import {useCart} from "react-use-cart";
import Category_section from "../component/category_section"
       

const Product = ()=>{

  let { id } = useParams();
  let navigate = useNavigate();
  const { addItem } = useCart();
  const data = GetData('product', '', 1, id.substring(1))
  const [productDetails, setproductDetails] = React.useState(GetData('product', '', 1, id.substring(1)))
  const [size, setsize] = React.useState('xs');
  const [color, setcolor] = React.useState('red');

  console.log(data);

  const stars = [];

  if(data){
    for (var i = 0; i < data.ratings; i++) {
        stars.push(
            <i className='fas fa-star text-vs text-yellow-400'></i>
        )
    }
  }

  React.useEffect(() => {

      setproductDetails(data)

  }, []);
 
  return (
    <section className='container py-10'>
      <div class="flex font-sans w-4/5 mx-auto rounded-lg shadow-lg mb-10">
        <div class="flex-none w-56 relative">
          <img src={data ? data.img : null} alt="" class="absolute inset-0 w-full h-full object-cover rounded-l-lg" />
        </div>
        <div class="flex-auto p-6">
          <div class="flex justify-between">
            <h1 class="flex-auto text-lg font-semibold text-slate-900">
              {data ? data.title : null}
            </h1>
            <div class="text-lg font-semibold text-slate-500">
              $110.00
            </div>
          </div>
          <p className='text-vs text-yellow-400 mt-1'>{stars.length > 0 ? stars : 'No Ratings'}</p>
          <div class="w-full flex-none text-sm font-medium text-slate-700 mt-1">
            In stock
          </div>
          <div class="flex flex-col items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
            <div class="space-x-2 flex text-sm">
              <label onClick={()=>setsize('xs')} className={ size == 'xs' ? "w-9 h-9 rounded-lg flex items-center justify-center font-semibold bg-slate-900 text-white cursor-pointer" : "w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 cursor-pointer"}>
                XS
              </label>
              <label onClick={()=>setsize('s')} className={ size == 's' ? "w-9 h-9 rounded-lg flex items-center justify-center font-semibold bg-slate-900 text-white cursor-pointer" : "w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 cursor-pointer"}>
                S
              </label>
              <label onClick={()=>setsize('m')} className={ size == 'm' ? "w-9 h-9 rounded-lg flex items-center justify-center font-semibold bg-slate-900 text-white cursor-pointer" : "w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 cursor-pointer"}>
                M
              </label>
              <label onClick={()=>setsize('l')} className={ size == 'l' ? "w-9 h-9 rounded-lg flex items-center justify-center font-semibold bg-slate-900 text-white cursor-pointer" : "w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 cursor-pointer"}>
                L
              </label>
              <label onClick={()=>setsize('xl')} className={ size == 'xl' ? "w-9 h-9 rounded-lg flex items-center justify-center font-semibold bg-slate-900 text-white cursor-pointer" : "w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 cursor-pointer"}>
                XL
              </label>
            </div>
            <div class="space-x-2 flex text-sm mt-4">
              <label onClick={()=>setcolor('red')} className={ color == 'red' ? "w-auto px-4 h-9 rounded-lg flex items-center justify-center font-semibold bg-slate-900 text-white cursor-pointer" : "w-auto px-4 h-9 rounded-lg flex items-center justify-center text-slate-700 cursor-pointer"}>
                Red
              </label>
              <label onClick={()=>setcolor('blue')} className={ color == 'blue' ? "w-auto px-4 h-9 rounded-lg flex items-center justify-center font-semibold bg-slate-900 text-white cursor-pointer" : "w-auto px-4 h-9 rounded-lg flex items-center justify-center text-slate-700 cursor-pointer"}>
                Blue
              </label>
              <label onClick={()=>setcolor('black')} className={ color == 'black' ? "w-auto px-4 h-9 rounded-lg flex items-center justify-center font-semibold bg-slate-900 text-white cursor-pointer" : "w-auto px-4 h-9 rounded-lg flex items-center justify-center text-slate-700 cursor-pointer"}>
                Black
              </label>
              <label onClick={()=>setcolor('grey')} className={ color == 'grey' ? "w-auto px-4 h-9 rounded-lg flex items-center justify-center font-semibold bg-slate-900 text-white cursor-pointer" : "w-auto px-4 h-9 rounded-lg flex items-center justify-center text-slate-700 cursor-pointer"}>
                Grey
              </label>
            </div>
          </div>
          <div class="flex space-x-4 mb-6 text-sm font-medium">
            <div class="flex-auto flex space-x-4">
              <button onClick={()=> addItem(data)} className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900">
                Add to Cart
              </button>
              <button onClick={()=> {addItem(data); navigate('/checkout');}} className="h-10 px-6 font-semibold rounded-md bg-black text-white">
                Buy now
              </button>
            </div>
            <button class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" aria-label="Like">
              <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-slate-700">
            Free shipping on all continental US orders.
          </p>
        </div>
      </div>
      <div className='w-4/5 mx-auto'>
        <Category_section type='home' category={data ? data.category : null} items={10} name="Premium Tracksuits" category_id={'c1'} title={false} />
      </div>
      {/* <div className='grid grid-cols-3 gap-0'> */}
      {/* <OwlCarousel className='owl-theme' loop margin={0} items={1}> */}
          {/* <div class="item"> */}
            {/* <img className='w-4/5 h-auto' src={data ? data.img : null} alt="" /> */}
          {/* </div> */}
          {/* <div class="item"> */}
            {/* <img className='w-full h-auto' src={data ? data.img : null} alt="" /> */}
          {/* </div> */}
      {/* </OwlCarousel> */}
      {/* { data ?
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
      </div>  */}
    </section>
  )
}

export default Product