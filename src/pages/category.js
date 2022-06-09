import React from 'react';
import Category_section from '../component/category_section';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from "firebase/database";


const Category = ()=>{

  let { id } = useParams();
  const [category, setcategory] = React.useState({});

  React.useEffect(() => {

    console.log(id);
    const db = getDatabase();
    const categoryDetails = ref(db, `categories/`);
    onValue(categoryDetails, (snapshot) => {
        setcategory(snapshot.val().filter(x=>x.id == id.substring(1))[0]);
    });
  }, []);
 
  return (
    <section className="container">
      <Category_section type='category' category={category ? category.name : ''} items={10} desc={category ? category.desc : ''} category_id={category ? category.id : 0} />
    </section>
  )
}

export default Category