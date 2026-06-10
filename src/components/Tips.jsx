

'use client';

import React from 'react';
import CarCard from './CarCard';

const Tips = () => {
  const tips = [
    {
      id: '01',
      icon: '🛡️',
      title: 'Verify Vehicle Log',
      description: 'Always cross-check the digital maintenance matrix and tire pressure metrics before launching your trip sequence.',
    },
    {
      id: '02',
      icon: '⚡',
      title: 'Optimize Smart Eco',
      description: 'Engage the AI cruise mode on highways to optimize cell draining and fuel management efficiency loops.',
    },
    {
      id: '03',
      icon: '🗺️',
      title: 'Sync Live GPS Matrix',
      description: 'Download offline local maps and sync the dashboard telemetry link to bypass satellite blackout zones.',
    },
    {
      id: '04',
      icon: '📞',
      title: '24/7 Node Support',
      description: 'In case of grid structural anomalies or unexpected tire failure, activate the SOS terminal in your bookings log.',
    },
  ];

  return (
    <section className="relative py-20 bg-[#030712] text-white rounded-2xl my-10 px-6 md:px-12 overflow-hidden border border-[#00ffcc]/10 shadow-2xl w-11/12 mx-auto">


      <div className="absolute inset-0 z-0 pointer-events-none select-none">

        <div className="inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]" />


        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#00ffcc]/5 blur-[100px]" />
      </div>


      <div className="relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          {/*  */}

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
           Rent <span className="text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.3)]"> Ride</span> Pro Tips
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Optimize your premium rental experience with our advanced vehicle grid system instructions.
          </p>
        </div>

        {/* Grid Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className=" bg-[#090d1a]/40 backdrop-blur-md p-6 rounded-xl border border-gray-800 
                shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              {/* Top Row: Icon & ID */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-2xl p-2.5 bg-gray-900/80 rounded-lg border border-gray-800 group-hover:border-[#00ffcc]/30 transition-colors duration-300">
                  {tip.icon}
                </span>
                <span className="text-[10px] font-mono text-[#00ffcc]/60 font-bold tracking-widest">
                  SYS // {tip.id}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-base font-bold uppercase tracking-wide text-gray-100 group-hover:text-[#00ffcc] transition-colors duration-200">
                {tip.title}
              </h3>
              <p className="mt-2 text-xs text-gray-400 leading-relaxed font-medium">
                {tip.description}
              </p>

              {/* Bottom Neon Glow Strip */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ffcc]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl" />
            </div>
          ))}
        </div>

      </div>


      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/10 to-transparent z-10" />
    </section>
  );
};

export default Tips;



// 'use client';

// import React from 'react';

// export default function TipsSection() {
//   const tips = [
//     {
//       id: '01',
//       icon: '🛡️',
//       title: 'Verify Vehicle Log',
//       description: 'Always cross-check the digital maintenance matrix and tire pressure metrics before launching your trip sequence.',
//     },
//     {
//       id: '02',
//       icon: '⚡',
//       title: 'Optimize Smart Eco',
//       description: 'Engage the AI cruise mode on highways to optimize cell draining and fuel management efficiency loops.',
//     },
//     {
//       id: '03',
//       icon: '🗺️',
//       title: 'Sync Live GPS Matrix',
//       description: 'Download offline local maps and sync the dashboard telemetry link to bypass satellite blackout zones.',
//     },
//     {
//       id: '04',
//       icon: '📞',
//       title: '24/7 Node Support',
//       description: 'In case of grid structural anomalies or unexpected tire failure, activate the SOS terminal in your bookings log.',
//     },
//   ];

//   return (
//     <section className="py-16 bg-slate-900 text-white rounded-2xl my-10 px-6 md:px-12 shadow-xl border border-slate-800">
//       {/* Section Header */}
//       <div className="text-center max-w-2xl mx-auto mb-12">
//         <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//           DriveFleet Pro Tips
//         </h2>
//         <p className="mt-3 text-slate-400 text-sm md:text-base">
//           Optimize your rental experience with our advanced vehicle grid system instructions.
//         </p>
//       </div>

//       {/* Grid Cards Container */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {tips.map((tip) => (
//           <div
//             key={tip.id}
//             className="relative group bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
//           >
//             {/* Top Row: Icon & ID */}
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-3xl p-2 bg-slate-700/40 rounded-lg group-hover:scale-110 transition-transform duration-300">
//                 {tip.icon}
//               </span>
//               <span className="text-xs font-mono text-cyan-400/70 font-bold tracking-widest">
//                 NODE // {tip.id}
//               </span>
//             </div>

//             {/* Content */}
//             <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors duration-200">
//               {tip.title}
//             </h3>
//             <p className="mt-2 text-sm text-slate-400 leading-relaxed">
//               {tip.description}
//             </p>

//             {/* Bottom Glow Effect (Cyberpunk Style) */}
//             <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl" />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }










//  {loading ? (
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