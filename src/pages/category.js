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
    const categoryDetails = ref(db, `categories/${id.substring(1)}`);
    onValue(categoryDetails, (snapshot) => {
        setcategory(snapshot.val());
    });
  }, []);
 
  return (
    <section className="container">
      <Category_section type='category' category={category.name} items={10} desc={category.desc} category_id={category.id} />
    </section>
  )
}

export default Category