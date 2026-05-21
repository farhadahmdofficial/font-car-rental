


import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* 🌌 Background Neon Glow Effects (DriveFleet Matrix Vibe) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00ffcc]/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none"></div>

      {/* 🕸️ Cyberpunk Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* 🚫 404 Error Code with Neon Glow */}
      <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-cyan-400 tracking-widest drop-shadow-[0_0_25px_rgba(0,255,204,0.4)] select-none">
        404
      </h1>

      {/* 🚙 Main Message */}
      <h2 className="text-2xl md:text-3xl font-black text-white mt-6 tracking-wide uppercase">
        Data <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Not Found</span>
      </h2>

      <p className="text-gray-400 mt-3 max-w-md text-sm md:text-base leading-relaxed font-medium">
        The URL or vehicle matrix node you are searching for does not exist in our DriveFleet grid network or the link has expired.
      </p>

      {/* 🚀 Action Button (Matching Banner CTA Style) */}
      <div className="mt-8">
        <Link 
          href="/" 
          className="group relative inline-flex items-center gap-2 rounded-full bg-[#00ffcc] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#00ffcc]/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,204,0.2)] hover:shadow-[0_0_40px_rgba(0,255,204,0.5)]"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-4 h-4 animate-pulse"
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
      
      {/* Bottom Border Line Dynamic Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/20 to-transparent" />
    </div>
  );
}




















