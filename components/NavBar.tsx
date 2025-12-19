"use client";

import Link from "next/link";
import Image from "next/image";
import NavIcons from "./NavIcons";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[50]"> {/* fond bas z */}
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-md flex items-center justify-between px-16 h-24 relative z-[50]">
        <Link href="/" className="flex items-center h-full">
          <div className="relative w-[80px] h-[80px]">
            <Image src="/Logo.png" alt="Logo" fill priority className="object-contain" />
          </div>
        </Link>

        <div className="flex items-center gap-8">
          <NavIcons />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
