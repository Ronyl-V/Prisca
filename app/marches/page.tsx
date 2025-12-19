"use client";

import React, { useMemo, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import TopMenuOverlay from "@/components/TopMenuOverlay";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Search, Filter } from "lucide-react";

/* ---------------------------
   Interfaces / Types
   --------------------------- */

interface PriceEntry {
  produit: string;
  prixKg: number; // en FCFA par kg
  date: string; // ISO
}

export interface Market {
  id: string;
  nom: string;
  region: string;
  adresse?: string;
  lat?: number;
  lng?: number;
  image?: string;
  description?: string;
  produits: PriceEntry[];
  note?: number; // 1..5
}

/* ---------------------------
   Mock Data (remplacer par API)
   --------------------------- */
const MOCK_MARKETS: Market[] = [
// Ten mock markets in Yaoundé with various products and prices
  {
    id: "m-yaounde-1",
    nom: "Marché Mokolo",
    region: "Yaoundé",
    adresse: "Mokolo, Yaoundé",
    image: "/Mokolo.png",
    description: "Grand marché central, producteurs locaux et grossistes.",
    lat: 3.8647,
    lng: 11.5217,
    produits: [
      { produit: "Maïs", prixKg: 700, date: new Date().toISOString() },
      { produit: "Tomate", prixKg: 400, date: new Date().toISOString() },
      { produit: "Riz", prixKg: 1200, date: new Date().toISOString() },
    ],
    note: 4.2,
  },
  {
    id: "m-yaounde-2",
    nom: "Marché Nsam",
    region: "Yaoundé",
    adresse: "Nsam, Yaoundé",
    image: "/nsam.jpeg",
    description: "Marché populaire pour fruits et légumes frais.",
    lat: 3.8771,
    lng: 11.5162,
    produits: [
      { produit: "Plantain", prixKg: 1000, date: new Date().toISOString() },
      { produit: "Mangue", prixKg: 500, date: new Date().toISOString() },
    ],
    note: 4.0,
  },
  {
    id: "m-yaounde-3",
    nom: "Marché Mvog-Mbi",
    region: "Yaoundé",
    adresse: "Mvog-Mbi, Yaoundé",
    image: "/mvog-mbi.webp",
    description: "Marché animé avec produits locaux et importés.",
    lat: 3.8575,
    lng: 11.5113,
    produits: [
      { produit: "Riz", prixKg: 1200, date: new Date().toISOString() },
      { produit: "Maïs", prixKg: 700, date: new Date().toISOString() },
    ],
    note: 4.3,
  },
  {
    id: "m-yaounde-4",
    nom: "Marché Elig-Essono",
    region: "Yaoundé",
    adresse: "Elig-Essono, Yaoundé",
    image: "/essono.webp",
    description: "Marché connu pour ses produits exotiques et frais.",
    lat: 3.8712,
    lng: 11.5245,
    produits: [
      { produit: "Patate", prixKg: 300, date: new Date().toISOString() },
      { produit: "Tomate", prixKg: 410, date: new Date().toISOString() },
    ],
    note: 4.1,
  },
  {
    id: "m-yaounde-5",
    nom: "Marché Etoudi",
    region: "Yaoundé",
    adresse: "Etoudi, Yaoundé",
    image: "/etoudi.jpg",
    description: "Marché régional très fréquenté, spécialisé en légumes.",
    lat: 3.8680,
    lng: 11.5155,
    produits: [
      { produit: "Riz", prixKg: 880, date: new Date().toISOString() },
      { produit: "Plantain", prixKg: 210, date: new Date().toISOString() },
    ],
    note: 4.4,
  },
  {
    id: "m-yaounde-6",
    nom: "Marché Nkolndongo",
    region: "Yaoundé",
    adresse: "Nkolndongo, Yaoundé",
    image: "/Nkolndongo.jpg",
    description: "Marché dynamique avec des produits frais quotidiens.",
    lat: 3.8735,
    lng: 11.5280,
    produits: [
      { produit: "Maïs", prixKg: 260, date: new Date().toISOString() },
      { produit: "Tomate", prixKg: 420, date: new Date().toISOString() },
    ],
    note: 4.2,
  },
  {
    id: "m-yaounde-7",
    nom: "Marché Central",
    region: "Yaoundé",
    adresse: "Centre-Ville, Yaoundé",
    image: "/Marché-Central.jpg",
    description: "Marché de proximité avec produits alimentaires variés.",
    lat: 3.8601,
    lng: 11.5190,
    produits: [
      { produit: "Riz", prixKg: 1200, date: new Date().toISOString() },
      { produit: "Plantain", prixKg: 1000, date: new Date().toISOString() },
    ],
    note: 4.0,
  },
  {
    id: "m-yaounde-8",
    nom: "Marché Essos",
    region: "Yaoundé",
    adresse: "Essos, Yaoundé",
    image: "/essos.jpg",
    description: "Grand marché urbain avec forte fréquentation quotidienne.",
    lat: 3.8672,
    lng: 11.5233,
    produits: [
      { produit: "Maïs", prixKg: 850, date: new Date().toISOString() },
      { produit: "Tomate", prixKg: 400, date: new Date().toISOString() },
    ],
    note: 4.3,
  },
  {
    id: "m-yaounde-9",
    nom: "Marché Biyem-Assi",
    region: "Yaoundé",
    adresse: "Biyem-Assi, Yaoundé",
    image: "/Biyem-Assi.jpg",
    description: "Marché élégant et bien organisé, produits de qualité.",
    lat: 3.8625,
    lng: 11.5125,
    produits: [
      { produit: "Riz", prixKg: 875, date: new Date().toISOString() },
      { produit: "Plantain", prixKg: 215, date: new Date().toISOString() },
    ],
    note: 4.5,
  },
  {
    id: "m-yaounde-10",
    nom: "Marché Oyom-Abang",
    region: "Yaoundé",
    adresse: "Oyom-Abang, Yaoundé",
    image: "/oyom.jpg",
    description: "Marché dynamique avec beaucoup de petits producteurs locaux.",
    lat: 3.8690,
    lng: 11.5180,
    produits: [
      { produit: "Maïs", prixKg: 265, date: new Date().toISOString() },
      { produit: "Tomate", prixKg: 415, date: new Date().toISOString() },
    ],
    note: 4.1,
  },

  // Ten mock markets in Douala with various products and prices
  {
    id: "m-douala-1",
    nom: "Marché Mboppi",
    region: "Douala",
    adresse: "Mboppi, Douala",
    image: "/Mboppi.jpg",
    description: "Marché central très fréquenté, nombreux grossistes et détaillants.",
    lat: 4.0483,
    lng: 9.7679,
    produits: [
      { produit: "Riz", prixKg: 920, date: new Date().toISOString() },
      { produit: "Maïs", prixKg: 500, date: new Date().toISOString() },
    ],
    note: 4.5,
  },
  {
    id: "m-douala-3",
    nom: "Marché New-Bell",
    region: "Douala",
    adresse: "New-Bell, Douala",
    image: "/newbell.jpeg",
    description: "Marché animé avec forte fréquentation locale et commerçants variés.",
    lat: 4.0590,
    lng: 9.7590,
    produits: [
      { produit: "Maïs", prixKg: 480, date: new Date().toISOString() },
      { produit: "Tomate", prixKg: 420, date: new Date().toISOString() },
    ],
    note: 4.1,
  },
  {
    id: "m-douala-4",
    nom: "Marché Deido",
    region: "Douala",
    adresse: "Deido, Douala",
    image: "/deido.jpeg",
    description: "Marché central avec produits alimentaires et artisanaux.",
    lat: 4.0450,
    lng: 9.7705,
    produits: [
      { produit: "Riz", prixKg: 910, date: new Date().toISOString() },
      { produit: "Plantain", prixKg: 250, date: new Date().toISOString() },
    ],
    note: 4.2,
  },
  {
    id: "m-douala-5",
    nom: "Marché Akwa II",
    region: "Douala",
    adresse: "Akwa II, Douala",
    image: "/akwa.jpeg",
    description: "Marché secondaire mais très fourni en produits vivriers.",
    lat: 4.0495,
    lng: 9.7695,
    produits: [
      { produit: "Patate", prixKg: 330, date: new Date().toISOString() },
      { produit: "Tomate", prixKg: 410, date: new Date().toISOString() },
    ],
    note: 4.0,
  },
  {
    id: "m-douala-6",
    nom: "Marché Bonapriso",
    region: "Douala",
    adresse: "Bonapriso, Douala",
    image: "/bonapriso.jpg",
    description: "Marché chic avec produits de qualité et bons prix.",
    lat: 4.0505,
    lng: 9.7645,
    produits: [
      { produit: "Riz", prixKg: 930, date: new Date().toISOString() },
      { produit: "Maïs", prixKg: 490, date: new Date().toISOString() },
    ],
    note: 4.4,
  },
  {
    id: "m-douala-7",
    nom: "Marché Bessengue",
    region: "Douala",
    adresse: "Bessengue, Douala",
    image: "/bessengue.jpeg",
    description: "Marché local avec vendeurs de fruits et légumes frais.",
    lat: 4.0530,
    lng: 9.7680,
    produits: [
      { produit: "Plantain", prixKg: 245, date: new Date().toISOString() },
      { produit: "Patate", prixKg: 315, date: new Date().toISOString() },
    ],
    note: 4.1,
  },
  {
    id: "m-douala-8",
    nom: "Marché Ndokoti",
    region: "Douala",
    adresse: "Ndokoti, Douala",
    image: "/ndokoti.jpg",
    description: "Marché très fréquenté, bon choix de légumes et céréales.",
    lat: 4.0560,
    lng: 9.7660,
    produits: [
      { produit: "Riz", prixKg: 915, date: new Date().toISOString() },
      { produit: "Maïs", prixKg: 500, date: new Date().toISOString() },
    ],
    note: 4.2,
  },
  {
    id: "m-douala-9",
    nom: "Marché Japoma",
    region: "Douala",
    adresse: "Japoma, Douala",
    image: "/japoma.jpeg",
    description: "Marché en périphérie, prix attractifs et produits variés.",
    lat: 4.0575,
    lng: 9.7655,
    produits: [
      { produit: "Plantain", prixKg: 250, date: new Date().toISOString() },
      { produit: "Tomate", prixKg: 405, date: new Date().toISOString() },
    ],
    note: 4.0,
  },
  {
    id: "m-douala-10",
    nom: "Marché Bonamoussadi",
    region: "Douala",
    adresse: "Bonamoussadi, Douala",
    image: "/bona.jpg",
    description: "Marché actif avec commerçants divers et produits frais quotidiens.",
    lat: 4.0515,
    lng: 9.7700,
    produits: [
      { produit: "Riz", prixKg: 1100, date: new Date().toISOString() },
      { produit: "Maïs", prixKg: 650, date: new Date().toISOString() },
    ],
    note: 4.3,
  },

  // Market in West with various products and prices
  // Marchés de l'Ouest
{
  id: "m-bafoussam-1",
  nom: "Marché Central Bafoussam",
  region: "Ouest",
  adresse: "Centre-ville, Bafoussam",
  image: "/bafoussam.jpeg",
  description: "Marché principal de Bafoussam, très actif le matin.",
  lat: 5.4769,
  lng: 10.4178,
  produits: [
    { produit: "Patate", prixKg: 290, date: new Date().toISOString() },
    { produit: "Mangue", prixKg: 190, date: new Date().toISOString() },
  ],
  note: 4.2,
},
{
  id: "m-bafoussam-2",
  nom: "Marché Mairie",
  region: "Ouest",
  adresse: "Quartier Mairie, Bafoussam",
  image: "/mairie.jpg",
  description: "Marché urbain avec produits frais et vivriers locaux.",
  lat: 5.4785,
  lng: 10.4210,
  produits: [
    { produit: "Maïs", prixKg: 260, date: new Date().toISOString() },
    { produit: "Riz", prixKg: 870, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-bafoussam-3",
  nom: "Marché Nkong-Ni",
  region: "Ouest",
  adresse: "Nkong-Ni, Bafoussam",
  image: "/nkong-ni.jpeg",
  description: "Marché populaire pour légumes et fruits frais.",
  lat: 5.4790,
  lng: 10.4150,
  produits: [
    { produit: "Plantain", prixKg: 200, date: new Date().toISOString() },
    { produit: "Tomate", prixKg: 400, date: new Date().toISOString() },
  ],
  note: 4.1,
},
{
  id: "m-bafoussam-4",
  nom: "Marché Koutaba",
  region: "Ouest",
  adresse: "Koutaba, Bafoussam",
  image: "/koutaba.jpeg",
  description: "Petit marché local pour produits vivriers et artisanat.",
  lat: 5.4700,
  lng: 10.4100,
  produits: [
    { produit: "Riz", prixKg: 1200, date: new Date().toISOString() },
    { produit: "Maïs", prixKg: 800, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-bafoussam-5",
  nom: "Marché Bamougoum",
  region: "Ouest",
  adresse: "Bamougoum, Bafoussam",
  image: "/bamougoum.jpeg",
  description: "Marché animé avec produits locaux et importés.",
  lat: 5.4725,
  lng: 10.4200,
  produits: [
    { produit: "Plantain", prixKg: 1000, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 500, date: new Date().toISOString() },
  ],
  note: 4.1,
},
{
  id: "m-bafoussam-6",
  nom: "Marché Foumban",
  region: "Ouest",
  adresse: "Foumban, Ouest",
  image: "/foumban.webp",
  description: "Grand marché régional, très fréquenté par les commerçants.",
  lat: 5.8000,
  lng: 10.9500,
  produits: [
    { produit: "Maïs", prixKg: 550, date: new Date().toISOString() },
    { produit: "Riz", prixKg: 1200, date: new Date().toISOString() },
  ],
  note: 4.2,
},
{
  id: "m-bafoussam-7",
  nom: "Marché Dschang",
  region: "Ouest",
  adresse: "Centre-ville, Dschang",
  image: "/bafoussam.jpeg",
  description: "Marché local actif, idéal pour fruits et légumes.",
  lat: 5.4500,
  lng: 10.0600,
  produits: [
    { produit: "Plantain", prixKg: 1000, date: new Date().toISOString() },
    { produit: "Tomate", prixKg: 500, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-bafoussam-8",
  nom: "Marché Mbouda",
  region: "Ouest",
  adresse: "Centre-ville, Mbouda",
  image: "/mbouda.jpg",
  description: "Petit marché pour produits vivriers et artisanat local.",
  lat: 5.6600,
  lng: 10.0500,
  produits: [
    { produit: "Maïs", prixKg: 270, date: new Date().toISOString() },
    { produit: "Riz", prixKg: 870, date: new Date().toISOString() },
  ],
  note: 4.1,
},
{
  id: "m-bafoussam-9",
  nom: "Marché Bangangté",
  region: "Ouest",
  adresse: "Bangangté, Ouest",
  image: "/bafoussam.jpeg",
  description: "Marché régional, très actif surtout le matin.",
  lat: 5.3250,
  lng: 10.0500,
  produits: [
    { produit: "Plantain", prixKg: 1000, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 650, date: new Date().toISOString() },
  ],
  note: 4.0,
},

  // Market in North with various products and prices
  { id: "m-garoua-1", nom: "Marché Central Garoua", region: "Garoua", adresse: "Centre-ville Garoua", image: "/garoua.jpg", description: "Marché central de Garoua, produits locaux et vivres.", lat: 9.3000, lng: 13.3980, produits: [{ produit: "Mil", prixKg: 280, date: new Date().toISOString() }] },
  { id: "m-garoua-2", nom: "Marché Pitoa", region: "Garoua", adresse: "Quartier Pitoa", image: "/pitoa.jpg", description: "Marché populaire pour céréales et légumes.", lat: 9.3170, lng: 13.4500, produits: [{ produit: "Maïs", prixKg: 250, date: new Date().toISOString() }] },
  { id: "m-garoua-3", nom: "Marché Yelwa", region: "Garoua", adresse: "Quartier Yelwa", image: "/yelwa.jpeg", description: "Vente de légumes, fruits et vivres.", lat: 9.2985, lng: 13.3950, produits: [{ produit: "Riz", prixKg: 720, date: new Date().toISOString() }] },
  { id: "m-garoua-4", nom: "Marché Wouro", region: "Garoua", adresse: "Quartier Wouro", image: "/wouro.jpeg", description: "Marché traditionnel actif le matin.", lat: 9.3050, lng: 13.4020, produits: [{ produit: "Mil", prixKg: 285, date: new Date().toISOString() }] },
  { id: "m-poli-1", nom: "Marché Poli", region: "Poli", adresse: "Centre Poli", image: "/poli.jpeg", description: "Marché central actif en journée.", lat: 9.3920, lng: 13.1270, produits: [{ produit: "Mil", prixKg: 290, date: new Date().toISOString() }] },
  { id: "m-pitoa-1", nom: "Marché Pitoa", region: "Pitoa", adresse: "Centre Pitoa", image: "/pitoua.jpg", description: "Marché central avec céréales locales.", lat: 9.4000, lng: 13.5000, produits: [{ produit: "Mil", prixKg: 275, date: new Date().toISOString() }] },
  { id: "m-louti-1", nom: "Marché Mayo-Louti", region: "Mayo-Louti", adresse: "Quartier Mayo-Louti", image: "/mayo-louti.webp", description: "Marché vivant pour produits vivriers.", lat: 9.4500, lng: 13.5200, produits: [{ produit: "Maïs", prixKg: 255, date: new Date().toISOString() }] },

  //Market in North West with various products and prices
{
  id: "m-bamenda-2",
  nom: "Marché Nkwen",
  region: "Nord-Ouest",
  adresse: "Bamenda, Nkwen",
  image: "/nkwen.jpg",
  description: "Marché populaire pour légumes et fruits frais.",
  lat: 5.9645,
  lng: 10.1642,
  produits: [
    { produit: "Plantain", prixKg: 210, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 320, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-bamenda-3",
  nom: "Marché Mankon",
  region: "Nord-Ouest",
  adresse: "Bamenda, Mankon",
  image: "/mankon.jpeg",
  description: "Marché très fréquenté le matin, idéal pour grossistes et détaillants.",
  lat: 5.9520,
  lng: 10.1500,
  produits: [
    { produit: "Maïs", prixKg: 500, date: new Date().toISOString() },
    { produit: "Riz", prixKg: 1200, date: new Date().toISOString() },
  ],
  note: 4.3,
}, 
{
  id: "m-bamenda-5",
  nom: "Marché Bamendankwe",
  region: "Nord-Ouest",
  adresse: "Bamenda, Bamendankwe",
  image: "/bamendankwe.jpg",
  description: "Marché secondaire avec produits vivriers et artisanat local.",
  lat: 5.9580,
  lng: 10.1570,
  produits: [
    { produit: "Riz", prixKg: 870, date: new Date().toISOString() },
    { produit: "Maïs", prixKg: 345, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-bamenda-6",
  nom: "Marché Mankon II",
  region: "Nord-Ouest",
  adresse: "Bamenda, Mankon II",
  image: "/mankon2.jpg",
  description: "Marché pour produits frais et vivriers du jour.",
  lat: 5.9540,
  lng: 10.1520,
  produits: [
    { produit: "Plantain", prixKg: 1000, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 600, date: new Date().toISOString() },
  ],
  note: 4.2,
},
{
  id: "m-bamenda-8",
  nom: "Marché Nkwen Central",
  region: "Nord-Ouest",
  adresse: "Bamenda, Nkwen",
  image: "/nkwen.jpg",
  description: "Marché central de quartier, ambiance animée et produits variés.",
  lat: 5.9635,
  lng: 10.1625,
  produits: [
    { produit: "Plantain", prixKg: 1000, date: new Date().toISOString() },
    { produit: "Tomate", prixKg: 400, date: new Date().toISOString() },
  ],
  note: 4.0,
},

{
  id: "m-bamenda-10",
  nom: "Marché Njinikom",
  region: "Nord-Ouest",
  adresse: "Njinikom, Nord-Ouest",
  image: "/njinikom.webp",
  description: "Marché en périphérie, produits frais et prix attractifs.",
  lat: 6.0000,
  lng: 10.2000,
  produits: [
    { produit: "Plantain", prixKg: 1000, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 500, date: new Date().toISOString() },
  ],
  note: 4.1,
},

//Markets on South region
{
  id: "m-ekondo-1",
  nom: "Marché Ekondo-Titi",
  region: "Sud",
  adresse: "Centre Ekondo-Titi",
  image: "/ekondo-titi.webp",
  description: "Marché central pour produits vivriers et artisanat local.",
  lat: 3.4500,
  lng: 9.9400,
  produits: [
    { produit: "Plantain", prixKg: 1000, date: new Date().toISOString() },
    { produit: "Banane", prixKg: 200, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-aud-1",
  nom: "Marché Ebolowa",
  region: "Sud",
  adresse: "Centre-ville Ebolowa",
  image: "/ebolowa.webp",
  description: "Marché principal d’Ebolowa, actif tous les jours.",
  lat: 2.9000,
  lng: 11.1500,
  produits: [
    { produit: "Maïs", prixKg: 250, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 300, date: new Date().toISOString() },
  ],
  note: 4.2,
},
{
  id: "m-lolodorf-1",
  nom: "Marché Lolodorf",
  region: "Sud",
  adresse: "Centre Lolodorf",
  image: "/lolodorf.jpeg",
  description: "Petit marché local pour fruits et légumes frais.",
  lat: 2.5000,
  lng: 10.8000,
  produits: [
    { produit: "Tomate", prixKg: 400, date: new Date().toISOString() },
    { produit: "Riz", prixKg: 850, date: new Date().toISOString() },
  ],
  note: 4.1,
},
{
  id: "m-djoum-1",
  nom: "Marché Djoum",
  region: "Sud",
  adresse: "Centre Djoum",
  image: "/djoum.avif",
  description: "Marché animé avec produits vivriers et artisanat local.",
  lat: 2.9000,
  lng: 11.5000,
  produits: [
    { produit: "Maïs", prixKg: 260, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 310, date: new Date().toISOString() },
  ],
  note: 4.0,
},

{
  id: "m-djoum-2",
  nom: "Marché Kribi",
  region: "Sud",
  adresse: "Centre-ville Kribi",
  image: "/kribi.jpg",
  description: "Marché portuaire, idéal pour poissons, légumes et fruits.",
  lat: 2.9500,
  lng: 9.9000,
  produits: [
    { produit: "Poisson", prixKg: 900, date: new Date().toISOString() },
    { produit: "Tomate", prixKg: 420, date: new Date().toISOString() },
  ],
  note: 4.4,
},
{
  id: "m-nyang-1",
  nom: "Marché Nyang",
  region: "Sud",
  adresse: "Centre Nyang",
  image: "/nyang.webp",
  description: "Petit marché local pour légumes et céréales.",
  lat: 2.8500,
  lng: 11.2000,
  produits: [
    { produit: "Maïs", prixKg: 255, date: new Date().toISOString() },
    { produit: "Riz", prixKg: 870, date: new Date().toISOString() },
  ],
  note: 4.0,
},

{
  id: "m-oubangui-1",
  nom: "Marché Sangmélima Sud",
  region: "Sud",
  adresse: "Quartier Sud Sangmélima",
  image: "/sangmelima.jpeg",
  description: "Marché local actif, idéal pour légumes et fruits.",
  lat: 3.0600,
  lng: 11.1600,
  produits: [
    { produit: "Maïs", prixKg: 265, date: new Date().toISOString() },
    { produit: "Riz", prixKg: 860, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-nyong-1",
  nom: "Marché Mvangan",
  region: "Sud",
  adresse: "Centre Mvangan",
  image: "/mvangan.jpeg",
  description: "Petit marché pour produits vivriers et artisanat.",
  lat: 3.0500,
  lng: 11.1000,
  produits: [
    { produit: "Plantain", prixKg: 220, date: new Date().toISOString() },
    { produit: "Tomate", prixKg: 400, date: new Date().toISOString() },
  ],
  note: 4.1,
},

//Markets in East region
// Marchés de l'Est
{
  id: "m-bertoua-1",
  nom: "Marché Central Bertoua",
  region: "Est",
  adresse: "Centre-ville Bertoua",
  image: "/bertoua.jpeg",
  description: "Marché principal de Bertoua, actif tous les jours, pour fruits, légumes et vivres.",
  lat: 4.5800,
  lng: 13.6800,
  produits: [
    { produit: "Maïs", prixKg: 270, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 310, date: new Date().toISOString() },
  ],
  note: 4.2,
},
{
  id: "m-bertoua-2",
  nom: "Marché Lokomo",
  region: "Est",
  adresse: "Quartier Lokomo, Bertoua",
  image: "/lokomo.jpg",
  description: "Petit marché local pour légumes et produits frais.",
  lat: 4.5850,
  lng: 13.6900,
  produits: [
    { produit: "Tomate", prixKg: 400, date: new Date().toISOString() },
    { produit: "Plantain", prixKg: 1000, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-bertoua-3",
  nom: "Marché Nkolbisson",
  region: "Est",
  adresse: "Quartier Nkolbisson",
  image: "/nkolbisson.jpeg",
  description: "Marché très fréquenté, vente de produits vivriers et artisanat local.",
  lat: 4.5780,
  lng: 13.6750,
  produits: [
    { produit: "Riz", prixKg: 880, date: new Date().toISOString() },
    { produit: "Maïs", prixKg: 275, date: new Date().toISOString() },
  ],
  note: 4.1,
},
{
  id: "m-bertoua-4",
  nom: "Marché Mballa II",
  region: "Est",
  adresse: "Centre Mballa II",
  image: "/mballa.jpeg",
  description: "Marché animé avec fruits, légumes et vivres divers.",
  lat: 4.5820,
  lng: 13.6820,
  produits: [
    { produit: "Plantain", prixKg: 225, date: new Date().toISOString() },
    { produit: "Tomate", prixKg: 400, date: new Date().toISOString() },
  ],
  note: 4.0,
},

{
  id: "m-bertoua-6",
  nom: "Marché Yokadouma",
  region: "Est",
  adresse: "Centre-ville Yokadouma",
  image: "/yokadouma.jpeg",
  description: "Petit marché local, actif le matin, fruits et légumes frais.",
  lat: 3.8500,
  lng: 14.2330,
  produits: [
    { produit: "Plantain", prixKg: 220, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 310, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-bertoua-8",
  nom: "Marché Lom-et-Djerem",
  region: "Est",
  adresse: "Quartier Lom-et-Djerem",
  image: "/lolodorf.jpeg",
  description: "Petit marché pour légumes frais et vivres locaux.",
  lat: 4.5200,
  lng: 13.7000,
  produits: [
    { produit: "Plantain", prixKg: 225, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 300, date: new Date().toISOString() },
  ],
  note: 4.0,
},

//Markets in South West region
// Marchés du Sud-Ouest
{
  id: "m-buea-1",
  nom: "Marché Central Buea",
  region: "Sud-Ouest",
  adresse: "Centre-ville Buea",
  image: "/buea.jpg",
  description: "Marché principal de Buea, actif tous les jours, fruits, légumes et vivres.",
  lat: 4.1530,
  lng: 9.2840,
  produits: [
    { produit: "Banane", prixKg: 200, date: new Date().toISOString() },
    { produit: "Tomate", prixKg: 400, date: new Date().toISOString() },
  ],
  note: 4.2,
},
{
  id: "m-buea-2",
  nom: "Marché Molyko",
  region: "Sud-Ouest",
  adresse: "Quartier Molyko, Buea",
  image: "/buea.jpg",
  description: "Petit marché local pour légumes et produits frais.",
  lat: 4.1470,
  lng: 9.2850,
  produits: [
    { produit: "Plantain", prixKg: 220, date: new Date().toISOString() },
    { produit: "Maïs", prixKg: 260, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-buea-3",
  nom: "Marché Buea Town",
  region: "Sud-Ouest",
  adresse: "Centre Buea Town",
  image: "/buea.jpg",
  description: "Marché animé avec fruits, légumes et vivres divers.",
  lat: 4.1500,
  lng: 9.2820,
  produits: [
    { produit: "Patate", prixKg: 300, date: new Date().toISOString() },
    { produit: "Tomate", prixKg: 410, date: new Date().toISOString() },
  ],
  note: 4.1,
},
{
  id: "m-limbe-1",
  nom: "Marché Central Limbe",
  region: "Sud-Ouest",
  adresse: "Centre-ville Limbe",
  image: "/limbe.jpeg",
  description: "Grand marché pour produits vivriers, légumes et fruits locaux.",
  lat: 4.0180,
  lng: 9.2060,
  produits: [
    { produit: "Banane", prixKg: 210, date: new Date().toISOString() },
    { produit: "Maïs", prixKg: 270, date: new Date().toISOString() },
  ],
  note: 4.3,
},
{
  id: "m-limbe-2",
  nom: "Marché Bota",
  region: "Sud-Ouest",
  adresse: "Quartier Bota, Limbe",
  image: "/limbe.jpeg",
  description: "Marché de proximité actif le matin, fruits et légumes frais.",
  lat: 4.0150,
  lng: 9.2100,
  produits: [
    { produit: "Plantain", prixKg: 225, date: new Date().toISOString() },
    { produit: "Tomate", prixKg: 400, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-kumbo-1",
  nom: "Marché Central Kumbo",
  region: "Sud-Ouest",
  adresse: "Centre-ville Kumbo",
  image: "/kumbo.jpeg",
  description: "Marché animé pour légumes, fruits et vivres locaux.",
  lat: 6.2000,
  lng: 10.6700,
  produits: [
    { produit: "Maïs", prixKg: 260, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 300, date: new Date().toISOString() },
  ],
  note: 4.1,
},
{
  id: "m-kumbo-2",
  nom: "Marché Nkambe",
  region: "Sud-Ouest",
  adresse: "Quartier Nkambe, Kumbo",
  image: "/nkambe.jpg",
  description: "Petit marché local pour produits vivriers et légumes.",
  lat: 6.2300,
  lng: 10.6800,
  produits: [
    { produit: "Tomate", prixKg: 410, date: new Date().toISOString() },
    { produit: "Plantain", prixKg: 220, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-ndian-1",
  nom: "Marché Ndian",
  region: "Sud-Ouest",
  adresse: "Centre Ndian",
  image: "/ndian.webp",
  description: "Marché pour légumes et vivres frais, actif tous les jours.",
  lat: 4.4000,
  lng: 8.9500,
  produits: [
    { produit: "Maïs", prixKg: 250, date: new Date().toISOString() },
    { produit: "Patate", prixKg: 290, date: new Date().toISOString() },
  ],
  note: 4.1,
},
{
  id: "m-tiko-1",
  nom: "Marché Tiko",
  region: "Sud-Ouest",
  adresse: "Centre-ville Tiko",
  image: "/tiko.jpg",
  description: "Marché populaire pour légumes et fruits, vivres locaux.",
  lat: 4.0500,
  lng: 9.3600,
  produits: [
    { produit: "Banane", prixKg: 1100, date: new Date().toISOString() },
    { produit: "Tomate", prixKg: 400, date: new Date().toISOString() },
  ],
  note: 4.0,
},

// Marchés de l'Adamaoua avec IDs uniques
{
  id: "m-adamaoua-1",
  nom: "Marché Ngaoundéré Central",
  region: "Adamaoua",
  adresse: "Centre-ville Ngaoundéré",
  image: "/ngaoundere.jpeg",
  description: "Marché principal de Ngaoundéré, actif tous les jours, fruits, légumes et vivres.",
  lat: 7.3275,
  lng: 13.5833,
  produits: [
    { produit: "Mil", prixKg: 300, date: new Date().toISOString() },
    { produit: "Sorgho", prixKg: 280, date: new Date().toISOString() },
  ],
  note: 4.2,
},
{
  id: "m-adamaoua-2",
  nom: "Marché Tcholliré",
  region: "Adamaoua",
  adresse: "Quartier Tcholliré",
  image: "/Tcholire.jpeg",
  description: "Petit marché local pour céréales et légumes frais.",
  lat: 8.4620,
  lng: 13.6830,
  produits: [
    { produit: "Maïs", prixKg: 250, date: new Date().toISOString() },
    { produit: "Mil", prixKg: 305, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-adamaoua-3",
  nom: "Marché Meiganga",
  region: "Adamaoua",
  adresse: "Centre Meiganga",
  image: "/meiganga.jpeg",
  description: "Marché animé pour légumes, fruits et vivres divers.",
  lat: 6.4833,
  lng: 14.3167,
  produits: [
    { produit: "Sorgho", prixKg: 285, date: new Date().toISOString() },
    { produit: "Riz", prixKg: 700, date: new Date().toISOString() },
  ],
  note: 4.1,
},
{
  id: "m-adamaoua-4",
  nom: "Marché Banyo",
  region: "Adamaoua",
  adresse: "Centre Banyo",
  image: "/banyo.jpeg",
  description: "Marché traditionnel avec vivres locaux et produits frais.",
  lat: 6.6167,
  lng: 13.9500,
  produits: [
    { produit: "Mil", prixKg: 290, date: new Date().toISOString() },
    { produit: "Maïs", prixKg: 260, date: new Date().toISOString() },
  ],
  note: 4.0,
},
{
  id: "m-adamaoua-5",
  nom: "Marché Meiganga Sud",
  region: "Adamaoua",
  adresse: "Quartier Sud Meiganga",
  image: "/meiganga2.jpg",
  description: "Petit marché local pour légumes et vivres.",
  lat: 6.4800,
  lng: 14.3200,
  produits: [
    { produit: "Sorgho", prixKg: 280, date: new Date().toISOString() },
    { produit: "Mil", prixKg: 295, date: new Date().toISOString() },
  ],
  note: 4.1,
},

{
  id: "m-adamaoua-9",
  nom: "Marché Tibati",
  region: "Adamaoua",
  adresse: "Centre Tibati",
  image: "/tibati.jpeg",
  description: "Marché central pour légumes, fruits et vivres divers.",
  lat: 6.4667,
  lng: 13.9500,
  produits: [
    { produit: "Mil", prixKg: 295, date: new Date().toISOString() },
    { produit: "Maïs", prixKg: 265, date: new Date().toISOString() },
  ],
  note: 4.2,
},

];


/* ---------------------------
   Petits composants UI
   --------------------------- */

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-semibold">
    {children}
  </span>
);

const MarketCard: React.FC<{
  market: Market;
  onOpen: (m: Market) => void;
}> = ({ market, onOpen }) => {
  const prixApercu = market.produits[0];
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex gap-4">
      <div className="w-28 h-20 relative rounded overflow-hidden bg-gray-100 flex-shrink-0">
        {market.image ? (
          <Image src={market.image} alt={market.nom} fill className="object-cover" />
        ) : (
          <div className="flex items-center justify-center text-gray-400">No Img</div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{market.nom}</h3>
            <p className="text-sm text-muted-foreground">{market.adresse}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">{market.region}</div>
            <div className="text-xs text-yellow-600 font-semibold">{(market.note ?? 0).toFixed(1)} ★</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Ex. {prixApercu.produit}</div>
            <div className="font-semibold">{prixApercu.prixKg} FCFA / kg</div>
          </div>
          <div>
            <button
              onClick={() => onOpen(market)}
              className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:opacity-90"
            >
              Voir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Modal simple */
const MarketModal: React.FC<{ market: Market | null; onClose: () => void }> = ({ market, onClose }) => {
  if (!market) return null;
  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl overflow-y-auto max-h-[90vh] shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">{market.nom} — {market.region}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">Fermer</button>
        </div>

        <div className="p-4 grid md:grid-cols-2 gap-4">
          <div className="relative w-full h-64 rounded overflow-hidden bg-gray-100">
            {market.image && <Image src={market.image} alt={market.nom} fill className="object-cover" />}
          </div>

          <div>
            <p className="text-gray-700 mb-3">{market.description}</p>
            <p className="text-sm text-gray-500 mb-4">Adresse: {market.adresse}</p>

            <h4 className="font-semibold mb-2">Prix récents</h4>
            <div className="space-y-2 mb-4">
              {market.produits.map((p, idx) => (
                <div key={idx} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                  <div>{p.produit}</div>
                  <div className="font-semibold">{p.prixKg} FCFA / kg</div>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <Link href={`/markets/${market.id}`} className="text-primary underline">Voir la fiche complète</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------
   Page principale Marchés
   --------------------------- */

const MarchesPage: React.FC = () => {
  const [markets, setMarkets] = useState<Market[]>(MOCK_MARKETS);
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<string | "Tout">("Tout");
  const [sortBy, setSortBy] = useState<"recent" | "price-asc" | "price-desc" | "name">("recent");
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  // Extraire la liste des régions disponibles dynamiquement
  const regions = useMemo(() => {
    const s = Array.from(new Set(markets.map((m) => m.region)));
    return ["Tout", ...s] as (string | "Tout")[];
  }, [markets]);

  // Filtering + search + sort
  const filtered = useMemo(() => {
    let list = markets.slice();

    // search by name or product
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (m) =>
          m.nom.toLowerCase().includes(q) ||
          m.adresse?.toLowerCase().includes(q) ||
          m.produits.some((p) => p.produit.toLowerCase().includes(q))
      );
    }

    // region filter
    if (regionFilter !== "Tout") {
      list = list.filter((m) => m.region === regionFilter);
    }

    // sort
    if (sortBy === "name") {
      list.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (sortBy === "price-asc") {
      list.sort((a, b) => (a.produits[0]?.prixKg ?? 0) - (b.produits[0]?.prixKg ?? 0));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.produits[0]?.prixKg ?? 0) - (a.produits[0]?.prixKg ?? 0));
    } else {
      // recent: by note (simulé)
      list.sort((a, b) => (b.note ?? 0) - (a.note ?? 0));
    }

    return list;
  }, [markets, query, regionFilter, sortBy]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  // Simuler fetch initial (ici on utilise MOCK, mais tu peux fetch /api/markets)
  useEffect(() => {
    // placeholder for real fetch
    // fetch("/api/markets").then(r=>r.json()).then(setMarkets)
  }, []);

  return (
    <>
      <NavBar />
      <TopMenuOverlay />

      <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-6 md:px-16">
        {/* header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Marchés</h1>
            <p className="text-sm text-gray-600 mt-1">
              Explorez les marchés du Cameroun, comparez les prix et consultez les tendances.
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Rechercher marché, produit ou adresse..."
                className="pl-10 pr-4 py-2 rounded-lg ring-0 border border-gray-300 bg-whitew-80"
              />
              <div className="absolute left-3 top-2.5 text-gray-400"><Search size={16} /></div>
            </div>

            <select
              value={regionFilter}
              onChange={(e) => { setRegionFilter(e.target.value as string | "Tout"); setCurrentPage(1); }}
              className="rounded-lg ring-0 border border-gray-300 py-2 px-3 bg-white"
            >
              {regions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="rounded-lg ring-0 border border-gray-300 py-2 px-3 bg-white">
              <option value="recent">Tendances</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name">Nom</option>
            </select>
          </div>
        </header>

        {/* layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* left: list */}
          <section className="md:col-span-2 space-y-4">
            <div className="grid gap-4">
              {paginated.map((m) => (
                <MarketCard key={m.id} market={m} onOpen={(mm) => setSelectedMarket(mm)} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-600">{filtered.length} marchés trouvés</div>
              <div className="flex gap-2 items-center">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded-lg ring-0 border border-gray-300 bg-white">Préc</button>
                <div className="px-3 py-1 rounded-lg ring-0 border border-gray-300 bg-white">{currentPage} / {totalPages}</div>
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 rounded-lg ring-0 border border-gray-300 bg-white">Suiv</button>
              </div>
            </div>
          </section>

          {/* right: map + stats */}
          <aside className="space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold mb-2">Statistiques rapides</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded p-3 text-center">
                  <div className="text-sm text-gray-600">Prix moyen</div>
                  <div className="text-lg font-bold">{Math.round(markets.reduce((acc, m) => acc + (m.produits[0]?.prixKg ?? 0), 0) / markets.length)} FCFA</div>
                </div>
                <div className="bg-blue-50 rounded p-3 text-center">
                  <div className="text-sm text-gray-600">Marchés couverts</div>
                  <div className="text-lg font-bold">{markets.length}</div>
                </div>
                <div className="bg-yellow-50 rounded p-3 text-center">
                  <div className="text-sm text-gray-600">Produits observés</div>
                  <div className="text-lg font-bold">{Array.from(new Set(markets.flatMap(m => m.produits.map(p => p.produit)))).length}</div>
                </div>
                <div className="bg-red-50 rounded p-3 text-center">
                  <div className="text-sm text-gray-600">Top marché</div>
                  <div className="text-lg font-bold">{markets[0].nom}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold mb-2">Filtrer par produit (rapide)</h4>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(markets.flatMap(m => m.produits.map(p => p.produit)))).slice(0,8).map((prod) => (
                  <button key={prod} className="px-3 py-1 bg-white rounded-lg ring-0 border border-gray-300 text-sm" onClick={() => setQuery(prod)}>
                    {prod}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* modal */}
        <MarketModal market={selectedMarket} onClose={() => setSelectedMarket(null)} />
      </main>

      <Footer />
    </>
  );
};

export default MarchesPage;
