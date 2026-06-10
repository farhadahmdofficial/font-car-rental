


// 'use client';

import Link from 'next/link';

export default function CarCard({ car }) {
 
  const { 
    _id, 
    carName, 
    dailyPrice, 
    image, 
    carType, 
    pickupLocation, 
    availabilityStatus, 
    seatCapacity ,
    imageUrl

  
  } = car;

  // const isAvailable = availabilityStatus?.toLowerCase() === 'available';

  return (
    <div className="group relative bg-[#090d16]/40 border border-white/5 rounded-2xl overflow-hidden hover:border-[#00ffcc]/20 transition-all duration-500 backdrop-blur-md flex flex-col justify-between h-full">
      
      {/* 📸 IMAGE SECTION */}
      <div className="relative w-full h-48 bg-[#030712] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent z-10 opacity-80" />



        <img 
  // 🎯 এখানে 'image' এর বদলে লুপের ভেতরের অবজেক্ট থেকে imageUrl নিতে হবে
  src={imageUrl || image || "https://placehold.co/600x400"} 
  alt={carName} 
  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out select-none" 
/>





        {/* <img 
         
          src={image} 
          alt={carName} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out select-none" 
        /> */}





        {/* <span className={`absolute top-3 left-3 z-20 font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-md border ${
          isAvailable 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
        }`}>
          {availabilityStatus}
        </span> */}
      </div>

     
      <div className="p-5 space-y-3">
        <div>

         
          <span className="font-mono text-[10px] text-[#00ffcc]/60 uppercase tracking-wider">
            {carType}
          </span>
          <h3 className="text-base font-bold uppercase text-white mt-0.5 group-hover:text-[#00ffcc] transition-colors duration-300 truncate">
            {carName}
          </h3>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 gap-2 border-t border-b border-white/5 py-2.5 font-mono text-[11px] text-gray-400">
          <div>👥 {seatCapacity} Seats</div>
          <div className="text-right sm:text-left truncate">📍 {pickupLocation}</div>
        </div>
      </div>

      {/*  PRICE & ACTION BUTTON */}
      <div className="p-5 pt-0 space-y-3">
        <div className="flex items-end justify-between">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Rate</span>
          <p className="text-sm font-black text-[#00ffcc]">
            ${dailyPrice}
            <span className="text-[10px] text-gray-500 font-mono font-normal"> / DAY</span>
          </p>
        </div>
        
        <Link 
          href={`/cars/${_id}`} 
          className="w-full block text-center rounded-xl bg-white/5 hover:bg-[#00ffcc] text-gray-300 hover:text-black border border-white/10 hover:border-[#00ffcc] py-3 text-xs font-black uppercase tracking-wider transition-all duration-300"
        >
          View Details
        </Link>
      </div>

    </div>
  );
}
























