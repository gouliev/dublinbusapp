import React from 'react'
import {useEffect } from "react";
import Cookies from 'universal-cookie';

export default function Modal(){    
    console.log("called")
    const cookies = new Cookies();

    const cookieValue = cookies.get('FirstUse')
    if(cookieValue == 'Yes'){
        console.log(true)
    }else{
        console.log(false)
    }

    return(
        null
    )
}
    