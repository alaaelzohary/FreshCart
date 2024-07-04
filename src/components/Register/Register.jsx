import Styles from './Register.module.css';
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
let {setUserLogin, userLogin} = useContext(UserContext);
  const [apiError, setapiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
      console.log(userLogin);  // This will log the updated userLogin value
    }, [userLogin]);
    const validationSchema = Yup.object().shape({
     name:Yup.string().min(3, 'Name min lenght is 3').max(15, 'Name max lenghtis 15').required('Name is required'),
     email:Yup.string().email('Email is invalid' ).required('Email is required'),
     password:Yup.string().min(3, 'Password must be more than 3 letters').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Please Enter Minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character ').required('Please Enter the Password'),
     rePassword:Yup.string().oneOf([Yup.ref('password')]).required('re-Password is required'),
     phone:Yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone must be valid Egyption number').required('Please Enter Your Phone Number')
    })
    function handleRegister(formValues)
    {
      setIsLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
        .then((apiResponse) => {
          if(apiResponse.data.message === 'success'){
            setIsLoading(false);
            localStorage.setItem('userToken', apiResponse.data.token);
            setUserLogin(apiResponse.data.token);
            navigate('/'); 
            console.log(apiResponse.data);
          }
           })   
           .catch((apiResponse) => {
            setIsLoading(false);
            setapiError(apiResponse?.response?.data?.message);
           })
            
          
     
    }

    const formik = useFormik({
        initialValues: {
            name:"",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        },
        onSubmit:handleRegister,
        validationSchema,
    })
 
    return (
        <>

        <div className="py-6">
        {apiError  ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {apiError}
</div> : null}

<h2 className='text-left text-3xl font-bold text-green-600 mb-6'>Register Now</h2>

<form onSubmit={formik.handleSubmit} className='space-y-6'>

  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="name" id="floating_name" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer
        ${
          formik.errors.name && formik.touched.name
            ? 'border-red-600 dark:border-red-400 focus:border-red-600 dark:focus:border-red-400'
            : 'border-gray-300 dark:border-gray-600 focus:border-green-600 dark:focus:border-green-500'
        }
      `} placeholder=" " required
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} />
      <label htmlFor="floating_name" className="peer-focus:font-medium absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name :</label>
  
      {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.name}
</div> :null}
  
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" id="floating_email" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer
        ${
          formik.errors.email && formik.touched.email
            ? 'border-red-600 dark:border-red-400 focus:border-red-600 dark:focus:border-red-400'
            : 'border-gray-300 dark:border-gray-600 focus:border-green-600 dark:focus:border-green-500'
        }
      `} placeholder=" " required
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address :</label>
  
     {formik.errors.email && formik.touched.email  ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.email}
</div> : null}
  
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="password" id="floating_password" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer
        ${
          formik.errors.password && formik.touched.password
            ? 'border-red-600 dark:border-red-400 focus:border-red-600 dark:focus:border-red-400'
            : 'border-gray-300 dark:border-gray-600 focus:border-green-600 dark:focus:border-green-500'
        }
      `} placeholder=" " required
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password :</label>
     
     {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.password}
</div>: null}

  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="rePassword" id="floating_repeat_password" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer
        ${
          formik.errors.rePassword && formik.touched.rePassword
            ? 'border-red-600 dark:border-red-400 focus:border-red-600 dark:focus:border-red-400'
            : 'border-gray-300 dark:border-gray-600 focus:border-green-600 dark:focus:border-green-500'
        }
      `} placeholder=" " required
      value={formik.values.rePassword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} />
      <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password :</label>
  
      {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.rePassword}
</div>: null}

  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" name="phone" id="floating_phone" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer text-left
        ${
          formik.errors.phone && formik.touched.phone
            ? 'border-red-600 dark:border-red-400 focus:border-red-600 dark:focus:border-red-400'
            : 'border-gray-300 dark:border-gray-600 focus:border-green-600 dark:focus:border-green-500'
        }
      `} placeholder=" " required
      value={formik.values.phone}
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}/>
      <label htmlFor="floating_phone" className="peer-focus:font-medium absolute left-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone :</label>
  
     {formik.errors.phone  && formik.touched.phone ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.phone}
</div>: null}
  
  </div>
  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-right dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  {isLoading?  <i className='fas fa-spinner fa-spin'></i>
    :'Submit'}</button>
  </form>
  </div>
     </>
    )
}