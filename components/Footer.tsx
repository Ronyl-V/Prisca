"use client";
import React, { useState } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";

const COMPANY_LINKS = [
  { label: "À propos de Prisca", href: "#" },
  { label: "Notre mission", href: "#" },
  { label: "Équipe", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

const MARKETS_LINKS = [
  { label: "Marchés locaux", href: "#" },
  { label: "Marchés régionaux", href: "#" },
  { label: "Produits alimentaires", href: "#" },
  { label: "Analyse des tendances", href: "#" },
  { label: "Comparer les prix", href: "#" },
];

const HELP_LINKS = [
  { label: "Support client", href: "#" },
  { label: "Mon compte", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Mentions légales", href: "#" },
  { label: "Bulletins de prix", href: "#" },
];


const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscription failed");

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-100 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* BRAND / CONTACT */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="text-lg font-semibold">PRISCA</span>
            </Link>

            <p className="text-sm text-gray-300 max-w-sm">
              Plateforme de prévision et d’arbitrage des prix alimentaires. Rendre les
              marchés plus transparents et aider les acteurs à prendre de meilleures décisions.
            </p>

            <div className="text-sm text-gray-300 space-y-1">
              <div>Douala, Cameroon</div>
              <div className="font-medium">hello@prisca.cm</div>
              <div className="font-medium">+237 653 73 23 13</div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              {/* Social placeholders — replace href with real links */}
              <Link href="#" className="text-gray-300 hover:text-white transition" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                  <path d="M22 5.92c-.66.3-1.37.5-2.12.6a3.66 3.66 0 0 0 1.6-2.02 7.24 7.24 0 0 1-2.3.9 3.61 3.61 0 0 0-6.15 3.3A10.25 10.25 0 0 1 3.16 4.7a3.6 3.6 0 0 0 1.12 4.82c-.53-.02-1.03-.16-1.46-.4v.04a3.62 3.62 0 0 0 2.9 3.54c-.28.08-.58.12-.88.12-.21 0-.42-.02-.62-.06a3.62 3.62 0 0 0 3.38 2.5 7.24 7.24 0 0 1-4.49 1.55c-.29 0-.57-.02-.85-.05a10.23 10.23 0 0 0 5.54 1.63c6.65 0 10.3-5.51 10.3-10.29v-.47A7.27 7.27 0 0 0 22 5.92z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.35 3H14v7A10 10 0 0 0 22 12z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.3A4.7 4.7 0 1 0 16.7 13 4.7 4.7 0 0 0 12 8.3zM18.5 7a1.2 1.2 0 1 0 1.2 1.2A1.2 1.2 0 0 0 18.5 7z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* LINKS */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-200 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-200 mb-4">Shop</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                {MARKETS_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-200 mb-4">Help</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                {HELP_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SUBSCRIBE */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-gray-200 mb-4">Subscribe</h4>
            <p className="text-sm text-gray-300 mb-4">
              Recevez les dernières analyses, bulletins et alertes directement dans votre boîte mail.
            </p>

                <div className="max-w-md w-full">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>

      <div className="flex flex-col sm:flex-col md:flex-row items-stretch gap-2 md:gap-0 custom-break:flex-col">
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Votre adresse e-mail"
          className="flex-1 px-4 py-2 rounded-md md:rounded-l-md text-white bg-gray-800 placeholder-gray-400"
          aria-invalid={status === "error"}
        />
        <button
          onClick={handleSubscribe}
          aria-label="Subscribe"
          className="px-4 py-2 rounded-md md:rounded-r-md bg-white text-black cursor-pointer font-medium hover:bg-red-500 hover:text-white transition mt-2 md:mt-0"
          disabled={status === "loading"}
        >
          {status === "loading" ? "..." : "Join"}
        </button>
      </div>
    </div>


            <div className="mt-3 min-h-[1.25rem]">
              {status === "success" && <div className="text-sm text-green-400">Merci ! Abonnement confirmé.</div>}
              {status === "error" && <div className="text-sm text-red-400">Veuillez entrer un e-mail valide ou réessayer.</div>}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">© {new Date().getFullYear()} PRISCA — Tous droits réservés</div>

          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-300">
            <div>
              <span className="text-gray-500 mr-2">Langue</span>
              <span className="font-medium">Français (Douala)</span>
            </div>

            <div>
              <span className="text-gray-500 mr-2">Devise</span>
              <span className="font-medium">FCFA</span>
            </div>

            <div className="flex items-center gap-3">
              <Link href="#" className="text-gray-400 hover:text-white transition">Conditions</Link>
              <span className="text-gray-600">|</span>
              <Link href="#" className="text-gray-400 hover:text-white transition">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
