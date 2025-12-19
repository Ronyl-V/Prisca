"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavIcons from "@/components/NavIcons";
import Link from "next/link";
import MobileAppSection from "@/components/MobileAppSection";
import Welcome from "@/components/Welcome";
import NavBar from "@/components/NavBar";
import TopMenuOverlay from "@/components/TopMenuOverlay";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <>
<div className="relative w-screen flex flex-col bg-black">
  <NavBar />
  <TopMenuOverlay />

  <div className="flex flex-col lg:flex-row flex-1 pl-6 lg:pl-20 pr-6 lg:pr-10 items-start lg:items-center gap-10 lg:gap-x-20 relative
                  lg:min-h-screen
                  pt-24 sm:pt-28 md:pt-32 lg:pt-0 sm:pb-20 lg:pb-0">

    {/* Texte à gauche */}
    <div className="w-full lg:w-1/2 flex flex-col text-white">
      <p className="text-3xl sm:text-4xl lg:text-[40px] leading-tight font-extrabold">
        Bienvenue sur <span className="text-red-400">Prisca</span> —<br />
        L’intelligence des marchés au Cameroun, à portée de main{" "}
        <span className="text-gray-400 block mt-2 text-lg sm:text-xl lg:text-2xl font-semibold">
          Suivez les prix des aliments sur les marchés nationaux avec clarté et précision.
        </span>
      </p>
      <Link href="/register" className="w-10">
        <Button className="animate-pulseGrow mt-6 lg:mt-10 bg-white text-black px-6 lg:px-8 py-3 text-lg font-semibold flex items-center gap-3 shadow-lg cursor-pointer hover:bg-red-400 hover:text-white transition-colors duration-300">
          Get Started
          <ArrowRight size={20} />
        </Button>
      </Link>
    </div>

    {/* Image à droite: disparait sur tablette et mobile */}
    <div id="hero-image" className="hidden lg:block w-full lg:w-1/2 relative h-screen z-[200]">
      <Image
        src="/03.jpg"
        alt="Image01"
        fill
        className="object-cover"
      />
    </div>
  </div>
</div>


  <NavIcons />

    {/*About */}
      <section id="about" className="py-30 bg-slate-50">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Côté gauche - Images */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="/07.jpg" 
                alt="Marché local" 
                className="rounded-lg w-full h-48 object-cover"
              />
              <img 
                src="/04.jpg" 
                alt="Vente de produits alimentaires" 
                className="rounded-lg w-full h-60 object-cover"
              />
            </div>
            <div className="mt-8">
              <img 
                src="/08.jpg" 
                alt="Farine et Cereales" 
                className="rounded-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Côté droit - Contenu */}
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-red-500 font-medium italic">À propos de Prisca</p>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Prisca – Votre guide des prix alimentaires et marchés au Cameroun
            </h3>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Prisca vous connecte instantanément aux informations les plus récentes sur les prix des produits alimentaires à travers les marchés du Cameroun.
            Notre mission est simple : vous donner les moyens de prendre des décisions éclairées grâce à des données fiables et à jour. Que vous soyez producteur,
            commerçant ou consommateur, Prisca rend l’accès aux informations du marché simple et rapide.
          </p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-gray-700 w-5 h-5" />
              <span className="text-gray-700">Suivi en temps réel des prix sur les marchés nationaux</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-gray-700 w-5 h-5" />
              <span className="text-gray-700">Données fiables et vérifiées pour chaque produit</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-gray-700 w-5 h-5" />
              <span className="text-gray-700">Accès rapide et pratique depuis votre smartphone ou ordinateur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <Welcome />

    {/* Subscribe */}
<div className="bg-[#0f0f0f] w-screen py-10 px-4 flex flex-col md:flex-row items-center justify-center gap-10">
  {/* Text & Button */}
    <div className="text-white max-w-md text-center md:text-left py-2">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Restez informé avec <span className="text-red-400">Prisca</span>
    </h2>
    <p className="text-gray-300 mb-6">
      Abonnez-vous à notre newsletter pour recevoir les dernières informations sur les prix des produits alimentaires,
      les tendances du marché et les alertes personnalisées.
    </p>
    <form className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        placeholder="Entrez votre email"
        className="px-4 py-3 rounded-md bg-white text-black w-full sm:w-auto flex-grow focus:outline-none"
      />
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold cursor-pointer"
      >
        S'abonner
      </button>
    </form>
  </div>

  {/* Image */}
  <Image
    src="/06.jpg"
    alt="subscribe"
    width={300}
    height={300}
    className="rounded-lg shadow-lg ml-30"
  />
</div>

<MobileAppSection />

<Footer />
   </>
  );
};

export default HomePage;
