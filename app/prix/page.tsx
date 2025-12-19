"use client"

import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import TopMenuOverlay from "@/components/TopMenuOverlay"
import { AnimatedFolder } from "@/components/ui/3d-folder"
import { useRouter } from "next/navigation"

const foodFolders = [
  {
    title: "Céréales",
    projects: [
      { id: "cer-1", title: "Riz", image: "/riz.png", href: "/item?nom=Riz&image=/riz.png" },
      { id: "cer-2", title: "Maïs", image: "/mais.avif", href: "/item?nom=Maïs&image=/mais.avif" },
      { id: "cer-3", title: "Blé", image: "/blé.webp", href: "/item?nom=Blé&image=/blé.webp" },
    ],
  },
  {
    title: "Fruits",
    projects: [
      { id: "fr-1", title: "Pasteque", image: "/pasteque.webp", href: "/item?nom=Pasteque&image=/pasteque.webp" },
      { id: "fr-2", title: "Papaye", image: "/papaye.webp", href: "/item?nom=Papaye&image=/papaye.webp" },
      { id: "fr-3", title: "Ananas", image: "/ananas.jpg", href: "/item?nom=Ananas&image=/ananas.jpg" },
    ],
  },
  {
    title: "Viande & Poisson",
    projects: [
      { id: "vp-1", title: "Boeuf", image: "/boeuf.jpeg", href: "/item?nom=Boeuf&image=/boeuf.jpeg" },
      { id: "vp-2", title: "Porc", image: "/porc.webp", href: "/item?nom=Porc&image=/porc.webp" },
      { id: "vp-3", title: "Poisson", image: "/poisson.jpg", href: "/item?nom=Poisson&image=/poisson.jpg" },
    ],
  },
  {
    title: "Tubercules",
    projects: [
      { id: "tub-1", title: "Patate Douce", image: "/pommes.webp", href: "/item?nom=Patate Douce&image=/pommes.webp" },
      { id: "tub-2", title: "Manioc", image: "/manioc.jpg", href: "/item?nom=Manioc&image=/manioc.jpg" },
      { id: "tub-3", title: "Pommes de terre", image: "/pommes.jpeg", href: "/item?nom=Pommes de terre&image=/pommes.jpeg" },
    ],
  },
]


export default function Prix() {
  const router = useRouter();

const handleClick = (product: any) => {
  router.push(
    `/item?nom=${encodeURIComponent(product.title)}&image=${encodeURIComponent(product.image)}`
  );
};

  return (
    <>
      <NavBar />
      <TopMenuOverlay />

      <main className="min-h-screen mt-20 bg-background w-full">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-14">
            Catégories d'aliments
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {foodFolders.map((folder) => (
              <AnimatedFolder
                key={folder.title}
                title={folder.title}
                projects={folder.projects.map(p => ({
                  ...p,
                  onClick: () => handleClick(p)
                }))}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
