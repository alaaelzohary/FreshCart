import Styles from './Login.module.css';
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  let {setUserLogin, userLogin} = useContext(UserContext); 

    const [apiError, setapiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    
    useEffect(() => {
     
    }, [userLogin]);
    const validationSchema = Yup.object().shape({
     email:Yup.string().email('Email is invalid' ).required('Email is required'),
     password:Yup.string().min(3, 'Password must be more than 3 letters').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Please Enter Minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character ').required('Please Enter the Password'),
    })

    function handleLogin(formValues)
    {
      setIsLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
        .then((apiResponse) => {
          if(apiResponse.data.message === 'success')
          {
            localStorage.setItem('userToken', apiResponse.data.token);
            setUserLogin(apiResponse.data.token)
            setIsLoading(false);
            navigate('/'); 
          }
           })   
           .catch((apiResponse) => {
            setIsLoading(false);
            setapiError(apiResponse?.response?.data?.message);
           })      
     
    }

    const formik = useFormik({
        initialValues: {
            email:"",
            password:"",
        },
        validationSchema,
        onSubmit:handleLogin,
    })
 
    return (
        <>
        <div className="py-6 max-w-2xl mx-auto">
        {apiError  ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {apiError}
</div> : null}
<h2 className='text-3xl font-bold text-green-600 mb-6'>Login Now</h2>
<form onSubmit={formik.handleSubmit} className='flex flex-col justify-center items-center space-y-6'>

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
      <input type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password :</label>
     
     {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.password}
</div>: null}

  </div>


  <button type="submit" className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  {isLoading?  <i className='fas fa-spinner fa-spin'></i>
    :'Login'}</button>
    <p>  Forget Your password <i className='fa-solid fa-arrow-right text-gray-500 mx-1 font-light'></i> <Link to={'/forgetpassword'} className="underline hover:text-green-800 text-lime-300" >Click Here</Link> </p>
  </form>
  </div>
     </>
    )
}