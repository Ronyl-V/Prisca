"use client";

import Image from "next/image";
import MobileMenu from "./Menu";
import { useEffect, useRef, useState } from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { UserCircle } from "lucide-react";

const NavIcons = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isCovered, setIsCovered] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const bellRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGSVGElement>(null);

  const handleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  useEffect(() => {
    const checkCoverage = () => {
      const hero = document.querySelector("#hero-image");
      if (!hero) return;

      const heroRect = hero.getBoundingClientRect();

      const check = (el: Element | null) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        return (
          x >= heroRect.left &&
          x <= heroRect.right &&
          y >= heroRect.top &&
          y <= heroRect.bottom
        );
      };

      const bellIsCovered = check(bellRef.current);
      const circleIsCovered = check(circleRef.current);
      setIsCovered(bellIsCovered || circleIsCovered);
    };

    checkCoverage();
    window.addEventListener("scroll", checkCoverage);
    window.addEventListener("resize", checkCoverage);

    return () => {
      window.removeEventListener("scroll", checkCoverage);
      window.removeEventListener("resize", checkCoverage);
    };
  }, []);

  return (
    <div className="fixed top-5 right-10 z-[1200] flex items-center gap-4 px-4 py-2">
      {/* Profile icon */}
      {isSignedIn && user?.imageUrl ? (
        <div className="relative">
          <Image
            src={user.imageUrl}
            alt="Profile"
            width={32}
            height={32}
            className="cursor-pointer rounded-full object-cover"
            priority
            onClick={handleProfile}
          />
        </div>
      ) : (
        <UserCircle
          ref={circleRef}
          size={32}
          onClick={handleProfile}
          className={`cursor-pointer ${
            isCovered ? "text-white" : "text-black"
          } transition-colors`}
        />
      )}

      {/* Hamburger menu : mobile & tablette seulement */}
    <div className="md:hidden">
      <MobileMenu />
    </div>

      {/* Dropdown menu */}
      {isProfileOpen && isLoaded && (
        <div className="absolute top-12 right-0 w-40 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          <div className="flex flex-col p-3 text-sm text-gray-700">
            {isSignedIn ? (
              <>
                <span className="px-3 py-1 mb-2 font-semibold text-xs text-gray-500 break-all">
                  {user.emailAddresses[0]?.emailAddress}
                </span>

                <SignOutButton>
                  <button className="mt-2 py-2 px-3 text-left rounded-md hover:bg-red-100 text-red-500 transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton>
                <button className="mt-2 py-2 px-3 text-center font-semibold rounded-md border hover:bg-black hover:text-white transition">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavIcons;
