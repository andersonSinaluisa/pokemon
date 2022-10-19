import React, { MouseEventHandler, useState } from "react";
import ListPage from "../containers/core/list-container";
import CreatePage from "../containers/core/create-container";
import EditPage from "../containers/core/edit-container";
import { GetByAuthorResponse } from "infrastructure/api/core";
import { OpenContextProvider, useOpen } from "application/common/context";

const CrudPage = () => {
  const [visibleState, setVisible] = useState({
    visible:false,
    type:'all'
  });

  const {type,update,visible} = useOpen()
  const [dataEdit, setDataEdit] = useState<GetByAuthorResponse>({
    attack: 0,
    defense: 0,
    hp: 0,
    id: 0,
    id_author: 0,
    image: "",
    name: "",
    type: "",
  });

  const handleButton = (e: MouseEventHandler<HTMLButtonElement>) => {

    setVisible({
      type:'create',
      visible:true
    })
  };

  const handleEdit = (item: any) => {
    setDataEdit(item);
    setVisible({
      type:'update',
      visible:true
    })

  };

  return (
    <OpenContextProvider value={{...visibleState,update:setVisible}}>
      <div>
        <ListPage buttonAction={handleButton} onEdit={handleEdit} />
        <div>
          <CreatePage />
          <EditPage dataEdit={dataEdit}></EditPage>
        </div>
      </div>
    </OpenContextProvider>
  );
};

export default CrudPage;
