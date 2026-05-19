


'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CarDetails({ params }) {
  const [carId, setCarId] = useState(null);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // মোডাল ওপেন/ক্লোজ স্টেট
  const [isBooked, setIsBooked] = useState(false); // বুকিং সাকসেস স্টেট

  // 🔄 Next.js ডায়নামিক রাউট params আনর্যাপ করা
  useEffect(() => {
    Promise.resolve(params).then((resolvedParams) => {
      if (resolvedParams?.id) {
        setCarId(resolvedParams.id);
      } else {
        setLoading(false);
      }
    });
  }, [params]);

  // 📡 আইডি অনুযায়ী public/data.json থেকে সুনির্দিষ্ট কার লোড করা
  useEffect(() => {
    if (!carId) return;

    fetch(process.env.NEXT_PUBLIC_SINGLE_CARS_API + `/${carId}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Matrix Pipeline Error:', err);
        setLoading(false);
      });
  }, [carId]);

  // 🎯 বুকিং ফর্ম সাবমিশন ফাংশনালিটি
  const handleBookingConfirm = (e) => {
    e.preventDefault();
    setIsBooked(true); // সাকসেস স্ক্রিন দেখাবে
    
    // ২ সেকেন্ড পর মোডাল অটো বন্ধ করে স্টেট রিসেট করবে
    setTimeout(() => {
      setIsModalOpen(false);
      setIsBooked(false);
    }, 2000);
  };




  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] tracking-widest">
        LOADING CAR CONFIGURATION MATRIX...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-white space-y-4 font-mono">
        <p className="text-sm text-rose-500">❌ NODE_NOT_FOUND: 404</p>
        <p className="text-[10px] text-gray-500">Requested ID: {carId || 'Null'}</p>
        <Link href="/" className="text-xs text-[#00ffcc] underline tracking-wider mt-2">
          RETURN TO FLEET GRID
        </Link>
      </div>
    );
  }

  const isAvailable = car.availabilityStatus === 'Available';

  return (
    <main className="min-h-screen bg-[#030712] text-white py-20 px-4 md:px-8 relative overflow-hidden">
      {/* 🔮 Background Futuristic Aesthetic Glow */}
      <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        
        {/* 🔙 BACK NAVIGATION */}
        <Link href="/" className="inline-flex items-center text-xs font-mono text-gray-400 hover:text-[#00ffcc] transition-colors gap-2 group">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> BACK TO FLEET GRID
        </Link>

        {/* 🚙 TWO-COLUMN COMPREHENSIVE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: IMAGE TERMINAL PANEL */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#090d16]/60 backdrop-blur-md p-2">
            <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden bg-[#030712]">
              <img src={car.image} alt={car.carName} className="w-full h-full object-cover select-none" />
              {/* Dynamic Status Badge */}
              <span className={`absolute top-4 left-4 font-mono text-[10px] tracking-widest border px-3 py-1 rounded-md backdrop-blur-md ${
                isAvailable ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}>
                {car.availabilityStatus}
              </span>
            </div>
          </div>

          {/* RIGHT: COMPONENT SPECIFICATION INFO */}
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs text-[#00ffcc] uppercase tracking-widest">{car.carType} Category</span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1">{car.carName}</h1>
            </div>

            {/* 📝 DESCRIPTION PANEL */}
            <div className="border-l-2 border-[#00ffcc]/30 pl-4 py-1">
              <p className="text-sm text-gray-400 leading-relaxed font-sans">{car.description}</p>
            </div>

            {/* 💰 COST RATE TERMINAL */}
            <div className="bg-[#090d16]/80 border border-white/5 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 uppercase">Deployment Cost</span>
              <p className="text-2xl font-black text-[#00ffcc]">
                ${car.dailyPrice}<span className="text-xs text-gray-500 font-mono font-normal"> / 24 HOUR LEASE</span>
              </p>
            </div>

            {/* 📊 ALL DETAILS INFO (GRID SYSTEM) */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">System Parameters</h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
                  <span className="text-gray-500 text-[10px] uppercase">Registry Node</span>
                  <span className="text-white font-bold mt-1">🆔 {car._id}</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
                  <span className="text-gray-500 text-[10px] uppercase">Terminal Hub</span>
                  <span className="text-white font-bold mt-1">📍 {car.pickupLocation}</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
                  <span className="text-gray-500 text-[10px] uppercase">Passenger Limit</span>
                  <span className="text-white font-bold mt-1">👥 {car.seatCapacity} Persons</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
                  <span className="text-gray-500 text-[10px] uppercase">Encryption Status</span>
                  <span className="text-emerald-400 font-bold mt-1">🔒 Secured Terminal</span>
                </div>
              </div>
            </div>

            {/* 🛡️ SECURITY & DISPATCH CONDITIONS */}
            <div className="space-y-2 text-[11px] text-gray-400 font-mono bg-[#090d16]/30 border border-white/5 p-3 rounded-xl">
              <p className="flex items-center gap-2">⚡ <span className="text-gray-300">Instant tracking protocol active on dispatch.</span></p>
              <p className="flex items-center gap-2">⚡ <span className="text-gray-300">Premium comprehensive grid protection coverage included.</span></p>
            </div>

            {/* 🛑 INTERACTIVE BOOK NOW BUTTON */}
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!isAvailable}
              className={`w-full font-black uppercase text-sm py-4 rounded-xl tracking-widest transition-all duration-300 ${
                isAvailable
                  ? 'bg-[#00ffcc] hover:bg-[#00ffcc]/90 text-black shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:shadow-[0_0_35px_rgba(0,255,204,0.4)]'
                  : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
              }`}
            >
              {isAvailable ? 'Initialize Deployment (Book Now)' : 'Node Locked / Unavailable'}
            </button>
          </div>
        </div>
      </div>

      {/* 🔮 MODAL SYSTEM BLOCK */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#090d16] border border-white/10 p-6 rounded-2xl max-w-md w-full relative space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Modal Exit Custom Trigger */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white font-mono text-sm transition-colors"
            >
              ✕
            </button>

            {isBooked ? (
              /* Success Deployment Matrix */
              <div className="text-center py-8 space-y-3">
                <div className="text-4xl animate-bounce">⚡</div>
                <h3 className="text-xl font-black uppercase text-[#00ffcc] tracking-wide">Node Allocated!</h3>
                <p className="text-xs font-mono text-gray-400">Your lease protocol has been securely compiled into our system.</p>
              </div>
            ) : (
              /* Form Inputs */
              <>
                <div className="space-y-1 font-mono">
                  <span className="text-[10px] text-[#00ffcc] uppercase tracking-widest">Protocol Setup</span>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-white">Confirm Node Lease</h2>
                  <p className="text-xs text-gray-400">Reviewing registry parameters for <span className="text-white font-bold">{car.carName}</span></p>
                </div>

                <form onSubmit={handleBookingConfirm} className="space-y-4 font-mono text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-500 block">User Node Identifier (Full Name)</label>
                    <input required type="text" placeholder="Farhad Ahmed" className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc] transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-500 block">Communication Channel (Email)</label>
                    <input required type="email" placeholder="farhad@example.com" className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc] transition-colors" />
                  </div>
                  
                  {/* Calculation Box */}
                  <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center">
                    <span className="text-gray-400">Rate Summary (Per Day):</span>
                    <span className="text-[#00ffcc] font-black text-sm">${car.dailyPrice} USD</span>
                  </div>

                  <button type="submit" className="w-full bg-[#00ffcc] hover:bg-[#00ffcc]/90 text-black font-black uppercase py-3.5 rounded-xl tracking-wider transition-colors shadow-[0_0_15px_rgba(0,255,204,0.1)]">
                    Confirm Secure Lease
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}













































// // 'use client';

// // import { useEffect, useState, use } from 'react';
// // import Link from 'next/link';

// // export default function CarDetails({ params: paramsPromise }) {
// //   // Next.js এর ডাইনামিক আইডি রিসিভ করার জন্য (Safe use mechanism)
// //   const params = use(paramsPromise);
// //   const carId = params.id;

// //   const [car, setCar] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [isModalOpen, setIsModalOpen] = useState(false); // বুকিং মোডাল স্টেট
// //   const [isBooked, setIsBooked] = useState(false); // বুকিং সাকসেস স্টেট

// //   // 📡 ডাটাবেস/json থেকে নির্দিষ্ট গাড়িটি খুঁজে বের করার লজিক
// //   useEffect(() => {
// //     fetch('/data.json')
// //       .then((res) => res.json())
// //       .then((data) => {
// //         const foundCar = data.find((item) => item._id === carId);
// //         setCar(foundCar);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error('Error fetching car specs:', err);
// //         setLoading(false);
// //       });
// //   }, [carId]);

// //   // 🎯 বুকিং ফাংশনালিটি হ্যান্ডলার
// //   const handleBookingConfirm = (e) => {
// //     e.preventDefault();
// //     // এখানে ফিউচারে এপিআই কল (POST request) যুক্ত করতে পারবেন
// //     setIsBooked(true);
// //     setTimeout(() => {
// //       setIsModalOpen(false);
// //       setIsBooked(false);
// //     }, 2000); // ২ সেকেন্ড পর অটো মোডাল বন্ধ হবে
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] tracking-widest">
// //         LOADING SPECIFICATION MATRIX...
// //       </div>
// //     );
// //   }

// //   if (!car) {
// //     return (
// //       <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-white space-y-4">
// //         <p className="text-sm font-mono text-rose-500">❌ NODE_NOT_FOUND: 404</p>
// //         <Link href="/" className="text-xs font-mono text-[#00ffcc] underline">Return to Grid Grid</Link>
// //       </div>
// //     );
// //   }

// //   return (
// //     <main className="min-h-screen bg-[#030712] text-white py-20 px-4 md:px-8 relative overflow-hidden">
// //       {/* 🔮 Futuristic Cyber Glow */}
// //       <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[180px] pointer-events-none" />

// //       <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        
// //         {/* 🔙 BACK NAVIGATION */}
// //         <Link href="/" className="inline-flex items-center text-xs font-mono text-gray-400 hover:text-[#00ffcc] transition-colors gap-2 group">
// //           <span className="transform group-hover:-translate-x-1 transition-transform">←</span> BACK TO FLEET GRID
// //         </Link>

// //         {/* 🚙 TWO-COLUMN DETAILS LAYOUT */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
// //           {/* LEFT: IMAGE TERMINAL */}
// //           <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#090d16]/60 backdrop-blur-md p-2">
// //             <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden">
// //               <img src={car.img} alt={car.name} className="w-full h-full object-cover" />
// //               <span className="absolute top-4 left-4 font-mono text-[10px] tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-md backdrop-blur-md">
// //                 {car.availability}
// //               </span>
// //             </div>
// //           </div>

// //           {/* RIGHT: INFO DATA PANELS */}
// //           <div className="space-y-6">
// //             <div>
// //               <span className="font-mono text-xs text-[#00ffcc] uppercase tracking-widest">{car.brand} Fleet</span>
// //               <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1">{car.name}</h1>
// //             </div>

// //             {/* RATE DISPLAY */}
// //             <div className="bg-[#090d16]/80 border border-white/5 rounded-xl p-4 flex items-center justify-between">
// //               <span className="text-xs font-mono text-gray-400 uppercase">Deployment Rate</span>
// //               <p className="text-2xl font-black text-[#00ffcc]">
// //                 ${car.pricePerDay}<span className="text-xs text-gray-500 font-mono font-normal"> / 24 HR CYCLE</span>
// //               </p>
// //             </div>

// //             {/* TECH SPECIFICATIONS GRID */}
// //             <div className="space-y-3">
// //               <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">System Specifications</h3>
// //               <div className="grid grid-cols-2 gap-3 font-mono text-xs">
// //                 <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
// //                   <span className="text-gray-500 text-[10px] uppercase">Transmission</span>
// //                   <span className="text-white font-bold mt-1">⚙️ {car.transmission}</span>
// //                 </div>
// //                 <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
// //                   <span className="text-gray-500 text-[10px] uppercase">Propulsion System</span>
// //                   <span className="text-white font-bold mt-1">⛽ {car.fuelType}</span>
// //                 </div>
// //                 <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
// //                   <span className="text-gray-500 text-[10px] uppercase">Core Registry</span>
// //                   <span className="text-white font-bold mt-1">🆔 {car._id}</span>
// //                 </div>
// //                 <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
// //                   <span className="text-gray-500 text-[10px] uppercase">GPS Synchronization</span>
// //                   <span className="text-emerald-400 font-bold mt-1">📡 Active</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* INCLUDED PROTOCOLS / SECURITY TERMS */}
// //             <div className="space-y-2 text-xs text-gray-400 font-mono border-t border-white/5 pt-4">
// //               <p className="flex items-center gap-2">✅ <span className="text-gray-300">Premium Grid Insurance Included</span></p>
// //               <p className="flex items-center gap-2">✅ <span className="text-gray-300">Full Battery Charge / Fuel Tank On Node Delivery</span></p>
// //             </div>

// //             {/* ⚡ BOOK NOW ACTION BUTTON */}
// //             <button
// //               onClick={() => setIsModalOpen(true)}
// //               className="w-full bg-[#00ffcc] hover:bg-[#00ffcc]/90 text-black font-black uppercase text-sm py-4 rounded-xl tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:shadow-[0_0_35px_rgba(0,255,204,0.4)]"
// //             >
// //               Initialize Deployment (Book Now)
// //             </button>
// //           </div>
// //         </div>

// //       </div>

// //       {/* 🔮 INTERACTIVE MODAL INTERFACE */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
// //           <div className="bg-[#090d16] border border-white/10 p-6 rounded-2xl max-w-md w-full relative space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
// //             {/* Modal Close Icon */}
// //             <button 
// //               onClick={() => setIsModalOpen(false)}
// //               className="absolute top-4 right-4 text-gray-400 hover:text-white font-mono text-sm"
// //             >
// //               ✕
// //             </button>

// //             {isBooked ? (
// //               /* Success Pipeline Display */
// //               <div className="text-center py-8 space-y-3">
// //                 <div className="text-4xl animate-bounce">⚡</div>
// //                 <h3 className="text-xl font-black uppercase text-[#00ffcc]">Node Allocated!</h3>
// //                 <p className="text-xs font-mono text-gray-400">Your request has been compiled into the secure registry.</p>
// //               </div>
// //             ) : (
// //               /* Dynamic Form Area */
// //               <>
// //                 <div className="space-y-1">
// //                   <span className="text-[10px] font-mono text-[#00ffcc] uppercase tracking-widest">Protocol Setup</span>
// //                   <h2 className="text-xl font-bold uppercase tracking-tight text-white">Confirm Node Lease</h2>
// //                   <p className="text-xs text-gray-400">Review specs for <span className="text-white font-bold">{car.name}</span> before deployment.</p>
// //                 </div>

// //                 <form onSubmit={handleBookingConfirm} className="space-y-4 font-mono text-xs">
// //                   <div className="space-y-1">
// //                     <label className="text-gray-500 block">User Node Identifier (Full Name)</label>
// //                     <input required type="text" placeholder="John Doe" className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc]" />
// //                   </div>
// //                   <div className="space-y-1">
// //                     <label className="text-gray-500 block">Comms Channel (Email)</label>
// //                     <input required type="email" placeholder="john@grid.com" className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc]" />
// //                   </div>
                  
// //                   <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center">
// //                     <span className="text-gray-400">Total Calculation:</span>
// //                     <span className="text-white font-bold text-sm">${car.pricePerDay} USD</span>
// //                   </div>

// //                   <button
// //                     type="submit"
// //                     className="w-full bg-[#00ffcc] hover:bg-[#00ffcc]/90 text-black font-black uppercase py-3.5 rounded-xl tracking-wider transition-colors"
// //                   >
// //                     Confirm Secure Lease
// //                   </button>
// //                 </form>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </main>
// //   );
// // }