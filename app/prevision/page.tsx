"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import TopMenuOverlay from "@/components/TopMenuOverlay";
import { AnimatedFolder } from "@/components/ui/3d-folder";

const foodFolders = [
  {
    title: "Profils",
    projects: [
      { id: "act-1", title: "Commerçant", image: "/commercant.jpg", href: "/commercant" },
      { id: "act-2", title: "Argiculteur", image: "/agriculteur.jpg", href: "/agriculteur" },
      { id: "act-3", title: "Consommateur", image: "/consommateur.avif", href: "/prix" },
    ],
  },
]

export default function Page() {
    return (
    <>
      <NavBar />
      <TopMenuOverlay />

      <main className="min-h-screen mt-20 bg-background w-full">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-14">
            Catégories de Produits
          </h1>

          <div className="
            justify-items-center
          ">
            {foodFolders.map((folder) => (
              <AnimatedFolder
                key={folder.title}
                title={folder.title}
                projects={folder.projects}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
