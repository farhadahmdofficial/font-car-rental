// import React from 'react';

// const myaddcarPage = () => {
//     return (
//         <div>
//             <h1>my add car page </h1>
//         </div>
//     );
// };

// export default myaddcarPage;






'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { authClient } from "@/lib/auth-client"; 

export default function MyAddCars() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔒 Better Auth থেকে ইউজারের সেশন স্টেট নেওয়া
  const { data: session, isPending } = authClient.useSession();

  // 🚀 ডাটাবেজ থেকে ইউজারের নিজস্ব গাড়িগুলো নিয়ে আসার ফাংশন
  useEffect(() => {
    // সেশন লোড হওয়া পর্যন্ত অপেক্ষা করুন
    if (isPending) return;

    // ইউজার যদি লগইন করা না থাকে, তাকে লগইন পেজে রিডাইরেক্ট করুন
    if (!session) {
      toast.error('Authentication required. Redirecting...');
      router.push('/login');
      return;
    }

    const fetchMyCars = async () => {
      try {
        const userEmail = session?.user?.email;
        const token = session?.session?.token || session?.session?.id;

        // 🔗 ব্যাকএন্ড পোর্ট ৮০০০ সেট করা হয়েছে
        const response = await fetch(`http://localhost:8000/my-cars?email=${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }); 
        
        if (!response.ok) throw new Error('Failed to fetch fleet data.');
        
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error('Failed to sync fleet grid with database.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyCars();
  }, [session, isPending, router]);

  // 🗑️ গাড়ি ডিলিট করার হ্যান্ডলার
  const handleDelete = async (carId) => {
    if (!confirm('Are you sure you want to decommission this vehicle from the grid?')) return;

    try {
      const token = session?.session?.token || session?.session?.id;

      // 🔗 এখানেও পোর্ট ৫০০০ থেকে পরিবর্তন করে ৮০০০ করা হয়েছে
      const response = await fetch(`http://localhost:8000/cars/${carId}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.ok) {
        toast.success('VEHICLE DECOMMISSIONED SUCCESSFULLY.', {
          style: {
            border: '1px solid #f43f5e',
            padding: '16px',
            color: '#fff',
            background: '#090d16',
            fontFamily: 'monospace',
          },
        });
        setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
      } else {
        throw new Error('Delete operation failed.');
      }
    } catch (error) {
      toast.error('Failed to wipe vehicle data.');
    }
  };

  // সেশন চেক বা ডেটা ফেচিং এর সময় ফুল স্ক্রিন ব্ল্যাঙ্ক না রেখে লোডার শো করা
  if (isPending || (loading && session)) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] animate-pulse">
        Scanning Fleet Registry Matrix...
      </div>
    );
  }

  // ইউজার না থাকলে এই পেজের কন্টেন্ট রেন্ডার করার দরকার নেই
  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 py-12 relative overflow-hidden">
      {/* 🔮 Background Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* TITLE SECTION */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-0.5">
            Owner Matrix
          </div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            My Added <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Vehicle Fleet</span>
          </h1>
          <p className="text-xs text-gray-400">
            Monitor, modify, or decommission your active transport entities from the grid.
          </p>
        </div>

        {cars.length === 0 ? (
          /* NO CARS FOUND STATE */
          <div className="text-center py-20 border border-white/5 bg-[#090d16]/40 rounded-2xl backdrop-blur-xl">
            <p className="text-sm text-gray-500 font-mono mb-4">NO VEHICLE CORES DEPLOYED YET.</p>
            <button
              onClick={() => router.push('/add-car')}
              className="px-4 py-2 bg-[#00ffcc] text-black font-mono font-bold text-xs uppercase rounded-xl hover:bg-[#00ffcc]/80 transition-all"
            >
              + Deploy First Car
            </button>
          </div>
        ) : (
          /* 📊 CARS LIST TABLE */
          <div className="w-full overflow-x-auto border border-white/5 bg-[#090d16]/40 rounded-2xl backdrop-blur-xl shadow-2xl">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="border-b border-white/5 font-mono text-gray-400 uppercase tracking-wider bg-white/[0.02]">
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Brand</th>
                  <th className="p-4">Plate Number</th>
                  <th className="p-4">Rental Rate</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cars.map((car) => (
                  <tr key={car._id} className="hover:bg-white/[0.01] transition-colors">
                    
                    {/* Image & Name */}
                    <td className="p-4 flex items-center space-x-3">
                      <div className="relative h-10 w-16 bg-[#030712] border border-white/10 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={car.carImage || "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200"} 
                          alt={car.carName}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="font-bold text-white uppercase tracking-wide">{car.carName}</span>
                    </td>
                    
                    {/* Brand */}
                    <td className="p-4 text-gray-300 uppercase font-mono">{car.brand}</td>
                    
                    {/* Plate Number */}
                    <td className="p-4 text-gray-400 font-mono">{car.vehicleNumber}</td>
                    
                    {/* Price */}
                    <td className="p-4 font-mono font-bold text-[#00ffcc]">${car.rentalPrice}/day</td>
                    
                    {/* Action Buttons */}
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => router.push(`/my-add-cars/edit/${car._id}`)}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs font-bold uppercase rounded-lg hover:bg-[#00ffcc] hover:text-black hover:border-[#00ffcc] transition-all"
                      >
                        Modify
                      </button>
                      <button 
                        onClick={() => handleDelete(car._id)}
                        className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase rounded-lg hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all"
                      >
                        Wipe
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

































// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';

// export default function MyAddCars() {
//   const router = useRouter();
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🚀 ডাটাবেজ থেকে ইউজারের নিজস্ব গাড়িগুলো নিয়ে আসার ফাংশন
//   useEffect(() => {
//     const fetchMyCars = async () => {
//       try {
//         // এখানে আপনার ব্যাকএন্ড এপিআই এন্ডপয়েন্ট দিবেন (যেমন: /api/my-cars)
//         const response = await fetch('/api/my-cars'); 
//         if (!response.ok) throw new Error('Failed to fetch fleet data.');
        
//         const data = await response.json();
//         setCars(data);
//       } catch (error) {
//         toast.error('Failed to sync fleet grid with database.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyCars();
//   }, []);

//   // 🗑️ গাড়ি ডিলিট করার হ্যান্ডলার
//   const handleDelete = async (carId) => {
//     if (!confirm('Are you sure you want to decommission this vehicle from the grid?')) return;

//     try {
//       const response = await fetch(`/api/cars/${carId}`, { method: 'DELETE' });
//       if (response.ok) {
//         toast.success('VEHICLE DECOMMISSIONED SUCCESSFULLY.', {
//           style: {
//             border: '1px solid #f43f5e',
//             padding: '16px',
//             color: '#fff',
//             background: '#090d16',
//             fontFamily: 'monospace',
//           },
//         });
//         // ডিলিট হওয়ার পর স্টেট থেকে ওই গাড়িটি রিমুভ করা
//         setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
//       } else {
//         throw new Error('Delete operation failed.');
//       }
//     } catch (error) {
//       toast.error('Failed to wipe vehicle data.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#030712] text-white px-4 py-12 relative overflow-hidden">
//       {/* 🔮 Background Glow Aura */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[160px] pointer-events-none" />

//       <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
//         {/* TITLE SECTION */}
//         <div className="space-y-1.5 text-center md:text-left">
//           <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-0.5">
//             Owner Matrix
//           </div>
//           <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
//             My Added <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Vehicle Fleet</span>
//           </h1>
//           <p className="text-xs text-gray-400">
//             Monitor, modify, or decommission your active transport entities from the grid.
//           </p>
//         </div>

//         {/* LOADING STATE */}
//         {loading ? (
//           <div className="text-center py-20 font-mono text-xs text-[#00ffcc] animate-pulse">
//             Scanning Fleet Registry...
//           </div>
//         ) : cars.length === 0 ? (
//           /* NO CARS FOUND STATE */
//           <div className="text-center py-20 border border-white/5 bg-[#090d16]/40 rounded-2xl backdrop-blur-xl">
//             <p className="text-sm text-gray-500 font-mono mb-4">NO VEHICLE CORES DEPLOYED YET.</p>
//             <button
//               onClick={() => router.push('/add-car')}
//               className="px-4 py-2 bg-[#00ffcc] text-black font-mono font-bold text-xs uppercase rounded-xl hover:bg-[#00ffcc]/80 transition-all"
//             >
//               + Deploy First Car
//             </button>
//           </div>
//         ) : (
//           /* 📊 CARS LIST TABLE */
//           <div className="w-full overflow-x-auto border border-white/5 bg-[#090d16]/40 rounded-2xl backdrop-blur-xl shadow-2xl">
//             <table className="w-full text-left border-collapse font-sans text-xs">
//               <thead>
//                 <tr className="border-b border-white/5 font-mono text-gray-400 uppercase tracking-wider bg-white/[0.02]">
//                   <th className="p-4">Vehicle</th>
//                   <th className="p-4">Brand</th>
//                   <th className="p-4">Plate Number</th>
//                   <th className="p-4">Rental Rate</th>
//                   <th className="p-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-white/5">
//                 {cars.map((car) => (
//                   <tr key={car._id} className="hover:bg-white/[0.01] transition-colors">
                    
//                     {/* Image & Name */}
//                     <td className="p-4 flex items-center space-x-3">
//                       <div className="relative h-10 w-16 bg-[#030712] border border-white/10 rounded-lg overflow-hidden flex-shrink-0">
//                         <img 
//                           src={car.carImage || "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200"} 
//                           alt={car.carName}
//                           className="object-cover w-full h-full"
//                         />
//                       </div>
//                       <span className="font-bold text-white uppercase tracking-wide">{car.carName}</span>
//                     </td>
                    
//                     {/* Brand */}
//                     <td className="p-4 text-gray-300 uppercase font-mono">{car.brand}</td>
                    
//                     {/* Plate Number */}
//                     <td className="p-4 text-gray-400 font-mono">{car.vehicleNumber}</td>
                    
//                     {/* Price */}
//                     <td className="p-4 font-mono font-bold text-[#00ffcc]">${car.rentalPrice}/day</td>
                    
//                     {/* Action Buttons */}
//                     <td className="p-4 text-right space-x-2">
//                       <button 
//                         onClick={() => router.push(`/my-add-cars/edit/${car._id}`)}
//                         className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs font-bold uppercase rounded-lg hover:bg-[#00ffcc] hover:text-black hover:border-[#00ffcc] transition-all"
//                       >
//                         Modify
//                       </button>
//                       <button 
//                         onClick={() => handleDelete(car._id)}
//                         className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase rounded-lg hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all"
//                       >
//                         Wipe
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }