




'use client';

import { useState } from 'react';

// 📊 ডাটাবেস মক ডাটা (Mock Booking Data Pipeline)
const INITIAL_BOOKINGS = [
  {
    id: 'b_01',
    carName: 'Cyber Coupe X1',
    brand: 'Tesla',
    startDate: '2026-05-20',
    endDate: '2026-05-25',
    totalCost: 600,
    status: 'Confirmed',
  },
  {
    id: 'b_02',
    carName: 'Stealth SUV Matrix',
    brand: 'BMW',
    startDate: '2026-06-01',
    endDate: '2026-06-04',
    totalCost: 285,
    status: 'Pending',
  },
  {
    id: 'b_03',
    carName: 'Vanguard Cruiser',
    brand: 'BMW',
    startDate: '2026-04-10',
    endDate: '2026-04-12',
    totalCost: 280,
    status: 'Canceled',
  },
];

export default function MyBookings() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  // ❌ বুকিং ক্যান্সেল করার রিয়েল-টাইম ফাংশন
  const handleCancelBooking = (id) => {
    const confirmCancel = window.confirm('Are you sure you want to terminate this vehicle deployment node?');
    if (confirmCancel) {
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: 'Canceled' } : booking
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 relative overflow-hidden">
      
      {/* 🔮 Background Tech Glow */}
      <div className="absolute top-1/2 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* 📑 SECTION HEADER */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
            User Control Center
          </div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            My Booking <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Registry</span>
          </h1>
          <p className="text-xs text-gray-400 max-w-md">
            Review your active vehicle leases, track deployment schedules, and manage token receipts safely.
          </p>
        </div>

        {/* 📊 BOOKINGS TABLE CONTAINER */}
        <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left font-sans">
              
              {/* 🏁 Table Head */}
              <thead>
                <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
                  <th className="p-4 md:p-5">Vehicle</th>
                  <th className="p-4 md:p-5">Timeline (Start - End)</th>
                  <th className="p-4 md:p-5">Total Cost</th>
                  <th className="p-4 md:p-5">Grid Status</th>
                  <th className="p-4 md:p-5 text-right">Actions</th>
                </tr>
              </thead>

              {/* 📦 Table Body */}
              <tbody className="divide-y divide-white/5 text-xs">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors group">
                    
                    {/* Column 1: Vehicle Info */}
                    <td className="p-4 md:p-5">
                      <div className="font-bold text-white group-hover:text-[#00ffcc] transition-colors">
                        {booking.carName}
                      </div>
                      <div className="font-mono text-[10px] text-gray-500 uppercase">
                        {booking.brand}
                      </div>
                    </td>

                    {/* Column 2: Date Timeline */}
                    <td className="p-4 md:p-5 font-mono text-gray-400">
                      {booking.startDate} <span className="text-gray-600">to</span> {booking.endDate}
                    </td>

                    {/* Column 3: Total Cost */}
                    <td className="p-4 md:p-5 font-mono font-bold text-white">
                      ${booking.totalCost}
                    </td>

                    {/* Column 4: Status Badges */}
                    <td className="p-4 md:p-5">
                      <span
                        className={`inline-block font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          booking.status === 'Confirmed'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : booking.status === 'Pending'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    {/* Column 5: Action Buttons */}
                    <td className="p-4 md:p-5 text-right space-x-2">
                      {booking.status !== 'Canceled' ? (
                        <>
                          <button
                            onClick={() => alert(`Update Schedule Terminal for Node: ${booking.id}`)}
                            className="bg-white/5 border border-white/10 hover:border-[#00ffcc] hover:bg-[#00ffcc] text-gray-300 hover:text-black font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
                          >
                            Modify
                          </button>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest select-none">
                          Node Terminated
                        </span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}