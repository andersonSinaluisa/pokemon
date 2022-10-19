import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Range ,{RangeProps} from './range'
import userEvent from "@testing-library/user-event";

describe('<Range/>', () => { 

    const handler = jest.fn()

    const props:RangeProps={
        id:'range',
        name:'ataque',
        label:'Ataque',
        max:"0",
        min:"100",
        onChange:handler
    }

    beforeEach(()=>{
        render(<Range {...props}/>)
    })

    test("OnChange",()=>{
        const range = screen.getByLabelText('Ataque')
        range.focus()
        
    })

 })