import React, { useContext, useEffect, useState } from "react";
import Styles from './CheckOut.module.css'
import { useFormik } from "formik"; 
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function CheckOut() {
    // const [isLoading, setIsLoading] = useState(false);
    let { getLoggedUserCart, headers, setCartInfo } = useContext(CartContext) 
    const [cartId, setCartId] = useState(null);
    const [orderType, setOrderType] = useState(null)
async function getCartId()
   {
      let response = await getLoggedUserCart();
      setCartId(response.data.data._id); 
   }

async function getShippingDetails( values){
    const options = {
        url: `https:ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        method:"POST", 
         headers,
         data: {
            values
         }
                
    };
    let { data } = await axios.request(options);
     console.log(data);
     
}

async function createOnlineOrder( values){
    const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
        method:"POST", 
         headers,
         data: {
            values
         }
                
    };
    let { data } = await axios.request(options);
     console.log(data);
    toast.loading("redirect to payment ");
    setTimeout(()=>{
        if(data.status === "success") {
            window.location.href = data.session.url; 
         }
    },3000);
     
}


const formik = useFormik( {
    initialValues:{
        ShippingAddress:{
    details:"",
    phone: "",
    city: "",
        }
    },
    onSubmit: (values) =>{
    if(orderType === "cash") getShippingDetails(values);
    else createOnlineOrder(values);
    }

});

    useEffect(()=>{
        getCartId();

    } , [])


    return (
        <> 
    <form onSubmit={formik.handleSubmit} className='mt-10 space-y-6 w-[70%] mx-auto'>

<div className="relative z-0 w-full mb-5 group">
    <input type="text" name="ShippingAddress.city" id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required
    value={formik?.values.ShippingAddress.city}
    onChange={formik.handleChange}
     />
    <label htmlFor="floating_city" className="peer-focus:font-medium absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>

    

</div>
<div className="relative z-0 w-full mb-5 group">
    <input type="tel" name="ShippingAddress.phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required
    value={formik?.values.ShippingAddress.phone}
    onChange={formik.handleChange}
     />
    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone :</label>
   

</div>

<div className="relative z-0 w-full mb-5 group">
    <textarea type="text" name="ShippingAddress.details" id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required
    value={formik?.values.ShippingAddress.details}
    onChange={formik.handleChange}
     />
    <label htmlFor="floating_details" className="peer-focus:font-medium absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details :</label>
   


</div>


<button onClick={()=>{
    setOrderType("cash")
}} type="submit" className="me-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
Cash Order</button>
<button onClick={()=>{
    setOrderType("online")
}} type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
Online order</button>
</form> </>
    )
}