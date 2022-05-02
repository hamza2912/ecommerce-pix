import React, { useRef, useState, useEffect} from 'react'
import { useCart } from 'react-use-cart';
import Cart from './cart';
import GetData from "../component/data"
import { useNavigate, useLocation } from 'react-router-dom';
import { set } from 'firebase/database';


const Navbar = () => {

  const [showCart, setshowCart] = useState(false);
  const { totalUniqueItems, totalItems } = useCart();
  const [search, setsearch] = useState('');
  const [results, setresults] = useState([]);
  const data = GetData();
  

  let navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
      isMountRef.current = false;
    }, []);
    return isMountRef.current;
  };

  const isMount = useIsMount();

  React.useEffect(() => {
    if (!isMount) {
      if(totalItems > 0){
        console.log('here');
        setshowCart(true);
      }
    }
  }, [totalItems]);
  
  function handleSearch(event) {
    var value = event.target.value
    setsearch(value);
    setresults(data.filter( product => product.title.toLowerCase().startsWith(value.toLowerCase())))
  }
    

    return (
        <>
        {showCart && location.pathname != '/checkout' ? 
           <Cart showCart={showCart} setshowCart={setshowCart}  /> : null 
        }
        {location.pathname != '/admin_portal' ? 
        <header>
          <div className='flex bg-mate py-2'>
            <p className='font-roboto text-white mx-auto font-semibold no-underline mb-0'>FREE Shipping for orders over Rs.1499</p>
          </div>
          <div className='bg-gray-100 py-3 px-32 flex justify-between items-center'>
              <div className="w-2/3 flex">
                  <div className="w-1/5">
                      <a onClick={()=>navigate('/')}><img className='w-3/5' src="./images/logo1.png"  alt="logo" /></a>
                  </div>
                  <div className='w-4/5 flex mt-1 -ml-5 relative'>
                      <input value={search} onChange={(event)=>handleSearch(event)} className='w-full h-10 rounded-l-md border-none outline-none pl-3' type ="search" />
                      <div className='w-10 h-10 bg-gray-800 rounded-r-md flex justify-center items-center cursor-pointer'>
                        <i class="text-white fas fa-search"></i>
                      </div>
                      { search != '' ?
                        <ul className='absolute w-full top-10 shadow-lg bg-white'>
                          { results.map(product => {
                          return (
                          <li onClick={()=>{navigate(`product:${product.id}`); setsearch('')}} className='shadow-sm w-full py-3 px-2 cursor-pointer'>
                            {product.title}
                          </li>
                          )})}
                        </ul>
                       : null }
                      
                  </div>
              </div>
              <div className="icons text-gray-800 text-lg flex justify-end w-1/3">
                  <i class="fas fa-user-alt mr-4"></i>
                  <i class="fas fa-shopping-cart relative cursor-pointer" onClick={()=> setshowCart(true)}><p >{totalUniqueItems}</p></i>
              </div>
          </div> 
        </header> : null}
        </>
    )
}

export default Navbar;
