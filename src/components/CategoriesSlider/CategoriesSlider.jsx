import React, { useEffect, useState } from "react";
import Styles from './CategoriesSlider.module.css';
import Slider from "react-slick";
import axios from "axios";
export default function CategoriesSlider() {

    const [CategoriesSlider, setCategoriesSlider] = useState([]);
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 3,
        autoplay:true,
     
      };
      function getAllCategories(){
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        .then(({data})=>{
             setCategoriesSlider(data.data);
        }).catch((error)=>{

        })
      }
    
    useEffect(()=>{
        getAllCategories();
    } , [])
    return (
        <>
        <div className="mb-3">
            <h2 className="mb-3 text-2xl py-4 bg-gradient-to-r from-gray-900 to-lime-300 bg-clip-text text-transparent font-semibold">Shop Popular Categories</h2>
        <Slider {...settings}>
            {CategoriesSlider.map((category) => <>
         <div key={category._id} >
         <img className="mb-3 w-full h-[200px] rounded-t-full rounded-b-sm p-1 hover:scale-105 "  src={category.image} alt={category.name}/> 
            <h3 className="text-light text-green-600">{category.name}</h3>
            </div>
            </>)}
        </Slider>
        </div>
        </>
    )
}