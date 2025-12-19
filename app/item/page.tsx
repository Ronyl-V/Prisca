"use client";

import ItemClient, { CategorieAliment } from "./ItemClient";

// CONSTANTES
const regions = [
  "Centre","Littoral","Ouest","Nord","Adamaoua",
  "Nord-Ouest","Sud-Ouest","Est","Sud","Extrême-Nord"
];

const categoriesDataSeed: CategorieAliment[] = [
  {
    nom: "Céréales",
    aliments: [
      { nom: "Maïs", prixParRegion: { Centre:800, Littoral:820, Ouest:780, Nord:900, Adamaoua:760, "Nord-Ouest":790, "Sud-Ouest":810, Est:770, Sud:800, "Extrême-Nord":850 }, image:"/produits/mais.jpg" },
      { nom: "Riz", prixParRegion: { Centre:900, Littoral:920, Ouest:880, Nord:950, Adamaoua:890, "Nord-Ouest":910, "Sud-Ouest":930, Est:870, Sud:900, "Extrême-Nord":940 }, image:"/produits/riz.jpg" },
      { nom: "Blé", prixParRegion: { Centre:850, Littoral:870, Ouest:830, Nord:880, Adamaoua:840, "Nord-Ouest":860, "Sud-Ouest":880, Est:820, Sud:850, "Extrême-Nord":870 }, image:"/produits/ble.jpg" },
    ]
  },
  {
    nom: "Tubercules",
    aliments: [
      { nom: "Patate Douce", prixParRegion: { Centre:550, Littoral:580, Ouest:530, Nord:600, Adamaoua:520, "Nord-Ouest":540, "Sud-Ouest":560, Est:510, Sud:550, "Extrême-Nord":580 }, image:"/produits/patate.jpg" },
      { nom: "Manioc", prixParRegion: { Centre:2100, Littoral:2200, Ouest:2000, Nord:2400, Adamaoua:1950, "Nord-Ouest":2050, "Sud-Ouest":2150, Est:1900, Sud:2100, "Extrême-Nord":2300 }, image:"/produits/manioc.jpg" },
      { nom: "Pommes de terre", prixParRegion: { Centre:1050, Littoral:1080, Ouest:1020, Nord:1100, Adamaoua:1000, "Nord-Ouest":1030, "Sud-Ouest":1060, Est:980, Sud:1050, "Extrême-Nord":1080 }, image:"/produits/pommes.jpg" },
    ]
  },
  {
    nom: "Fruits",
    aliments: [
      { nom: "Ananas", prixParRegion: { Centre:500, Littoral:520, Ouest:480, Nord:550, Adamaoua:470, "Nord-Ouest":490, "Sud-Ouest":510, Est:460, Sud:500, "Extrême-Nord":530 }, image:"/produits/ananas.jpg" },
      { nom: "Pasteque", prixParRegion: { Centre:500, Littoral:520, Ouest:480, Nord:550, Adamaoua:470, "Nord-Ouest":490, "Sud-Ouest":510, Est:460, Sud:500, "Extrême-Nord":530 }, image:"/produits/pasteque.jpg" },
      { nom: "Papaye", prixParRegion: { Centre:500, Littoral:520, Ouest:480, Nord:550, Adamaoua:470, "Nord-Ouest":490, "Sud-Ouest":510, Est:460, Sud:500, "Extrême-Nord":530 }, image:"/produits/papaye.jpg" },
    ]
  },
  {
    nom: "Viandes et Poissons",
    aliments: [
      { nom: "Bœuf", prixParRegion: { Centre:3200, Littoral:3300, Ouest:3100, Nord:3500, Adamaoua:3000, "Nord-Ouest":3150, "Sud-Ouest":3250, Est:2950, Sud:3200, "Extrême-Nord":3450 }, image:"/produits/boeuf.jpg" },
      { nom: "Porc", prixParRegion: { Centre:3000, Littoral:3100, Ouest:2900, Nord:3300, Adamaoua:2800, "Nord-Ouest":2950, "Sud-Ouest":3050, Est:2750, Sud:3000, "Extrême-Nord":3250 }, image:"/produits/porc.jpg" },
      { nom: "Poisson", prixParRegion: { Centre:1600, Littoral:1650, Ouest:1550, Nord:1700, Adamaoua:1500, "Nord-Ouest":1580, "Sud-Ouest":1620, Est:1480, Sud:1600, "Extrême-Nord":1680 }, image:"/produits/poisson.jpg" },
    ]
  },
];

export default function ItemPage() {
  return <ItemClient regions={regions} categoriesDataSeed={categoriesDataSeed} />;
}
