"use client";

import Link from "next/link";
import SmartText from "./SmartText";

const TopMenuOverlay = () => {
  return (
    <div
      className="
      hidden md:block
        fixed top-0 left-1/2 -translate-x-1/2
        mt-6 px-4
        pointer-events-none /* par défaut, évite d'empêcher scroll */
        z-[1200] /* plus haut que l'image */
        w-auto
      "
    >
      {/* On active pointer-events uniquement pour les liens */}
      <div className="flex gap-12 font-semibold text-base pointer-events-auto">
        <Link href="/"><SmartText text="Acceuil" /></Link>
        <Link href="/prevision"><SmartText text="Prevision" /></Link>
        <Link href="/marches"><SmartText text="Marchés" /></Link>
        <Link href="/prix"><SmartText text="Prix" /></Link>
        <Link href="/contact"><SmartText text="Contact" /></Link>
      </div>
    </div>
  );
};

export default TopMenuOverlay;
