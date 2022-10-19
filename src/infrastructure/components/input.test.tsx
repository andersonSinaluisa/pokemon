import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Input, { InputProps } from "./input";
import userEvent from "@testing-library/user-event";


describe("<Input/>",()=>{
    
    const handler = jest.fn()

    const props:InputProps={
         className:"",
         id:"nombre",
         name:"nombre",
         onChange:()=>{handler()},
         type:"text",
         placeholder:"Nombre"
    }

    beforeEach(()=>{
        render(<Input {...props}/>)
    })

    test("Prueba el OnChange",()=>{
        const input = screen.getByPlaceholderText("Nombre")

        input.focus()
        userEvent.keyboard("Anderson")

        expect(input).toHaveValue("Anderson")
        expect(handler).toHaveBeenCalled()
    })
})