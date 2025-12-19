"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import TopMenuOverlay from "@/components/TopMenuOverlay";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";

export interface PrixAliment {
  nom: string;
  prixParRegion: Record<string, number>;
  dernierReleveIso?: string;
  image?: string;
}

export interface CategorieAliment {
  nom: string;
  aliments: PrixAliment[];
}

interface ItemClientProps {
  regions: string[];
  categoriesDataSeed: CategorieAliment[];
}

export default function ItemClient({ regions, categoriesDataSeed }: ItemClientProps) {
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
  }, [nomParam, imageParam, categoriesDataSeed]);

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
