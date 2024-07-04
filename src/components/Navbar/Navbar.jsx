import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Styles from './Navbar.module.css';
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import logo from "../../../public/images/freshcart-logo.svg"

export default function Navbar() {
  let { getLoggedUserCart } = useContext(CartContext) 
  let [numberOfCart, setnumberOfCart] = useState(null);
let {userLogin, setUserLogin} = useContext(UserContext);
let navigate = useNavigate();
async function getCartItems()
   {
      let response = await getLoggedUserCart();
      setnumberOfCart(response.data); 

   }
  
function LogOut(){
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/login');
}
useEffect(()=>{
getCartItems();
},[])
return (
        <>

<nav className=" z-50 bg-gray-100 border-gray-200 dark:bg-gray-900 fixed left-0 top-0 right-0">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
<Link to={'/'}  className="flex items-center space-x-3 rtl:space-x-reverse">
  <img src={logo} className="h-8" alt="Flowbite Logo" />
</Link>

    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
       {userLogin !== null ? <>
        <li>
          <NavLink to={""} className={({ isActive })=>{
            return `relative hover:before:w-full before:transition-[width] before:duration-300 hover:font-semibold before:h-[2px] before:bg-lime-400 before:absolute before:left-0 before:-bottom-1 before:w-0 ${isActive ? "text-lime-400  font-semibold" : "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"}`}}  aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink to={"/cart"} className={({isActive})=>{ 
            return `relative hover:before:w-full before:transition-[width] before:duration-300 hover:font-semibold before:w-0 before:h-[2px] before:bg-lime-400 before:absolute before:left-0 before:-bottom-1 ${isActive ? "text-lime-400 font-semibold" : "before:w-full block py-2 px-3 text-white bg-lime-700 rounded md:bg-transparent md:text-lime-700 md:p-0 dark:text-white md:dark:text-green-500"}`}}>Cart</NavLink>
        </li>
        <li>
          <NavLink to={"wishList"} className={({isActive})=>{
             return `relative hover:before:w-full before:transition-[width] before:duration-300 hover:font-semibold before:w-0 before:h-[2px] before:bg-lime-400 before:absolute before:left-0 before:-bottom-1 ${isActive ? "text-lime-400 font-semibold" : "before:w-full block py-2 px-3 text-white bg-lime-700 rounded md:bg-transparent md:text-lime-700 md:p-0 dark:text-white md:dark:text-green-500"}`}}>Wish List</NavLink>
        </li>
        <li>
          <NavLink to={"products"} className={({isActive})=>{
             return `relative hover:before:w-full before:transition-[width] before:duration-300 hover:font-semibold before:w-0 before:h-[2px] before:bg-lime-400 before:absolute before:left-0 before:-bottom-1 ${isActive ? "text-lime-400 font-semibold" : "before:w-full block py-2 px-3 text-white bg-lime-700 rounded md:bg-transparent md:text-lime-700 md:p-0 dark:text-white md:dark:text-green-500"}`}}>Products</NavLink>
        </li>
        <li>
          <NavLink to={"orders"} className={({isActive})=>{
             return `relative hover:before:w-full before:transition-[width] before:duration-300 hover:font-semibold before:w-0 before:h-[2px] before:bg-lime-400 before:absolute before:left-0 before:-bottom-1 ${isActive ? "text-lime-400 font-semibold" : "before:w-full block py-2 px-3 text-white bg-lime-700 rounded md:bg-transparent md:text-lime-700 md:p-0 dark:text-white md:dark:text-green-500"}`}}>orders</NavLink>
        </li>
        <li>
          <NavLink to={"categories"} className={({isActive})=>{
             return `relative hover:before:w-full before:transition-[width] before:duration-300 hover:font-semibold before:w-0 before:h-[2px] before:bg-lime-400 before:absolute before:left-0 before:-bottom-1 ${isActive ? "text-lime-400 font-semibold" : "before:w-full block py-2 px-3 text-white bg-lime-700 rounded md:bg-transparent md:text-lime-700 md:p-0 dark:text-white md:dark:text-green-500"}`}}>Categories</NavLink>
        </li>
      
       </>: null}
       
      </ul>
    </div>
    <div className='auth'>
    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    <li>
          <NavLink to={"cart"} className="relative block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><i className="fa-solid fa-cart-shopping text-2xl text-[#07D001]"></i>
          <span className="w-4 h-4 font-bold text-sm flex justify-center items-center rounded-full bg-[#07D001] absolute text-white -top-2 -right-2 p-2">{numberOfCart?.numOfCartItems}</span>
          </NavLink>
        </li>
      
        <li>
          <Link to="https://www.facebook.com">
          <i className="fa-brands fa-facebook"></i>
          </Link>
        </li>
        <li>
          <Link to="https://www.twitter.com">
          <i className="fa-brands fa-twitter"></i>
          </Link>
        </li>
        <li>
          <Link to="https://www.youtube.com">
          <i className="fa-brands fa-youtube"></i>
          </Link>
        </li>
        <li>
          <Link to="https://www.tiktok.com">
          <i className="fa-brands fa-tiktok"></i>
          </Link>
        </li>
        <li>
          <Link to="https://www.instagram.com">
          <i className="fa-brands fa-instagram"></i>
          </Link>
        </li>
        {userLogin === null ? <>
            <li>
          <NavLink to={"login"} className="block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-white md:dark:text-green-500" aria-current="page">Login</NavLink>
        </li>
        <li>
          <NavLink to={"register"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</NavLink>
        </li>
        </>:  <li>  
          <span onClick={LogOut} className=" block cursor-pointer py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-black"> <i className="fa-solid fa-right-from-bracket text-2xl"></i> </span>
        </li>}
      </ul>
    </div>
  </div>
</nav>

     </>
    )
}