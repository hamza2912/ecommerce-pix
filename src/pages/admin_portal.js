import React from "react"
import GetData from "../component/data";
import { getDatabase, ref, onValue, set } from "firebase/database";


function Admin_portal() {

    const [manage, setmanage] = React.useState('products');
    const [showModal, setshowModal] = React.useState(false);
    const [edit, setedit] = React.useState(false);
    const data = GetData()
    const [category_data, setcategory_data] = React.useState([]);
    const [category_id, setcategory_id] = React.useState('');
    const [orders_data, setorders_data] = React.useState([]);
    const [order_items, setorder_items] = React.useState([]);
    const [carttotal, setcarttotal] = React.useState(0);
    const [shipping, setshipping] = React.useState(0);
    const [payment, setpayment] = React.useState('');

    const lastitem = data.length > 0 ? data[(data.length-1)].id : 0;
    const db = getDatabase();

    React.useEffect(() => {
        if (manage == 'categories') {
            const product = ref(db, 'categories');
            onValue(product, (snapshot) => {
                var result = snapshot.val();
                setcategory_data(result);
                setcategory_id(result[(result.length-1)].id.substring(1));
            });
        }
        if (manage == 'orders') {
            const orders = ref(db, 'orders/orders');
            onValue(orders, (snapshot) => {
                setorders_data(snapshot.val());
            });
            console.log(orders_data)
        }
      }, [manage]);

    const [product, setproduct] = React.useState({
        id: 2,
        title: '',
        desc: '',
        category: '',
        price: '',
        ratings: '',
        img: ''
    });

    const [category, setcategory] = React.useState({
        id: '',
        name: '',
        desc: ''
    });

    function addProduct(product){

        if(edit){
            var products = data.filter(x => x.id != product.id);
            products.push(product);
            set(ref(db, 'products/'), {
                products
            });
            setshowModal(false);
            setproduct({
                id: 0,
                title: '',
                desc: '',
                category: '',
                price: '',
                ratings: '',
                img: ''
            });
        } else {
            product.id = lastitem + 1;
            var products = data;
            products.push(product);
            set(ref(db, 'products/'), {
                products
            });
            setshowModal(false);
            setproduct({
                id: 0,
                title: '',
                desc: '',
                category: '',
                price: '',
                ratings: '',
                img: ''
            });
            
        }

    }

    function editProduct(product_id){

        var product = data.filter(product => product.id == product_id)[0];
        setproduct({
            id: product.id,
            title: product.title,
            desc: product.desc,
            category: product.category,
            price: product.price,
            ratings: product.ratings,
            img: product.img
        });
        setedit(true);
        setshowModal(true);
    }

    function deleteProduct(product_id){

        var products = data.filter(product => product.id != product_id);
        set(ref(db, 'products/'), {
            products
        });

    }

    function addCategory(category){

        if(edit){
            var categories = category_data.filter(x => x.id != category.id);
            categories.push(category);
            set(ref(db, 'categories/'), {
                categories
            });
        } else {
            category.id = 'c' + (Number(category_id) + 1);
            var categories = category_data;
            categories.push(category);
            set(ref(db, 'categories/'), {
                categories
            });
            
        }
        setshowModal(false);
        setcategory({
            id: '',
            name: '',
            desc: ''
        });

    }

    function editCategory(categoryId){

        var category1 = category_data.filter(x => x.id == categoryId)[0];
        setcategory({
            id: category1.id,
            name: category1.name,
            desc: category1.desc
        });
        setedit(true);
        setshowModal(true);
    }

    function deleteCategory(categoryId){

        var categories = categoryId.filter(x => x.id != categoryId);
        set(ref(db, 'categories/'), {
            categories
        });

    }

    function showOrder(details, total, shipping, payment){
        setorder_items(details);
        setcarttotal(total);
        setshipping(shipping);
        setpayment(payment);
        setshowModal(true);
    }

    function markComplete(id){

        if(window.confirm("Are you sure you want to complete this order?")){
        var order = orders_data.filter(x => x.id == id)[0];
        order.status = "Completed";
        var orders = orders_data.filter(x => x.id != id);
        orders.push(order);
        set(ref(db, 'orders/orders'), orders);
         }
    }


  return (
   
    <section className="flex">
        <div className="sidebar fixed lg:relative lg:w-64 w-24 h-screen bg-gray-800 flex flex-col py-5">
            <div className="w-full">
                {/* <img src="" alt="" /> */}
                <p className="text-white text-center">Company Logo</p>
            </div>
            <ul className="w-full py-10 text-white">
                <li onClick={()=>setmanage('products')} className={ manage == 'products' ? "cursor-pointer py-3 px-4 bg-gray-100 text-black" : "cursor-pointer py-3 px-4 text-white"}><i className="fas fa-gift mr-2 text-xs"></i>Manage Products</li>
                <li onClick={()=>setmanage('categories')} className={ manage == 'categories' ? "mt-4 cursor-pointer py-3 px-4 bg-gray-100 text-black" : "mt-4 cursor-pointer py-3 px-4 text-white"}><i className="fas fa-gift mr-2 text-xs"></i>Manage Categories</li>
                <li onClick={()=>setmanage('orders')} className={ manage == 'orders' ? "mt-4 cursor-pointer py-3 px-4 bg-gray-100 text-black" : "mt-4 cursor-pointer py-3 px-4 text-white"}><i className="fas fa-gift mr-2 text-xs"></i>Manage Orders</li>
            </ul>
        </div>
        { manage == 'products' ?
        <div className="lg:p-10 lg:ml-0 ml-24 px-5 py-10 w-full">
            <div className="w-full flex justify-between">
                <h1 className="text-xl">Products</h1>
                <button onClick={()=>{setshowModal(true)}} className="bg-gray-800 px-3 py-2 text-sm text-white font-semibold">Add a Product</button>
            </div>
            <div className="lg:h-96 overflow-y-scroll mt-5">
                <table class="ui single line table w-full text-sm">
                    <thead>
                        <tr>
                        <th >id</th>
                        <th>title</th>
                        <th>category</th>
                        <th>description</th>
                        <th>price</th>
                        <th>ratings</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0  ?
                        data.sort(function(a, b){return a.id - b.id}).map(product => {
                            return(
                            <tr>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.category}</td>
                                <td><p className="lg:w-auto w-48 overflow-x-auto overflow-y-hidden">{product.description}</p></td>
                                <td>{product.price}</td>
                                <td>{product.ratings}</td>
                                <td><button onClick={()=>editProduct(product.id)} className="text-xs p-2 bg-green-400 text-white">Edit</button></td>
                                <td><button onClick={()=>deleteProduct(product.id)} className="text-xs p-2 bg-red-400 text-white">Delete</button></td>
                            </tr>
                            )
                        }) : <p>Loading..</p>  
                        }
                    </tbody>
                </table> 
            </div>
            {
            showModal ?    
                <div>
                    <div className='dimmer'></div>
                    <div className='messageBox lg:w-1/3 w-4/5 bg-white h-auto z-10 fadein'>
                        <div className='w-full h-2 hero-text'></div>
                        <div className='w-4/5 flex flex-col items-center mx-auto pt-8 pb-10'>
                            <p className='text-2xl'>Add a product!</p>
                            <p className='text-center lg:text-sm text-xs mt-2'>Product id: {product.id == 0 ? (lastitem + 1) : product.id}</p>
                            <div className="w-full grid grid-cols-2 gap-2 mt-4">
                                <input value={product.title} onChange={event => {
                                setproduct(prevState => ({
                                        ...prevState,
                                        title: event.target.value
                                    }))}
                                } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='Title' type="text" />
                                <input value={product.category} onChange={event => {
                                setproduct(prevState => ({
                                        ...prevState,
                                        category: event.target.value
                                    }))}
                                } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='Category' type="text" />
                                <input value={product.desc} onChange={event => {
                                setproduct(prevState => ({
                                        ...prevState,
                                        desc: event.target.value
                                    }))}
                                } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none col-span-2' placeholder='Description' type="text" />
                                <input value={product.price} onChange={event => {
                                setproduct(prevState => ({
                                        ...prevState,
                                        price: event.target.value
                                    }))}
                                } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='Price' type="text" />
                                <input value={product.ratings} onChange={event => {
                                setproduct(prevState => ({
                                        ...prevState,
                                        ratings: event.target.value
                                    }))}
                                } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='Ratings' type="text" />
                                <input value={product.img} onChange={event => {
                                setproduct(prevState => ({
                                        ...prevState,
                                        img: event.target.value
                                    }))}
                                } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none col-span-2' placeholder='Upload Image' type="text" />
                            </div>
                            
                            <button onClick={()=>addProduct(product)} className='w-3/4 mt-4 py-3 bg-gray-800 text-white rounded-md text-xs'>Submit</button>
                        </div>
                        <i onClick={()=>setshowModal(false)} className="fas fa-times text-black absolute top-5 right-5 cursor-pointer"></i>
                    </div> 
                </div>
                : null
          }
            
        </div> : manage == 'categories' ?
        <div className="lg:p-10 lg:ml-0 ml-24 px-5 py-10 w-full">
            <div className="w-full flex justify-between">
                <h1 className="text-xl">Categories</h1>
                <button onClick={()=>{setshowModal(true)}} className="bg-gray-800 px-3 py-2 text-sm text-white font-semibold">Add a Category</button>
            </div>
            <div className="lg:h-96 h-auto overflow-y-scroll mt-5">
                <table class="ui single line table w-full text-sm">
                    <thead>
                        <tr>
                        <th >id</th>
                        <th>name</th>
                        <th>description</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {category_data.length > 0  ?
                        category_data.map(category => {
                            return(
                            <tr>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td><p className="lg:w-auto w-48 overflow-x-auto overflow-y-hidden">{category.desc}</p></td>
                                <td><button onClick={()=>editCategory(category.id)}  className="text-xs p-2 bg-green-400 text-white">Edit</button></td>
                                <td><button onClick={()=>deleteCategory(category.id)} className="text-xs p-2 bg-red-400 text-white">Delete</button></td>
                            </tr>
                            )
                        }) : <p>Loading..</p>  
                        }
                    </tbody>
                </table> 
            </div>
            {
            showModal ?    
                <div>
                    <div className='dimmer'></div>
                    <div className='messageBox lg:w-1/3 w-4/5 bg-white h-auto z-10 fadein'>
                        <div className='w-full h-2 hero-text'></div>
                        <div className='w-4/5 flex flex-col items-center mx-auto pt-8 pb-10'>
                            <p className='text-2xl'>Add a category</p>
                            <p className='text-center lg:text-sm text-xs mt-2'>Cateogry id: {category.id == '' ? 'c' + (Number(category_id) + 1) : category.id}</p>
                            <div className="w-full grid grid-cols-1 gap-2 mt-4">
                                <input value={category.name} onChange={event => {
                                setcategory(prevState => ({
                                        ...prevState,
                                        name: event.target.value
                                    }))}
                                } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='Name' type="text" />
                                <input value={category.desc} onChange={event => {
                                setcategory(prevState => ({
                                        ...prevState,
                                        desc: event.target.value
                                    }))}
                                } className='bg-gray-100 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='description' type="text" />
                            </div>                          
                            <button onClick={()=>addCategory(category)} className='w-3/4 mt-4 py-3 bg-gray-800 text-white rounded-md text-xs'>Submit</button>
                        </div>
                        <i onClick={()=>setshowModal(false)} className="fas fa-times text-black absolute top-5 right-5 cursor-pointer"></i>
                    </div> 
                </div>
                : null
            }
            
        </div> :
        <div className="lg:p-10 lg:ml-0 ml-24 px-5 py-10 w-full">
            <div className="w-full flex justify-between">
                <h1 className="text-xl">Orders</h1>
                {/* <button onClick={()=>{setshowModal(true)}} className="bg-gray-800 px-3 py-2 text-sm text-white font-semibold">Add a Category</button> */}
            </div>
            <div className="lg:h-96 h-auto overflow-x-auto overflow-y-auto mt-5">
                <table class="ui single line table w-full text-sm">
                    <thead>
                        <tr>
                        <th >id</th>
                        <th>order by</th>
                        <th>order date</th>
                        <th>order details</th>
                        <th>delivery date</th>
                        <th>address</th>
                        <th>city</th>
                        <th>country</th>
                        <th>status</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders_data ? 
                        orders_data.length > 0  ?
                        orders_data.sort(function(a, b){return a.id - b.id}).map(order => {
                            return(
                            <tr>
                                <td>{order.id}</td>
                                <td>
                                    <ul>
                                        <li>Name : {order.order_by.firstname + ' ' + order.order_by.lastname}</li>
                                        <li>Email : {order.order_by.email}</li>
                                        <li>Mobile : {order.order_by.mobile}</li>
                                    </ul>
                                </td>
                                <td>{order.order_date}</td>
                                <td><button onClick={()=>showOrder(order.order_details, order.order_amount, order.shipping, order.payment)} className="text-xs p-2 bg-blue-400 text-white">Show Order</button></td>
                                <td>{order.delivery_date}</td>                                
                                <td><p className="w-48 overflow-x-auto overflow-y-hidden">{order.address + ', Postal Code: ' + order.postal_code}</p></td>
                                <td>{order.city}</td>
                                <td>{order.country}</td>
                                <td>{order.status ? order.status : <button onClick={()=>markComplete(order.id)} className="text-xs p-2 bg-gray-800 text-white">Mark Complete</button>}</td>
                            </tr>
                            )
                        }) : <p>Loading..</p>  
                        : <p>No orders</p>}
                    </tbody>
                </table> 
            </div>
            {
            showModal ?    
                <div>
                    <div className='dimmer'></div>
                    <div className='messageBox lg:w-1/3 w-4/5 bg-white h-auto z-10 fadein'>
                        <ul className='flex flex-col w-full p-5  mt-4 overflow-y-auto max-h-96'>
                            {order_items.map((item, index) => {
                                return(
                                    <li className='grid grid-cols-4 gap-2 bg-gray-100 rounded-md p-2 mt-2 fadeIn'>
                                        <img src={item.img} alt="image" className='w-4/5 h-auto' />
                                        <div className='flex flex-col col-span-2 -ml-3'>
                                            <p className='mb-0'>{item.title}</p>
                                            <p className='font-semibold text-sm mb-0'>${item.price}</p>
                                            <p className='font-semibold text-sm mb-0'>Qty: {item.quantity}</p>
                                        </div>
                                    </li>
                                )     
                            })}
                        </ul>
                        <ul className="p-5 mt-0">
                            <li>Items Amount: {carttotal}</li>
                            <li>Shipping: {shipping}</li>
                            <li>Total: {carttotal + shipping}</li>
                            <li>Payment mode: {payment}</li>
                        </ul> 
                        <i onClick={()=>setshowModal(false)} className="fas fa-times text-black absolute top-5 right-5 cursor-pointer"></i>
                    </div> 
                </div>
                : null
            }
            
        </div>
            }
    </section>
 

  );
}

export default Admin_portal;
