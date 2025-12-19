import { Suspense } from "react";
import NavBar from "@/components/NavBar";
import TopMenuOverlay from "@/components/TopMenuOverlay";
import Footer from "@/components/Footer";
import ItemClient from "./ItemClient";

export default function ItemPage() {
  return (
    <>
      <NavBar />
      <TopMenuOverlay />

      <Suspense fallback={
        <div className="pt-40 text-center text-xl font-semibold text-gray-700">
          Chargement du produit...
        </div>
      }>
        <ItemClient />
      </Suspense>

      <Footer />
    </>
  );
}
