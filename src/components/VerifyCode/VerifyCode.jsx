import React, { useEffect, useState } from "react";
import Styles from './VerifyCode.module.css'
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { UserContext } from "../../Context/UserContext";

export default function ForgetPassword() {
    const [apiError, setapiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    
    const reset = Yup.object({
        resetCode: Yup.string()
          .required("Reset Code is requierd")
          .matches(/^[0-9]{0,6}$/i, "enter availd ResetCode"),
      });

    function handleVerifyCode(formValues)
    {
      setIsLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formValues)
        .then((apiResponse) => {
            setIsLoading(false);
            console.log(apiResponse);
            if(apiResponse.data.status == "Success"){
              navigate("/reset-password")
            } else {
                setapiError(apiResponse?.data?.message);
              }
            
           })   
           .catch((apiResponse) => {
            setIsLoading(false);
            setapiError(apiResponse?.response?.data?.message);
           })
     
    }

    const formik = useFormik({
        initialValues: {
            resetCode:"",
        },
        validationSchema:reset,
     
        onSubmit:handleVerifyCode
    })
    
 
    return (
        <>
        <div className="py-6 max-w-2xl mx-auto">
        {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {apiError}
</div> : null}
<h2 className='text-3xl font-bold bg-gradient-to-r from-gray-600 to-lime-300 bg-clip-text text-transparent mb-10 text-start'>Please Enter the Verifyication Code</h2>
<form onSubmit={formik.handleSubmit} className='space-y-6'>

  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="resetCode" id="floating_code" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required
      value={formik.values.resetCode}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}  />
      <label htmlFor="floating_code" className="peer-focus:font-medium absolute left-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-start">code :</label>
  
     {formik.errors.resetCode && formik.touched.resetCode  ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.resetCode}
</div> : null}
  
  </div>



  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  {isLoading?  <i className='fas fa-spinner fa-spin'></i>
    :'Submit'}</button>
  </form>
  </div>
     </>
    )
}