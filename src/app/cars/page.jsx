


// "use client"

// import React, { useState } from 'react';

import Link from 'next/link';
import CarCard from '@/components/CarCard';



const Alldata = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, { cache: 'no-store' });
  const cars = await res.json();
  return cars || []; 
}

const AvailableCars =async () => {



//  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)
//  const Cars = await res.json();



const Cars =await Alldata()
  

  
  
  return (
    <div>
       <section className="relative py-24 bg-[#030712] px-4 md:px-8 overflow-hidden w-full border-t border-white/5">
      
      {/* 🔮 Background Futuristic Glow */}
      <div className="absolute top-1/4 right-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 📑 SECTION HEADER & SEARCH INPUT */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-block font-mono text-[10px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/30 pb-1">
              Live Fleet Status
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Available <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Cars</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Verified nodes currently active on the grid network. Ready for immediate deployment.
            </p>
          </div>

          {/* ⚡ INTERACTIVE SEARCH BAR & REDIRECT LINK */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          
          </div>
        </div>

        {/* 📦 DYNAMIC CARDS GRID */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Cars?.map((car, index) => (
              <CarCard key={car._id || index} car={car} />
            ))}
          </div>
        

      
       

      </div>
    </section>
    </div>
  );
};

export default AvailableCars;







