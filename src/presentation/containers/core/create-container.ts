import { connect } from "react-redux";
import CreatePage from "presentation/components/core/create";
import { CreateRequest } from "infrastructure/api/core";
import { CreatePokemonStateProps } from "application/models/core";


export interface CreatePageProps{
    CreatePokemon:CreatePokemonStateProps;
    onCreatePokemonAsync:(props:CreateRequest)=>void;
    onGetByAuthorAsync:(id:number)=>void;
}

const mapSatateToProps = ({ Core }: any, ownProps: any) => ({
    CreatePokemon:Core.CreatePokemon,
    visible:ownProps.visible

})

const mapDispatchToProps = ({Core}: any) => ({
    onCreatePokemonAsync:(props:CreateRequest)=>Core.onCreatePokemonAsync(props),
    onGetByAuthorAsync:(id:number)=>Core.onGetByAuthorAsync(id)
})

export default connect(mapSatateToProps, mapDispatchToProps)(CreatePage)