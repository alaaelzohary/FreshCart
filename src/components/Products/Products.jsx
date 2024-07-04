import React, { useEffect, useState } from "react";
import Styles from './Products.module.css';
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../hooks/useProducts";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

export default function Products() {
    const [counter, setCounter] = useState(0);
    const { data, isError, error, isLoading, isFetching } = useProducts();
    if(isLoading) {
      return <div className="py-8 w-full flex justify-center"> 
      <ClimbingBoxLoader color="green"/>
      </div>
    }
    return (
        <>
        <div className="row">
            {data?.data.data.map((product) => 
        <div key={product.id} className="w-1/6">
        <div className="product p-4 group" >
          <Link to={`/productDetails/${product.id}/${product.category.name}`}>
         <img className="w-full rounded-md" src={product.imageCover} alt={product.title}/>
        <span className="block font-light text-green-600">{product.category.name}</span>
         <h3 className="text-lg text-gray-800 mb-4">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
        <div className="flex justify-evenly">
            <span>{product.price} EGP</span>
            <span>{product.ratingsAverage} <i className="fas fa-star text-yellow-300"></i> </span>
        </div>
        
         </Link>
         <div className="relative flex animate__animated animate__fadeInUp hidden group-hover:block">
  <button onClick={()=>addProduct(product.id)}
    className="mt-3 me-3 -ms-3
      bg-gradient-to-r from-[rgba(27,253,156,0.1)] to-transparent via-transparent to-[rgba(27,253,156,0.1)]
      text-green-800 border-2 border-green-500 rounded-[0.6em] overflow-hidden
      px-[1.7em] py-[0.7em] text-[15px] leading-[1.4em] tracking-[0.06em]
      font-[inherit] shadow-[inset_0_0_10px_rgba(27,253,156,0.4),0_0_9px_3px_rgba(27,253,156,0.1)]
      hover:text-[#214133] hover:shadow-[inset_0_0_10px_rgba(27,253,156,0.6),0_0_9px_3px_rgba(27,253,156,0.2)]
      hover:border-green-300
    "
  >
    <span
      className="
        absolute left-[-4em] w-[4em] h-full top-0
        bg-gradient-to-r from-transparent to-[rgba(27,253,156,0.1)] via-[rgba(27,253,156,0.1)] to-transparent
        transition-transform duration-400 ease-in-out
  " />
    Add to Cart <i className="fas fa-plus"></i>
  </button>
  <Link to={''}> 
  <i className={` absolute top-4 self-center text-4xl far fa-heart  text-green-600 hover:scale-150 }`}></i>
  
      </Link>
  </div>
        </div>
        </div> 
    )}

        </div>
        </>
    )
}