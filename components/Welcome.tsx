"use client";
import React from "react";

export const MarketPriceSection: React.FC = () => {
  return (
    <section className="py-16 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Images */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="w-full aspect-square rounded-full overflow-hidden border-8 border-gray-100 shadow-lg">
                <img
                  src="/legumes.jpeg"
                  alt="Produits agricoles"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full overflow-hidden border-4 border-green-600 shadow-xl">
                <img
                  src="/pommes.webp"
                  alt="Produits vivriers"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Texte */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Suivez les <span className="text-primary">marchés et prix</span> au Cameroun
            </h2>

            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
              PRISCA est votre plateforme pour comparer les prix des produits alimentaires entre les marchés,
              anticiper les tendances et recevoir des alertes personnalisées pour prendre les meilleures décisions économiques.
            </p>

            {/* Boutons */}
            <div className="flex gap-4 items-center">
              <a
                href="/marches"
                className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg shadow hover:bg-gray-300 hover:text-white transition"
              >
                Voir les Marchés
              </a>

              <a
                href="/prix"
                className="inline-flex items-center gap-2 text-primary border border-primary px-5 py-3 rounded-lg hover:bg-gray-300 hover:text-white transition"
              >
                Voir les Prix
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MarketPriceSection;
