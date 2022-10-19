import React, { ReactNode } from "react";
import './col.css';

interface ColProps{
    children?:ReactNode;
    size?:string
    className?:string;

}
const Col = (props:ColProps)=>{
    return (
        <div className={`col${props.size?"-"+props.size:''} ${props.className?props.className:""}`}>
            {props.children}
        </div>
    )
}

export default Col;