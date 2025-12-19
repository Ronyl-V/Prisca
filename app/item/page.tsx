"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import TopMenuOverlay from "@/components/TopMenuOverlay";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";

/* TYPES */
interface PrixAliment {
  nom: string;
  prixParRegion: Record<string, number>;
  dernierReleveIso?: string;
  image?: string;
}

/* REGIONS */
const regions = [
  "Centre","Littoral","Ouest","Nord","Adamaoua",
  "Nord-Ouest","Sud-Ouest","Est","Sud","Extrême-Nord"
];

/* DATA */
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

interface CategorieAliment {
  nom: string;
  aliments: PrixAliment[];
}

/* COMPONENT */
export default function ItemPage() {
  const params = useSearchParams();
  const nomParam = params.get("nom");
  const imageParam = params.get("image");

  const [regionActive, setRegionActive] = useState(regions[0]);
  const [alimentActif, setAlimentActif] = useState<PrixAliment | null>(null);

  useEffect(() => {
    if (!nomParam) return;

    const alimentTrouve = categoriesDataSeed
      .flatMap(c => c.aliments)
      .find(a => a.nom.toLowerCase() === nomParam.toLowerCase());

    if (!alimentTrouve) return;

    setAlimentActif({
      ...alimentTrouve,
      image: imageParam || alimentTrouve.image,
      dernierReleveIso: new Date().toLocaleString(),
    });
  }, [nomParam, imageParam]);

  if (!alimentActif) {
    return <div className="pt-40 text-center text-xl font-semibold text-gray-700">Chargement...</div>;
  }

  return (
    <>
      <NavBar />
      <TopMenuOverlay />

      <main className="min-h-screen bg-gray-50 pt-28 pb-24 px-4 md:px-16 space-y-12">

        {/* CARD IMAGE + INFO */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-2xl transition-shadow duration-300">
          <div className="relative w-full md:w-1/3 h-64 md:h-64 overflow-hidden rounded-lg group">
            <Image
              src={alimentActif.image || ""}
              alt={alimentActif.nom}
              fill
              className="object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">{alimentActif.nom}</h2>
              <p className="text-gray-500 mt-2">Dernier relevé : {alimentActif.dernierReleveIso}</p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-3xl font-extrabold text-red-600">{alimentActif.prixParRegion[regionActive]} FCFA / kg</span>
              <select
                value={regionActive}
                onChange={e => setRegionActive(e.target.value)}
                className="bg-gray-100 rounded-lg p-2 ring-0 border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* PRIX PAR REGION */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Prix par région</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(alimentActif.prixParRegion).map(([region, prix]) => (
              <div key={region} className="p-3 bg-gray-100 rounded-lg text-center">
                <p className="font-medium">{region}</p>
                <p className="font-bold text-red-600">{prix} FCFA</p>
              </div>
            ))}
          </div>
        </div>

        {/* INFO NUTRITIONNELLE */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Informations nutritionnelles (pour 100g)</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Calories : 120 kcal</li>
            <li>Protéines : 2.5 g</li>
            <li>Glucides : 27 g</li>
            <li>Fibres : 2 g</li>
            <li>Graisses : 0.5 g</li>
          </ul>
        </div>

        {/* ALIMENTS SIMILAIRES */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Aliments similaires</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categoriesDataSeed
              .flatMap(c => c.aliments)
              .filter(a => a.nom !== alimentActif.nom)
              .slice(0, 6)
              .map(a => (
                <div key={a.nom} className="p-2 bg-gray-50 rounded-lg flex flex-col items-center gap-2 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <p className="text-gray-800 font-medium">{a.nom}</p>
                  <p className="text-red-600 font-bold">{a.prixParRegion[regionActive]} FCFA</p>
                </div>
              ))}
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
