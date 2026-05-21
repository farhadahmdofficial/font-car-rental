

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { authClient } from "@/lib/auth-client"; 

export default function MyAddCars() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 কাস্টম মোডাল কন্ট্রোল করার জন্য নতুন স্টেটসমূহ
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCarId, setActiveCarId] = useState(null);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      toast.error('Authentication required. Redirecting...');
      router.push('/login');
      return;
    }

    const fetchMyCars = async () => {
      try {
        const userEmail = session?.user?.email;
        const token = session?.session?.token || session?.session?.id;

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-cars?email=${userEmail}`, {
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

  // 🚪 ১. ডিলিট বাটনে ক্লিক করলে কাস্টম মোডাল ওপেন করার ফাংশন
  const openDeleteModal = (carId, e) => {
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    setActiveCarId(carId); // ডিলিট করার জন্য আইডি হোল্ড করা
    setIsModalOpen(true);  // মোডাল পপ-আপ ওপেন করা
  };

  // 🧼 ২. মোডাল ক্লোজ করার ফাংশন
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setActiveCarId(null);
  };

  // 🚀 ৩. মোডাল থেকে "Yes, Delete" কনফার্ম করলে আসল ডিলিট অপারেশন ফায়ার করার ফাংশন
  const handleDeleteConfirm = async () => {
    if (!activeCarId) return;

    try {
      const token = session?.session?.token || session?.session?.id;

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${activeCarId}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.ok) {
        toast.success('VEHICLE DECOMMISSIONED SUCCESSFULLY.', {
          style: {
            border: '1px solid #00ffcc',
            padding: '16px',
            color: '#fff',
            background: '#090d16',
            fontFamily: 'monospace',
          },
        });
        setCars((prevCars) => prevCars.filter((car) => car._id !== activeCarId));
        closeDeleteModal(); // সাকসেসফুলি ডিলিট হলে মোডাল বন্ধ হবে
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Delete operation failed.');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      closeDeleteModal();
    }
  };

  if (isPending || (loading && session)) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] animate-pulse">
        Scanning Fleet Registry Matrix...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 py-12 relative overflow-hidden">
      {/* Background Glow Aura */}
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
          /* CARS LIST TABLE */
          <div className="w-full overflow-x-auto border border-white/5 bg-[#090d16]/40 rounded-2xl backdrop-blur-xl shadow-2xl">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="border-b border-white/5 font-mono text-gray-400 uppercase tracking-wider bg-white/[0.02]">
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Class Type</th>
                  <th className="p-4">Terminal Location</th>
                  <th className="p-4">Rental Rate</th>
                  <th className="p-4">Status</th>
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
                          src={car.image || car.carImage || "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200"} 
                          alt={car.carName}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="font-bold text-white uppercase tracking-wide">{car.carName}</span>
                    </td>
                    
                    {/* Class Type */}
                    <td className="p-4 text-gray-300 uppercase font-mono">{car.carType || "N/A"}</td>
                    
                    {/* Pickup Location */}
                    <td className="p-4 text-gray-400 font-mono">{car.pickupLocation || "N/A"}</td>
                    
                    {/* Rental Price */}
                    <td className="p-4 font-mono font-bold text-[#00ffcc]">${car.dailyPrice || car.rentalPrice}/day</td>
                    
                    {/* Availability Status */}
                    <td className="p-4 font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wide font-bold ${
                        car.availabilityStatus === 'Available' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {car.availabilityStatus || "Available"}
                      </span>
                    </td>
                    
                    {/* Action Buttons */}
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button 
                        onClick={() => router.push(`/my-add-cars/edit/${car._id}`)}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs font-bold uppercase rounded-lg hover:bg-[#00ffcc] hover:text-black hover:border-[#00ffcc] transition-all"
                      >
                        Modify
                      </button>
                      <button 
                        onClick={(e) => openDeleteModal(car._id, e)} // 👈 কাস্টম মোডাল ওপেন ট্রিগার
                        className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase rounded-lg hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🖥️ কাস্টম ড্রাইভফ্লিট নিওন ডিলিট মোডাল (CUSTOM MODAL UI OVERLAY) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          
          {/* ব্যাকগ্রাউন্ড ব্লার ওভারলে শ্যাডো */}
          <div 
            onClick={closeDeleteModal} 
            className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md transition-opacity animate-fade-in"
          />

          {/* মোডাল কন্টেন্ট বক্স */}
          <div className="relative bg-[#0d1117] border border-rose-500/30 rounded-2xl w-full max-w-md p-6 overflow-hidden shadow-[0_0_50px_rgba(244,63,94,0.15)] transform transition-all">
            
            {/* টপ নিওন রেড ডেকোরেশন লাইন */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />

            {/* ওয়ার্নিং সাইবার আইকন */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* টেক্সট কন্টেন্ট */}
            <div className="mt-4 text-center space-y-2">
              <h3 className="text-base font-black font-mono tracking-wider uppercase text-white">
                Decommission Vehicle?
              </h3>
              <p className="text-xs text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
                Are you sure you want to completely wipe this automotive asset from the active grid network? This action cannot be reversed.
              </p>
            </div>

            {/* অ্যাকশন বাটন গ্রুপ */}
            <div className="mt-6 flex gap-3 justify-center">
              
              {/* ক্যানসেল বাটন */}
              <button
                type="button"
                onClick={closeDeleteModal}
                className="w-28 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest text-gray-300 transition-all hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>

              {/* কনফার্ম ডিলিট বাটন */}
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="w-32 rounded-xl bg-rose-600 px-4 py-2.5 text-[10px] font-black font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(244,63,94,0.2)] transition-all hover:bg-rose-500 hover:shadow-[0_0_25px_rgba(244,63,94,0.4)] active:scale-95"
              >
                Yes, Delete
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}













// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';
// import { authClient } from "@/lib/auth-client"; 

// export default function MyAddCars() {
//   const router = useRouter();
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);

 
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

//         // const response = await fetch(`http://localhost:8000/my-cars?email=${userEmail}`, {

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








//   const handleDelete = async (carId) => {
//     if (!confirm('Are you sure you want to decommission this vehicle from the grid?')) return;

//     try {
//       const token = session?.session?.token || session?.session?.id;

//     //   const response = await fetch(`http://localhost:8000/cars/${carId}`, { 
//       const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${carId}`, { 
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}` 
//         }
//       });

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
//         setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
//       } else {
//         throw new Error('Delete operation failed.');
//       }
//     } catch (error) {
//       toast.error('Failed to wipe vehicle data.');
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
//       {/*  Background Glow Aura */}
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
//           /*  CARS LIST TABLE */
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
                    
//                     {/* 📸 Image & Name (Fixed Image Source Property) */}
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
                    
//                     {/* Class Type (Fixed from car.brand to car.carType) */}
//                     <td className="p-4 text-gray-300 uppercase font-mono">{car.carType || "N/A"}</td>
                    
//                     {/* Pickup Location (Fixed from car.vehicleNumber to car.pickupLocation) */}
//                     <td className="p-4 text-gray-400 font-mono">{car.pickupLocation || "N/A"}</td>
                    
//                     {/* Rental Price (Fixed from car.rentalPrice to car.dailyPrice) */}
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
//                         onClick={() => handleDelete(car._id)}
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
//     </div>
//   );
// }




