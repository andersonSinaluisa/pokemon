import React, { useEffect, useState } from "react";
import * as Globals from '../../application/common'
import Button from "./button";
import './datatable.css'
import Icon from "./icon";
import Input from "./input";

export interface ColumnsDataTable{
 
    name: string;
    label: string;
    type: 'date' | 'boolean' | 'avatar' | 'array' | 'text' | 'object',
    field_show?: string;

}

export interface ActionDataTable{
    name: string;
    label: string;
    icon: string;
    color: string;
    onClick: Function;
}

export interface DataTableProps {
  dataTable: Array<Object>;
  dataLimit: number;
  pageLimit: number;
  columns: ColumnsDataTable[];
  actions?:ActionDataTable[]
  buttonAction?:React.MouseEventHandler<HTMLButtonElement>;

}




/** @module Components/Datatable */
/**
 * Una función que devuelve una tabla con paginación, búsqueda y acciones.
 * @param {array} dataTable - Array de datos para la tabla.
 * @param {ino} dataLimit - Límite de datos por página.
 * @param {int} pageLimit - Número de páginas.
 * @param {array} columns - Array de columnas de la tabla.
 * @param {array} actions - Array de acciones de la tabla.
 * @return {object} Un componente que representa una tabla.
 * @example
 * <DataTable
 *      dataTable={[
 *                  {id:1,name:"Juan",lastname:"Perez",age:30},
 *                  {id:2,name:"Juan",lastname:"Perez",age:30}
 *                ]}
 *      dataLimit={10}
 *      pageLimit={5}
 *      columns={[
 *                {label:"ID",name:"id"},
 *                {label:"Nombre",name:"name"},
 *                {label:"Apellido",name:"lastname"},
 *                {label:"Edad",name:"age"}
 *             ]}
 *      actions={[
 *                  {label:"Editar",name:"edit",icon:"bx bx-edit",color:"primary",onClick:()=>{}},
 *                  {label:"Eliminar",name:"delete",icon:"bx bx-trash",color:"danger",onClick:()=>{}}
 *              ]}
 *      />
 */
const DataTable = (props: DataTableProps) => {
  const { actions, columns, dataLimit, dataTable, pageLimit } = props;
  const [data_table, setDataTable] = useState<Array<Object>>([]);
  const [pages] = useState(Math.round(data_table.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    } else {
      setCurrentPage(pages);
    }
  }

  function changePage(event: React.MouseEvent) {
    const target: HTMLLIElement = event.target as HTMLLIElement;
    const pageNumber = Number(target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data_table.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill("").map((_, idx) => start + idx + 1);
  };

  useEffect(() => {
    setDataTable(dataTable);
    //converto to array
    if (typeof dataTable === "object") {
      setDataTable(Object.values(dataTable));
    }
  }, [dataTable]);

  const onSearch = (event: React.ChangeEvent) => {
    const target: EventTarget & HTMLInputElement = event.target as EventTarget & HTMLInputElement;
    const search = target.value;
    if (search === "") {
      setDataTable(dataTable);
      return;
    }
    const filteredData = dataTable.filter((item) =>
      Object.values(item).some((value) => value.toString().includes(search))
    );

    setDataTable(filteredData);
  };

  return (
    <div className="table-responsive">
     
      <div className="">
      <nav aria-label="d-flex position-relative header-table">
        {/* search input*/}
        <div className="d-flex">
          <div className="search-box">
            <Input
              type="text"
              className="input-control"
              id="search"
              name="search"
              placeholder="Buscar..."
              onChange={onSearch}
            />
          </div>
          {props.buttonAction && <div className="form-group">
              <Button className="btn btn-primary" onClick={props.buttonAction}><i className="fa-solid fa-plus"></i>{"Nuevo"}</Button>
          </div>}
        </div>
      </nav>
        <table className="table table-bordered" id="table">
          <thead>
            <tr>
              {/*columns with sortable*/}
              {columns.map((column) => (
                <th key={column.name}>{column.label}</th>
              ))}
              {actions ? <th>Acciones</th> : null}
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((item: any, index) => (
              <tr key={index}>
                {columns.map((column, index) => (
                  <td key={index}>
                    {column.type === "date" ? (
                      new Date(item[column.name]).toLocaleDateString()
                    ) : column.type === "boolean" ? (
                      item[column.name] ? (
                        "Si"
                      ) : (
                        "No"
                      )
                    ) : column.type === "avatar" ? (
                      item[column.name] ?
                        <img
                          src={item[column.name]}
                          alt="avatar"
                          width="50"
                          height="50"
                        /> :
                        <img
                          src={window.location.origin + "/base/app-assets/images/profile/no_perfil.png"}
                          alt="avatar"
                          width="50"
                          height="50"
                        />
                    ) : column.type === "array" ? (
                      item[column.name].map((item: any, index: number) => (
                        <>
                          <span
                            key={index}
                            className=""
                          >
                            {column.field_show ? item[column.field_show] : JSON.stringify(item)}
                          </span>
                          <br />
                        </>
                      ))
                    ) : column.type === "text" ? (
                      item[column.name]
                    ) : column.type === "object" ? (

                      JSON.stringify(item[column.name]) !== '{}' && column.field_show &&
                        item[column.name][column.field_show]
                    ) : (
                      item[column.name]
                    )}
                  </td>
                ))}
                {actions ?
                  <td key={index} className="actions-table">
                    {actions.map((action, index) => (
                      <a  href="#" onClick={() => action.onClick(item)} className="mt-2" data-popup="tooltip" title={action.label} data-trigger="manual">
                        <Icon
                          color={action.color} icon={action.icon}
                        ></Icon>
                      </a>
                    ))}
                  </td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-md-6">
        {getPaginatedData().length + " de " + data_table.length}
      </div>

      <ul className="pagination pagination-lg col-12 justify-content-end">
        {/* show page numbers */}
        <li
          className={`page-item ${currentPage === 1 ? "active" : ""} `}
          onClick={goToPreviousPage}
        >
          <button className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {getPaginationGroup().map((item, index) => (
          <li
            onClick={changePage}
            className={`page-item ${currentPage === item ? "active" : ""} `}
            key={index}
          >
            <span className="page-link">{item}</span>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === pages ? "active" : ""} `}
          onClick={goToNextPage}
        >
          <button className="page-link"  aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DataTable;
