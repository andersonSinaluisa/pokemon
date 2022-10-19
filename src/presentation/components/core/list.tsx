import React, { useEffect, useState } from "react";
import { ListPageProps } from "presentation/containers/core/list-container";
import { GetByAuthorResponse } from "infrastructure/api/core";
import DataTable, {
  ColumnsDataTable,
  ActionDataTable,
} from "infrastructure/components/datatable";
import "./list.css";
import { ID_AUTHOR } from "application/common";

const ListPage = (props: ListPageProps) => {
  const [list, setList] = useState<GetByAuthorResponse[]>([]);


  useEffect(()=>{
    if(props.DeletePokemon.status===200){
      props.onGetByAuthorAsync(ID_AUTHOR);

    }
  },[props.DeletePokemon])

  useEffect(() => {
    props.onGetByAuthorAsync(ID_AUTHOR);
  }, []);
  useEffect(() => {
    setList(props.List);
  }, [props.List]);

  const columns: ColumnsDataTable[] = [
    {
      label: "Nombre",
      name: "name",
      type: "text",
    },
    {
      label: "Imagen",
      name: "image",
      type: "avatar",
    },
    {
      label: "Ataque",
      name: "attack",
      type: "text",
    },
    {
      label: "Defensa",
      name: "defense",
      type: "text",
    },
  ];

  const actions: ActionDataTable[] = [
    {
      color: "primary",
      icon: "fa-solid fa-pen-to-square",
      label: "Editar",
      name: "edit",
      onClick: (item:any) => {
        props.onEdit(item)
      },
    },
    {
      color: "primary",
      icon: "fa-sharp fa-solid fa-trash",
      label: "Eliminar",
      name: "delete",
      onClick: (item:any) => {
        props.onDeletePokemonAsync(item.id)
      },
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="header">
        <h4>Listado de pokemon</h4>
      </div>
      <DataTable
        columns={columns}
        dataLimit={10}
        dataTable={list}
        pageLimit={5}
        actions={actions}
        buttonAction={props.buttonAction}
      />
    </div>
  );
};

export default ListPage;
