
import React from 'react';
import CarCard from './CarCard';
import Link from 'next/link';
import { futurecars } from '@/Alldata';


//   const Alldata = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`);
//   const cars = await res.json();
  
//   return cars ||[]; 
// };

// const Alldata = async () => {
//   const res= await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)
//   const cars = await res.json();
//   return cars || [];
// }




const Future =async () => {
  
  // const cars =await Alldata()
  //  const res = await fetch("https://sever-car.vercel.app/cars")

  //  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)
  //  const cars = await res.json();


  // const cars = await Alldata()
  // console.log(cars);

  const cars = await futurecars();
  
  console.log(cars);

  //  const cars = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)
      // const cars=.then((res) => res.json())
  return (<div className="mt-4 sm:mt-10 w-full px-0 sm:px-4">
      {/* 💡 মোবাইলের জন্য rounded-none এবং প্যাডিং px-4 করা হয়েছে যাতে সাদা বর্ডার না আসে */}
      <section className="relative py-12 sm:py-20 md:py-24 bg-[#030712] px-4 sm:px-6 md:px-8 overflow-hidden w-full border-t border-white/5 rounded-none sm:rounded-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        
        {/* 🔮 Background Futuristic Glow */}
        <div className="absolute top-1/4 right-[-10%] h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full bg-[#00ffcc]/5 blur-[80px] sm:blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* 📑 SECTION HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2 text-center md:text-left">
              <div className="inline-block font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/30 pb-0.5 sm:pb-1">
                Live Fleet Status
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Explore Our <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Featured Cars</span>
              </h2>
            </div>

            {/* 💡 বোতামটি মোবাইলেও সুন্দর মানানসই দেখাবে */}
            <div className="flex justify-center md:shrink-0 w-full sm:w-auto">
              <Link 
                href="/cars" 
                className="w-full sm:w-auto text-center text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-black border border-[#00ffcc]/20 hover:border-[#00ffcc] hover:bg-[#00ffcc] px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#00ffcc]/5 transition-all duration-300 active:scale-95"
              >
                See All Cars
              </Link>
            </div>
          </div>

          {/* 🎴 CARS GRID */}
          {/* 💡 মোবাইলে একদম বর্ডার টু বর্ডার ফিট থাকার জন্য gap এবং padding ব্যালেন্স করা হয়েছে */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 px-1 sm:px-0">
            {cars?.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
            {/* {cars?.slice(0, 4).map((car) => (
              <CarCard key={car._id} car={car} />
            ))} */}
          </div>

        </div>
      </section>
    </div>




    // <div className="mt-10">
    //    <section className="relative py-24 bg-[#030712] px-4 md:px-8 overflow-hidden w-full border-t border-white/5  rounded-2xl">
      
    //   {/* 🔮 Background Futuristic Glow */}
    //   <div className="absolute top-1/4 right-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

    //   <div className="max-w-7xl mx-auto relative z-10">
        
    //     {/* 📑 SECTION HEADER */}
    //     <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
    //       <div className="space-y-2 text-center md:text-left">
    //         <div className="inline-block font-mono text-[10px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/30 pb-1">
    //           Live Fleet Status
    //         </div>
    //         <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
    //          Explore Our  <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Featured Cars</span>
    //         </h2>
    //         {/* <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
    //           Verified nodes currently active on the grid network. Ready for immediate deployment and data synchronization.
    //         </p> */}
    //       </div>

          
    //       <div className="flex justify-center">
    //         <Link 
    //           href="/cars" 
    //           className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-white border border-[#00ffcc]/20 hover:border-white px-5 py-2.5 rounded-xl bg-[#00ffcc]/5 transition-all duration-300"
    //         >
    //           See All Cars
    //         </Link>
    //       </div>
    //     </div>


    //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    //            {cars?.map((car) => (
    //            <CarCard key={car._id} car={car} />
    //            ))}
    //            {/* {cars?.slice(0, 4).map((car) => (
    //            <CarCard key={car._id} car={car} />
    //            ))} */}
    //                   </div>

       
       
       

    //   </div>
    // </section>
    // </div>
  );
};

export default Future;

















// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import CarCard from '@/components/CarCard';

// export default function AvailableCars() {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // fetch('/data.json')
//     // fetch(process.env.NEXT_PUBLIC_ALL_CARS_API)
//     fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Data in Home:", data); 

        
//         const available = data.filter(car => {
          
//           if (!car.availability) return true; 
//           return car.availability.toLowerCase() === 'available';
//         });

  
//         const finalCars = available.length > 0 ? available : data;
        
//         setCars(finalCars.slice(0, 4));
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error loading data pipeline:', err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <section className="relative py-24 bg-[#030712] px-4 md:px-8 overflow-hidden w-full border-t border-white/5">
      
//       {/* 🔮 Background Futuristic Glow */}
//       <div className="absolute top-1/4 right-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto relative z-10">
        
//         {/* 📑 SECTION HEADER */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
//           <div className="space-y-2 text-center md:text-left">
//             <div className="inline-block font-mono text-[10px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/30 pb-1">
//               Live Fleet Status
//             </div>
//             <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
//               Available <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Car Matrix</span>
//             </h2>
//             <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
//               Verified nodes currently active on the grid network. Ready for immediate deployment and data synchronization.
//             </p>
//           </div>

          
//           <div className="flex justify-center">
//             <Link 
//               href="/cars" 
//               className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-white border border-[#00ffcc]/20 hover:border-white px-5 py-2.5 rounded-xl bg-[#00ffcc]/5 transition-all duration-300"
//             >
//               See Full Grid →
//             </Link>
//           </div>
//         </div>

       
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[...Array(4)].map((_, idx) => (
//               <div 
//                 key={idx} 
//                 className="h-96 w-full bg-[#090d16]/20 border border-white/5 rounded-2xl animate-pulse flex items-center justify-center text-[10px] font-mono text-gray-600 tracking-widest"
//               >
//                 SYNCING NODE DATA...
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {cars.map((car, index) => (
//               <CarCard key={car._id || index} car={car} />
//             ))}
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }














// // 'use client';

// // import { useState, useEffect } from 'react';
// // import CarCard from '@/components/CarCard'; // আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী ইমপোর্ট করুন

// // export default function FutureSection() {
// //   const [cars, setCars] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // 📂 public/data.json থেকে ডাটা ফেচ করার মেকানিজম
// //   useEffect(() => {
// //     fetch('/data.json')
// //       .then((res) => res.json())
// //       .then((data) => {
// //         // রিকোয়ারমেন্ট অনুযায়ী হোম পেজে শুধু প্রথম ৪টি কার দেখানোর জন্য slice করা হলো
// //         setCars(data.slice(0, 4));
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error('Error loading data pipeline:', err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   return (
// //     <section className="relative py-24 bg-[#030712] px-4 md:px-8 overflow-hidden w-full">
      
// //       {/* 🔮 Background Glowing Core */}
// //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

// //       <div className="max-w-7xl mx-auto relative z-10">
        
// //         {/* 📑 SECTION HEADER */}
// //         <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
// //           <div className="inline-block font-mono text-[10px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/30 pb-1">
// //             Core Architecture
// //           </div>
// //           <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
// //             Ecosystem of <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">The Future</span>
// //           </h2>
// //           <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
// //             DriveFleet bridges premium automotive scale with tactical infrastructure protocols to deliver absolute performance.
// //           </p>
// //         </div>

// //         {/* ⏳ LOADING SKELETON STATE */}
// //         {loading ? (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {[1, 2, 3, 4].map((n) => (
// //               <div key={n} className="h-96 bg-[#090d16]/40 border border-white/5 rounded-2xl animate-pulse" />
// //             ))}
// //           </div>
// //         ) : (
// //           /* 📦 4-COLUMNS FEATURE CARDS GRID (USING CAR CARD) */
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {cars.map((car, index) => (
// //               // এখানে আমাদের রিইউজেবল CarCard কম্পোনেন্টটি কল করা হয়েছে
// //               <CarCard key={car._id || index} car={car} />
// //             ))}
// //           </div>
// //         )}

// //       </div>
// //     </section>
// //   );
// // }











// // 'use client';

// // import Image from 'next/image';

// // export default function FutureSection() {
// //   const features = [
// //     {
// //       id: '01',
// //       title: 'Hyper-Sport',
// //       description: 'Experience raw aerodynamic performance equipped with elite cybernetic stability control.',
// //       tag: 'TRACK READY',
// //       imgSrc: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=500&auto=format&fit=crop&q=80'
// //     },
// //     {
// //       id: '02',
// //       title: 'Cyber SUV',
// //       description: 'Maximum torque meets tactical armored architecture. Built for absolute deployment offroad.',
// //       tag: 'OFFROAD V2',
// //       imgSrc: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=80'
// //     },
// //     {
// //       id: '03',
// //       title: 'Autonomous Grand',
// //       description: 'Premium AI autopilot node with active neural networks ensuring zero-stress navigation cycles.',
// //       tag: 'AI AUTOPILOT',
// //       imgSrc: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80'
// //     },
// //     {
// //       id: '04',
// //       title: 'Quantum Electric',
// //       description: 'Next-gen solid-state battery cores delivering sustained mega-watt cell output logs.',
// //       tag: 'SOLID STATE',
// //       imgSrc: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=80'
// //     }
// //   ];

// //   return (
// //     <section className="relative py-24 bg-[#030712] px-4 md:px-8 overflow-hidden w-full">
      
// //       {/* 🔮 Background Glowing Core */}
// //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

// //       <div className="max-w-7xl mx-auto relative z-10">
        
// //         {/* 📑 SECTION HEADER */}
// //         <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
// //           <div className="inline-block font-mono text-[10px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/30 pb-1">
// //             Core Architecture
// //           </div>
// //           <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
// //             Ecosystem of <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">The Future</span>
// //           </h2>
// //           <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
// //             DriveFleet bridges premium automotive scale with tactical infrastructure protocols to deliver absolute performance.
// //           </p>
// //         </div>

// //         {/* 📦 4-COLUMNS FEATURE CARDS GRID */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //           {features.map((item) => (
// //             <div 
// //               key={item.id} 
// //               className="group relative bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden hover:border-[#00ffcc]/30 transition-all duration-500 backdrop-blur-xl flex flex-col justify-between"
// //             >
// //               {/* Card Top Border Accent Glow */}
// //               <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

// //               <div>
// //                 {/* 🚗 CAR IMAGE CONTAINER */}
// //                 <div className="relative w-full h-44 overflow-hidden bg-[#030712]">
// //                   {/* Image Overlay Grid Effect */}
// //                   <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent z-10 opacity-80" />
// //                   <img 
// //                     src={item.imgSrc}
// //                     alt={item.title}
// //                     className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out select-none"
// //                   />
// //                   {/* Floating Tag */}
// //                   <span className="absolute top-3 right-3 z-20 font-mono text-[8px] uppercase tracking-widest text-[#00ffcc] bg-[#030712]/80 border border-[#00ffcc]/20 px-2 py-0.5 rounded-md backdrop-blur-md">
// //                     {item.tag}
// //                   </span>
// //                 </div>

// //                 {/* 📝 CARD CONTENT */}
// //                 <div className="p-5 md:p-6 space-y-2">
// //                   <div className="flex items-center space-x-2">
// //                     <span className="font-mono text-xs font-bold text-[#00ffcc]/40">
// //                       {item.id}
// //                     </span>
// //                     <h3 className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-[#00ffcc] transition-colors duration-300">
// //                       {item.title}
// //                     </h3>
// //                   </div>
// //                   <p className="text-[11px] text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
// //                     {item.description}
// //                   </p>
// //                 </div>
// //               </div>

// //               {/* 🎯 CARD BOTTOM ARROW */}
// //               <div className="p-5 pt-0 flex items-center justify-end text-white/10 group-hover:text-[#00ffcc] transition-colors duration-300">
// //                 <span className="text-[9px] font-mono opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-2 uppercase tracking-widest">
// //                   Initialize
// //                 </span>
// //                 <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
// //                 </svg>
// //               </div>

// //             </div>
// //           ))}
// //         </div>

// //       </div>
// //     </section>
// //   );
// // }












// // // 'use client';

// // // export default function FutureSection() {
// // //   const features = [
// // //     {
// // //       id: '01',
// // //       title: 'Autonomous Ecosystem',
// // //       description: 'Next-gen vehicle nodes integrated with smart real-time tracking metrics and autopilot configurations.',
// // //       tag: 'AI DRIVEN'
// // //     },
// // //     {
// // //       id: '02',
// // //       title: 'Cyber Security Vault',
// // //       description: 'Bulletproof JWT authentication and server lockouts ensuring total privacy of transactional data pipeline.',
// // //       tag: 'SECURE'
// // //     },
// // //     {
// // //       id: '03',
// // //       title: 'Absolute Pricing Matrix',
// // //       description: 'Zero hidden protocols. Advanced dynamic cost estimation scaled perfectly to your deployment route.',
// // //       tag: 'INTEGRATED'
// // //     }
// // //   ];

// // //   return (
// // //     <section className="relative py-24 bg-[#030712] px-4 md:px-8 overflow-hidden w-full">
      
// // //       {/* 🔮 Background Glowing Core */}
// // //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

// // //       <div className="max-w-7xl mx-auto relative z-10">
        
// // //         {/* 📑 SECTION HEADER */}
// // //         <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
// // //           <div className="inline-block font-mono text-[10px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/30 pb-1">
// // //             Core Architecture
// // //           </div>
// // //           <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
// // //             Ecosystem of <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">The Future</span>
// // //           </h2>
// // //           <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
// // //             DriveFleet bridges premium automotive scale with tactical infrastructure protocols to deliver absolute performance.
// // //           </p>
// // //         </div>

// // //         {/* 📦 FEATURE CARDS GRID */}
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //           {features.map((item) => (
// // //             <div 
// // //               key={item.id} 
// // //               className="group relative bg-[#090d16]/60 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-[#00ffcc]/30 transition-all duration-500 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
// // //             >
// // //               {/* Card Top Border Accent Glow */}
// // //               <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

// // //               <div>
// // //                 {/* Number & Tagline Row */}
// // //                 <div className="flex items-center justify-between mb-6">
// // //                   <span className="font-mono text-3xl font-black text-white/5 group-hover:text-[#00ffcc]/20 transition-colors duration-500">
// // //                     {item.id}
// // //                   </span>
// // //                   <span className="font-mono text-[9px] uppercase tracking-widest text-[#00ffcc]/70 bg-[#00ffcc]/5 border border-[#00ffcc]/10 px-2 py-0.5 rounded">
// // //                     {item.tag}
// // //                   </span>
// // //                 </div>

// // //                 {/* Title */}
// // //                 <h3 className="text-base font-bold uppercase tracking-wider text-white group-hover:text-[#00ffcc] transition-colors duration-300 mb-3">
// // //                   {item.title}
// // //                 </h3>

// // //                 {/* Description */}
// // //                 <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
// // //                   {item.description}
// // //                 </p>
// // //               </div>

// // //               {/* Interactive Bottom Arrow Indicator */}
// // //               <div className="pt-6 flex items-center justify-end text-white/20 group-hover:text-[#00ffcc] transition-colors duration-300">
// // //                 <span className="text-xs font-mono opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-2 uppercase tracking-widest">
// // //                   Initialize
// // //                 </span>
// // //                 <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
// // //                 </svg>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //       </div>
// // //     </section>
// // //   );
// // // }