import React from 'react';
import { getDatabase, ref, onValue } from "firebase/database";


export default function GetData (type, category, items, prouduct_id) {

    const [products, setproducts] = React.useState([]);
  
    React.useEffect(() => {
      
      const db = getDatabase();
      const product = ref(db, 'products/products');
      onValue(product, (snapshot) => {
        setproducts(snapshot.val());
      });

    }, []);

    if(type == 'category'){   
        return  products.filter(product => product.category == category);

    } else if(type == 'home'){   
     
      return products.filter(product => product.category == category).slice(0, items);

    } else if(type == 'product'){

        return products.filter(product => product.id == prouduct_id)[0];

    } else{
        return products;
    }
    
};