import * as APIHANDLER from '../api-handler';
import { CreateRequest, EditRequest } from './interface';


const GetPokemonByAuthor = (id:number)=>{
    return APIHANDLER.get(`?idAuthor=${id}`)
}

const CreatePokemon = (props:CreateRequest)=>{
    return APIHANDLER.post("",props)
}

const EditPokemon = (props:{id:number,body:EditRequest})=>{
    return APIHANDLER.put(props.id+"",props.body)
}

const DeletePokemon = (id:number)=>{
    return APIHANDLER.del(id+"")
}

export {
    GetPokemonByAuthor,
    CreatePokemon,
    EditPokemon,
    DeletePokemon
}