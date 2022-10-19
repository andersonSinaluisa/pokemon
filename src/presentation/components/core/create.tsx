import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "infrastructure/components/card";
import Col from "infrastructure/components/col";
import Input from "infrastructure/components/input";
import Row from "infrastructure/components/row";
import Range from "infrastructure/components/range";
import "./create.css";
import Button from "infrastructure/components/button";
import { CreatePageProps } from "presentation/containers/core/create-container";
import { CreateRequest } from "infrastructure/api/core";
import { ID_AUTHOR } from "application/common";
import { useOpen } from "application/common/context";



const CreatePage = (props:CreatePageProps) => {


  const {visible,type,update} = useOpen();

  const [visibleState,setVisibleState] = useState(false);

  const init ={
    attack:0,
    defense:0,
    hp:0,
    idAuthor:ID_AUTHOR,
    image:"",
    name:"",
    type:""
  }
  const [data,setData] = useState<CreateRequest>(init)

  const [disabled,setDisabled] = useState(true);


  useEffect(()=>{
    if(type==='create'){
      setVisibleState(visible)
    }else{
      setVisibleState(false)
    }
  },[type,visible])


  useEffect(()=>{
    if(props.CreatePokemon.status===200){
      props.onGetByAuthorAsync(ID_AUTHOR)
    }
  },[props.CreatePokemon])



  useEffect(()=>{
    if(data.name!=='' && data.image!=="" && data.type!==""){
      setDisabled(false)
    }else{
      setDisabled(true)

    }

  },[data])

  const handleChange = (event:ChangeEvent<HTMLInputElement>)=>{
    
    
    setData({
      ...data,
      [event.target.name]:event.target.value
      
    })

   
  }


  const handleSubmit = ()=>{
    props.onCreatePokemonAsync(data)
    setData(init)
  }

  const handleClose = ()=>{
    update({
      visible:false,
      type:'create'
    })
  }

  return (
    <div className={`content-wrapper ${visibleState?"visible":"gone"}`}>
      <Card>
        <CardHeader>{"Nuevo Pokemon"}</CardHeader>
        <CardContent className="content-create-card item-create-card">
          <Row className="row-create-card">
            <Col size="6">
              <Input
                type="text"
                className=""
                onChange={handleChange}
                id="name"
                name="name"
                label="Nombre"
              />
            </Col>
            <Col size="6">
              <Range id="attack" min="0" max="100" name="attack"   label="Ataque" onChange={handleChange}></Range>
            </Col>
          </Row>

          <Row className="row-create-card">
          <Col size="6">
              <Input
                type="text"
                className=""
                onChange={handleChange}
                id="name"
                name="type"
                label="Tipo"
              />
            </Col>
            <Col size="6">
              <Input
                type="text"
                className=""
                onChange={handleChange}
                id="name"
                name="image"
                label="Imagen"
              />
            </Col>
            <Col size="6">
              <Range id="defense" min="0" max="100" label="Defensa" name="defense"  onChange={handleChange}></Range>
            </Col>
          </Row>
        </CardContent>
        <CardActions>
          <Button className="btn btn-primary" onClick={handleSubmit} disabled={disabled}>
            <i className="fa-solid fa-floppy-disk"></i> Guardar
          </Button>
          <Button className="btn btn-primary" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i> Cancelar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CreatePage;
