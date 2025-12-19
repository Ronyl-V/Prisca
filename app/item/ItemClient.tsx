"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

/* TYPES */
interface PrixAliment {
  nom: string;
  prixParRegion: Record<string, number>;
  dernierReleveIso?: string;
  image?: string;
}

interface CategorieAliment {
  nom: string;
  aliments: PrixAliment[];
}

/* REGIONS */
const regions = [
  "Centre","Littoral","Ouest","Nord","Adamaoua",
  "Nord-Ouest","Sud-Ouest","Est","Sud","Extrême-Nord"
];

/* DATA (inchangé) */
const categoriesDataSeed: CategorieAliment[] = [
  // 👉 Garde exactement ton seed actuel ici
];

export default function ItemClient() {
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
    return <div className="pt-40 text-center text-xl">Chargement...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-24 px-4 md:px-16 space-y-12">
      {/* 👉 TOUT ton JSX actuel ici (cards, regions, nutrition, etc.) */}
    </main>
  );
}
