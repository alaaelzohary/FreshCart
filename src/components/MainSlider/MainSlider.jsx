import React, { useEffect, useState } from "react";
import Styles from './MainSlider.module.css';
import Slider from "react-slick";
import pic1 from '../../../public/images/slider-image-1.jpeg';
import pic2 from '../../../public/images/slider-image-2.jpeg';
import pic3 from '../../../public/images/slider-image-3.jpeg';
import pic4 from '../../../public/images/slider-2.jpeg';
import pic5 from '../../../public/images/grocery-banner.png';



export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
     
      };
    useEffect(()=>{} , [])
    return (
        <>
<div className="row">
<div className="w-3/4 mt-2 rounded-tl-full rounded-bl-full overflow-hidden">
<Slider {...settings} className="rounded-tl-full rounded-bl-full">
<img src={pic1} alt="" className="object-cover rounded-tl-full rounded-bl-full"/>
<img src={pic2} alt="" className=" object-cover rounded-tl-full rounded-bl-full"/>
<img src={pic3} alt="" className="object-cover rounded-tl-full rounded-bl-full"/>
</Slider>
</div>
<div className="w-1/4 rounded-tr-full rounded-br-full overflow-hidden"> 
<img src={pic1} alt="sliderpic" className="w-full"/>
<img src={pic2} alt="" className=""/>
<img src={pic3} alt="" className=""/>
</div>

</div>



 </>
    )
}