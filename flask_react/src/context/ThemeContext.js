import React from 'react'
import { createContext, useReducer } from "react";

export const ThemeContext = createContext()

const themeReducer = (state, action) => {
    // this file changes the visible state from dark mode to light mode
    //state的初始值是blue，这里如果action的type对上了，就可以换成新的state，
    switch (action.type){
        case 'CHANGE_MODE' :
            return { ...state, mode: action.payload }
    }
}

export function ThemeProvider({ children }){
    // usereducer的第二个参数是初始化的值或者状态
    //reducer就是一个对象，第一个参数是一个函数，这个函数决定着如何改变这个对象，决定着dispatch的形式
    //第二个参数是带有初始值的对象，
    //实际改变的时候使用dispatch

    const [state, dispatch] = useReducer(themeReducer, {
        mode: 'light'
    })
    

    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode })
    }

    return (
        //这里就是将 这个value作为全局变量，谁都可以用
        <ThemeContext.Provider value={{ ...state, changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}