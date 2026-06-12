
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

 
  const isAvailable = 
    car?.availabilityStatus === "available" || 
    car?.availabilityStatus === true || 
    car?.availabilityStatus === "Available";

  const carId = car?._id;

  
  const handleDirectBooking = async () => {
   
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

    setIsSubmitting(true); 


    const updataData = {
            carId: carId,
             userId: session?.user?.id,
              userName: session?.user?.name,
             userEmail: session?.user?.email, 
             
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
        
        
        router.push(`/my-bookings?carId=${carId}`);
      } else {
        toast.error(data?.message || "Booking failed!");
        setIsSubmitting(false); 
      }

    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong with the connection.");
      setIsSubmitting(false); 
    }
  };

  return (
    <button
      
      disabled={!isAvailable || isSubmitting} 
      onClick={handleDirectBooking} 
      className={`w-full font-black uppercase text-sm py-4 rounded-xl tracking-widest transition-all duration-300 ${
        isAvailable && !isSubmitting
          ? 'bg-[#00ffcc] text-black shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:shadow-[0_0_35px_rgba(0,255,204,0.4)] hover:bg-[#00ffcc]/90 cursor-pointer'
          : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
      }`}
    >
     
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





