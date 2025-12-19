"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const MobileAppSection = () => {
  return (
    <div className="w-full py-24 px-6 bg-slate-50 text-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Texte à gauche */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-left"
        >
          <h2 className="text-4xl font-extrabold mb-6 leading-tight">
            Prisca dans votre poche
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Suivez les prix alimentaires, comparez les marchés et recevez des alertes personnalisées directement sur votre mobile. L’application Prisca arrive bientôt sur Android et iOS !
          </p>
          <div className="flex gap-4 justify-center items-center">
            {/* Google Play */}
            <Link
              href="https://play.google.com/store/apps/details?id=com.prisca"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                width={160}
                height={50}
                className="cursor-pointer hover:scale-105 transition"
              />
            </Link>

            {/* App Store */}
            <Link
              href="https://apps.apple.com/app/id0000000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                width={160}
                height={50}
                className="cursor-pointer hover:scale-105 transition"
              />
            </Link>
          </div>
        </motion.div>

        {/* Mockup mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="hidden lg:block md:block relative w-[250px] h-[500px] rounded-3xl shadow-2xl overflow-hidden border-4 border-white/10 bg-black">
            <Image
              src="/logo.png" 
              alt="Aperçu de l'application Prisca"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MobileAppSection
