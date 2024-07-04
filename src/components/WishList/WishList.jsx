import React, { useContext, useEffect, useState } from "react";
import Styles from './WishList.module.css'
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
export default function WishList() {
    const [wishListDetails, setWishListDetails] = useState(null);
    const {getLoggedUserWishList, addProductToWishList, deleteProductFromWishList}= useContext(WishListContext)
    const { addProductToCart } = useContext(CartContext)
    
    async function addProductToCartFromWishList(productId){
      let response = await addProductToCart(productId);
     toast('added successfully');
    
    } 

    async function getWishListItems() {
      let response = await getLoggedUserWishList();
      setWishListDetails(response.data.data);
      console.log(response.data.data)
    }
    
    async function deleteWishList(productId) {
      let response = await deleteProductFromWishList(productId);
      setWishListDetails(response.data.data);
    }
    useEffect(()=>{
      getWishListItems();

    } , [])
    return (
        <>
{wishListDetails?.map((product)=> <>
<div className="mb-3 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-7xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <div className="flex justify-between p-4 leading-normal">
  <div className="flex">
  <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={product.imageCover} />
  <div className="self-center ms-2">
    
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
    <h5 className="mb-2 tracking-tight text-gray-900 dark:text-white">{product.price}</h5>
    <h5 onClick={()=>deleteWishList()} className=" cursor-pointer mb-2 tracking-tight text-red-600 dark:text-white"> <i className="me-2 fa-solid fa-trash text-xl text-red-600"></i> Remove</h5>
    </div>
    </div>
  </div>
  <button onClick={()=>addProductToCartFromWishList(product.id)}
    className="mt-3 me-10
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
</div>
</>
)}


   </>
    )
}