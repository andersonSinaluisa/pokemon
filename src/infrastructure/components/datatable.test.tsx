import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DataTable, { DataTableProps } from "./datatable";
import userEvent from "@testing-library/user-event";

describe("<DataTable/>", () => {
  const props: DataTableProps = {
    columns: [
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
    ],
    dataTable: [
      {
        id: 4446,
        name: "Vamo a calmarno25452",
        image:
          "https://img2.freepng.es/20190628/fyp/kisspng-squirtle-wartortle-coloring-book-charmander-drawin-tiny-turtle-pokemon-squirtle-hides-in-its-shell-fo-5d15bfd5c87127.941642801561706453821.jpg",
        attack: 19,
        defense: 21,
        hp: 100,
        type: "Fuego",
        id_author: 1,
      },
      {
        id: 4447,
        name: "Venasaur",
        image:
          "https://w7.pngwing.com/pngs/800/234/png-transparent-venusaur-pokemon-go-ivysaur-pokedex-pokemon-go-flower-fictional-character-pokemon-thumbnail.png",
        attack: 70,
        defense: 74,
        hp: 700,
        type: "Grass",
        id_author: 1,
      },
      {
        id: 4449,
        name: "Feraligatr( asasa)",
        image: "https://urpgstatic.com/images/pokemon-home.png",
        attack: 0,
        defense: 39,
        hp: 10,
        type: "pokemon",
        id_author: 1,
      },
      {
        id: 4452,
        name: "Pikachu.exe",
        image: "https://i.ytimg.com/vi/2_vCE1kodyE/maxresdefault.jpg",
        attack: 100,
        defense: 67,
        hp: 100,
        type: "Fuego",
        id_author: 1,
      },
      {
        id: 4456,
        name: "Hoa",
        image:
          "https://production.listennotes.com/podcasts/el-podcast-m%C3%A1s-random-del-mundo-L6I3Ep9lRTB-xB_PCg0EDch.1400x1400.jpg",
        attack: 47,
        defense: 18,
        hp: 0,
        type: "Fuego",
        id_author: 1,
      },
    ],
    dataLimit: 10,
    pageLimit: 2,
    actions: [],
  };
  beforeEach(()=>{
   render(<DataTable {...props} />);

  })

  test("Renderiza la tabla", () => {
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument();
  });
  test("Prueba el buscador", () => {
    const input = screen.getByPlaceholderText("Buscar...");
    input.focus()
    userEvent.keyboard("Fuego");

    expect(input).toHaveValue('Fuego')

  });
});
