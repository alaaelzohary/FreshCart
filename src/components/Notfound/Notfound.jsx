import React, { useEffect, useState } from "react";
import Styles from './Notfound.module.css'
import Notfoundpic from "../../../public/images/error.svg"
export default function Notfound() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{} , [])
    return (
        <>
<div className="flex justify-center items-center">
  <img src={Notfoundpic} />

</div>


     </>
    )
}