import React from "react"
import Category_section from "../component/category_section"


function Home() {


  return (
   
    <section className="container">
      <Category_section type='home' category={"Men"} items={10} name="Premium Tracksuits" category_id={'c1'} />
      <Category_section type='home' category={"Women"} items={10} name="Premium Tracksuits" category_id={'c2'} />
    </section>
 

  );
}

export default Home;
