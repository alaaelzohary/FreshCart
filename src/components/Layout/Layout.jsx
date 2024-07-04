import React, { useEffect, useState } from "react";
import Styles from './Layout.module.css'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
  
    useEffect(()=>{} , [])
    return (
        <>
        <Navbar/>
        <div className="mx-auto my-6 py-6">
        <Outlet/>
        </div>
        <Footer/>

        </>
    )
}