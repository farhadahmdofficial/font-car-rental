
'use client';

import { authClient } from '@/lib/auth-client';
import Image from 'next/image'; 
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState(null);

  
  const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
  const userSession = sessionData?.user;

  
  useEffect(() => {
    if (isSessionLoading) return;

    if (!userSession?.email) {
      setLoading(false);
      return;
    }

    const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;
    
    // fetch(`http://localhost:8000/my-bookings?email=${userSession.email}`, {

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings?email=${userSession.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionTokenOrId}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server Sync Error: Status Code ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch Error:', err);
        toast.error(err.message || 'Failed to sync with grid repository.');
        setLoading(false);
      });
  }, [userSession, sessionData, isSessionLoading]);

 
  const openCancelModal = (id) => {
    if (!id) {
      toast.error('❌ Cannot terminate: Booking ID is missing in UI row.');
      return;
    }
    setActiveBookingId(id);
    setIsModalOpen(true);
  };

  
  const handleCancelBooking = async () => {
    if (!activeBookingId) {
      toast.error('ERROR: Active Node Deployment ID is targetless.');
      return;
    }

    const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;

    try {
      // const response = await fetch(`http://localhost:8000/bookings/${activeBookingId}`, {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${activeBookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionTokenOrId}`
        },
        body: JSON.stringify({ status: 'Canceled' }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || `Terminal Request Rejected: Status Code ${response.status}`);
      }

     
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== activeBookingId)
      );

      toast.success('NODE TERMINATED AND REMOVED FROM LIST');
    } catch (error) {
      console.error('Cancellation Error:', error);
      toast.error(error.message || 'Failed to modify node status.');
    } finally {
      
      setIsModalOpen(false);
      setActiveBookingId(null);
    }
  };

  if (isSessionLoading || loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-[#00ffcc] tracking-widest">
        FETCHING ALLOCATION MATRICES...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 relative overflow-hidden">
      
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

        {/* 📊 BOOKINGS CONTAINER */}
        <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            {bookings.length === 0 ? (
              <div className="p-12 text-center font-mono text-xs text-gray-500">
                NO ACTIVE ALLOCATION NODES FOUND IN SYSTEM.
              </div>
            ) : (
              <table className="w-full border-collapse text-left font-sans">
                
                <thead>
                  <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
                    <th className="p-4 md:p-5">Vehicle Details</th>
                    <th className="p-4 md:p-5">Total Cost</th>
                    <th className="p-4 md:p-5">Grid Status</th>
                    <th className="p-4 md:p-5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5 text-xs">
                  {bookings.map((booking) => (
                    <tr key={booking._id || Math.random().toString()} className="hover:bg-white/[0.02] transition-colors group">
                      
                      {/* Column 1: Vehicle Info */}
                      <td className="p-4 md:p-5">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0 shadow-inner">
                            <Image
                              src={booking.carImage || booking.image || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200'} 
                              alt={booking.carName || 'Vehicle Grid Link'}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="80px"
                              unoptimized
                            />
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-[#00ffcc] transition-colors text-sm md:text-base">
                              {booking.carName}
                            </div>
                            <div className="font-mono text-[10px] text-gray-500 uppercase mt-0.5">
                              User ID: {booking.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Price */}
                      <td className="p-4 md:p-5 font-mono font-bold text-white text-sm">
                        ${booking.dailyPrice} <span className="text-[10px] text-gray-500 font-normal">/ day</span>
                      </td>

                      {/* Column 3: Status Badge */}
                      <td className="p-4 md:p-5">
                        <span
                          className={`inline-block font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            booking.status === 'Canceled'
                              ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {booking.status || 'Confirmed'}
                        </span>
                      </td>

                     
                      <td className="p-4 md:p-5 text-right space-x-2 whitespace-nowrap">
                        {booking.status === 'Canceled' ? (
                          <span className="font-mono text-[10px] text-rose-400 uppercase tracking-widest bg-rose-500/5 px-3 py-1.5 rounded-lg border border-rose-500/10">
                            Node Terminated
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => alert(`Update Schedule Terminal for Node: ${booking._id}`)}
                              className="bg-white/5 border border-white/10 hover:border-[#00ffcc] hover:bg-[#00ffcc] text-gray-300 hover:text-black font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
                            >
                              Modify
                            </button>
                            <button
                              onClick={() => openCancelModal(booking._id)}
                              className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>
        </div>

      </div>

      {/* 🔮 CUSTOM CYBERPUNK MODAL COMPONENT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300">
          <div className="bg-[#090d16] border border-rose-500/30 max-w-sm w-full rounded-2xl p-6 shadow-[0_0_30px_rgba(244,63,94,0.15)] space-y-6 text-center transform scale-100 transition-transform duration-300">
            
            {/* Warning Icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/30">
              <svg className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold tracking-tight text-white uppercase">
                Terminate Lease Node?
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Are you absolutely sure you want to terminate this vehicle deployment matrix? This action will instantly release the asset allocation.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setActiveBookingId(null);
                }}
                className="flex-1 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 font-mono text-[11px] uppercase tracking-wider py-2.5 rounded-xl transition-all"
              >
                Abort
              </button>
              <button
                onClick={handleCancelBooking}
                className="flex-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white font-mono text-[11px] uppercase tracking-wider py-2.5 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.1)] transition-all"
              >
                Confirm Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}






