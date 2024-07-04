import React, { useContext, useEffect, useState } from "react";
import Styles from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";


export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { id, category } = useParams();
  const { addProductToCart } = useContext(CartContext);
const { addProductToWishList } = useContext(WishListContext);
 
async function addProduct(productId){
  let response = await addProductToCart(productId);
 toast('added successfully');

} 
async function addItemToWishList(productId){
  let response = await addProductToWishList(productId);
  console.log(response);
 toast('added successfully');

} 

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        console.log(data.data);
      })
      .catch((error) => {});
    }
    

  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProduct = data.data;
        let related = allProduct.filter(
          (product) => product.category.name == category
        );
        setRelatedProducts(related);
        console.log(allProduct);
      })
      .catch((error) => {});
    }
    
  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);



  return (
    <>
      <div className="row product-details">
        <div className="w-1/4 pe-5">
    <Slider {...settings}>
      {productDetails?.images.map((src) => <img src={src} key={id} className="rounded-t-full w-full"  alt={productDetails?.title} />
    
  )}
    </Slider>
    </div>
        <div className="w-3/4 text-left px-5">
          <h3 className="font-bold mx-2 my-5 bg-gradient-to-r from-gray-600 to-lime-300 bg-clip-text text-transparent text-2xl">{productDetails?.title}</h3>
          <p className="m-2">{productDetails?.description}</p>
          <div className="flex justify-between m-2">
            <span>{productDetails?.price} EGP</span>
            <span>{productDetails?.ratingsAverage} <i className="fas fa-star text-yellow-300"></i> </span>
        </div>
        <div className="relative flex animate__animated animate__fadeInUp  group-hover:block">
  <button onClick={()=>addProduct(productDetails?.id)}
    className="mt-3 w-[85%]
      bg-gradient-to-r from-[rgba(27,253,156,0.1)] to-transparent via-transparent to-[rgba(27,253,156,0.1)]
      text-green-800 border-2 border-green-500 rounded-[0.6em] overflow-hidden
      px-[1.1em] py-[0.5em] text-[15px] leading-[1.4em] tracking-[0.06em]
      font-[inherit] shadow-[inset_0_0_10px_rgba(27,253,156,0.4),0_0_9px_3px_rgba(27,253,156,0.1)]
      hover:text-[#214133] hover:shadow-[inset_0_0_10px_rgba(27,253,156,0.6),0_0_9px_3px_rgba(27,253,156,0.2)]
      hover:border-green-300">
    <span
      className="
        absolute left-[-4em] w-[4em] h-full top-0
        bg-gradient-to-r from-transparent to-[rgba(27,253,156,0.1)] via-[rgba(27,253,156,0.1)] to-transparent
        transition-transform duration-400 ease-in-out
  " />
    Add to Cart <i className="fas fa-plus"></i>
  </button>
  <span onClick={()=>addItemToWishList(productDetails?.id)}> 
  <i className={`absolute top-2 ms-10 self-center text-5xl far fa-heart  text-green-600 hover:scale-150 }`}></i>
      </span>
  </div>
  
        </div>
        
      </div>

      <div className="row">
          {relatedProducts.map((product) => (
            <div key={product.id} className="w-1/6">
              <div className="product p-4 group">
                <Link
                  to={`/productDetails/${product.id}/${product.category.name}`}
                >
                  <img
                    className="w-full rounded-md"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <span className="block font-light text-green-600">
                    {product.category.name}
                  </span>
                  <h3 className="text-lg text-gray-800 mb-4">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                </Link>
                <div className="relative flex animate__animated animate__fadeInUp hidden group-hover:block">
  <button onClick={()=>addProduct(product.id)}
    className="mt-3 me-1 -ms-5
      bg-gradient-to-r from-[rgba(27,253,156,0.1)] to-transparent via-transparent to-[rgba(27,253,156,0.1)]
      text-green-800 border-2 border-green-500 rounded-[0.6em] overflow-hidden
      px-[1.1em] py-[0.5em] text-[15px] leading-[1.4em] tracking-[0.06em]
      font-[inherit] shadow-[inset_0_0_10px_rgba(27,253,156,0.4),0_0_9px_3px_rgba(27,253,156,0.1)]
      hover:text-[#214133] hover:shadow-[inset_0_0_10px_rgba(27,253,156,0.6),0_0_9px_3px_rgba(27,253,156,0.2)]
      hover:border-green-300">
    <span
      className="
        absolute left-[-4em] w-[4em] h-full top-0
        bg-gradient-to-r from-transparent to-[rgba(27,253,156,0.1)] via-[rgba(27,253,156,0.1)] to-transparent
        transition-transform duration-400 ease-in-out
  " />
    Add to Cart <i className="fas fa-plus"></i>
  </button>
  <span onClick={()=>addItemToWishList(product.id)}> 
  <i className={`absolute top-3 self-center text-4xl far fa-heart  text-green-600 hover:scale-150 }`}></i>
      </span>
  </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
