import React from "react";
import Card from './card';
import GetData from "../component/data"
import OwlCarousel from 'react-owl-carousel';
import { useNavigate, useLocation  } from 'react-router-dom';



function Category_section( props ) {


  let navigate = useNavigate();
  let location = useLocation();
  const data = GetData(props.type, props.category, props.items ? props.items : null)
  const [category_data, setcategory_data] = React.useState(GetData(props.type, props.category));

  console.log(data);

  React.useEffect(() => {

    setcategory_data(data)

  }, []);


    const responsive = {
        0: {
            items: 2,
        },
        400: {
            items: 2,
        },
        600: {
            items: 2,
        },
        700: {
            items: 3,
        },
        1000: {
            items: 5,

        }
    }



  if(props.type == "home" ){

    return (
    
      <section className="w-full py-10">
        <h1 className="text-center text-4xl font-semibold">{location.pathname.substring(0,8) != '/product' ? props.category : 'Others from ' + props.category}</h1>
        <p className="text-center mb-10">{props.desc}</p>
        { data.length > 0 ?
        <OwlCarousel className='owl-theme' loop margin={10} items={5} nav responsive={responsive}>
         {data.map((item, index)=>{
            return(
              <div class="item">
                <Card item={item} key={index}/>
              </div>
            )
          })}
        </OwlCarousel> : <div className="loader mx-auto"></div>
        }
        <div className="w-full flex justify-center">
          <a onClick={()=>navigate('/categories:'+props.category_id)} className="no-underline">View all</a>
        </div>
      </section>

    );
  } else {

    return (
    
      <section className="w-full py-10">
        <h1 className="text-center text-4xl font-semibold">{props.category}</h1>
        <p className="text-center mb-10">{props.desc}</p>
        { data.length > 0 ?
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
          {data.map((item, index)=>{
            return(
              <Card item={item} key={index}/>
            )
          })}
        </div>: <div className="loader mx-auto"></div>
      }
      </section>

    );

  }
}

export default Category_section;
