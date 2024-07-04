import React, { useEffect, useState } from "react";
import Styles from './Categories.module.css'
import axios from "axios";

export default function Categories() {
    const [categoriesSection, setCategoriesSection] = useState([]);
    function categoriesPage(){
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        .then(({data})=>{
            setCategoriesSection(data.data);
            console.log(data.data);
        }).catch((error)=>{

        })
      }
    useEffect(()=>{
        categoriesPage();
    } , [])
    return (
        <>
        

<div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
    {categoriesSection.map((category) => 

<div  key={category._id} className="hover:shadow-lg max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img className="rounded-t-lg w-full h-[14rem]" src={category.image}   alt />
  </a>
  <div className="p-5">
    <a href="#">
      <h5 className="mb-2 text-2xl bg-gradient-to-r from-gray-900 to-lime-300 bg-clip-text text-transparent tracking-tight text-gray-900 dark:text-white">{category.name}</h5>
    </a>
  
  </div>
</div>


     )}   

</div>



    </>
    )
}