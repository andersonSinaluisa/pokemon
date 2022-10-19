import React, { ChangeEvent, useEffect, useState } from "react";
import './range.css';


export interface RangeProps{
    max?:string;
    min?:string;
    label?:string;
    id:string;
    onChange?:any;
    name:string
    value?:string;
}

const Range = (props:RangeProps)=>{


    const [value,setValue] = useState("")
    useEffect(()=>{
        if(props.value){
            setValue(props.value)
        }
    },[props])

    function handleInputChange(e:any) {
        let target = e.target
        if (e.target.type === 'range') {
            const val = target.value
            
            setValue(val)
        } 
        
        if(props.onChange){
            props.onChange(e)
        }
    }



    return (
        <div className="range">
            <label htmlFor={props.id}>{props.label+":"}</label>
            <p>{props.min}</p>
            <input type="range" max={props.max} min={props.min} id={props.id} value={props.value} 
            onChange={handleInputChange} name={props.name}  style={{backgroundSize:`${value}% 100%`}}/>
            <p>{props.max}</p>

        </div>
    )
}

export default Range;