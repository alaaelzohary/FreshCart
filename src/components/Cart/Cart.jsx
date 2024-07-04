import React, { useContext, useEffect, useState } from "react";
import Styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { ClimbingBoxLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  let {
    getLoggedUserCart,
    updateCartItem,
    deleteProductFromCart,
    clearProductFromCart,
  } = useContext(CartContext);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    setCartDetails(response.data.data);

  }

  async function updaeCartCount(productId, count) {
    let response = await updateCartItem(productId, count);
    setCartDetails(response.data.data);
  }

  async function deleteProduct(productId) {
    let response = await deleteProductFromCart(productId);
    setCartDetails(response.data.data);
  }

  async function clearCart() {
    let response = await clearProductFromCart();
    setCartDetails(response.data.data);
  }

  useEffect(() => {
    getCartItems();
    updaeCartCount();
  }, []);


  if(cartDetails == null) {
    return <div className="py-8 w-full flex justify-center"> 
    <ClimbingBoxLoader color="green"/>
    </div>
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-8">
        <h2 className="text-3xl py-5 text-center bg-gradient-to-r from-gray-900 to-lime-300 bg-clip-text text-transparent">
          Shopping in cart
        </h2>
        {cartDetails == null ? (
          <div className="py-16 flex flex-col justify-center items-center">
            <h3 className="text-lg">There are not items yet.</h3>
            <button className="relative overflow-hidden border my-8 rounded-md px-6 py-3 text-lg font-medium uppercase text-green-600 border-green-600 transition duration-500 ease-in-out hover:text-green-200 hover:bg-green-600 hover:font-semibold">
              <Link to={"/products"} className="text-sm mt-2 uppercase">
                add your first product to your cart
              </Link>
              <span className="absolute block w-12 h-12 rounded-full bg-green-600 transition-all duration-1000 ease-in-out top-0 left-0 -translate-x-1/2 -translate-y-1/2 group-hover:w-96 group-hover:h-96" />
              <span className="absolute block w-12 h-12 rounded-full bg-green-600 transition-all duration-1000 ease-in-out bottom-0 right-0 translate-x-1/2 translate-y-1/2 group-hover:w-96 group-hover:h-96" />
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-center text-gray-700 uppercase">
              Total Cart Price {cartDetails?.totalCartPrice} EGP
            </h3>

            <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updaeCartCount(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                          onClick={() =>
                            updaeCartCount(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteProduct(product.product.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </span>
                 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right">
              <button
                onClick={() => clearCart()}
                className="mt-3 me-3 -ms-3 text-right text-semibold
      bg-gradient-to-r from-[rgba(27,253,156,0.1)] to-transparent via-transparent to-[rgba(27,253,156,0.1)]
      text-red-800 border-2 border-red-500 rounded-[0.6em] overflow-hidden
      px-[1.7em] py-[0.7em] text-[15px] leading-[1.4em] tracking-[0.06em]
      font-[inherit] shadow-[inset_0_0_11px_rgba(255,0,0,0.4),0_0_11px_1px_rgba(255,0,0,0.2)]
      hover:text-[#852502] hover:shadow-[inset_0_0_10px_rgba(255,0,0,0.6),0_0_9px_3px_rgba(255,0,0,0.2)]
      hover:border-red-700
    " >
                <span
                  className="
        absolute left-[-4em] w-[4em] h-full top-0
        bg-gradient-to-r from-transparent to-[rgba(27,253,156,0.1)] via-[rgba(27,253,156,0.1)] to-transparent
        transition-transform duration-400 ease-in-out  
      "/>
                Clear Cart
              </button>
            </div>
          </div>
        )}
        <div className="text-right mt-8">
         <Link to={'/checkOut'}
    className="mt-3 me-3 -ms-3
      bg-gradient-to-r from-[rgba(27,253,156,0.1)] to-transparent via-transparent to-[rgba(27,253,156,0.1)]
      text-green-800 border-2 border-green-500 rounded-[0.6em] overflow-hidden
      px-[1.7em] py-[0.7em] text-[15px] leading-[1.4em] tracking-[0.06em]
      font-[inherit] shadow-[inset_0_0_10px_rgba(27,253,156,0.4),0_0_9px_3px_rgba(27,253,156,0.1)]
      hover:text-[#214133] hover:shadow-[inset_0_0_10px_rgba(27,253,156,0.6),0_0_9px_3px_rgba(27,253,156,0.2)]
      hover:border-green-300
    " >
    <span
      className="
        absolute left-[-4em] w-[4em] h-full top-0
        bg-gradient-to-r from-transparent to-[rgba(27,253,156,0.1)] via-[rgba(27,253,156,0.1)] to-transparent
        transition-transform duration-400 ease-in-out
  " />
Next Step
  </Link>
  </div>
      </div>
    </>
  );
}
