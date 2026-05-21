'use client';

import React from 'react';

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
    <section className="py-16 bg-slate-900 text-white rounded-2xl my-10 px-6 md:px-12 shadow-xl border border-slate-800">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          DriveFleet Pro Tips
        </h2>
        <p className="mt-3 text-slate-400 text-sm md:text-base">
          Optimize your rental experience with our advanced vehicle grid system instructions.
        </p>
      </div>

      {/* Grid Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="relative group bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/60 hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            {/* Top Row: Icon & ID */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-3xl p-2 bg-slate-700/40 rounded-lg group-hover:scale-110 transition-transform duration-300">
                {tip.icon}
              </span>
              <span className="text-xs font-mono text-cyan-400/70 font-bold tracking-widest">
                NODE // {tip.id}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors duration-200">
              {tip.title}
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              {tip.description}
            </p>

            {/* Bottom Glow Effect (Cyberpunk Style) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl" />
          </div>
        ))}
      </div>
    </section>
  );
}
