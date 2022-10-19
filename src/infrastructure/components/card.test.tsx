import React from "react";
import { render, screen } from "@testing-library/react";
import { Card, CardContent, CardProps } from "./card";


test("Rendiza una tarjeta",()=>{
   

    render(<Card>
        <CardContent>
            <p>Hola Mundo</p>
        </CardContent>
    </Card>)

    const card = screen.getByText('Hola Mundo')
    expect(card).toBeInTheDocument()
})