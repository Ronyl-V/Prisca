"use client";

import React from "react";
import Image from "next/image";
import NavBarLetters from "@/components/TopMenuOverlay"; // juste les lettres du menu
import NavBarBackground from "@/components/NavBarBackground"; // logo + fond + icônes
import { ArrowRight, CheckCircle} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavIcons from "@/components/NavIcons";
import PartnerSlider from "@/components/PartnerSlide";
import { useState } from 'react';
import Footer from "@/components/Footer";
import Link from "next/link";
import MobileAppSection from "@/components/MobileAppSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

const HomePage = () => {
  const questions = [
  {
    question: "What services does OneClick offer?",
    answer:
      "OneClick connects users to trusted local service providers across various categories like plumbing, electrical work, home cleaning, tailoring, and more. Our platform offers booking, real-time chat, secure payments, and customer reviews—all in one place.",
  },
  {
    question: "How does OneClick ensure service reliability?",
    answer:
      "We vet all service providers through identity verification, training, and customer ratings. Our rating system ensures quality feedback and consistent performance monitoring.",
  },
  {
    question: "What makes OneClick different from other platforms?",
    answer:
      "OneClick offers a localized, commission-based service model without requiring provider subscriptions. We focus on community empowerment, transparency, and mobile-friendly simplicity, ideal for users across Cameroon and beyond.",
  },
  {
    question: "Is OneClick available in rural or remote areas?",
    answer:
      "Yes! OneClick is designed to include providers from urban, semi-urban, and rural zones, with an easy-to-use interface and minimal data requirements to ensure accessibility for all.",
  },
];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const testimonials = [
    {
      image: "/girl.jpg",
      text: "Since I started using Longrich products, my skin has become more radiant and hydrated. The bamboo charcoal soap is simply magical!",
      rating: 4.9,
      name: "Leila Alex",
      role: "Fashion Enthusiast",
    },
    {
      image: "/Homme.jpg",
      text: "Longrich completely transformed my skincare routine. The SOD body cream leaves my skin soft and flawless.",
      rating: 5.0,
      name: "Jean Christophe",
      role: "Beauty Blogger",
    },
    {
      image: "/woman-smiling.jpg",
      text: "I used to have dry skin issues, but Longrich’s moisturizing lotion changed everything. I highly recommend it!",
      rating: 4.8,
      name: "Esther Mboua",
      role: "Makeup Artist",
    },
    {
      image: "/skincare-african-woman.jpg",
      text: "The bamboo charcoal soap and SOD cream helped me get clear skin again. No more pimples, no more dark spots.",
      rating: 5.0,
      name: "Sandra Tchana",
      role: "Skincare Coach",
    },
    {
      image: "/young-woman-clean-skin.jpg",
      text: "I’m impressed by Longrich shampoo – it improved my scalp and made my complexion healthier!",
      rating: 4.7,
      name: "Lucia K.",
      role: "Lifestyle Influencer",
    },
    {
      image: "/black-man.jpg",
      text: "After just one week with Longrich herbal soap, my skin is glowing and balanced. No more redness or irritation.",
      rating: 4.9,
      name: "Patrick Jackson",
      role: "Doctor",
    },
  ];

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <>
    <div className="relative w-screen min-h-screen bg-black flex">
      {/* 1. Lettres du menu, au-dessus de tout */}
      <NavBarLetters />

      {/* NavIcons au-dessus de tout */}
      <NavIcons />
      {/* 2. Image en fond, au milieu */}
      <div className="flex flex-1 pl-20 pr-10 items-center gap-x-20 relative">
        {/* Texte à gauche */}
        <div className="w-1/2 flex flex-col text-white">
          <p className="text-[40px] leading-tight font-extrabold">
            Welcome to <span className="text-red-400">OneClick</span> —<br />
            Empowering Connections, <br />
            Unlocking Opportunities{" "}
            <span className="text-gray-400 block mt-2 text-2xl font-semibold">
              All through trusted local services tailored for you.
            </span>
          </p>

          <Link href="/option" className="w-10"><Button className="animate-pulseGrow mt-10 bg-white text-black px-8 py-3 text-lg font-semibold flex items-center gap-3 shadow-lg cursor-pointer hover:bg-red-400 hover:text-white transition-colors duration-300">
            Get Started <ArrowRight size={20} />
          </Button></Link>
        </div>

        {/* Image à droite */}
        <div className="w-1/2 relative h-screen z-50">
          <Image
            id="hero-image"
            src="/metier-01.jpg"
            alt="Image01"
            fill
            className="object-cover"
            style={{ zIndex: 50 }}
          />
        </div>
      </div>

      {/* 3. Navbar fond, logo, icônes — sous l'image (z-index bas) */}
      <NavBarBackground />
    </div>

        {/*About */}
        <section className="py-20 bg-slate-50 py-40">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Images */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="/hair-stylist.jpg" 
                alt="Hair stylist with client" 
                className="rounded-lg w-full h-48 object-cover"
              />
              <img 
                src="/tailor-sewing.jpg" 
                alt="Tailor sewing" 
                className="rounded-lg w-full h-60 object-cover"
              />
            </div>
            <div className="mt-8">
              <img 
                src="/electricien-3.jpg" 
                alt="Electrician at Work" 
                className="rounded-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-red-500 font-medium italic">About OneClick</p>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              OneClick – Your Gateway to Trusted Local Services in Cameroon
            </h3>
          </div>

          <p className="text-gray-600 leading-relaxed">
            OneClick connects you instantly with skilled, verified service providers across Cameroon — from electricians and plumbers to tailors,
            makeup artists, and more. Our mission is simple: simplify your life by giving you access to reliable, local professionals with just one click.
            Whether you're at home, at work, or on the go, OneClick makes it easy to book the help you need, when you need it.
          </p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-gray-700 w-5 h-5" />
              <span className="text-gray-700">Wide range of certified service providers near you</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-gray-700 w-5 h-5" />
              <span className="text-gray-700">Secure mobile payments (Orange Money, MoMo)</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-gray-700 w-5 h-5" />
              <span className="text-gray-700">Real-time booking and instant confirmations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
        </section>

        {/* Featured Questions */}
    <div className="bg-white py-20 w-screen flex flex-col lg:flex-row items-center justify-center px-4 py-12 gap-10">
      {/* LEFT - Questions */}
      <div className="flex-1 max-w-2xl w-full ml-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {questions.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full text-left px-5 py-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-red-600 font-semibold text-lg">
                  {item.question}
                </span>
                <span className="text-gray-600 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              <div
                className={`px-5 transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-[500px] py-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-700">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - Image */}
      <div className="flex-1 flex items-center justify-center">
        <Image
          src="/pub.jpg"
          alt="FAQ illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
    </div>



        {/* Testimonial Section */}
        <Testimonials />

    <MobileAppSection />

    <PartnerSlider />

    {/* Subscribe */}
<div className="bg-[#0f0f0f] w-screen py-16 px-4 flex flex-col md:flex-row items-center justify-center gap-10">
  {/* Text & Button */}
  <div className="text-white max-w-md text-center md:text-left py-2">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with OneClick</h2>
    <p className="text-gray-300 mb-6">
      Subscribe to our newsletter and never miss an update about our services, deals, and partner offers.
    </p>
    <form className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-3 rounded-md bg-white text-black w-full sm:w-auto flex-grow focus:outline-none"
      />
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  </div>

  {/* Image */}
  <Image
    src="/bon.png"
    alt="subscribe"
    width={300}
    height={300}
    className="rounded-lg shadow-lg ml-30"
  />
</div>

   <HowItWorks />

    <Footer />
   </>
  );
};

export default HomePage;
