"use client";

import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import NavBar from "@/components/NavBar";
import TopMenuOverlay from "@/components/TopMenuOverlay";
import Footer from "@/components/Footer";

/* ----------------------------- Types ----------------------------- */
type Product = {
  id: string;
  name: string;
  unit: string;
};

type Market = {
  id: string;
  name: string;
  region?: string;
  prices: Record<string, number>;
};

/* ------------------------ Sample data ------------------------ */
const SAMPLE_PRODUCTS: Product[] = [
  { id: "rice", name: "Riz (kg)", unit: "kg" },
  { id: "maize", name: "Maïs (kg)", unit: "kg" },
  { id: "patate", name: "Patate Douce (kg)", unit: "kg" },
  { id: "manioc", name: "Manioc (kg)", unit: "kg" }
];

const SAMPLE_MARKETS: Market[] = [
  { id: "mokolo", name: "Marché Mokolo", region: "Centre", prices: { rice: 1200, maize: 600, patate: 700, manioc: 2300 }},
  { id: "akwa", name: "Marché Akwa", region: "Littoral", prices: { rice: 1100, maize: 500, patate: 650, manioc: 2200 }},
  { id: "bafoussam", name: "Marché Bafoussam", region: "Ouest", prices: { rice: 1000, maize: 500, patate: 500, manioc: 1900 }},
  { id: "bamenda", name: "Marché Bamenda", region: "Nord-Ouest", prices: { rice: 1150, maize: 550, patate: 600, manioc: 2000 }},
  { id: "garoua", name: "Marché Garoua", region: "Nord", prices: { rice: 1100, maize: 1100, patate: 500, manioc: 1950 }}
];

/* ----------------------------- Helpers ----------------------------- */
const currency = (n: number) => `${n.toLocaleString("fr-FR")} FCFA`;

function computeArbitrages(markets: Market[], productId: string) {
  const res: any[] = [];
  markets.forEach((buy) => {
    markets.forEach((sell) => {
      if (buy.id === sell.id) return;
      const diff = sell.prices[productId] - buy.prices[productId];
      if (diff > 0) {
        res.push({
          buy,
          sell,
          diff,
          percent: (diff / buy.prices[productId]) * 100
        });
      }
    });
  });
  return res.sort((a, b) => b.diff - a.diff);
}

/* ----------------------------- Page ----------------------------- */
export default function ArbitragePage() {
  const [selectedProduct, setSelectedProduct] = useState("rice");
  const [quantity, setQuantity] = useState(100);

  const arbitrages = useMemo(
    () => computeArbitrages(SAMPLE_MARKETS, selectedProduct),
    [selectedProduct]
  );

  const best = arbitrages[0];

  return (
    <>
      <NavBar />
      <TopMenuOverlay />

      <div className="max-w-6xl mx-auto mt-20 p-6 space-y-6">
        {/* Controls */}
        <div className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="bg-gray-100 rounded-lg p-2 ring-0 border border-gray-300"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            {SAMPLE_PRODUCTS.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
            className="bg-gray-100 rounded-lg p-2 ring-0 border border-gray-300"
            placeholder="Quantité"
          />
        </div>

        {/* Best arbitrage */}
        {best && (
          <div className="bg-green-50 border border-green-200 p-4 rounded">
            <h2 className="font-semibold text-lg">Meilleure opportunité</h2>
            <p>
              Acheter à <strong>{best.buy.name}</strong> → Vendre à{" "}
              <strong>{best.sell.name}</strong>
            </p>
            <p className="mt-1">
              Gain / unité : <strong>{currency(best.diff)}</strong> •
              Gain total :{" "}
              <strong>{currency(best.diff * quantity)}</strong>
            </p>
          </div>
        )}

        {/* Carte logique */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium mb-3">
            Carte logique des marchés 
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {arbitrages.map((a, i) => (
              <div key={i} className="bg-slate-50 rounded-sm p-2 ring-0 border border-gray-300 p-3">
                <div className="font-medium">
                  {a.buy.region} → {a.sell.region}
                </div>
                <div className="text-sm text-slate-600">
                  {a.buy.name} → {a.sell.name}
                </div>
                <div className="mt-1 text-green-700">
                  + {currency(a.diff)} ({a.percent.toFixed(1)}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
       <Footer />
    </>
  );
}
