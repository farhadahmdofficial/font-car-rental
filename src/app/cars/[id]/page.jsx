//  'use client';

// import { Alldata } from '@/Alldata';
import { carone } from '@/Alldata';
import Bookinghandle from '@/components/Bookinghandle';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';



// import { useState } from 'react';
// import { useRouter } from 'next/navigation';








const CarDetails = async({params }) => {
   const { id } = await params;


    const {token} =await auth.api.getToken({
           headers:await headers(),
   
       });
      //  console.log(token,"token in car details page fffff");

    // const res = await fetch('http://localhost:3000/Data.json')
    // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)
    // const cars = await res.json()

    // const cars = await Alldata();
    const car =await carone(id ,token);
    
    // const car  = cars.find(A => A._id == id)


    console.log(car ,"new car addd");





// booking 






// const [isSubmitting, setIsSubmitting] = useState(false);
// const router = useRouter();

// // ১. ডাইনামিক ভ্যারিয়েবল সেটআপ (কোড ক্লিন রাখার জন্য)
// const isAvailable = car?.availabilityStatus;
// const carId = car?._id; // অথবা আপনার অবজেক্টের আইডি প্রোপার্টির নাম

// // ২. বুকিং হ্যান্ডলার ফাংশন
// const handleDirectBooking = () => {
//   // যদি গাড়ি আনঅ্যাভেলেবল থাকে অথবা অলরেডি সাবমিট হতে থাকে, তবে ফাংশন ব্রেক করবে
//   if (!isAvailable || isSubmitting) return;
  
//   setIsSubmitting(true);

//   setTimeout(() => {
//     // সফলভাবে কুয়েরি প্যারামিটারসহ বুকিং পেজে রিডাইরেক্ট করা
//     router.push(`/my-bookings?carId=${carId}`); // 💡 আপনার রাউটের নাম 'my-booking' নাকি 'my-bookings' নিশ্চিত হয়ে নিন
//   }, 1200);
// };




  //   const handleDirectBooking = () => {
  //   if (!isAvailable) return;
  //   setIsSubmitting(true);

    
  //   setTimeout(() => {
  
  //     router.push(`/my-booking?carId=${carId}`);
  //   }, 1200);
  // };

 



  return (
    <div>
       <main className="min-h-screen bg-[#030712] text-white py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        
        {/* BACK NAVIGATION */}
        <Link href="/" className="inline-flex items-center text-xs font-mono text-gray-400 hover:text-[#00ffcc] transition-colors gap-2 group">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> BACK TO FLEET GRID
        </Link>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT PANEL: IMAGE */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#090d16]/60 backdrop-blur-md p-2">
            <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden bg-[#030712]">
              <Image src={car.image} alt={car.carName}  width={600} height={400} className="w-full h-full object-cover select-none " />

              {/* <span className={`absolute top-4 left-4 font-mono text-[10px] tracking-widest border px-3 py-1 rounded-md backdrop-blur-md ${
                isAvailable ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}>
                {car.availabilityStatus}
              </span> */}
            </div>
          </div>

          {/* RIGHT PANEL: INFO */}
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs text-[#00ffcc] uppercase tracking-widest">{car.carType} Category</span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1">{car.carName}</h1>
            </div>

            <div className="border-l-2 border-[#00ffcc]/30 pl-4 py-1">
              <p className="text-sm text-gray-400 leading-relaxed font-sans">{car.description}</p>
            </div>

            <div className="bg-[#090d16]/80 border border-white/5 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 uppercase">Deployment Cost</span>
              <p className="text-2xl font-black text-[#00ffcc]">
                ${car.dailyPrice}<span className="text-xs text-gray-500 font-mono font-normal"> / 24 HOUR LEASE</span>
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">System Parameters</h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
                  <span className="text-gray-500 text-[10px] uppercase">Registry Node</span>
                  <span className="text-white font-bold mt-1 overflow-hidden text-ellipsis">🆔 {car._id}</span>
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

            {/* ACTION BUTTON */}

          <Link  href={'my-booking'}>




          <Bookinghandle car={car}></Bookinghandle>


          {/* <button
  // 💡 এখানেও availabilityStatus চেক করা হচ্ছে
  disabled={!car?.availabilityStatus} 
  className={`w-full font-black uppercase text-sm py-4 rounded-xl tracking-widest transition-all duration-300 ${
   
    car?.availabilityStatus 
      ? 'bg-[#00ffcc] text-black shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:shadow-[0_0_35px_rgba(0,255,204,0.4)] hover:bg-[#00ffcc]/90'
      : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
  }`}
>
  {car?.availabilityStatus
    ? ' Book Now' 
    : 'Unavailable'
  }
</button> */}




 
























            {/* <button 
            className='w-full font-black uppercase text-sm py-4 rounded-xl tracking-widest transition-all duration-300     bg-[#00ffcc] text-black shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:shadow-[0_0_35px_rgba(0,255,204,0.4)] hover:bg-[#00ffcc]/90'

              // onClick={handleDirectBooking}
              // disabled={!isAvailable || isSubmitting}
              // className={`w-full font-black uppercase text-sm py-4 rounded-xl tracking-widest transition-all duration-300 ${
              //   isAvailable && !isSubmitting
              //     ? 'bg-[#00ffcc] text-black shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:shadow-[0_0_35px_rgba(0,255,204,0.4)] hover:bg-[#00ffcc]/90'
              //     : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
              // }`}
            >
              {/* {isSubmitting 
                ? 'PROCESSING LEASE PROTOCOL...' 
                : isAvailable 
                  ? 'Initialize Deployment (Book Now)' 
                  : 'Node Locked / Unavailable'
              } */}

              {/* Booking now  */}
            {/* </button>  */}



          </Link>





          </div>
        </div>
      </div>
    </main>
    </div>
  );
};

export default CarDetails;
















// 'use client';

// import { authClient } from '@/lib/auth-client';
// import { useEffect, useState, use } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation'; 
// import { toast } from 'react-hot-toast';

// export default function CarDetails({ params: paramsPromise }) {
//   const params = use(paramsPromise);
//   const carId = params?.id;
//   const router = useRouter(); 

//   // 🎯 Better Auth হুক ক্লায়েন্ট সাইড সেশন ট্র্যাকিং
//   const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
//   const userSession = sessionData?.user; 

//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // 📡 আইডি অনুযায়ী সরাসরি সিঙ্গেল কার ডাটা লোড করা
//   useEffect(() => {
//     // 🛑 সেফটি গার্ড: আইডি না থাকলে বা সেশন লোড হওয়া শেষ না হলে ফেচ আটকে দেওয়া হলো
//     if (!carId || isSessionLoading) return;

//     setLoading(true);
    
//     // এনভায়রনমেন্ট ভ্যারিয়েবল ইউআরএল সেফটি চেক
//     const baseApi =`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`;
//     // const baseApi = process.env.NEXT_PUBLIC_SINGLE_CARS_API || 'http://localhost:8000/cars';
//     const apiUrl = baseApi.endsWith('/') ? `${baseApi}${carId}` : `${baseApi}/${carId}`;

//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;

//     fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${sessionTokenOrId}`
//       }
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`Server Response Fail. Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setCar(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Matrix Pipeline Error:', err);
//         setLoading(false);
//       });
//   }, [carId, sessionData, isSessionLoading]); // 👈 isSessionLoading এখানে যুক্ত করা হলো



//   // 🎯 সরাসরি বুকিং করার মেইন হ্যান্ডলার
//   const handleDirectBooking = async () => {
//     // ১. ইউজার লগইন করা না থাকলে আটকে দেওয়া
//     if (!userSession) {
//       toast.error('ACCESS_DENIED: Please log in first.');
//       router.push('/login');
//       return;
//     }

//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token; 

//     // ✅ সঠিক ফিক্স: ইমেজ প্রোপার্টি সহ একটিভ পে-লোড স্ট্রাকচার
//     const bookingPayload = {
//       carId: car._id,
//       carName: car.carName,
//       dailyPrice: car.dailyPrice, 
//       userEmail: userSession.email,
//       carImage: car.image || car.carImage || '', // 👈 এই ইমেজ ডাটাবেজে পাস হবে যাতে MyBookings পেজে শো করে
//       status: 'Confirmed' 
//     };

//     try {
//       setIsSubmitting(true);

//       // const response = await fetch('http://localhost:8000/bookings', {

//       const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${sessionTokenOrId}` 
//         },
//         body: JSON.stringify(bookingPayload),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.error || 'Server Verification Failed');
//       }

  
//       toast.success('BOOKING SUCCESSFUL! NODE ALLOCATED.', {
//         style: {
//           border: '1px solid #00ffcc',
//           padding: '16px',
//           color: '#fff',
//           background: '#090d16',
//           fontFamily: 'monospace',
//         },
//       });

//       setTimeout(() => {
//         router.push('/my-bookings'); 
//       }, 1500);

//     } catch (error) {
//       console.error('Transmission Error:', error);
//       toast.error(error.message || 'Failed to authenticate protocol.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   if (loading || isSessionLoading) {
//     return (
//       <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] tracking-widest">
//         LOADING CAR CONFIGURATION MATRIX...
//       </div>
//     );
//   }


//   if (!car) {
//     return (
//       <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-white space-y-4 font-mono">
//         <p className="text-sm text-rose-500">❌ NODE_NOT_FOUND: 404</p>
//         <p className="text-[10px] text-gray-500">Requested ID: {carId || 'Null'}</p>
//         <Link href="/" className="text-xs text-[#00ffcc] underline tracking-wider mt-2">
//           RETURN TO FLEET GRID
//         </Link>
//       </div>
//     );
//   }

//   const isAvailable = car.availabilityStatus === 'Available';

//   return (
//     <main className="min-h-screen bg-[#030712] text-white py-20 px-4 md:px-8 relative overflow-hidden">
//       <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[180px] pointer-events-none" />

//       <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        
//         {/* BACK NAVIGATION */}
//         <Link href="/" className="inline-flex items-center text-xs font-mono text-gray-400 hover:text-[#00ffcc] transition-colors gap-2 group">
//           <span className="transform group-hover:-translate-x-1 transition-transform">←</span> BACK TO FLEET GRID
//         </Link>

//         {/* TWO-COLUMN LAYOUT */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
//           {/* LEFT PANEL: IMAGE */}
//           <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#090d16]/60 backdrop-blur-md p-2">
//             <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden bg-[#030712]">
//               <img src={car.image} alt={car.carName} className="w-full h-full object-cover select-none" />
//               <span className={`absolute top-4 left-4 font-mono text-[10px] tracking-widest border px-3 py-1 rounded-md backdrop-blur-md ${
//                 isAvailable ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
//               }`}>
//                 {car.availabilityStatus}
//               </span>
//             </div>
//           </div>

//           {/* RIGHT PANEL: INFO */}
//           <div className="space-y-6">
//             <div>
//               <span className="font-mono text-xs text-[#00ffcc] uppercase tracking-widest">{car.carType} Category</span>
//               <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1">{car.carName}</h1>
//             </div>

//             <div className="border-l-2 border-[#00ffcc]/30 pl-4 py-1">
//               <p className="text-sm text-gray-400 leading-relaxed font-sans">{car.description}</p>
//             </div>

//             <div className="bg-[#090d16]/80 border border-white/5 rounded-xl p-4 flex items-center justify-between">
//               <span className="text-xs font-mono text-gray-400 uppercase">Deployment Cost</span>
//               <p className="text-2xl font-black text-[#00ffcc]">
//                 ${car.dailyPrice}<span className="text-xs text-gray-500 font-mono font-normal"> / 24 HOUR LEASE</span>
//               </p>
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">System Parameters</h3>
//               <div className="grid grid-cols-2 gap-3 font-mono text-xs">
//                 <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
//                   <span className="text-gray-500 text-[10px] uppercase">Registry Node</span>
//                   <span className="text-white font-bold mt-1 overflow-hidden text-ellipsis">🆔 {car._id}</span>
//                 </div>
//                 <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
//                   <span className="text-gray-500 text-[10px] uppercase">Terminal Hub</span>
//                   <span className="text-white font-bold mt-1">📍 {car.pickupLocation}</span>
//                 </div>
//                 <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
//                   <span className="text-gray-500 text-[10px] uppercase">Passenger Limit</span>
//                   <span className="text-white font-bold mt-1">👥 {car.seatCapacity} Persons</span>
//                 </div>
//                 <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col">
//                   <span className="text-gray-500 text-[10px] uppercase">Encryption Status</span>
//                   <span className="text-emerald-400 font-bold mt-1">🔒 Secured Terminal</span>
//                 </div>
//               </div>
//             </div>

//             {/* ACTION BUTTON */}
//             <button
//               onClick={handleDirectBooking}
//               disabled={!isAvailable || isSubmitting}
//               className={`w-full font-black uppercase text-sm py-4 rounded-xl tracking-widest transition-all duration-300 ${
//                 isAvailable && !isSubmitting
//                   ? 'bg-[#00ffcc] text-black shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:shadow-[0_0_35px_rgba(0,255,204,0.4)] hover:bg-[#00ffcc]/90'
//                   : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
//               }`}
//             >
//               {isSubmitting 
//                 ? 'PROCESSING LEASE PROTOCOL...' 
//                 : isAvailable 
//                   ? 'Initialize Deployment (Book Now)' 
//                   : 'Node Locked / Unavailable'
//               }
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }





