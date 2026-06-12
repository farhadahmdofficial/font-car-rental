


// my code 



import CancelButton from '@/components/CancelButton';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { headers } from 'next/headers';
import Image from 'next/image'; 
// import { useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';

const MyBookings = async () => {

  const {token} = await auth.api.getToken({
              headers:await headers(),
  });


  const session =await auth.api.getSession({
    headers :await headers()
  });

  // console.log(session.user.id);



const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings?userId=${session?.user?.id}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const bookings = await res.json();
console.log(bookings, "booking data");










  return (  <div className="container mx-auto px-4 py-10 min-h-screen  relative font-sans   bg-[#030712] my-5 rounded-2xl">
 
  <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />


  {bookings.length===0? <h1 className='hidden'>theone</h1>: <div className="mb-8 relative z-10">
    <h1 className="text-3xl font-black uppercase tracking-wider text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.2)]">
      My Bookings ({bookings.length})
    </h1>
    
  </div> }





  {/* <div className="mb-8 relative z-10">
    <h1 className="text-3xl font-black uppercase tracking-wider text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.2)]">
      My Bookings ({bookings.length})
    </h1>
    
  </div> */}


  {bookings.length === 0 ? (<div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-[#030712] border border-white/5 rounded-2xl shadow-2xl relative overflow-hidden group max-w-2xl mx-auto my-10 backdrop-blur-xl">
  
 
  <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#00ffcc]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00ffcc]/10 transition-all duration-500"></div>
  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-500/10 transition-all duration-500"></div>

  
  <div className="w-16 h-16 mb-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:border-[#00ffcc]/30 group-hover:text-[#00ffcc] transition-all duration-500 shadow-inner">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 animate-pulse">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>


  <h2 className="text-xl md:text-2xl font-mono uppercase tracking-wider text-white mb-3">
   you have  <span className="text-[#00ffcc] font-bold drop-shadow-[0_0_10px_rgba(0,255,204,0.4)]">No Bookings </span>
  </h2>
  
  



</div> ) : (  <table className="w-full text-left border-collapse font-sans">


          <thead className="relative z-10">
          <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
                  <th className="p-4 md:p-5">Car Image</th>
                  <th className="p-4 md:p-5">Car Name</th>
                  <th className="p-4 md:p-5">Daily Price</th>
                 <th className="p-4 md:p-5">Car Type</th>
                 <th className="p-4 md:p-5 text-center">Status</th>
                 <th className="p-4 md:p-5 text-right">Actions</th>
        </tr>
          </thead>
          

       
          <tbody className="divide-y divide-white/5 text-xs">
            {bookings.map((booking) => (
              <tr 
                key={booking._id } 
                className="hover:bg-white/[0.015] transition-colors group"
              >
               
                <td className="p-4 md:p-5">
                  <div className="relative h-12 w-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0 shadow-inner group-hover:border-[#00ffcc]/40 group-hover:shadow-[0_0_15px_rgba(0,255,204,0.15)] transition-all duration-300">
                    <img
                      src={booking.image || booking.carImage || "https://placehold.co/600x400"}
                      alt={booking.carName || 'Vehicle Grid Link'}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </td>

              
                <td className="p-4 md:p-5">
                  <div className="font-bold text-white group-hover:text-[#00ffcc] transition-colors text-sm md:text-base">
                    {booking.carName || "Unknown Car"}
                  </div>
                </td>

        
                <td className="p-4 md:p-5 font-mono font-bold text-white text-sm">
                  <span className="text-[#00ffcc]">${booking.dailyPrice}</span>
                 
                  <span className="text-[10px] text-gray-500 font-normal"> / day</span>
                </td>

        
                <td className="p-4 md:p-5 text-gray-400">
                  <span className="px-2.5 py-1 text-[10px] font-mono uppercase rounded-md bg-white/5 border border-white/5">
                    {booking.carType || "Standard"}
                  </span>
                </td>

            
                <td className="p-4 md:p-5 text-center">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider px-3 py-1 rounded-full border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                    Confirmed
                  </span>
                </td>

                
                <td className="p-4 md:p-5 text-right whitespace-nowrap">


                  <CancelButton bookingId={booking._id} token={token} />





                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>)}


  

</div> 

  );
}


export default MyBookings;
































