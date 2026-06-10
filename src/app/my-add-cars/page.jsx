

"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyAddCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 ফিক্স ১: AddCars ফর্মে যে ইমেইল ব্যবহার করেছেন, এখানেও হুবহু এক হতে হবে (আপাতত টেস্ট করার জন্য)
  // প্রোজেক্টে Better Auth থাকলে সেশন থেকে ইমেইলটি নেবেন, যেমন: const userEmail = session?.user?.email;
  const userEmail = "farhad@example.com"; 

  // 🔄 ডাটাবেজ থেকে ইউজারের গাড়িগুলো লোড করার ফাংশন
  useEffect(() => {
    if (userEmail) {
      setLoading(true);
      
      // 🎯 ফিক্স ২: কুয়েরি প্যারামিটার হিসেবে ব্যাকএন্ডকে সঠিকভাবে রিকোয়েস্ট পাঠানো
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-cars?email=${userEmail}`)
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          setCars(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching my cars:", err);
          setLoading(false);
        });
    }
  }, [userEmail]);

  // 🗑️ গাড়ি ডিলিট করার হ্যান্ডলার

  // 🔄 আপনার MyAddCars কম্পোনেন্টের ভেতরের handleDelete ফাংশনটি এটি দিয়ে রিপ্লেস করুন
const handleDelete = async (id) => {
  const proceed = window.confirm("Are you sure you want to Delete thisn car?");
  if (proceed) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.deletedCount > 0) {
        toast("car deleted successfully! 🗑️");
        // UI থেকে ডিলিট হওয়া গাড়িটি সাথে সাথে রিমুভ করা
        const remaining = cars.filter((car) => car._id !== id);
        setCars(remaining);
      } else {
        toast.error("Data found in DB, but could not be delete");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error(`car are not delete . Error: ${error.message}`);
    }
  }
};




  // const handleDelete = async (id) => {
  //   const proceed = window.confirm("Are you sure you want to terminate this vehicle node?");
  //   if (proceed) {
  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
  //         method: "DELETE",
  //       });
  //       const data = await response.json();

  //       if (data.deletedCount > 0) {
  //         alert("Vehicle node deleted successfully! 🗑️");
  //         // UI থেকে ডিলিট হওয়া গাড়িটি সাথে সাথে রিমুভ করা
  //         const remaining = cars.filter((car) => car._id !== id);
  //         setCars(remaining);
  //       }
  //     } catch (error) {
  //       console.error("Error deleting car:", error);
  //     }
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#00ffcc] font-mono tracking-widest animate-pulse">
        LOADING SYSTEM DATA...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen relative font-sans bg-[#030712] my-5 rounded-2xl">
      {/* 🌌 ব্যাকগ্রাউন্ড নিয়ন গ্লো */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />

      {/* 📑 সেকশন হেডার */}

      {cars.length===0?<h1>addone </h1>: <div className="mb-8 relative z-10">
        <h1 className="text-3xl font-black uppercase tracking-wider text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.2)]">
          My Added Cars ({cars.length})
        </h1>
        
      </div>}
      {/* <div className="mb-8 relative z-10">
        <h1 className="text-3xl font-black uppercase tracking-wider text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.2)]">
          My Added Cars ({cars.length})
        </h1>
        
      </div> */}

      {/* 📊 রেসপন্সিভ টেবিল কন্টেইনার */}
      {cars.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 bg-[#090d16]/40 border border-white/5 rounded-2xl max-w-2xl mx-auto my-10 backdrop-blur-xl">
          <h2 className="text-lg font-mono uppercase tracking-wider text-white">
            You  haven't added <span className="text-[#00ffcc]">Any Cars Yet</span>
          </h2>
          {/* <p className="text-xs text-gray-500 mt-2">Try adding a new vehicle from the deploy panel.</p> */}
        </div>
      ) : (
        <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
                  <th className="p-4 md:p-5">Car Image</th>
                  <th className="p-4 md:p-5">Car Name</th>
                  <th className="p-4 md:p-5">Daily Price</th>
                  <th className="p-4 md:p-5">Car Type</th>
                  <th className="p-4 md:p-5">Location</th>
                  <th className="p-4 md:p-5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                {cars.map((car) => (
                  <tr key={car._id} className="hover:bg-white/[0.015] transition-colors group">
                    {/* ১. ইমেজ */}
                    <td className="p-4 md:p-5">
                      <div className="relative h-12 w-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-inner group-hover:border-[#00ffcc]/40 transition-all duration-300">
                        <img
                          src={car.imageUrl || "https://placehold.co/600x400"}
                          alt={car.carName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>

                    {/* ২. নাম */}
                    <td className="p-4 md:p-5 font-bold text-white group-hover:text-[#00ffcc] transition-colors text-sm">
                      {car.carName}
                    </td>

                    {/* ৩. প্রাইজ */}
                    <td className="p-4 md:p-5 font-mono font-bold text-[#00ffcc]">
                      ${car.dailyPrice} <span className="text-[10px] text-gray-500 font-normal">/ day</span>
                    </td>

                    {/* ৪. টাইপ */}
                    <td className="p-4 md:p-5 font-mono uppercase text-xs">
                      {car.carType}
                    </td>

                    {/* ৫. লোকেশন */}
                    <td className="p-4 md:p-5 text-gray-400">
                      {car.location}
                    </td>

                    {/* 🛑 ৬. অ্যাকশন বাটন */}
                    <td className="p-4 md:p-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddCars;














// "use client";

// import React, { useEffect, useState } from "react";

// const MyAddCars = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 💡 এখানে আপনার লগইন থাকা ইউজারের ইমেইল আসবে (যেমন Better Auth বা Firebase থেকে)
//   const userEmail = "user@example.com"; 

//   // 🔄 ডাটাবেজ থেকে ইউজারের গাড়িগুলো লোড করার ফাংশন
//   useEffect(() => {
//     if (userEmail) {
//       fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-cars?email=${userEmail}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setCars(data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching my cars:", err);
//           setLoading(false);
//         });
//     }
//   }, [userEmail]);

//   // 🗑️ গাড়ি ডিলিট করার হ্যান্ডলার
//   const handleDelete = async (id) => {
//     const proceed = window.confirm("Are you sure you want to terminate this vehicle node?");
//     if (proceed) {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
//           method: "DELETE",
//         });
//         const data = await response.json();

//         if (data.deletedCount > 0) {
//           alert("Vehicle node deleted successfully! 🗑️");
//           // UI থেকে ডিলিট হওয়া গাড়িটি সাথে সাথে রিমুভ করা
//           const remaining = cars.filter((car) => car._id !== id);
//           setCars(remaining);
//         }
//       } catch (error) {
//         console.error("Error deleting car:", error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#00ffcc] font-mono">
//         LOADING SYSTEM DATA...
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10 min-h-screen relative font-sans bg-[#030712] my-5 rounded-2xl">
//       {/* 🌌 ব্যাকগ্রাউন্ড নিয়ন গ্লো */}
//       <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />

//       {/* 📑 সেকশন হেডার */}
//       <div className="mb-8 relative z-10">
//         <h1 className="text-3xl font-black uppercase tracking-wider text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.2)]">
//           My Added Vehicles ({cars.length})
//         </h1>
//       </div>

//       {/* 📊 রেসপন্সিভ টেবিল কন্টেইনার */}
//       {cars.length === 0 ? (
//         <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-[#030712] border border-white/5 rounded-2xl max-w-2xl mx-auto my-10 backdrop-blur-xl">
//           <h2 className="text-xl font-mono uppercase tracking-wider text-white">
//             You havenadded <span className="text-[#00ffcc]">Any Cars Yet</span>
//           </h2>
//         </div>
//       ) : (
//         <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl relative z-10">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
//                   <th className="p-4 md:p-5">Car Image</th>
//                   <th className="p-4 md:p-5">Car Name</th>
//                   <th className="p-4 md:p-5">Daily Price</th>
//                   <th className="p-4 md:p-5">Car Type</th>
//                   <th className="p-4 md:p-5">Location</th>
//                   <th className="p-4 md:p-5 text-right">Actions</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-white/5 text-xs text-gray-300">
//                 {cars.map((car) => (
//                   <tr key={car._id} className="hover:bg-white/[0.015] transition-colors group">
//                     {/* ১. ইমেজ */}
//                     <td className="p-4 md:p-5">
//                       <div className="relative h-12 w-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-inner group-hover:border-[#00ffcc]/40 transition-all duration-300">
//                         <img
//                           src={car.imageUrl || "https://placehold.co/600x400"}
//                           alt={car.carName}
//                           className="h-full w-full object-cover"
//                         />
//                       </div>
//                     </td>

//                     {/* ২. নাম */}
//                     <td className="p-4 md:p-5 font-bold text-white group-hover:text-[#00ffcc] transition-colors text-sm">
//                       {car.carName}
//                     </td>

//                     {/* ৩. প্রাইজ */}
//                     <td className="p-4 md:p-5 font-mono font-bold text-[#00ffcc]">
//                       ${car.dailyPrice} <span className="text-[10px] text-gray-500 font-normal">/ day</span>
//                     </td>

//                     {/* ৪. টাইপ */}
//                     <td className="p-4 md:p-5 font-mono uppercase text-xs">
//                       {car.carType}
//                     </td>

//                     {/* ৫. লোকেশন */}
//                     <td className="p-4 md:p-5 text-gray-400">
//                       {car.location}
//                     </td>

//                     {/* 🛑 ৬. অ্যাকশন বাটন (Terminate/Delete) */}
//                     <td className="p-4 md:p-5 text-right whitespace-nowrap">
//                       <button
//                         onClick={() => handleDelete(car._id)}
//                         className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]"
//                       >
//                         Terminate
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAddCars;
























// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';
// import { authClient } from "@/lib/auth-client"; 

// export default function MyAddCars() {
//   const router = useRouter();
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🎯 কাস্টম মোডাল কন্ট্রোল করার জন্য নতুন স্টেটসমূহ
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeCarId, setActiveCarId] = useState(null);

//   const { data: session, isPending } = authClient.useSession();

//   useEffect(() => {
//     if (isPending) return;

//     if (!session) {
//       toast.error('Authentication required. Redirecting...');
//       router.push('/login');
//       return;
//     }

//     const fetchMyCars = async () => {
//       try {
//         const userEmail = session?.user?.email;
//         const token = session?.session?.token || session?.session?.id;

//         const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-cars?email=${userEmail}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         }); 
        
//         if (!response.ok) throw new Error('Failed to fetch fleet data.');
        
//         const data = await response.json();
//         setCars(data);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         toast.error('Failed to sync fleet grid with database.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyCars();
//   }, [session, isPending, router]);

//   // 🚪 ১. ডিলিট বাটনে ক্লিক করলে কাস্টম মোডাল ওপেন করার ফাংশন
//   const openDeleteModal = (carId, e) => {
//     if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
//     setActiveCarId(carId); // ডিলিট করার জন্য আইডি হোল্ড করা
//     setIsModalOpen(true);  // মোডাল পপ-আপ ওপেন করা
//   };

//   // 🧼 ২. মোডাল ক্লোজ করার ফাংশন
//   const closeDeleteModal = () => {
//     setIsModalOpen(false);
//     setActiveCarId(null);
//   };

//   // 🚀 ৩. মোডাল থেকে "Yes, Delete" কনফার্ম করলে আসল ডিলিট অপারেশন ফায়ার করার ফাংশন
//   const handleDeleteConfirm = async () => {
//     if (!activeCarId) return;

//     try {
//       const token = session?.session?.token || session?.session?.id;

//       const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${activeCarId}`, { 
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}` 
//         }
//       });

//       if (response.ok) {
//         toast.success('VEHICLE DECOMMISSIONED SUCCESSFULLY.', {
//           style: {
//             border: '1px solid #00ffcc',
//             padding: '16px',
//             color: '#fff',
//             background: '#090d16',
//             fontFamily: 'monospace',
//           },
//         });
//         setCars((prevCars) => prevCars.filter((car) => car._id !== activeCarId));
//         closeDeleteModal(); 
//       } else {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.error || 'Delete operation failed.');
//       }
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//       closeDeleteModal();
//     }
//   };

//   if (isPending || (loading && session)) {
//     return (
//       <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] animate-pulse">
//         Scanning Fleet Registry Matrix...
//       </div>
//     );
//   }

//   if (!session) return null;

//   return (
//     <div className="min-h-screen bg-[#030712] text-white px-4 py-12 relative overflow-hidden">
//       {/* Background Glow Aura */}
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

//         {cars.length === 0 ? (
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
//           /* CARS LIST TABLE */
//           <div className="w-full overflow-x-auto border border-white/5 bg-[#090d16]/40 rounded-2xl backdrop-blur-xl shadow-2xl">
//             <table className="w-full text-left border-collapse font-sans text-xs">
//               <thead>
//                 <tr className="border-b border-white/5 font-mono text-gray-400 uppercase tracking-wider bg-white/[0.02]">
//                   <th className="p-4">Vehicle</th>
//                   <th className="p-4">Class Type</th>
//                   <th className="p-4">Terminal Location</th>
//                   <th className="p-4">Rental Rate</th>
//                   <th className="p-4">Status</th>
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
//                           src={car.image || car.carImage || "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200"} 
//                           alt={car.carName}
//                           className="object-cover w-full h-full"
//                         />
//                       </div>
//                       <span className="font-bold text-white uppercase tracking-wide">{car.carName}</span>
//                     </td>
                    
//                     {/* Class Type */}
//                     <td className="p-4 text-gray-300 uppercase font-mono">{car.carType || "N/A"}</td>
                    
//                     {/* Pickup Location */}
//                     <td className="p-4 text-gray-400 font-mono">{car.pickupLocation || "N/A"}</td>
                    
//                     {/* Rental Price */}
//                     <td className="p-4 font-mono font-bold text-[#00ffcc]">${car.dailyPrice || car.rentalPrice}/day</td>
                    
//                     {/* Availability Status */}
//                     <td className="p-4 font-mono">
//                       <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wide font-bold ${
//                         car.availabilityStatus === 'Available' 
//                           ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
//                           : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
//                       }`}>
//                         {car.availabilityStatus || "Available"}
//                       </span>
//                     </td>
                    
//                     {/* Action Buttons */}
//                     <td className="p-4 text-right space-x-2 whitespace-nowrap">
//                       <button 
//                         onClick={() => router.push(`/my-add-cars/edit/${car._id}`)}
//                         className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs font-bold uppercase rounded-lg hover:bg-[#00ffcc] hover:text-black hover:border-[#00ffcc] transition-all"
//                       >
//                         Modify
//                       </button>
//                       <button 
//                         onClick={(e) => openDeleteModal(car._id, e)} // 👈 কাস্টম মোডাল ওপেন ট্রিগার
//                         className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase rounded-lg hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

     
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          
        
//           <div 
//             onClick={closeDeleteModal} 
//             className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md transition-opacity animate-fade-in"
//           />

//           <div className="relative bg-[#0d1117] border border-rose-500/30 rounded-2xl w-full max-w-md p-6 overflow-hidden shadow-[0_0_50px_rgba(244,63,94,0.15)] transform transition-all">
            
  
//             <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />

          
//             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
//               <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//               </svg>
//             </div>

         
//             <div className="mt-4 text-center space-y-2">
//               <h3 className="text-base font-black font-mono tracking-wider uppercase text-white">
//                 Decommission Vehicle?
//               </h3>
//               <p className="text-xs text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
//                 Are you sure you want to completely wipe this automotive asset from the active grid network? This action cannot be reversed.
//               </p>
//             </div>

//             <div className="mt-6 flex gap-3 justify-center">
              
        
//               <button
//                 type="button"
//                 onClick={closeDeleteModal}
//                 className="w-28 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest text-gray-300 transition-all hover:bg-white/10 hover:text-white"
//               >
//                 Cancel
//               </button>

//               {/* কনফার্ম ডিলিট বাটন */}
//               <button
//                 type="button"
//                 onClick={handleDeleteConfirm}
//                 className="w-32 rounded-xl bg-rose-600 px-4 py-2.5 text-[10px] font-black font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(244,63,94,0.2)] transition-all hover:bg-rose-500 hover:shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95"
//               >
//                 Yes, Delete
//               </button>

//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







