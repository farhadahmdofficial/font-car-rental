
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* 🌌 Background Glow Effect (Cyberpunk Matrix Vibe) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 🚫 404 Error Code */}
      <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-widest drop-shadow-[0_5px_20px_rgba(6,182,212,0.3)] select-none">
        404
      </h1>

      {/* 🚙 Main Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 tracking-wide uppercase">
        Data Not Found
      </h2>

      <p className="text-gray-400 mt-3 max-w-md text-sm md:text-base leading-relaxed">
        The URL or vehicle matrix node you are searching for does not exist in our DriveFleet grid network or the link has expired.
      </p>

      {/* 🚀 Action Button (Return Home) */}
      <div className="mt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-[0_4px_15px_rgba(6,182,212,0.4)] hover:shadow-[0_6px_25px_rgba(6,182,212,0.6)] hover:scale-[1.02] transition-all duration-300"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-5 h-5 animate-pulse"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Return to Grid Core
        </Link>
      </div>

      {/* 🏁 Footer Tech Subline */}
      <div className="absolute bottom-6 text-xs text-gray-600 font-mono tracking-widest">
        DRIVEFLEET OS v1.0.0 // TERMINAL_ERR_CODE_404
      </div>
    </div>
  );
}



// import Link from 'next/link';

// export default function NotFound() {
//   return (
//     <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      
//       {/* 🌌 ব্যাকগ্রাউন্ড গ্লো ইফেক্ট (Cyberpunk Matrix Vibe) */}
//       <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
//       <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

//       {/* 🚫 ৪0৪ এরর কোড */}
//       <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-widest drop-shadow-[0_5px_20px_rgba(6,182,212,0.3)] select-none">
//         404
//       </h1>

//       {/* 🚙 মূল মেসেজ */}
//       <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 tracking-wide uppercase">
//         Route Terminated / Grid Node Not Found
//       </h2>

//       <p className="text-gray-400 mt-3 max-w-md text-sm md:text-base leading-relaxed">
//         আপনি যে ইউআরএল বা গাড়িটি খুঁজছেন, তা আমাদের ড্রাইভফ্লিট সিস্টেম ম্যাট্রিক্সে নেই অথবা লিঙ্কটি এক্সপায়ার হয়ে গেছে।
//       </p>

//       {/* 🚀 অ্যাকশন বাটন (হোমপেজে ব্যাক করার জন্য) */}
//       <div className="mt-8">
//         <Link 
//           href="/" 
//           className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-[0_4px_15px_rgba(6,182,212,0.4)] hover:shadow-[0_6px_25px_rgba(6,182,212,0.6)] hover:scale-[1.02] transition-all duration-300"
//         >
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             fill="none" 
//             viewBox="0 0 24 24" 
//             strokeWidth={2} 
//             stroke="currentColor" 
//             className="w-5 h-5 animate-pulse"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
//           </svg>
//           Return to Grid Core
//         </Link>
//       </div>

//       {/* 🏁 ফুটার বা ডেকোরেশন লাইন */}
//       <div className="absolute bottom-6 text-xs text-gray-600 font-mono tracking-widest">
//         DRIVEFLEET OS v1.0.0 // TERMINAL ERROR
//       </div>
//     </div>
//   );
// }