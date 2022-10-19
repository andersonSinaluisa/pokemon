import { createModel } from "@rematch/core";
import { ResponseServer } from "infrastructure/api/api-handler";
import { RootModel } from "../index";
import {CreatePokemon, CreateRequest, CreateResponse, DeletePokemon, EditPokemon, EditRequest, EditResponse, GetByAuthorResponse,GetPokemonByAuthor} from 'infrastructure/api/core'



interface GetByAuthorStateProps extends ResponseServer{
    data: GetByAuthorResponse[]
}
export interface CreatePokemonStateProps extends ResponseServer{
    data:CreateResponse;

}
export interface EditPokemonStateProps extends ResponseServer{
    data:EditResponse;
}
export const Core = createModel<RootModel>()({
    state:{
        GetByAuthor:{
            data:[],
            error:"",
            status:0
        } as GetByAuthorStateProps,
        CreatePokemon:{
            data:{},
            error:"",
            status:0
        } as CreatePokemonStateProps,
        EditPokemon:{
            data:{},
            error:"",
            status:0
        } as EditPokemonStateProps,
        DeletePokemon:{ 
            error:"",
            status:0

        } as ResponseServer

    },
    effects:(dispatch:any)=>({
        async onGetByAuthorAsync(id:number){
            try{

                const res = await GetPokemonByAuthor(id).toPromise()
                dispatch.Core.onGetByAuthor({
                    data:res.data,
                    error:"",
                    status:res.status
                })
            }catch(e:any){
                dispatch.Core.onGetByAuthor({
                    data:[],
                    error:e.response?e.response.statusText:"Error",
                    status:e.response?e.response.status:400
                })
            }
        },
        async onCreatePokemonAsync(props:CreateRequest){
            try{

                const res = await CreatePokemon(props).toPromise()
                dispatch.Core.onCreatePokemon({
                    data:res.data,
                    error:"",
                    status:res.status
                })
            }catch(e:any){
                dispatch.Core.onCreatePokemon({
                    data:[],
                    error:e.response?e.response.statusText:"Error",
                    status:e.response?e.response.status:400
                })
            }
        },
        async onEditPokemonAsync(props:{id:number,body:EditRequest}){
            try{
                const res = await EditPokemon(props).toPromise()
                dispatch.Core.onEditPokemon({
                    data:res.data,
                    error:"",
                    status:res.status
                })
            }catch(e:any){
                dispatch.Core.onEditPokemon({
                    data:[],
                    error:e.response?e.response.statusText:"Error",
                    status:e.response?e.response.status:400
                })
            }
        },
        async onDeletePokemonAsync(id:number){
            try{

                const res = await DeletePokemon(id).toPromise();
                dispatch.Core.onDeletePokemon({
                    error:"",
                    status:res.status
                })
            }catch(e:any){
                dispatch.Core.onDeletePokemon({
                    error:e.response?e.response.statusText:"Error",
                    status:e.response?e.response.status:400
                })
            }
        }
    }),
    reducers:{
        onGetByAuthor(state:any,payload:GetByAuthorStateProps){
            return {...state,GetByAuthor:payload}
        },
        onCreatePokemon(state:any,payload:CreatePokemonStateProps){
            return {...state,CreatePokemon:payload}
        },
        onEditPokemon(state:any,payload:EditPokemonStateProps){
            return {...state,EditPokemon:payload}
        },
        onDeletePokemon(state:any,payload:ResponseServer){
            return {...state,DeletePokemon:payload}
        }
    }
})