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


    // console.log(car ,"new car addd");



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


          </Link>





          </div>
        </div>
      </div>
    </main>
    </div>
  );
};

export default CarDetails;






















