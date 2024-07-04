import React, { useContext, useEffect, useState } from "react";
import Styles from './Orders.module.css'
import { UserContext } from "../../Context/UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ClimbingBoxLoader } from "react-spinners";

export default function Brand() {
    const [allOrders, setAllOrders] = useState(null);
    const {userLogin} = useContext(UserContext);
    const {id} = jwtDecode(userLogin);
    console.log(id);

    function getUserOrder() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
          .then((response) => 
            setAllOrders(response.data)
            )
          .catch((error) => error)
      }

    useEffect(()=>{
        getUserOrder()
    } , [])

    if(allOrders == null) {
      return <div className="py-8 w-full flex justify-center"> 
      <ClimbingBoxLoader color="green"/>
      </div>
    }

    return (
        <>
      <div>
        {allOrders?.map((product) => <> 
          <div className="flex justify-between">
        <div>
         <h3 className="text-gray-500 font-light">Order Id</h3>
         <h3>{product.id}</h3>
        </div>
        <div>
        <button 
className="mt-3 
  bg-gradient-to-r from-[rgba(27,253,156,0.1)] to-transparent via-transparent to-[rgba(27,253,156,0.1)]
  text-blue-800 border-2 border-blue-500 rounded-full overflow-hidden
  px-[1.7em] py-[0.7em] text-[15px] leading-[1.4em] tracking-[0.06em]
  font-[inherit] shadow-[inset_0_0_10px_rgba(27,253,156,0.4),0_0_9px_3px_rgba(27,253,156,0.1)]
  hover:text-[#214133] hover:shadow-[inset_0_0_10px_rgba(27, 253, 156, 0.6),0_0_9px_3px_rgba(27, 253, 156, 0.2)]
  hover:border-blue-300"
>
<span
  className="
    absolute left-[-4em] w-[4em] h-full top-0
    bg-gradient-to-r from-transparent to-[rgba(27,253,156,0.1)] via-[rgba(27,253,156,0.1)] to-transparent
    transition-transform duration-400 ease-in-out"/>
Under delivery
</button>

        </div>
    </div>
 
<div className="grid grid-cols-12">
<div className="col-span-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<a href="#">
<img className="rounded-t-lg" src={product.cartItems[0].product.imageCover} alt />
</a>
<div className="p-5">
<a href="#">
  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.cartItems[0].product.title}</h5>
</a>
<span className=" mb-3 font-normal text-gray-700 dark:text-gray-400">Price: {product.cartItems[0].price} <span className="font-semibold">EGP</span> </span>

</div>
</div>
</div>
</> 
)}
 

      </div>
      </>
    )
}