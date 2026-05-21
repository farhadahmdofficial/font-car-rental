

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CarCard from '@/components/CarCard';

export default function AvailableCars() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]); // 🔎 ফিল্টার করা ডাটা রাখার জন্য স্টেট
  const [searchQuery, setSearchQuery] = useState(''); // 📝 সার্চ টেক্সট স্টেট
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_ALL_CARS_API)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(data); // শুরুতে সব গাড়িই ফিল্টারড লিস্টে থাকবে
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading data pipeline inside AvailableCars:', err);
        setLoading(false);
      });
  }, []);

  // 🎯 রিয়াল-টাইম লাইভ সার্চ লজিক
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) {
      setFilteredCars(cars); // সার্চ ফাকা থাকলে সব কার দেখাবে
    } else {
      const filtered = cars.filter((car) => {
        return (
          car.carName?.toLowerCase().includes(query) ||
          car.carType?.toLowerCase().includes(query) ||
          car.pickupLocation?.toLowerCase().includes(query)
        );
      });
      setFilteredCars(filtered);
    }
  }, [searchQuery, cars]);

  return (
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
              Available <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Car Matrix</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Verified nodes currently active on the grid network. Ready for immediate deployment.
            </p>
          </div>

          {/* ⚡ INTERACTIVE SEARCH BAR & REDIRECT LINK */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-80 font-mono text-xs">
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
            </div>

            <Link 
              href="/cars" 
              className="w-full sm:w-auto text-center text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-black border border-[#00ffcc]/20 hover:border-[#00ffcc] hover:bg-[#00ffcc] px-5 py-3.5 rounded-xl bg-[#00ffcc]/5 transition-all duration-300 whitespace-nowrap"
            >
              See Full Grid →
            </Link>
          </div>
        </div>

        {/* 📦 DYNAMIC CARDS GRID */}
        {loading ? (
          /* ⏳ Loading State Skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div 
                key={idx} 
                className="h-96 w-full bg-[#090d16]/20 border border-white/5 rounded-2xl animate-pulse flex items-center justify-center text-[10px] font-mono text-gray-600 tracking-widest"
              >
                SYNCING NODE DATA...
              </div>
            ))}
          </div>
        ) : filteredCars.length > 0 ? (
          /* 🏎️ Rendering Screen */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, index) => (
              <CarCard key={car._id || index} car={car} />
            ))}
          </div>
        ) : (
          /* ❌ Empty Search Result Screen */
          <div className="border border-dashed border-white/10 rounded-2xl p-16 text-center max-w-xl mx-auto bg-[#090d16]/10 backdrop-blur-sm">
            <span className="text-3xl block mb-3">📡</span>
            <p className="font-mono text-xs text-rose-500 uppercase tracking-widest">NO ACTIVE NODES MATCHED</p>
            <p className="text-[11px] text-gray-500 font-mono mt-1">
              The request for "{searchQuery}" compiled 0 system returns. Try another parameter.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}



















// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import CarCard from '@/components/CarCard'; // পাথ ঠিক আছে কিনা তা নিশ্চিত করুন

// export default function AvailableCars() {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // fetch('/data.json')
//     fetch(process.env.NEXT_PUBLIC_ALL_CARS_API)
//       .then((res) => res.json())
//       .then((data) => {
//         // 🚀 কোনো স্লাইস বা ফিল্টার ছাড়া সরাসরি সম্পূর্ণ ডাটা সেটে রাখা হলো
//         setCars(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error loading data pipeline inside AvailableCars:', err);
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

//           {/* See All Redirect Link */}
//           <div className="flex justify-center">
//             <Link 
//               href="/cars" 
//               className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-white border border-[#00ffcc]/20 hover:border-white px-5 py-2.5 rounded-xl bg-[#00ffcc]/5 transition-all duration-300"
//             >
//               See Full Grid →
//             </Link>
//           </div>
//         </div>

