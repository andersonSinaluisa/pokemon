import React, { ReactNode } from "react";
import './row.css';


interface RowProps{
    className?:string;
    children?:ReactNode
}
const Row = (props:RowProps)=>{
    return (
        <div className={`row ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Row;