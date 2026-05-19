'use client';

export default function TipsSection() {
  const tips = [
    {
      id: '01',
      icon: '🛡️',
      title: 'Verify Vehicle Log',
      description: 'Always cross-check the digital maintenance matrix and tire pressure metrics before launching your trip sequence.',
    },
    {
      id: '02',
      icon: '⚡',
      title: 'Optimize Smart Eco',
      description: 'Engage the AI cruise mode on highways to optimize cell draining and fuel management efficiency loops.',
    },
    {
      id: '03',
      icon: '🗺️',
      title: 'Sync Live GPS Matrix',
      description: 'Download offline local maps and sync the dashboard telemetry link to bypass satellite blackout zones.',
    },
    {
      id: '04',
      icon: '📞',
      title: '24/7 Node Support',
      description: 'In case of grid structural anomalies or unexpected tire failure, activate the SOS terminal in your bookings log.',
    },
  ];

  return (
    <section className="relative py-24 bg-[#030712] px-4 md:px-8 overflow-hidden w-full border-t border-white/5">
      
      {/* 🔮 Background Subtle Cyber Blur */}
      <div className="absolute bottom-0 left-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 📑 SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-block font-mono text-[10px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/30 pb-1">
            Safe Navigation Log
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Cruising <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Guidelines & Tips</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Follow these tactical fleet deployment protocols to guarantee an absolute zero-anomaly travel experience.
          </p>
        </div>

        {/* 📦 TIPS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip) => (
            <div 
              key={tip.id}
              className="group relative bg-[#090d16]/40 border border-white/5 rounded-2xl p-6 hover:border-[#00ffcc]/30 hover:bg-[#090d16]/80 transition-all duration-500 backdrop-blur-md flex flex-col justify-between"
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00ffcc]/0 group-hover:border-[#00ffcc]/30 rounded-tl-2xl transition-all duration-500" />
              
              <div className="space-y-4">
                {/* Header Row: Icon & Ghost Number */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00ffcc]/10 group-hover:border-[#00ffcc]/20 transition-all duration-500">
                    {tip.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-600 group-hover:text-[#00ffcc]/50 transition-colors duration-500">
                    // {tip.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-[#00ffcc] transition-colors duration-300">
                  {tip.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {tip.description}
                </p>
              </div>

              {/* Decorative Tech Line Bottom */}
              <div className="mt-6 h-[2px] w-full bg-white/5 group-hover:bg-[#00ffcc]/20 transition-colors duration-500 rounded" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}