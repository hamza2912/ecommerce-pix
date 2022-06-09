import './App.css';
// import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './firebase';
import { Route, Routes } from "react-router-dom";
import { CartProvider } from 'react-use-cart';
import Navbar from './component/Navbar';
import Home from "./pages/home";
import Product from './pages/product';
import Category from './pages/category';
import CheckOut from './pages/checkout';
import Thankyou from './pages/thankyou';
import Admin_portal from './pages/admin_portal';
import StripeContainer from './component/stripe_container';


function App() {
  return (

    <CartProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/product:id' element={<Product/>} />
          <Route path='/categories:id' element={<Category/>} />
          <Route path='/checkout' element={<CheckOut/>} />
          <Route path='/thankyou' element={<Thankyou/>} />
          <Route path='/admin_portal' element={<Admin_portal/>} />
          <Route path='/stripe' element={<StripeContainer/>} />
      </Routes>
    </CartProvider>      

  );
}

export default App;
