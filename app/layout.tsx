import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import MobileMenu from "@/components/Menu";

const winkyRough = localFont({
  src: "../public/fonts/WinkyRough.ttf",
  variable: "--font-winky",
  display: "swap",
});

export const metadata = {
  title: "PRISCA",
  description: "Plateforme camerounaise de prévision et d’arbitrage des prix alimentaires",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body className={`${winkyRough.variable}`}>
              <MobileMenu />
              {children}
          </body>
        </html>
    </ClerkProvider>
  );
}
