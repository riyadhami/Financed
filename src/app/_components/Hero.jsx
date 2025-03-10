"use client";
import React from "react";
import { MacbookScroll } from "../../components/ui/macbook-scroll";

function Hero() {
  return (
    <section className="bg-gray-50 flex flex-col items-center justify-center py-16 min-h-screen">
      <h1 className="text-4xl font-semibold text-black dark:text-white text-center mb-12">
        Manage your finances with our AI-driven <br />
        <span className="text-4xl md:text-[6rem] text-blue-800 font-bold mt-1 leading-none">
          Financial Advisor
        </span>
      </h1>

      <div className="w-full max-w-6xl px-4">
        {/* Use the MacbookScroll component with the correct props */}
        <MacbookScroll
          src="/dashboard.png" // Pass the image path here
          showGradient={true} // Enable the gradient effect
          title="Your AI-powered financial dashboard" // Optional title
          badge={null} // Optional badge (set to null if not needed)
        />
      </div>
    </section>
  );
}

export default Hero;