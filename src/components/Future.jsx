
import React from 'react';
import CarCard from './CarCard';
import Link from 'next/link';
import { futurecars } from '@/Alldata';


//   const Alldata = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`);
//   const cars = await res.json();
  
//   return cars ||[]; 
// };

// const Alldata = async () => {
//   const res= await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)
//   const cars = await res.json();
//   return cars || [];
// }




const Future =async () => {
  
  // const cars =await Alldata()
  //  const res = await fetch("https://sever-car.vercel.app/cars")

  //  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)
  //  const cars = await res.json();


  // const cars = await Alldata()
  // console.log(cars);

  const cars = await futurecars();

  // console.log(cars);

  //  const cars = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)
      // const cars=.then((res) => res.json())
  return (<div className="mt-4 sm:mt-10 w-full px-0 sm:px-4">
      {/* 💡 মোবাইলের জন্য rounded-none এবং প্যাডিং px-4 করা হয়েছে যাতে সাদা বর্ডার না আসে */}
      <section className="relative py-12 sm:py-20 md:py-24 bg-[#030712] px-4 sm:px-6 md:px-8 overflow-hidden w-full border-t border-white/5 rounded-none sm:rounded-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        
        {/* 🔮 Background Futuristic Glow */}
        <div className="absolute top-1/4 right-[-10%] h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full bg-[#00ffcc]/5 blur-[80px] sm:blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* 📑 SECTION HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2 text-center md:text-left">
              <div className="inline-block font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/30 pb-0.5 sm:pb-1">
                Live Fleet Status
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Explore Our <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Featured Cars</span>
              </h2>
            </div>

            {/* 💡 বোতামটি মোবাইলেও সুন্দর মানানসই দেখাবে */}
            <div className="flex justify-center md:shrink-0 w-full sm:w-auto">
              <Link 
                href="/cars" 
                className="w-full sm:w-auto text-center text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-black border border-[#00ffcc]/20 hover:border-[#00ffcc] hover:bg-[#00ffcc] px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#00ffcc]/5 transition-all duration-300 active:scale-95"
              >
                See All Cars
              </Link>
            </div>
          </div>

          {/* 🎴 CARS GRID */}
          {/* 💡 মোবাইলে একদম বর্ডার টু বর্ডার ফিট থাকার জন্য gap এবং padding ব্যালেন্স করা হয়েছে */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 px-1 sm:px-0">
            {cars?.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
            {/* {cars?.slice(0, 4).map((car) => (
              <CarCard key={car._id} car={car} />
            ))} */}
          </div>

        </div>
      </section>
    </div>




    // <div className="mt-10">
    //    <section className="relative py-24 bg-[#030712] px-4 md:px-8 overflow-hidden w-full border-t border-white/5  rounded-2xl">
      
    //   {/* 🔮 Background Futuristic Glow */}
    //   <div className="absolute top-1/4 right-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

    //   <div className="max-w-7xl mx-auto relative z-10">
        
    //     {/* 📑 SECTION HEADER */}
    //     <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
    //       <div className="space-y-2 text-center md:text-left">
    //         <div className="inline-block font-mono text-[10px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/30 pb-1">
    //           Live Fleet Status
    //         </div>
    //         <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
    //          Explore Our  <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Featured Cars</span>
    //         </h2>
    //         {/* <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
    //           Verified nodes currently active on the grid network. Ready for immediate deployment and data synchronization.
    //         </p> */}
    //       </div>

          
    //       <div className="flex justify-center">
    //         <Link 
    //           href="/cars" 
    //           className="text-xs font-mono font-bold uppercase tracking-widest text-[#00ffcc] hover:text-white border border-[#00ffcc]/20 hover:border-white px-5 py-2.5 rounded-xl bg-[#00ffcc]/5 transition-all duration-300"
    //         >
    //           See All Cars
    //         </Link>
    //       </div>
    //     </div>


    //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    //            {cars?.map((car) => (
    //            <CarCard key={car._id} car={car} />
    //            ))}
    //            {/* {cars?.slice(0, 4).map((car) => (
    //            <CarCard key={car._id} car={car} />
    //            ))} */}
    //                   </div>

       
       
       

    //   </div>
    // </section>
    // </div>
  );
};

export default Future;

















