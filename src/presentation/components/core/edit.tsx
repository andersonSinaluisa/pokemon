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
import { EditPageProps } from "presentation/containers/core/edit-container";
import { CreateRequest, EditRequest } from "infrastructure/api/core";
import { ID_AUTHOR } from "application/common";
import { useOpen } from "application/common/context";

const EditPage = (props:EditPageProps) => {


  const {visible,type,update} = useOpen()

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
  const [data,setData] = useState<EditRequest>(init)

  const [disabled,setDisabled] = useState(true);


  useEffect(()=>{
    if(type==='update'){
      setVisibleState(visible)
    }else{
      setVisibleState(false)

    }
  },[type,visible])


  useEffect(()=>{
    if(props.EditPokemon.status===200){
      props.onGetByAuthorAsync(ID_AUTHOR)
    }
  },[props.EditPokemon])


  useEffect(()=>{
   if(props.dataEdit){
     setData({
       ...props.dataEdit,
       idAuthor:props.dataEdit.id_author
     })
   }else{
    setVisibleState(false)
   }
  },[props.dataEdit])


  useEffect(()=>{
    if(data.name!=='' && data.image!=="" && data.type!==""){
      setDisabled(false)
    }else{
      setDisabled(true)

    }

  },[data])

  const handleChange = (event:ChangeEvent<HTMLInputElement>)=>{
    let value:any = event.target.value
    if(event.target.name==='attack' || event.target.name==='defense' || event.target.name==='hp' ){
      value = parseInt(value as string);
    }
    
    setData({
      ...data,
      [event.target.name]:value
      
    })

   
  }


  const handleSubmit = ()=>{
    props.onEditPokemonAsync({
      body:data,
      id:props.dataEdit.id
    })
    setData(init)
    update({
      visible:false,
      type:'update',
    })
  }

  const handleClose = ()=>{
    update({
      visible:false,
      type:'update',
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
                value={data.name}
              />
            </Col>
            <Col size="6">
              <Range id="attack" min="0" max="100" name="attack" value={data.attack+""}   label="Ataque" onChange={handleChange}></Range>
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
                value={data.type}
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
                value={data.image}
              />
            </Col>
            <Col size="6">
              <Range id="defense" min="0" max="100" label="Defensa" name="defense" value={data.defense+""}  onChange={handleChange}></Range>
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

export default EditPage;
