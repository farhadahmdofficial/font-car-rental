
'use client';

import { authClient } from '@/lib/auth-client';
import Image from 'next/image'; 
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔮 কাস্টম মডাল স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState(null);

  // 🎯 Better Auth সেশন ট্র্যাকিং
  const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
  const userSession = sessionData?.user;

  // 📡 ডাটাবেজ থেকে অ্যাক্টিভ বুকিং লোড করা
  useEffect(() => {
    if (isSessionLoading) return;

    if (!userSession?.email) {
      setLoading(false);
      return;
    }

    const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;
    
    // fetch(`http://localhost:8000/my-bookings?email=${userSession.email}`, {

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings?email=${userSession.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionTokenOrId}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server Sync Error: Status Code ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch Error:', err);
        toast.error(err.message || 'Failed to sync with grid repository.');
        setLoading(false);
      });
  }, [userSession, sessionData, isSessionLoading]);

  // 🛠️ মডাল ওপেন করার সময় আইডি সেট করা
  const openCancelModal = (id) => {
    if (!id) {
      toast.error('❌ Cannot terminate: Booking ID is missing in UI row.');
      return;
    }
    setActiveBookingId(id);
    setIsModalOpen(true);
  };

  // ❌ বুকিং ক্যান্সেল কনফার্মেশন প্রসেস (PATCH)
  const handleCancelBooking = async () => {
    if (!activeBookingId) {
      toast.error('ERROR: Active Node Deployment ID is targetless.');
      return;
    }

    const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;

    try {
      // const response = await fetch(`http://localhost:8000/bookings/${activeBookingId}`, {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${activeBookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionTokenOrId}`
        },
        body: JSON.stringify({ status: 'Canceled' }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || `Terminal Request Rejected: Status Code ${response.status}`);
      }

      // 🎯 ক্যানসেল হওয়ার সাথে সাথে UI স্টেট থেকে ফিল্টার করে রিমুভ করা
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== activeBookingId)
      );

      toast.success('NODE TERMINATED AND REMOVED FROM LIST');
    } catch (error) {
      console.error('Cancellation Error:', error);
      toast.error(error.message || 'Failed to modify node status.');
    } finally {
      // মডাল ক্লোজ ও স্টেট রিসেট
      setIsModalOpen(false);
      setActiveBookingId(null);
    }
  };

  if (isSessionLoading || loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] tracking-widest">
        FETCHING ALLOCATION MATRICES...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* 📑 SECTION HEADER */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
            User Control Center
          </div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            My Booking <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Registry</span>
          </h1>
          <p className="text-xs text-gray-400 max-w-md">
            Review your active vehicle leases, track deployment schedules, and manage token receipts safely.
          </p>
        </div>

        {/* 📊 BOOKINGS CONTAINER */}
        <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            {bookings.length === 0 ? (
              <div className="p-12 text-center font-mono text-xs text-gray-500">
                NO ACTIVE ALLOCATION NODES FOUND IN SYSTEM.
              </div>
            ) : (
              <table className="w-full border-collapse text-left font-sans">
                
                <thead>
                  <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
                    <th className="p-4 md:p-5">Vehicle Details</th>
                    <th className="p-4 md:p-5">Total Cost</th>
                    <th className="p-4 md:p-5">Grid Status</th>
                    <th className="p-4 md:p-5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5 text-xs">
                  {bookings.map((booking) => (
                    <tr key={booking._id || Math.random().toString()} className="hover:bg-white/[0.02] transition-colors group">
                      
                      {/* Column 1: Vehicle Info */}
                      <td className="p-4 md:p-5">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0 shadow-inner">
                            <Image
                              src={booking.carImage || booking.image || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200'} 
                              alt={booking.carName || 'Vehicle Grid Link'}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="80px"
                              unoptimized
                            />
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-[#00ffcc] transition-colors text-sm md:text-base">
                              {booking.carName}
                            </div>
                            <div className="font-mono text-[10px] text-gray-500 uppercase mt-0.5">
                              User ID: {booking.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Price */}
                      <td className="p-4 md:p-5 font-mono font-bold text-white text-sm">
                        ${booking.dailyPrice} <span className="text-[10px] text-gray-500 font-normal">/ day</span>
                      </td>

                      {/* Column 3: Status Badge */}
                      <td className="p-4 md:p-5">
                        <span
                          className={`inline-block font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            booking.status === 'Canceled'
                              ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {booking.status || 'Confirmed'}
                        </span>
                      </td>

                      {/* Column 4: Actions - 🎯 ডবল বাটন রেন্ডারিং বাগ এখানে ফিক্স করা হয়েছে */}
                      <td className="p-4 md:p-5 text-right space-x-2 whitespace-nowrap">
                        {booking.status === 'Canceled' ? (
                          <span className="font-mono text-[10px] text-rose-400 uppercase tracking-widest bg-rose-500/5 px-3 py-1.5 rounded-lg border border-rose-500/10">
                            Node Terminated
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => alert(`Update Schedule Terminal for Node: ${booking._id}`)}
                              className="bg-white/5 border border-white/10 hover:border-[#00ffcc] hover:bg-[#00ffcc] text-gray-300 hover:text-black font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
                            >
                              Modify
                            </button>
                            <button
                              onClick={() => openCancelModal(booking._id)}
                              className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>
        </div>

      </div>

      {/* 🔮 CUSTOM CYBERPUNK MODAL COMPONENT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300">
          <div className="bg-[#090d16] border border-rose-500/30 max-w-sm w-full rounded-2xl p-6 shadow-[0_0_30px_rgba(244,63,94,0.15)] space-y-6 text-center transform scale-100 transition-transform duration-300">
            
            {/* Warning Icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/30">
              <svg className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold tracking-tight text-white uppercase">
                Terminate Lease Node?
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Are you absolutely sure you want to terminate this vehicle deployment matrix? This action will instantly release the asset allocation.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setActiveBookingId(null);
                }}
                className="flex-1 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 font-mono text-[11px] uppercase tracking-wider py-2.5 rounded-xl transition-all"
              >
                Abort
              </button>
              <button
                onClick={handleCancelBooking}
                className="flex-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white font-mono text-[11px] uppercase tracking-wider py-2.5 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.1)] transition-all"
              >
                Confirm Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}





















// 'use client';

// import { authClient } from '@/lib/auth-client';
// import Image from 'next/image'; 
// import { useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔮 কাস্টম মডাল স্টেট
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeBookingId, setActiveBookingId] = useState(null);

//   // 🎯 Better Auth সেশন ট্র্যাকিং
//   const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
//   const userSession = sessionData?.user;

//   // 📡 ডাটাবেজ থেকে অ্যাক্টিভ বুকিং লোড করা
//   useEffect(() => {
//     if (isSessionLoading) return;

//     if (!userSession?.email) {
//       setLoading(false);
//       return;
//     }

//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;
    
//     fetch(`http://localhost:8000/my-bookings?email=${userSession.email}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${sessionTokenOrId}`
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error(`Server Sync Error: Status Code ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         setBookings(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Fetch Error:', err);
//         toast.error(err.message || 'Failed to sync with grid repository.');
//         setLoading(false);
//       });
//   }, [userSession, sessionData, isSessionLoading]);

//   // 🛠️ মডাল ট্রিগার ফাংশন
//   const openCancelModal = (id) => {
//     setActiveBookingId(id);
//     setIsModalOpen(true);
//   };

//   // ❌ বুকিং ক্যান্সেল কনফার্মেশন প্রসেস

// // ❌ বুকিং ক্যান্সেল এবং লিস্ট থেকে পার্মানেন্টলি রিমুভ করার ফাংশন
// const handleCancelBooking = async (id) => {
//   if (!id) {
//     toast.error('ERROR: Node Deployment ID is targetless.');
//     return;
//   }

//   const confirmCancel = window.confirm('Are you sure you want to terminate this booking?');
//   if (!confirmCancel) return;

//   const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;

//   try {
//     const response = await fetch(`http://localhost:8000/bookings/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${sessionTokenOrId}`
//       },
//       body: JSON.stringify({ status: 'Canceled' }),
//     });

//     const resData = await response.json();

//     if (!response.ok) {
//       throw new Error(resData.error || `Terminal Request Rejected: Status Code ${response.status}`);
//     }

//     // 🎯 সাথে সাথে UI স্টেট থেকে রিমুভ করে দেওয়া
//     setBookings((prevBookings) =>
//       prevBookings.filter((booking) => booking._id !== id)
//     );

//     toast.success('NODE TERMINATED AND REMOVED FROM REPOSITORY');
//   } catch (error) {
//     console.error('Cancellation Error:', error);
//     toast.error(error.message || 'Failed to modify node status.');
//   }
// };



//   // const handleCancelBooking = async () => {
//   //   if (!activeBookingId) return;

//   //   const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;

//   //   try {
//   //     const response = await fetch(`http://localhost:8000/bookings/${activeBookingId}`, {
//   //       method: 'PATCH',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         'Authorization': `Bearer ${sessionTokenOrId}`
//   //       },
//   //       body: JSON.stringify({ status: 'Canceled' }),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error(`Terminal Request Rejected: Status Code ${response.status}`);
//   //     }

//   //     // স্টেট থেকে ডাটা রিমুভ করা
//   //     setBookings((prevBookings) =>
//   //       prevBookings.filter((booking) => booking._id !== activeBookingId)
//   //     );

//   //     toast.success('NODE TERMINATED AND REMOVED FROM LIST');
//   //   } catch (error) {
//   //     console.error('Cancellation Error:', error);
//   //     toast.error(error.message || 'Failed to modify node status.');
//   //   } finally {
//   //     // মডাল ক্লোজ ও স্টেট রিসেট
//   //     setIsModalOpen(false);
//   //     setActiveBookingId(null);
//   //   }
//   // };

//   if (isSessionLoading || loading) {
//     return (
//       <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] tracking-widest">
//         FETCHING ALLOCATION MATRICES...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 relative overflow-hidden">
      
//       <div className="absolute top-1/2 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

//       <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
//         {/* 📑 SECTION HEADER */}
//         <div className="space-y-2 text-center md:text-left">
//           <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
//             User Control Center
//           </div>
//           <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
//             My Booking <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Registry</span>
//           </h1>
//           <p className="text-xs text-gray-400 max-w-md">
//             Review your active vehicle leases, track deployment schedules, and manage token receipts safely.
//           </p>
//         </div>

//         {/* 📊 BOOKINGS CONTAINER */}
//         <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
//           <div className="overflow-x-auto">
//             {bookings.length === 0 ? (
//               <div className="p-12 text-center font-mono text-xs text-gray-500">
//                 NO ACTIVE ALLOCATION NODES FOUND IN SYSTEM.
//               </div>
//             ) : (
//               <table className="w-full border-collapse text-left font-sans">
                
//                 <thead>
//                   <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
//                     <th className="p-4 md:p-5">Vehicle Details</th>
//                     <th className="p-4 md:p-5">Total Cost</th>
//                     <th className="p-4 md:p-5">Grid Status</th>
//                     <th className="p-4 md:p-5 text-right">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-white/5 text-xs">
//                   {bookings.map((booking) => (
//                     <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors group">
                      
//                       {/* Column 1: Vehicle Info */}
//                       <td className="p-4 md:p-5">
//                         <div className="flex items-center gap-4">
//                           <div className="relative h-12 w-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0 shadow-inner">
//                             <Image
//                               src={booking.carImage || booking.image || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200'} 
//                               alt={booking.carName || 'Vehicle Grid Link'}
//                               fill
//                               className="object-cover group-hover:scale-105 transition-transform duration-300"
//                               sizes="80px"
//                               unoptimized
//                             />
//                           </div>
//                           <div>
//                             <div className="font-bold text-white group-hover:text-[#00ffcc] transition-colors text-sm md:text-base">
//                               {booking.carName}
//                             </div>
//                             <div className="font-mono text-[10px] text-gray-500 uppercase mt-0.5">
//                               User ID: {booking.userEmail}
//                             </div>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Column 2: Price */}
//                       <td className="p-4 md:p-5 font-mono font-bold text-white text-sm">
//                         ${booking.dailyPrice} <span className="text-[10px] text-gray-500 font-normal">/ day</span>
//                       </td>

//                       {/* Column 3: Status Badge */}
//                       <td className="p-4 md:p-5">
//                         <span
//                           className={`inline-block font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
//                             booking.status === 'Canceled'
//                               ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
//                               : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
//                           }`}
//                         >
//                           {booking.status || 'Confirmed'}
//                         </span>
//                       </td>

//                       {/* Column 4: Actions */}
//                       <td className="p-4 md:p-5 text-right space-x-2 whitespace-nowrap">
//                         <button
//                           onClick={() => alert(`Update Schedule Terminal for Node: ${booking._id}`)}
//                           className="bg-white/5 border border-white/10 hover:border-[#00ffcc] hover:bg-[#00ffcc] text-gray-300 hover:text-black font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                         >
//                           Modify
//                         </button>
//                         <button
//                           onClick={() => openCancelModal(booking._id)}
//                           className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                         >
//                           Cancel
//                         </button>
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>

//               </table>
//             )}
//           </div>
//         </div>

//       </div>

//       {/* 🔮 CUSTOM CYBERPUNK MODAL COMPONENT */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300 animate-fadeIn">
//           <div className="bg-[#090d16] border border-rose-500/30 max-w-sm w-full rounded-2xl p-6 shadow-[0_0_30px_rgba(244,63,94,0.15)] space-y-6 text-center transform scale-100 transition-transform duration-300">
            
//             {/* Warning Icon */}
//             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/30">
//               <svg className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
//               </svg>
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-lg font-bold tracking-tight text-white uppercase">
//                 Terminate Lease Node?
//               </h3>
//               <p className="text-xs text-gray-400 leading-relaxed">
//                 Are you absolutely sure you want to terminate this vehicle deployment matrix? This action will instantly release the asset allocation.
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3 pt-2">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="flex-1 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 font-mono text-[11px] uppercase tracking-wider py-2.5 rounded-xl transition-all"
//               >
//                 Abort
//               </button>
//               <button
//                 onClick={handleCancelBooking}
//                 className="flex-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white font-mono text-[11px] uppercase tracking-wider py-2.5 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.1)] transition-all"
//               >
//                 Confirm Delete
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }























// 'use client';

// import { authClient } from '@/lib/auth-client';
// import Image from 'next/image'; 
// import { useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🎯 Better Auth সেশন ট্র্যাকিং
//   const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
//   const userSession = sessionData?.user;

//   // 📡 ডাটাবেজ থেকে অ্যাক্টিভ বুকিং লোড করা
//   useEffect(() => {
//     if (isSessionLoading) return;

//     if (!userSession?.email) {
//       setLoading(false);
//       return;
//     }

//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;
    
//     fetch(`http://localhost:8000/my-bookings?email=${userSession.email}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${sessionTokenOrId}`
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error(`Server Sync Error: Status Code ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         setBookings(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Fetch Error:', err);
//         toast.error(err.message || 'Failed to sync with grid repository.');
//         setLoading(false);
//       });
//   }, [userSession, sessionData, isSessionLoading]);

//   // ❌ বুকিং ক্যান্সেল এবং সাথে সাথে পেজ থেকে রিমুভ করার ফাংশন
//   const handleCancelBooking = async (id) => {
//     if (!id) {
//       toast.error('ERROR: Node Deployment ID is targetless.');
//       return;
//     }

//     const confirmCancel = window.confirm('Are you sure you want to terminate this vehicle deployment node?');
//     if (!confirmCancel) return;

//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;

//     try {
//       const response = await fetch(`http://localhost:8000/bookings/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${sessionTokenOrId}`
//         },
//         body: JSON.stringify({ status: 'Canceled' }),
//       });

//       if (!response.ok) {
//         throw new Error(`Terminal Request Rejected: Status Code ${response.status}`);
//       }

//       // 🎯 পরিবর্তন এখানে: .map() এর বদলে .filter() ব্যবহার করা হয়েছে যেন ক্যানসেল হওয়া আইডিটি স্টেট থেকে বাদ পড়ে যায়
//       setBookings((prevBookings) =>
//         prevBookings.filter((booking) => booking._id !== id)
//       );

//       toast.success('NODE TERMINATED AND REMOVED FROM LIST');
//     } catch (error) {
//       console.error('Cancellation Error:', error);
//       toast.error(error.message || 'Failed to modify node status.');
//     }
//   };

//   if (isSessionLoading || loading) {
//     return (
//       <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] tracking-widest">
//         FETCHING ALLOCATION MATRICES...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 relative overflow-hidden">
      
//       <div className="absolute top-1/2 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

//       <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
//         {/* 📑 SECTION HEADER */}
//         <div className="space-y-2 text-center md:text-left">
//           <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
//             User Control Center
//           </div>
//           <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
//             My Booking <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Registry</span>
//           </h1>
//           <p className="text-xs text-gray-400 max-w-md">
//             Review your active vehicle leases, track deployment schedules, and manage token receipts safely.
//           </p>
//         </div>

//         {/* 📊 BOOKINGS CONTAINER */}
//         <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
//           <div className="overflow-x-auto">
//             {bookings.length === 0 ? (
//               <div className="p-12 text-center font-mono text-xs text-gray-500">
//                 NO ACTIVE ALLOCATION NODES FOUND IN SYSTEM.
//               </div>
//             ) : (
//               <table className="w-full border-collapse text-left font-sans">
                
//                 <thead>
//                   <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
//                     <th className="p-4 md:p-5">Vehicle Details</th>
//                     <th className="p-4 md:p-5">Total Cost</th>
//                     <th className="p-4 md:p-5">Grid Status</th>
//                     <th className="p-4 md:p-5 text-right">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-white/5 text-xs">
//                   {bookings.map((booking) => (
//                     <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors group">
                      
//                       {/* Column 1: Vehicle Info */}
//                       <td className="p-4 md:p-5">
//                         <div className="flex items-center gap-4">
//                           <div className="relative h-12 w-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0 shadow-inner">
//                             <Image
//                               src={booking.carImage || booking.image || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200'} 
//                               alt={booking.carName || 'Vehicle Grid Link'}
//                               fill
//                               className="object-cover group-hover:scale-105 transition-transform duration-300"
//                               sizes="80px"
//                               unoptimized
//                             />
//                           </div>
//                           <div>
//                             <div className="font-bold text-white group-hover:text-[#00ffcc] transition-colors text-sm md:text-base">
//                               {booking.carName}
//                             </div>
//                             <div className="font-mono text-[10px] text-gray-500 uppercase mt-0.5">
//                               User ID: {booking.userEmail}
//                             </div>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Column 2: Price */}
//                       <td className="p-4 md:p-5 font-mono font-bold text-white text-sm">
//                         ${booking.dailyPrice} <span className="text-[10px] text-gray-500 font-normal">/ day</span>
//                       </td>

//                       {/* Column 3: Status Badge */}
//                       <td className="p-4 md:p-5">
//                         <span
//                           className={`inline-block font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
//                             booking.status === 'Canceled'
//                               ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
//                               : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
//                           }`}
//                         >
//                           {booking.status || 'Confirmed'}
//                         </span>
//                       </td>

//                       {/* Column 4: Actions */}
//                       <td className="p-4 md:p-5 text-right space-x-2 whitespace-nowrap">
//                         <button
//                           onClick={() => alert(`Update Schedule Terminal for Node: ${booking._id}`)}
//                           className="bg-white/5 border border-white/10 hover:border-[#00ffcc] hover:bg-[#00ffcc] text-gray-300 hover:text-black font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                         >
//                           Modify
//                         </button>
//                         <button
//                           onClick={() => handleCancelBooking(booking._id)}
//                           className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                         >
//                           Cancel
//                         </button>
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>

//               </table>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }




















// 'use client';

// import { authClient } from '@/lib/auth-client';
// import Image from 'next/image'; // 📷 ইমেজ অপ্টিমাইজেশনের জন্য ইমপোর্ট করা হলো
// import { useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🎯 Better Auth থেকে কারেন্ট লগইনড ইউজারের সেশন নেওয়া
//   const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
//   const userSession = sessionData?.user;

//   // 📡 ডাটাবেজ থেকে ইউজারের নিজস্ব বুকিং ডাটা লোড করা
//   useEffect(() => {
//     if (isSessionLoading) return;

//     if (!userSession?.email) {
//       setLoading(false);
//       return;
//     }

//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;
    
//     fetch(`http://localhost:8000/my-bookings?email=${userSession.email}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${sessionTokenOrId}`
//       }
//     })
//       .then((res) => {
//         // 🛑 সার্ভার ডাউন বা রুট না মিললে (HTML 404/500 এরর) সরাসরি এখানে ব্লক করবে
//         if (!res.ok) throw new Error(`Server Sync Error: Status Code ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         setBookings(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Fetch Error:', err);
//         toast.error(err.message || 'Failed to sync with grid repository.');
//         setLoading(false);
//       });
//   }, [userSession, sessionData, isSessionLoading]);

//   // ❌ বুকিং ক্যান্সেল করার ডাইনামিক ফাংশন
//   const handleCancelBooking = async (id) => {
//     if (!id) {
//       toast.error('ERROR: Node Deployment ID is targetless.');
//       return;
//     }

//     const confirmCancel = window.confirm('Are you sure you want to terminate this vehicle deployment node?');
//     if (!confirmCancel) return;

//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;

//     try {
//       const response = await fetch(`http://localhost:8000/bookings/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${sessionTokenOrId}`
//         },
//         body: JSON.stringify({ status: 'Canceled' }),
//       });

//       // 🛡️ JSON পার্স করার আগেই চেক করে নেওয়া হচ্ছে রেসপন্স ওকে কি না
//       if (!response.ok) {
//         throw new Error(`Terminal Request Rejected: Status Code ${response.status}`);
//       }

//       const result = await response.json();

//       setBookings((prevBookings) =>
//         prevBookings.map((booking) =>
//           booking._id === id ? { ...booking, status: 'Canceled' } : booking
//         )
//       );

//       toast.success('NODE TERMINATED SUCCESSFULLY');
//     } catch (error) {
//       console.error('Cancellation Error:', error);
//       toast.error(error.message || 'Failed to modify node status.');
//     }
//   };

//   if (isSessionLoading || loading) {
//     return (
//       <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] tracking-widest">
//         FETCHING ALLOCATION MATRICES...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 relative overflow-hidden">
      
//       {/* 🔮 Background Tech Glow */}
//       <div className="absolute top-1/2 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

//       <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
//         {/* 📑 SECTION HEADER */}
//         <div className="space-y-2 text-center md:text-left">
//           <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
//             User Control Center
//           </div>
//           <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
//             My Booking <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Registry</span>
//           </h1>
//           <p className="text-xs text-gray-400 max-w-md">
//             Review your active vehicle leases, track deployment schedules, and manage token receipts safely.
//           </p>
//         </div>

//         {/* 📊 BOOKINGS TABLE CONTAINER */}
//         <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
//           <div className="overflow-x-auto">
//             {bookings.length === 0 ? (
//               <div className="p-12 text-center font-mono text-xs text-gray-500">
//                 NO ACTIVE ALLOCATION NODES FOUND IN SYSTEM.
//               </div>
//             ) : (
//               <table className="w-full border-collapse text-left font-sans">
                
//                 {/* 🏁 Table Head */}
//                 <thead>
//                   <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
//                     <th className="p-4 md:p-5">Vehicle Details</th>
//                     <th className="p-4 md:p-5">Total Cost</th>
//                     <th className="p-4 md:p-5">Grid Status</th>
//                     <th className="p-4 md:p-5 text-right">Actions</th>
//                   </tr>
//                 </thead>

//                 {/* 📦 Table Body */}
//                 <tbody className="divide-y divide-white/5 text-xs">
//                   {bookings.map((booking) => (
//                     <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors group">
                      
//                       {/* Column 1: Vehicle Info + Image 🖼️ */}
//                       <td className="p-4 md:p-5">
//                         <div className="flex items-center gap-4">
//                           {/* 🖼️ Dynamic Image Node Container */}
//                           <div className="relative h-12 w-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0 shadow-inner">
//                             <Image
//                               src={booking.carImage || booking.image || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200'} 
//                               alt={booking.carName || 'Vehicle Grid Link'}
//                               fill
//                               className="object-cover group-hover:scale-105 transition-transform duration-300"
//                               sizes="80px"
//                               priority={false}
//                               unoptimized // Next.js কনফিগারেশনের ঝামেলা এড়াতে এটি ট্রু রাখা হয়েছে
//                             />
//                           </div>
//                           <div>
//                             <div className="font-bold text-white group-hover:text-[#00ffcc] transition-colors text-sm md:text-base">
//                               {booking.carName}
//                             </div>
//                             <div className="font-mono text-[10px] text-gray-500 uppercase mt-0.5">
//                               User ID: {booking.userEmail}
//                             </div>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Column 2: Total Cost */}
//                       <td className="p-4 md:p-5 font-mono font-bold text-white text-sm">
//                         ${booking.dailyPrice} <span className="text-[10px] text-gray-500 font-normal">/ day</span>
//                       </td>

//                       {/* Column 3: Status Badges */}
//                       <td className="p-4 md:p-5">
//                         <span
//                           className={`inline-block font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
//                             booking.status === 'Canceled'
//                               ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
//                               : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
//                           }`}
//                         >
//                           {booking.status || 'Confirmed'}
//                         </span>
//                       </td>

//                       {/* Column 4: Action Buttons */}
//                       <td className="p-4 md:p-5 text-right space-x-2 whitespace-nowrap">
//                         {booking.status !== 'Canceled' ? (
//                           <>
//                             <button
//                               onClick={() => alert(`Update Schedule Terminal for Node: ${booking._id}`)}
//                               className="bg-white/5 border border-white/10 hover:border-[#00ffcc] hover:bg-[#00ffcc] text-gray-300 hover:text-black font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                             >
//                               Modify
//                             </button>
//                             <button
//                               onClick={() => handleCancelBooking(booking._id)}
//                               className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         ) : (
//                           <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest select-none pr-2">
//                             Node Terminated
//                           </span>
//                         )}
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>

//               </table>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
































// wthi out deleat 


// 'use client';

// import { authClient } from '@/lib/auth-client';
// import Image from 'next/image'; // 📷 ইমেজ অপ্টিমাইজেশনের জন্য ইমপোর্ট করা হলো
// import { useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🎯 Better Auth থেকে কারেন্ট লগইনড ইউজারের সেশন নেওয়া
//   const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
//   const userSession = sessionData?.user;

//   // 📡 ডাটাবেজ থেকে ইউজারের নিজস্ব বুকিং ডাটা লোড করা
//   useEffect(() => {
//     if (isSessionLoading) return;

//     if (!userSession?.email) {
//       setLoading(false);
//       return;
//     }

//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;
    
//     fetch(`http://localhost:8000/my-bookings?email=${userSession.email}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${sessionTokenOrId}`
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch allocation matrices.');
//         return res.json();
//       })
//       .then((data) => {
//         setBookings(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Fetch Error:', err);
//         toast.error('Failed to sync with grid repository.');
//         setLoading(false);
//       });
//   }, [userSession, sessionData, isSessionLoading]);

//   // ❌ বুকিং ক্যান্সেল করার ডাইনামিক ফাংশন
//   const handleCancelBooking = async (id) => {
//     const confirmCancel = window.confirm('Are you sure you want to terminate this vehicle deployment node?');
//     if (!confirmCancel) return;

//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;

//     try {
//       const response = await fetch(`http://localhost:8000/bookings/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${sessionTokenOrId}`
//         },
//         body: JSON.stringify({ status: 'Canceled' }),
//       });

//       const result = await response.json();
//       if (!response.ok) throw new Error(result.error || 'Cancellation Failed');

//       setBookings((prevBookings) =>
//         prevBookings.map((booking) =>
//           booking._id === id ? { ...booking, status: 'Canceled' } : booking
//         )
//       );

//       toast.success('NODE TERMINATED SUCCESSFULLY');
//     } catch (error) {
//       console.error('Cancellation Error:', error);
//       toast.error(error.message || 'Failed to modify node.');
//     }
//   };

//   if (isSessionLoading || loading) {
//     return (
//       <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] tracking-widest">
//         FETCHING ALLOCATION MATRICES...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 relative overflow-hidden">
      
//       {/* 🔮 Background Tech Glow */}
//       <div className="absolute top-1/2 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

//       <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
//         {/* 📑 SECTION HEADER */}
//         <div className="space-y-2 text-center md:text-left">
//           <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
//             User Control Center
//           </div>
//           <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
//             My Booking <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Registry</span>
//           </h1>
//           <p className="text-xs text-gray-400 max-w-md">
//             Review your active vehicle leases, track deployment schedules, and manage token receipts safely.
//           </p>
//         </div>

//         {/* 📊 BOOKINGS TABLE CONTAINER */}
//         <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
//           <div className="overflow-x-auto">
//             {bookings.length === 0 ? (
//               <div className="p-12 text-center font-mono text-xs text-gray-500">
//                 NO ACTIVE ALLOCATION NODES FOUND IN SYSTEM.
//               </div>
//             ) : (
//               <table className="w-full border-collapse text-left font-sans">
                
//                 {/* 🏁 Table Head */}
//                 <thead>
//                   <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
//                     <th className="p-4 md:p-5">Vehicle Details</th>
//                     <th className="p-4 md:p-5">Total Cost</th>
//                     <th className="p-4 md:p-5">Grid Status</th>
//                     <th className="p-4 md:p-5 text-right">Actions</th>
//                   </tr>
//                 </thead>

//                 {/* 📦 Table Body */}
//                 <tbody className="divide-y divide-white/5 text-xs">
//                   {bookings.map((booking) => (
//                     <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors group">
                      
//                       {/* Column 1: Vehicle Info + Image 🖼️ */}
//                       <td className="p-4 md:p-5">
//                         <div className="flex items-center gap-4">
//                           {/* 🖼️ Dynamic Image Node Container */}
//                           <div className="relative h-12 w-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0 shadow-inner">
//                             <Image
//                               src={booking.carImage || booking.image || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200'} // ডাটাবেজে ইমেজ না থাকলে ব্যাকআপ টেমপ্লেট ইমেজ লোড হবে
//                               alt={booking.carName || 'Vehicle Grid Link'}
//                               fill
//                               className="object-cover group-hover:scale-105 transition-transform duration-300"
//                               sizes="80px"
//                               priority={false}
//                               unoptimized // এক্সটার্নাল হোস্ট এরর বা next.config কনফিগারেশন ঝামেলা এড়ানোর জন্য
//                             />
//                           </div>
//                           <div>
//                             <div className="font-bold text-white group-hover:text-[#00ffcc] transition-colors text-sm md:text-base">
//                               {booking.carName}
//                             </div>
//                             <div className="font-mono text-[10px] text-gray-500 uppercase mt-0.5">
//                               User ID: {booking.userEmail}
//                             </div>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Column 2: Total Cost */}
//                       <td className="p-4 md:p-5 font-mono font-bold text-white text-sm">
//                         ${booking.dailyPrice} <span className="text-[10px] text-gray-500 font-normal">/ day</span>
//                       </td>

//                       {/* Column 3: Status Badges */}
//                       <td className="p-4 md:p-5">
//                         <span
//                           className={`inline-block font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
//                             booking.status === 'Canceled'
//                               ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
//                               : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
//                           }`}
//                         >
//                           {booking.status || 'Confirmed'}
//                         </span>
//                       </td>

//                       {/* Column 4: Action Buttons */}
//                       <td className="p-4 md:p-5 text-right space-x-2 whitespace-nowrap">
//                         {booking.status !== 'Canceled' ? (
//                           <>
//                             <button
//                               onClick={() => alert(`Update Schedule Terminal for Node: ${booking._id}`)}
//                               className="bg-white/5 border border-white/10 hover:border-[#00ffcc] hover:bg-[#00ffcc] text-gray-300 hover:text-black font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                             >
//                               Modify
//                             </button>
//                             <button
//                               onClick={() => handleCancelBooking(booking._id)}
//                               className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         ) : (
//                           <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest select-none pr-2">
//                             Node Terminated
//                           </span>
//                         )}
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>

//               </table>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }























// show data not imge 


// 'use client';

// import { authClient } from '@/lib/auth-client';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🎯 Better Auth থেকে কারেন্ট লগইনড ইউজারের সেশন নেওয়া
//   const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
//   const userSession = sessionData?.user;

//   // 📡 ডাটাবেজ থেকে ইউজারের নিজস্ব বুকিং ডাটা লোড করা
//   useEffect(() => {
//     if (isSessionLoading) return;

//     if (!userSession?.email) {
//       setLoading(false);
//       return;
//     }

//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;
    
//     // ব্যাকএন্ডের সিকিউর GET রুটে রিকোয়েস্ট পাঠানো হচ্ছে
//     fetch(`http://localhost:8000/my-bookings?email=${userSession.email}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${sessionTokenOrId}` // 🔒 টোকেন ভেরিফিকেশন
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch allocation matrices.');
//         return res.json();
//       })
//       .then((data) => {
//         setBookings(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Fetch Error:', err);
//         toast.error('Failed to sync with grid repository.');
//         setLoading(false);
//       });
//   }, [userSession, sessionData, isSessionLoading]);

//   // ❌ বুকিং ক্যান্সেল করার ডাইনামিক ফাংশন (ডাটাবেজ আপডেট)
//   const handleCancelBooking = async (id) => {
//     const confirmCancel = window.confirm('Are you sure you want to terminate this vehicle deployment node?');
//     if (!confirmCancel) return;

//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;

//     try {
//       // ব্যাকএন্ডের PATCH রুটে স্ট্যাটাস আপডেটের রিকোয়েস্ট পাঠানো
//       const response = await fetch(`http://localhost:8000/bookings/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${sessionTokenOrId}`
//         },
//         body: JSON.stringify({ status: 'Canceled' }),
//       });

//       const result = await response.json();

//       if (!response.ok) throw new Error(result.error || 'Cancellation Failed');

//       // UI স্টেট রিয়েল-টাইমে আপডেট করা
//       setBookings((prevBookings) =>
//         prevBookings.map((booking) =>
//           booking._id === id ? { ...booking, status: 'Canceled' } : booking
//         )
//       );

//       toast.success('NODE TERMINATED SUCCESSFULLY');
//     } catch (error) {
//       console.error('Cancellation Error:', error);
//       toast.error(error.message || 'Failed to modify node.');
//     }
//   };

//   // লোডিং স্টেট স্ক্রিন
//   if (isSessionLoading || loading) {
//     return (
//       <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] tracking-widest">
//         FETCHING ALLOCATION MATRICES...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 relative overflow-hidden">
      
//       {/* 🔮 Background Tech Glow */}
//       <div className="absolute top-1/2 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

//       <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
//         {/* 📑 SECTION HEADER */}
//         <div className="space-y-2 text-center md:text-left">
//           <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
//             User Control Center
//           </div>
//           <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
//             My Booking <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Registry</span>
//           </h1>
//           <p className="text-xs text-gray-400 max-w-md">
//             Review your active vehicle leases, track deployment schedules, and manage token receipts safely.
//           </p>
//         </div>

//         {/* 📊 BOOKINGS TABLE CONTAINER */}
//         <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
//           <div className="overflow-x-auto">
//             {bookings.length === 0 ? (
//               <div className="p-12 text-center font-mono text-xs text-gray-500">
//                 NO ACTIVE ALLOCATION NODES FOUND IN SYSTEM.
//               </div>
//             ) : (
//               <table className="w-full border-collapse text-left font-sans">
                
//                 {/* 🏁 Table Head */}
//                 <thead>
//                   <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
//                     <th className="p-4 md:p-5">Vehicle</th>
//                     <th className="p-4 md:p-5">Total Cost</th>
//                     <th className="p-4 md:p-5">Grid Status</th>
//                     <th className="p-4 md:p-5 text-right">Actions</th>
//                   </tr>
//                 </thead>

//                 {/* 📦 Table Body */}
//                 <tbody className="divide-y divide-white/5 text-xs">
//                   {bookings.map((booking) => (
//                     <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors group">
                      
//                       {/* Column 1: Vehicle Info */}
//                       <td className="p-4 md:p-5">
//                         <div className="font-bold text-white group-hover:text-[#00ffcc] transition-colors">
//                           {booking.carName}
//                         </div>
//                         <div className="font-mono text-[10px] text-gray-500 uppercase">
//                           User ID: {booking.userEmail}
//                         </div>
//                       </td>

//                       {/* Column 2: Total Cost */}
//                       <td className="p-4 md:p-5 font-mono font-bold text-white">
//                         ${booking.dailyPrice} <span className="text-[10px] text-gray-500 font-normal">/ day</span>
//                       </td>

//                       {/* Column 3: Status Badges */}
//                       <td className="p-4 md:p-5">
//                         <span
//                           className={`inline-block font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
//                             booking.status === 'Canceled'
//                               ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
//                               : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' // ডিফল্ট বা সাকসেস বুকিং 'Confirmed' দেখাবে
//                           }`}
//                         >
//                           {booking.status || 'Confirmed'}
//                         </span>
//                       </td>

//                       {/* Column 4: Action Buttons */}
//                       <td className="p-4 md:p-5 text-right space-x-2">
//                         {booking.status !== 'Canceled' ? (
//                           <>
//                             <button
//                               onClick={() => alert(`Update Schedule Terminal for Node: ${booking._id}`)}
//                               className="bg-white/5 border border-white/10 hover:border-[#00ffcc] hover:bg-[#00ffcc] text-gray-300 hover:text-black font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                             >
//                               Modify
//                             </button>
//                             <button
//                               onClick={() => handleCancelBooking(booking._id)} // MongoDB ObjectId (`_id`) পাস করা হয়েছে
//                               className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         ) : (
//                           <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest select-none">
//                             Node Terminated
//                           </span>
//                         )}
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>

//               </table>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

















// 'use client';

// import { useState } from 'react';

// // 📊 ডাটাবেস মক ডাটা (Mock Booking Data Pipeline)
// const INITIAL_BOOKINGS = [
//   {
//     id: 'b_01',
//     carName: 'Cyber Coupe X1',
//     brand: 'Tesla',
//     startDate: '2026-05-20',
//     endDate: '2026-05-25',
//     totalCost: 600,
//     status: 'Confirmed',
//   },
//   {
//     id: 'b_02',
//     carName: 'Stealth SUV Matrix',
//     brand: 'BMW',
//     startDate: '2026-06-01',
//     endDate: '2026-06-04',
//     totalCost: 285,
//     status: 'Pending',
//   },
//   {
//     id: 'b_03',
//     carName: 'Vanguard Cruiser',
//     brand: 'BMW',
//     startDate: '2026-04-10',
//     endDate: '2026-04-12',
//     totalCost: 280,
//     status: 'Canceled',
//   },
// ];

// export default function MyBookings() {
//   const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

//   // ❌ বুকিং ক্যান্সেল করার রিয়েল-টাইম ফাংশন
//   const handleCancelBooking = (id) => {
//     const confirmCancel = window.confirm('Are you sure you want to terminate this vehicle deployment node?');
//     if (confirmCancel) {
//       setBookings((prevBookings) =>
//         prevBookings.map((booking) =>
//           booking.id === id ? { ...booking, status: 'Canceled' } : booking
//         )
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 relative overflow-hidden">
      
//       {/* 🔮 Background Tech Glow */}
//       <div className="absolute top-1/2 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

//       <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
//         {/* 📑 SECTION HEADER */}
//         <div className="space-y-2 text-center md:text-left">
//           <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
//             User Control Center
//           </div>
//           <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
//             My Booking <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Registry</span>
//           </h1>
//           <p className="text-xs text-gray-400 max-w-md">
//             Review your active vehicle leases, track deployment schedules, and manage token receipts safely.
//           </p>
//         </div>

//         {/* 📊 BOOKINGS TABLE CONTAINER */}
//         <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse text-left font-sans">
              
//               {/* 🏁 Table Head */}
//               <thead>
//                 <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
//                   <th className="p-4 md:p-5">Vehicle</th>
//                   <th className="p-4 md:p-5">Timeline (Start - End)</th>
//                   <th className="p-4 md:p-5">Total Cost</th>
//                   <th className="p-4 md:p-5">Grid Status</th>
//                   <th className="p-4 md:p-5 text-right">Actions</th>
//                 </tr>
//               </thead>

//               {/* 📦 Table Body */}
//               <tbody className="divide-y divide-white/5 text-xs">
//                 {bookings.map((booking) => (
//                   <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors group">
                    
//                     {/* Column 1: Vehicle Info */}
//                     <td className="p-4 md:p-5">
//                       <div className="font-bold text-white group-hover:text-[#00ffcc] transition-colors">
//                         {booking.carName}
//                       </div>
//                       <div className="font-mono text-[10px] text-gray-500 uppercase">
//                         {booking.brand}
//                       </div>
//                     </td>

//                     {/* Column 2: Date Timeline */}
//                     <td className="p-4 md:p-5 font-mono text-gray-400">
//                       {booking.startDate} <span className="text-gray-600">to</span> {booking.endDate}
//                     </td>

//                     {/* Column 3: Total Cost */}
//                     <td className="p-4 md:p-5 font-mono font-bold text-white">
//                       ${booking.totalCost}
//                     </td>

//                     {/* Column 4: Status Badges */}
//                     <td className="p-4 md:p-5">
//                       <span
//                         className={`inline-block font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
//                           booking.status === 'Confirmed'
//                             ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
//                             : booking.status === 'Pending'
//                             ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
//                             : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
//                         }`}
//                       >
//                         {booking.status}
//                       </span>
//                     </td>

//                     {/* Column 5: Action Buttons */}
//                     <td className="p-4 md:p-5 text-right space-x-2">
//                       {booking.status !== 'Canceled' ? (
//                         <>
//                           <button
//                             onClick={() => alert(`Update Schedule Terminal for Node: ${booking.id}`)}
//                             className="bg-white/5 border border-white/10 hover:border-[#00ffcc] hover:bg-[#00ffcc] text-gray-300 hover:text-black font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                           >
//                             Modify
//                           </button>
//                           <button
//                             onClick={() => handleCancelBooking(booking.id)}
//                             className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
//                           >
//                             Cancel
//                           </button>
//                         </>
//                       ) : (
//                         <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest select-none">
//                           Node Terminated
//                         </span>
//                       )}
//                     </td>

//                   </tr>
//                 ))}
//               </tbody>

//             </table>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }