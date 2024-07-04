import Styles from './ResetPassword.module.css';
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function ResetPassword() {
  let {setUserLogin, userLogin} = useContext(UserContext); 

    const [apiError, setApiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const validationSchema = Yup.object().shape({
     email:Yup.string().email('Email is invalid' ).required('Email is required'),
     newPassword:Yup.string().min(3, 'Password must be more than 3 letters').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Please Enter Minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character ').required('Please Enter the Password'),
    })

    async function handleResetPassword(formValues) {
      setIsLoading(true);
    setApiError("");
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        formValues
      );
      if (data.token) {
        localStorage.setItem('userToken', data.token);
        setUserLogin(data.token);
        navigate('/');
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
    }

    const formik = useFormik({
        initialValues: {
            email:"",
            newPassword:"",
        },
        validationSchema,
        onSubmit:handleResetPassword,
    })
 
    return (
        <>
        <div className="py-6 max-w-2xl mx-auto">
        {apiError  ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {apiError}
</div> : null}
<h2 className='text-3xl font-bold text-green-600 mb-6'>Change Your Password</h2>
<form onSubmit={formik.handleSubmit} className='space-y-6'>
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address :</label>
  
     {formik.errors.email && formik.touched.email  ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.email}
</div> : null}
  
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="newPassword" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required
      value={formik.values.newPassword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Write New Password :</label>
     
     {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.newPassword}
</div>: null}

  </div>


  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  {isLoading?  <i className='fas fa-spinner fa-spin'></i>
    :'Reset Password'}</button>
  </form>
  </div>
     </>
    )
}
