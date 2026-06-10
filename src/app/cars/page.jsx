


// "use client"

// import React, { useState } from 'react';

import Link from 'next/link';
import CarCard from '@/components/CarCard';
import { Alldata } from '@/Alldata';
// import { Alldata } from '@/Alldata';

//   const Alldata = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`);
//   const cars = await res.json();
  
//   return cars ||[]; 
// };



const AvailableCars =async () => {



//  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)
//   //  const res = await fetch("https://sever-car.vercel.app/cars")
//    const Cars = await res.json();



const Cars =await Alldata()
  // 

  
  
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
            {/* <div className="relative w-full sm:w-80 font-mono text-xs">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH BY NAME"
                className="w-full bg-[#090d16]/80 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3.5 placeholder-gray-600 focus:outline-none focus:border-[#00ffcc] focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300 uppercase tracking-wider"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div> */}

            <Link 
              href="/cars" 
              className="w-full sm:w-auto text-center text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-black border border-[#00ffcc]/20 hover:border-[#00ffcc] hover:bg-[#00ffcc] px-5 py-3.5 rounded-xl bg-[#00ffcc]/5 transition-all duration-300 whitespace-nowrap"
            >
              See Full Grid →
            </Link>
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





  //  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //           {filteredCars.map((car, index) => (
  //             <CarCard key={car._id || index} car={car} />
  //           ))}
  //         </div>



// import { Alldata } from '@/components/Alldata';
// const cars = Alldata();

//  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {cars?.map(car => 
//               <CarCard key={car._id || index} car={car} />
//             )}
//           </div>







// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import CarCard from '@/components/CarCard';

// export default function AvailableCars() {
//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState('') ;
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)
//       .then((res) => res.json())
//       .then((data) => {
//         setCars(data);
//         setFilteredCars(data); 
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error loading data pipeline inside AvailableCars:', err);
//         setLoading(false);
//       });
//   }, []);

 
//   useEffect(() => {
//     const query = searchQuery.toLowerCase().trim();
    
//     if (!query) {
//       setFilteredCars(cars); 
//     } else {
//       const filtered = cars.filter((car) => {
//         return (
//           car.carName?.toLowerCase().includes(query) ||
//           car.carType?.toLowerCase().includes(query) ||
//           car.pickupLocation?.toLowerCase().includes(query)
//         );
//       });
//       setFilteredCars(filtered);
//     }
//   }, [searchQuery, cars]);

//   return (
//     <section className="relative py-24 bg-[#030712] px-4 md:px-8 overflow-hidden w-full border-t border-white/5">
      
//       {/* 🔮 Background Futuristic Glow */}
//       <div className="absolute top-1/4 right-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto relative z-10">
        
//         {/* 📑 SECTION HEADER & SEARCH INPUT */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
//           <div className="space-y-2 text-center lg:text-left">
//             <div className="inline-block font-mono text-[10px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/30 pb-1">
//               Live Fleet Status
//             </div>
//             <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
//               Available <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Car Matrix</span>
//             </h2>
//             <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
//               Verified nodes currently active on the grid network. Ready for immediate deployment.
//             </p>
//           </div>

//           {/* ⚡ INTERACTIVE SEARCH BAR & REDIRECT LINK */}
//           <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
//             <div className="relative w-full sm:w-80 font-mono text-xs">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="SEARCH BY NAME"
//                 className="w-full bg-[#090d16]/80 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3.5 placeholder-gray-600 focus:outline-none focus:border-[#00ffcc] focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300 uppercase tracking-wider"
//               />
//               {searchQuery && (
//                 <button 
//                   onClick={() => setSearchQuery('')}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>

//             <Link 
//               href="/cars" 
//               className="w-full sm:w-auto text-center text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-black border border-[#00ffcc]/20 hover:border-[#00ffcc] hover:bg-[#00ffcc] px-5 py-3.5 rounded-xl bg-[#00ffcc]/5 transition-all duration-300 whitespace-nowrap"
//             >
//               See Full Grid →
//             </Link>
//           </div>
//         </div>

//         {/* 📦 DYNAMIC CARDS GRID */}
//         {loading ? (
//           /* ⏳ Loading State Skeleton */
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, idx) => (
//               <div 
//                 key={idx} 
//                 className="h-96 w-full bg-[#090d16]/20 border border-white/5 rounded-2xl animate-pulse flex items-center justify-center text-[10px] font-mono text-gray-600 tracking-widest"
//               >
//                 SYNCING NODE DATA...
//               </div>
//             ))}
//           </div>
//         ) : filteredCars.length > 0 ? (
//           /* 🏎️ Rendering Screen */
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCars.map((car, index) => (
//               <CarCard key={car._id || index} car={car} />
//             ))}
//           </div>
//         ) : (
//           /* ❌ Empty Search Result Screen */
//           <div className="border border-dashed border-white/10 rounded-2xl p-16 text-center max-w-xl mx-auto bg-[#090d16]/10 backdrop-blur-sm">
//             <span className="text-3xl block mb-3">📡</span>
//             <p className="font-mono text-xs text-rose-500 uppercase tracking-widest">NO ACTIVE NODES MATCHED</p>
//             <p className="text-[11px] text-gray-500 font-mono mt-1">
//               The request for "{searchQuery}" compiled 0 system returns. Try another parameter.
//             </p>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }





