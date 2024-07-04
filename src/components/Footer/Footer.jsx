import React, { useEffect, useState } from "react";
import logo1 from '../../../public/images/amazon.png'
import logo2 from '../../../public/images/American-Express.png'
import logo3 from '../../../public/images/paypal.png'
import logo4 from '../../../public/images/mastercard-logo.png'
import Styles from './Footer.module.css'

export default function Footer() {

  return (
        <>
   <footer className="w-full py-8 px-14 bg-gray-100 text-left absolute">
    <h3 className="capitalize"> get the freshCart App</h3>
    <p className=" font-light text-gray-500">We will send you a link, open it on your phone to download the app</p>
   <div className="flex gap-3 my-4">
  <input className="rounded-md w-[85%]" type="email" placeholder="Email..." />
<button className="py-3 px-10 ms-2 text-white bg-[#07D001] rounded-md ">Share App Link </button>
   </div>
   <span className="my-4 border-t border-gray-200 w-full"></span>
  
   <div className="flex justify-between">
    <div className="flex items-center">
   <h3 className="me-3">Payment Partner</h3>
   <div className="flex gap-2">
      <img className="w-20 -mb-3" src={`${logo1}`}></img>
      <img className="w-20 h-10 mt-5" src={`${logo2}`}></img>
      <img className="w-10 h-10 mt-3" src={`${logo3}`}></img>
      <img className="w-20" src={`${logo4}`}></img>
      </div>
    </div>
    <div className="flex">
    <h3 className="mt-5">Get deliveries with freshCart</h3>

    </div>
            
   </div>
   </footer>
    </>
    )
}