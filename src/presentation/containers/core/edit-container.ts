import { EditPokemonStateProps } from "application/models/core";
import { EditRequest, GetByAuthorResponse } from "infrastructure/api/core";
import { connect } from "react-redux";
import EditPage from '../../components/core/edit'


export interface EditPageProps{
    EditPokemon:EditPokemonStateProps;
    onEditPokemonAsync:(props:{id:number,body:EditRequest})=>void;
    onGetByAuthorAsync:(id:number)=>void;
    dataEdit:GetByAuthorResponse;
}


const mapSatateToProps = ({ Core }: any, ownProps: any) => ({
    EditPokemon:Core.EditPokemon,
    visible:ownProps.visible,
    dataEdit:ownProps.dataEdit

})

const mapDispatchToProps = ({Core}: any) => ({
    onEditPokemonAsync:(props:{id:number,body:EditRequest})=>Core.onEditPokemonAsync(props),
    onGetByAuthorAsync:(id:number)=>Core.onGetByAuthorAsync(id)
})

export default connect(mapSatateToProps, mapDispatchToProps)(EditPage)