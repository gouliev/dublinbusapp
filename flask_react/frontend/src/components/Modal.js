import React from 'react'
import {useEffect } from "react";
import Cookies from 'universal-cookie';

useEffect(()=>{
    console.log("called")
    const cookies = new Cookies();
    cookies.set('myCat', 'Pacman', { path: '/' });
    console.log(cookies.get('myCat')); // Pacman    
    }, [])