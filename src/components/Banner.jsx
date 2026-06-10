
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import banner from "@/assets/banner.png";

const Banner = () => {
  return ( <section className="relative min-h-[85vh] w-full mx-auto flex items-center justify-center overflow-hidden bg-[#030712] px-4 sm:px-6 md:px-8 py-20">
      
      {/* ─── 🚗 BACKGROUND IMAGE CONTAINER ─── */}
      <div className="absolute inset-0 w-full h-full z-0 block">
        <Image 
          src={banner}
          alt="Premium Rental Car Background" 
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none pointer-events-none"
        />
        {/* Dark Radial/Linear Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-[#030712]/85 to-[#030712] backdrop-blur-[1px]" />
      </div>

      {/* ─── 🧪 CYBERPUNK GLOW FLARES ─── */}
      {/* 💡 z-index পরিবর্তন করে z-1 করা হয়েছে যাতে মোবাইল ড্রপডাউন মেনু (z-50) এর নিচে থাকে */}
      <div className="absolute top-[-10%] left-[-10%] h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#00ffcc]/5 blur-[100px] sm:blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#00ffcc]/5 blur-[100px] sm:blur-[120px] pointer-events-none z-1" />

      {/* ─── 📐 DIGITAL MATRIX GRID LINES ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] pointer-events-none z-1" />

      {/* ─── 📝 HERO MAIN CONTENT ─── */}
      {/* 💡 z-2 ক্লাসের কারণে টেক্সট ব্যাকগ্রাউন্ডের ওপরে থাকবে কিন্তু মোবাইল মেনুর নিচে থাকবে */}
      <div className="relative z-2 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        
        {/* Next-Gen Badge (Optional - আপনি চাইলে কমেন্ট আউট আউট তুলে দিতে পারেন) */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 bg-[#00ffcc]/5 px-3 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#00ffcc] animate__animated animate__fadeIn">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
          <span>Next-Gen Rental Network Active</span>
        </div>

        {/* Dynamic Responsive Typography */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight sm:leading-none font-mono">
          RENT <span className="text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.4)]">RIDE</span> Platforms
        </h1>

        {/* Fluid Paragraph for Smaller Screens */}
        <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium px-2 sm:px-0">
          Architect your premium travel experience. Instant secure access to verified automotive listings, high-performance maintenance matrix logs, and tactical pricing structures.
        </p>

        {/* Core CTA Button */}
        <div className="pt-2 sm:pt-4">
          <Link 
            href="/cars" 
            className="group relative inline-flex items-center justify-center rounded-full bg-[#00ffcc] px-6 py-3 sm:px-8 sm:py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#00ffcc]/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,204,0.2)] hover:shadow-[0_0_40px_rgba(0,255,204,0.4)] font-mono"
          >
            Explore Cars
            <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

      </div>

      {/* Futuristic Bottom Neon Divider Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/20 to-transparent z-2" />
    </section>
   

    //    <section className="relative min-h-[85vh] w-11/12 mx-auto flex items-center justify-center overflow-hidden bg-[#030712] px-4 md:px-8 py-20">
      
    //   {/* 🚗 BACKGROUND IMAGE CONTAINER (Fixed with explicit positioning) */}
    //   <div className="absolute inset-0 w-full h-full z-0 block">
    //     <Image 
    //       src={banner}
    //       alt="Premium Rental Car Background" 
    //       fill
    //       priority
    //       sizes="100vw"
    //       className="object-cover object-center select-none pointer-events-none"
    //     />
       

    //     <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/60 via-[#030712]/80 to-[#030712] backdrop-blur-[2px]" />
    //   </div>

    //   {/*  (Z-Index Adjusted to stay behind text but above image) */}

    //   <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/10 blur-[120px] pointer-events-none z-10" />
    //   <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/10 blur-[120px] pointer-events-none z-10" />

      
    //   <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />

   
    //   <div className="relative z-20 max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
        
       
    //     {/* <div className="inline-flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 bg-[#00ffcc]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00ffcc]">
    //       <span className="flex h-1.5 w-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
    //       <span>Next-Gen Rental Network Active</span>
    //     </div> */}

      
    //     <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
    //        RENT <span className="text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.4)]">RIDE</span> Platforms
    //     </h1>

      
    //     <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
    //       Architect your premium travel experience. Instant secure access to verified automotive listings, high-performance maintenance matrix logs, and tactical pricing structures.
    //     </p>

        
    //     <div className="pt-4">
    //       <Link 
    //         href="/cars" 
    //         className="group relative inline-flex items-center justify-center rounded-full bg-[#00ffcc] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#00ffcc]/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,204,0.2)] hover:shadow-[0_0_40px_rgba(0,255,204,0.4)]"
    //       >
    //         Explore Cars
    //         <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
    //           →
    //         </span>
    //       </Link>
    //     </div>

    //   </div>

   
    //   <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/20 to-transparent z-20" />
    // </section>
      
  
  );
};

export default Banner;















// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import banner from "@/assets/banner.png";

// export default function Banner() {
//   return (
    // <section className="relative min-h-[85vh] w-11/12 mx-auto flex items-center justify-center overflow-hidden bg-[#030712] px-4 md:px-8 py-20">
      
    //   {/* 🚗 BACKGROUND IMAGE CONTAINER (Fixed with explicit positioning) */}
    //   <div className="absolute inset-0 w-full h-full z-0 block">
    //     <Image 
    //       src={banner}
    //       alt="Premium Rental Car Background" 
    //       fill
    //       priority
    //       sizes="100vw"
    //       className="object-cover object-center select-none pointer-events-none"
    //     />
       

    //     <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/60 via-[#030712]/80 to-[#030712] backdrop-blur-[2px]" />
    //   </div>

    //   {/*  (Z-Index Adjusted to stay behind text but above image) */}

    //   <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/10 blur-[120px] pointer-events-none z-10" />
    //   <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/10 blur-[120px] pointer-events-none z-10" />

      
    //   <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />

   
    //   <div className="relative z-20 max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
        
       
    //     <div className="inline-flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 bg-[#00ffcc]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00ffcc]">
    //       <span className="flex h-1.5 w-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
    //       <span>Next-Gen Rental Network Active</span>
    //     </div>

      
    //     <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
    //       Drive <span className="text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.4)]">Fleet</span> Platforms
    //     </h1>

      
    //     <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
    //       Architect your premium travel experience. Instant secure access to verified automotive listings, high-performance maintenance matrix logs, and tactical pricing structures.
    //     </p>

        
    //     <div className="pt-4">
    //       <Link 
    //         href="/cars" 
    //         className="group relative inline-flex items-center justify-center rounded-full bg-[#00ffcc] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#00ffcc]/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,204,0.2)] hover:shadow-[0_0_40px_rgba(0,255,204,0.4)]"
    //       >
    //         Explore Cars
    //         <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
    //           →
    //         </span>
    //       </Link>
    //     </div>

    //   </div>

   
    //   <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/20 to-transparent z-20" />
    // </section>
//   );
// }