//         {/* 📦 DYNAMIC CARDS GRID */}
//         {loading ? (
//           // ⏳ লোডিং স্টেট স্কেলেটন (কার্ড আসার আগ পর্যন্ত ৬টি ব্ল্যাঙ্ক কার্ড দেখাবে)
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
//         ) : (
//           // 🏎️ রেন্ডারিং গ্রিড (এখানে ৩ কলামের গ্রিডে আপনার data.json এর সব কার শো করবে)
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {cars.map((car, index) => (
//               <CarCard key={car._id || index} car={car} />
//             ))}
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }










// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import CarCard from '@/components/CarCard'; // পাথ ঠিক আছে কিনা তা নিশ্চিত করুন

// export default function AvailableCars() {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('/data.json')
//       .then((res) => res.json())
//       .then((data) => {
//         // 🔍 কেস-ইনসেনসিটিভ ফিল্টারিং লজিক (যাতে Available বা available যাই থাকুক, ডাটা মিস না হয়)
//         const available = data.filter(car => {
//           if (!car.availability) return true; // যদি ফিল্ড না থাকে তাহলে সেফটি হিসেবে ট্রু রিটার্ন করবে
//           return car.availability.toLowerCase() === 'available';
//         });

//         // 🛡️ ফলব্যাক সেফটি গার্ড: যদি ফিল্টারে কোনো ম্যাচ না পায়, তবে সম্পূর্ণ ডাটা থেকেই প্রথম ৪টি দেখাবে
//         const finalCars = available.length > 0 ? available : data;
        
//         // হোম পেজের রিকোয়ারমেন্ট অনুযায়ী প্রথম ৪টি কার স্লাইস করা হলো
//         setCars(finalCars.slice(0, 4));
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error loading data pipeline inside AvailableCars:', err);
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

//           {/* See All Redirect Link */}
//           <div className="flex justify-center">
//             <Link 
//               href="/cars" 
//               className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-white border border-[#00ffcc]/20 hover:border-white px-5 py-2.5 rounded-xl bg-[#00ffcc]/5 transition-all duration-300"
//             >
//               See Full Grid →
//             </Link>
//           </div>
//         </div>

//         {/* 📦 DYNAMIC CARDS GRID */}
//         {loading ? (
//           // ⏳ লোডিং স্টেট স্কেলেটন
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((n) => (
//               <div 
//                 key={n} 
//                 className="h-96 w-full bg-[#090d16]/20 border border-white/5 rounded-2xl animate-pulse flex items-center justify-center text-[10px] font-mono text-gray-600 tracking-widest"
//               >
//                 SYNCING NODE DATA...
//               </div>
//             ))}
//           </div>
//         ) : (
//           // 🏎️ রেন্ডারিং গ্রিড (এখানে সরাসরি সেভ করা cars স্টেট ম্যাপ করা হয়েছে)
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

















// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import CarCard from '@/components/CarCard';

// export default function AvailableCars() {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 📡 public/data.json থেকে ডাটা ফেচ করার লজিক
//   useEffect(() => {
//     fetch('/data.json')
//       .then((res) => res.json())
//       .then((data) => {
//         // শুধুমাত্র 'Available' গাড়িগুলো ফিল্টার করা হচ্ছে
//         const available = data.filter(car => car.availability === 'Available');
        
//         // রিকোয়ারমেন্ট অনুযায়ী হোম পেজে প্রথম ৪টি কার দেখানোর জন্য slice করা হলো
//         setCars(available.slice(0, 4));
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

//           {/* See All Redirect Link */}
//           <div className="flex justify-center">
//             <Link 
//               href="/cars" 
//               className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-white border border-[#00ffcc]/20 hover:border-white px-5 py-2.5 rounded-xl bg-[#00ffcc]/5 transition-all duration-300"
//             >
//               See Full Grid →
//             </Link>
//           </div>
//         </div>

//         {/* 📦 DYNAMIC CARDS GRID */}
//         {loading ? (
//           // ⏳ Loading State Skeleton
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
//           // 🏎️ Real Data Layout (lg:grid-cols-4 ব্যবহার করা হয়েছে ৪টি কার্ড সুন্দরভাবে দেখানোর জন্য)
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



























// 'use client';

// import CarCard from '@/components/CarCard';
// import Link from 'next/link';
// import { useEffect } from 'react';

// // 📊 ডাটাবেস ডাটা ফরম্যাট (রিয়েল প্রজেক্টে এটি আপনি useEffect/fetch বা props এর মাধ্যমে ডাটাবেস থেকে নিয়ে আসবেন)
// // const CARS_DATABASE_DATA = [
// //   {
// //     _id: 'car_01',
// //     name: 'Cyber Coupe X1',
// //     brand: 'Tesla',
// //     transmission: 'Automatic',
// //     fuelType: 'Electric',
// //     pricePerDay: 120,
// //     availability: 'Available',
// //     img: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=500&auto=format&fit=crop&q=80',
// //   },
// //   {
// //     _id: 'car_02',
// //     name: 'Stealth SUV Matrix',
// //     brand: 'BMW',
// //     transmission: 'Manual',
// //     fuelType: 'Octane',
// //     pricePerDay: 95,
// //     availability: 'Available',
// //     img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=80',
// //   },
// //   {
// //     _id: 'car_03',
// //     name: 'Quantum Electric EV',
// //     brand: 'Audi',
// //     transmission: 'Automatic',
// //     fuelType: 'Electric',
// //     pricePerDay: 110,
// //     availability: 'Available',
// //     img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=80',
// //   },
// //   {
// //     _id: 'car_04',
// //     name: 'Hyperion GT Sport',
// //     brand: 'Porsche',
// //     transmission: 'Automatic',
// //     fuelType: 'Octane',
// //     pricePerDay: 250,
// //     availability: 'Available',
// //     img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80',
// //   },
// //   {
// //     _id: 'car_05',
// //     name: 'Vanguard Cruiser',
// //     brand: 'BMW',
// //     transmission: 'Automatic',
// //     fuelType: 'Hybrid',
// //     pricePerDay: 140,
// //     availability: 'Available',
// //     img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&auto=format&fit=crop&q=80',
// //   },
// //   {
// //     _id: 'car_06',
// //     name: 'Volt Charging Node',
// //     brand: 'Tesla',
// //     transmission: 'Automatic',
// //     fuelType: 'Electric',
// //     pricePerDay: 85,
// //     availability: 'Available',
// //     img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=80',
// //   },
// // ];







//  useEffect(() => {
//     fetch('/data.json')
//       .then((res) => res.json())
//       .then((data) => {
//         // রিকোয়ারমেন্ট অনুযায়ী হোম পেজে শুধু প্রথম ৪টি কার দেখানোর জন্য slice করা হলো
//         setCars(data.slice(0, 4));
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error loading data pipeline:', err);
//         setLoading(false);
//       });
//   }, []);




// export default function AvailableCars() {
//   // ডাটাবেস থেকে শুধু 'Available' গাড়িগুলো ফিল্টার করে দেখানোর প্রফেশনাল লজিক
//   const availableCars = CARS_DATABASE_DATA.filter(car => car.availability === 'Available');

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

//           {/* See All Redirect Link */}
//           <div className="flex justify-center">
//             <Link 
//               href="/cars" 
//               className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-white border border-[#00ffcc]/20 hover:border-white px-5 py-2.5 rounded-xl bg-[#00ffcc]/5 transition-all duration-300"
//             >
//               See Full Grid →
//             </Link>
//           </div>
//         </div>

//         {/* 📦 6 CARDS RESPONSIVE GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {availableCars.slice(0, 6).map((car) => (
//             <div 
//               key={car._id}
//               className="group relative bg-[#090d16]/40 border border-white/5 rounded-2xl overflow-hidden hover:border-[#00ffcc]/20 transition-all duration-500 backdrop-blur-md flex flex-col justify-between h-full"
//             >
//               <div>
//                 {/* 📸 CAR IMAGE */}
//                 <div className="relative w-full h-48 bg-[#030712] overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent z-10 opacity-80" />
//                   <img 
//                     src={car.img} 
//                     alt={car.name}
//                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out select-none"
//                   />
//                   {/* Absolute Badge */}
//                   <span className="absolute top-3 left-3 z-20 font-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md backdrop-blur-md">
//                     {car.availability}
//                   </span>
//                 </div>

//                 {/* 📝 CAR INFO DETAILS */}
//                 <div className="p-5 space-y-4">
//                   <div>
//                     <span className="font-mono text-[10px] text-[#00ffcc]/60 uppercase tracking-wider">{car.brand}</span>
//                     <h3 className="text-base font-bold uppercase tracking-wide text-white mt-0.5 group-hover:text-[#00ffcc] transition-colors duration-300">
//                       {car.name}
//                     </h3>
//                   </div>

//                   {/* Tech Specs Info Table Grid */}
//                   <div className="grid grid-cols-2 gap-3 border-t border-b border-white/5 py-3 font-mono text-[11px] text-gray-400">
//                     <div className="flex items-center space-x-1.5">
//                       <span className="text-gray-600">⚙</span>
//                       <span>{car.transmission}</span>
//                     </div>
//                     <div className="flex items-center space-x-1.5 justify-end md:justify-start">
//                       <span className="text-gray-600">⛽</span>
//                       <span>{car.fuelType}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* 🎯 CARD BOTTOM PRICE & VIEW DETAILS BUTTON */}
//               <div className="p-5 pt-0 space-y-3 mt-auto">
//                 <div className="flex items-end justify-between">
//                   <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Rate Log</span>
//                   <p className="text-base font-black text-[#00ffcc]">
//                     ${car.pricePerDay}<span className="text-[10px] text-gray-500 font-mono font-normal"> / DAY</span>
//                   </p>
//                 </div>

//                 <Link 
//                   href={`/cars/${car._id}`}
//                   className="w-full block text-center rounded-xl bg-white/5 hover:bg-[#00ffcc] text-gray-300 hover:text-black border border-white/10 hover:border-[#00ffcc] py-3 text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(0,0,255,0)] hover:shadow-[0_0_20px_rgba(0,255,204,0.2)]"
//                 >
//                   View Details
//                 </Link>
//               </div>

//             </div>
//           ))}
//         </div>




//          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {cars.map((car, index) => (
//                       // এখানে আমাদের রিইউজেবল CarCard কম্পোনেন্টটি কল করা হয়েছে
//                       <CarCard key={car._id || index} car={car} />
//                     ))}
//                   </div>





//       </div>
//     </section>
//   );
// }





















// // 'use client';

// // import { useState } from 'react';
// // import Image from 'next/image';
// // import Link from 'next/link';

// // // 📊 মক ডাটা (Mock Data) - পরবর্তীতে এটি আপনার API বা MongoDB Database এর সাথে কানেক্ট করবেন
// // const MOCK_CARS = [
// //   {
// //     id: 'c1',
// //     name: 'Cyber Coupe X1',
// //     brand: 'Tesla',
// //     category: 'Luxury',
// //     price: 120,
// //     status: 'Available',
// //     img: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=500&auto=format&fit=crop&q=80',
// //   },
// //   {
// //     id: 'c2',
// //     name: 'Stealth SUV Matrix',
// //     brand: 'BMW',
// //     category: 'SUV',
// //     price: 95,
// //     status: 'Available',
// //     img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=80',
// //   },
// //   {
// //     id: 'c3',
// //     name: 'Quantum Electric EV',
// //     brand: 'Audi',
// //     category: 'Electric',
// //     price: 110,
// //     status: 'Booked',
// //     img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=80',
// //   },
// //   {
// //     id: 'c4',
// //     name: 'Hyperion GT Sport',
// //     brand: 'Porsche',
// //     category: 'Sports',
// //     price: 250,
// //     status: 'Available',
// //     img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80',
// //   },
// //   {
// //     id: 'c5',
// //     name: 'Vanguard Cruiser',
// //     brand: 'BMW',
// //     category: 'Luxury',
// //     price: 140,
// //     status: 'Available',
// //     img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&auto=format&fit=crop&q=80',
// //   },
// //   {
// //     id: 'c6',
// //     name: 'Volt Charging Node',
// //     brand: 'Tesla',
// //     category: 'Electric',
// //     price: 85,
// //     status: 'Available',
// //     img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=80',
// //   },
// // ];

// // export default function ExploreCars() {
// //   const [search, setSearch] = useState('');
// //   const [selectedCategory, setSelectedCategory] = useState('All');
// //   const [selectedBrand, setSelectedBrand] = useState('All');

// //   // 🔍 সার্চ এবং ফিল্টারিং লজিক (Search, Brand & Category Filtering)
// //   const filteredCars = MOCK_CARS.filter((car) => {
// //     const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase());
// //     const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
// //     const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
// //     return matchesSearch && matchesCategory && matchesBrand;
// //   });

// //   return (
// //     <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12">
// //       <div className="max-w-7xl mx-auto space-y-10">
        
// //         {/* 📑 PAGE HEADER */}
// //         <div className="text-center md:text-left space-y-2">
// //           <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
// //             Explore The <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Fleet Matrix</span>
// //           </h1>
// //           <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
// //             Query through our secure automotive terminal. Select premium nodes ready for instant deployment.
// //           </p>
// //         </div>

// //         {/* ⚙️ CONTROLS SECTION: SEARCH & FILTERS */}
// //         <div className="bg-[#090d16]/80 border border-white/5 rounded-2xl p-4 md:p-6 backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
// //           {/* Input 1: Search Bar */}
// //           <div className="relative">
// //             <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
// //             <input
// //               type="text"
// //               placeholder="Search by car name..."
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               className="w-full bg-[#030712] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
// //             />
// //           </div>

// //           {/* Dropdown 2: Category Filter */}
// //           <div>
// //             <select
// //               value={selectedCategory}
// //               onChange={(e) => setSelectedCategory(e.target.value)}
// //               className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00ffcc]/50 transition-colors appearance-none cursor-pointer"
// //             >
// //               <option value="All">All Categories</option>
// //               <option value="Luxury">Luxury</option>
// //               <option value="SUV">SUV</option>
// //               <option value="Electric">Electric</option>
// //               <option value="Sports">Sports</option>
// //             </select>
// //           </div>

// //           {/* Dropdown 3: Brand Filter */}
// //           <div>
// //             <select
// //               value={selectedBrand}
// //               onChange={(e) => setSelectedBrand(e.target.value)}
// //               className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00ffcc]/50 transition-colors appearance-none cursor-pointer"
// //             >
// //               <option value="All">All Brands</option>
// //               <option value="Tesla">Tesla</option>
// //               <option value="BMW">BMW</option>
// //               <option value="Audi">Audi</option>
// //               <option value="Porsche">Porsche</option>
// //             </select>
// //           </div>

// //         </div>

// //         {/* 🚗 CARS GRID LISTING */}
// //         {filteredCars.length > 0 ? (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {filteredCars.map((car) => (
// //               <div
// //                 key={car.id}
// //                 className="group relative bg-[#090d16]/40 border border-white/5 rounded-2xl overflow-hidden hover:border-[#00ffcc]/20 transition-all duration-500 backdrop-blur-md flex flex-col justify-between"
// //               >
// //                 {/* Image Section */}
// //                 <div className="relative w-full h-48 bg-[#030712] overflow-hidden">
// //                   <div className="absolute inset-0 bg-gradient-to-t from-[#090d16]/90 via-transparent to-transparent z-10 opacity-70" />
// //                   <img
// //                     src={car.img}
// //                     alt={car.name}
// //                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
// //                   />
                  
// //                   {/* Status Tag */}
// //                   <span
// //                     className={`absolute top-3 left-3 z-20 font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full backdrop-blur-md border ${
// //                       car.status === 'Available'
// //                         ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
// //                         : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
// //                     }`}
// //                   >
// //                     {car.status}
// //                   </span>
// //                 </div>

// //                 {/* Content Section */}
// //                 <div className="p-5 space-y-4">
// //                   <div className="flex items-start justify-between">
// //                     <div>
// //                       <p className="font-mono text-[10px] text-[#00ffcc]/60 uppercase tracking-widest">
// //                         {car.brand} • {car.category}
// //                       </p>
// //                       <h3 className="text-base font-bold uppercase tracking-wide text-white mt-0.5">
// //                         {car.name}
// //                       </h3>
// //                     </div>
// //                     <div className="text-right">
// //                       <p className="text-sm font-black text-[#00ffcc]">${car.price}</p>
// //                       <p className="text-[9px] text-gray-500 font-mono">/ DAY</p>
// //                     </div>
// //                   </div>

// //                   {/* Booking Action Button */}
// //                   <Link
// //                     href={`/cars/${car.id}`}
// //                     className={`w-full block text-center rounded-xl py-3 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
// //                       car.status === 'Available'
// //                         ? 'bg-[#00ffcc] text-black hover:bg-[#00ffcc]/90 shadow-[0_0_15px_rgba(0,255,204,0.1)] hover:shadow-[0_0_25px_rgba(0,255,204,0.3)]'
// //                         : 'bg-white/5 text-gray-500 cursor-not-allowed pointer-events-none border border-white/5'
// //                     }`}
// //                   >
// //                     {car.status === 'Available' ? 'Book Node Now' : 'Node Locked'}
// //                   </Link>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           /* 📭 EMPTY STATE */
// //           <div className="text-center py-20 border border-dashed border-white/5 rounded-2xl bg-[#090d16]/20">
// //             <p className="text-2xl">📭</p>
// //             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-2">
// //               No Vehicles Match Your Query
// //             </h3>
// //             <p className="text-xs text-gray-600 mt-1">
// //               Try adjusting your search criteria or clear filters to reset the matrix pipeline.
// //             </p>
// //           </div>
// //         )}

// //       </div>
// //     </div>
// //   );
// // }

