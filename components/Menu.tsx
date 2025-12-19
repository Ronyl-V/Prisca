'use client';

import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Hamburger — visible seulement mobile */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-8 right-6 md:hidden z-[1000]"
        aria-label="Open menu"
      >
        <Menu size={28} className="text-black" />
      </button>

      {/* Fullscreen menu */}
      {open && (
        <div className="fixed inset-0 z-[10000] bg-black text-white flex flex-col items-center justify-center gap-10 text-xl">
          
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>

          <Link href="/" onClick={() => setOpen(false)}>Accueil</Link>
          <Link href="/prevision" onClick={() => setOpen(false)}>Prévision</Link>
          <Link href="/marches" onClick={() => setOpen(false)}>Marchés</Link>
          <Link href="/prix" onClick={() => setOpen(false)}>Prix</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
