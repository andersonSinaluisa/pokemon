import React, { useContext } from "react";


interface OpenContextProps{
    visible:boolean;
    type:string;
    update:any;
}

export const OpenContext = React.createContext<OpenContextProps>({
    visible:false,
    type:'all',
    update:null
})

export const OpenContextProvider = OpenContext.Provider;


export const useOpen = ()=>{
    const {visible,type,update} = useContext(OpenContext);
    return {visible,type,update}
}