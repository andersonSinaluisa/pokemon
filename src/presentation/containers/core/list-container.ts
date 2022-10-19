import { connect } from "react-redux";
import ListPage from '../../components/core/list'
import {GetByAuthorResponse} from 'infrastructure/api/core'
import { ResponseServer } from "infrastructure/api/api-handler";

export interface ListPageProps{
    List:GetByAuthorResponse[];
    onGetByAuthorAsync:(id:number)=>void;
    buttonAction?:React.MouseEventHandler<HTMLButtonElement>;
    onEdit:(item:any)=>void;
    DeletePokemon:ResponseServer;
    onDeletePokemonAsync:(id:number)=>void;
}

const mapSatateToProps = ({ Core }: any, ownProps: any) => ({
    List:Core.GetByAuthor.data,
    buttonAction:ownProps.buttonAction,
    onEdit : ownProps.onEdit,
    DeletePokemon:Core.DeletePokemon

})

const mapDispatchToProps = ({Core}: any) => ({
    onGetByAuthorAsync:(id:number)=>Core.onGetByAuthorAsync(id),
    onDeletePokemonAsync:(id:number)=>Core.onDeletePokemonAsync(id)
})

export default connect(mapSatateToProps, mapDispatchToProps)(ListPage)