
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { authClient, useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const Bookinghandle = ({ car }) => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // 💡 ১. গাড়ি অ্যাভেলেবল কিনা তা নিখুঁতভাবে চেক করার কন্ডিশন (স্ট্রিং বা বুলিয়ান দুইটাই হ্যান্ডেল করবে)
  const isAvailable = 
    car?.availabilityStatus === "available" || 
    car?.availabilityStatus === true || 
    car?.availabilityStatus === "Available";

  const carId = car?._id;

  // ২. বুকিং হ্যান্ডলার ফাংশন
  const handleDirectBooking = async () => {
    // 💡 সেফটি চেক: গাড়ি অ্যাভেলেবল না থাকলে বা অলরেডি সাবমিট হতে থাকলে ফাংশন এখানেই থেমে যাবে
    if (!isAvailable || isSubmitting) {
      toast.error("This car is currently unavailable!");
      return;
    }

    const { data: jwtdata } = await authClient.token();
    const token = jwtdata?.token; 
    
    if (!token) {
      toast.error("Authentication failed, please login again.");
      return;
    }

    setIsSubmitting(true); // লোডিং স্টেট অন করা হলো


    const updataData = {
            carId: carId,
             userId: session?.user?.id,
              userName: session?.user?.name,
             userEmail: session?.user?.email, 
              // 🎯 car-এর বদলে আপনার সঠিক স্টেট/প্রপ্স নামটি দিন (যেমন: carData)
               carName: car?.carName || "Unknown Car", 
              carImage: car?.image || carData?.carImage || "",
              dailyPrice: car?.dailyPrice || carData?.dailyPrice || 0,
           };




    // const updataData = {
    //   carId: carId,
    //   userId: session?.user?.id,
    //   userName: session?.user?.name,
    //   userEmail: session?.user?.email, 
    //   carName: car?.carName,
    //   carImage: car?.image
    // };

    // carName
    // carImage
    // userEmail
    // _id

    

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${carId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updataData)
      });

      const data = await res.json();

      if (res.ok && data.acknowledged) {
        toast.success(`${car?.carName || "Car"} booked successfully!`);
        
        // সফল বুকিং শেষে ইউজারকে বুকিং পেজে রিডাইরেক্ট করা
        router.push(`/my-bookings?carId=${carId}`);
      } else {
        toast.error(data?.message || "Booking failed!");
        setIsSubmitting(false); // এরর আসলে বাটন আবার একটিভ হবে
      }

    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong with the connection.");
      setIsSubmitting(false); // নেটওয়ার্ক এরর আসলে বাটন আবার একটিভ হবে
    }
  };

  return (
    <button
      // 💡 কন্ডিশন ফুলফিল: গাড়ি অ্যাভেলেবল না থাকলে অথবা অলরেডি বুকিং প্রসেস হতে থাকলে বাটন ক্লিক করা যাবে না
      disabled={!isAvailable || isSubmitting} 
      onClick={handleDirectBooking} 
      className={`w-full font-black uppercase text-sm py-4 rounded-xl tracking-widest transition-all duration-300 ${
        isAvailable && !isSubmitting
          ? 'bg-[#00ffcc] text-black shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:shadow-[0_0_35px_rgba(0,255,204,0.4)] hover:bg-[#00ffcc]/90 cursor-pointer'
          : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
      }`}
    >
      {/* 💡 ডাইনামিক টেক্সট লোডিং এবং অ্যাভেলেবিলিটি অনুযায়ী */}
      {isSubmitting 
        ? 'Booking...' 
        : isAvailable 
          ? 'Book Now' 
          : 'Unavailable'
      }
    </button>
  );
};

export default Bookinghandle;





// 'use client';


// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import React from 'react';
// import { authClient, useSession } from '@/lib/auth-client';
// import toast from 'react-hot-toast';
// import { PiCalendarMinusLight } from 'react-icons/pi';
// // import { headers } from 'next/headers';

// const Bookinghandle = ({car}) => {
//   const {data:session}=useSession();

//   // console.log(car,"car in bookin ha");

//         console.log(session);

//     const [isSubmitting, setIsSubmitting] = useState(false);
//       const router = useRouter();

// // ১. ডাইনামিক ভ্যারিয়েবল সেটআপ (কোড ক্লিন রাখার জন্য)
// const isAvailable = car?.availabilityStatus;
// const carId = car?._id; // অথবা আপনার অবজেক্টের আইডি প্রোপার্টির নাম

// // ২. বুকিং হ্যান্ডলার ফাংশন
// const handleDirectBooking = async () => {
//   const {data:jwtdata} = await authClient.token()

//   // console.log(jwtdata);

//   //  const carId = car?._id;
//   const token=jwtdata?.token; 
//   if(!token){
//     toast.error("authnegation failed, please login again  ")
    
   
//     return; 
//   }

//   const updataData={
//     carId:carId,
//     userId:session?.user?.id,
//     userName:session?.user?.name,
//     userEmail:session?.user?.email, 

//     carname:car?.carName,
//     carimg:car?.image

//   }
//   console.log(updataData,"add up data ");


//  const res= await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${car?._id}`,{
//     method:"PATCH",
//     headers:{
//       "Content-Type":"application/json",
//      Authorization :`Bearer ${token}`
//     },
//     body:JSON.stringify(updataData)

//   })
//   // console.log( await res.json() ,'json  one');


//   const data =await res.json();
  
// // console.log(data,"json data");
// if(!data){
//   toast.error("NOT fount DATA ")
//   return 
// }

//    router.push(`/my-bookings?carId=${carId}`);   



  



//   // // যদি গাড়ি আনঅ্যাভেলেবল থাকে অথবা অলরেডি সাবমিট হতে থাকে, তবে ফাংশন ব্রেক করবে
//   // if (!isAvailable || isSubmitting) return;
  
//   // setIsSubmitting(true);

//   // setTimeout(() => {
//   //   // সফলভাবে কুয়েরি প্যারামিটারসহ বুকিং পেজে রিডাইরেক্ট করা
//   //   router.push(`/my-bookings?carId=${carId}`);      // 💡 আপনার রাউটের নাম 'my-booking' নাকি 'my-bookings' নিশ্চিত হয়ে নিন
//   // }, 1200);
// };
//     return (
        
//             <button
//     // 💡 কন্ডিশন ফুলফিল: গাড়ি অ্যাভেলেবল না থাকলে অথবা সাবমিট হতে থাকলে বাটন ডিসেবল হবে


//     // disabled={!isAvailable || isSubmitting} 
//     onClick={handleDirectBooking} // 💡 এখানে হ্যান্ডলার যুক্ত করা হয়েছে
//     className={`w-full font-black uppercase text-sm py-4 rounded-xl tracking-widest transition-all duration-300 ${
//       isAvailable && !isSubmitting
//         ? 'bg-[#00ffcc] text-black shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:shadow-[0_0_35px_rgba(0,255,204,0.4)] hover:bg-[#00ffcc]/90'
//         : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
//     }`}
//   >
//     {/* 💡 ডাইনামিক টেক্সট: সাবমিট হওয়ার সময় Loading স্টেট দেখাবে */}
//     {isSubmitting 
//       ? 'Booking...' 
//       : isAvailable 
//         ? 'Book Now' 
//         : 'Unavailable'
//     }
//     </button>
//     );
// };

// export default Bookinghandle;