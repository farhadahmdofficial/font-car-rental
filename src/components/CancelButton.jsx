

'use client'; 

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CancelButton({ bookingId, token }) {
  const router = useRouter();

  const handleCancel = async () => {
    

    try {
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

     
      if (data.success) {
        toast.success("Booking canceled successfully!");
        router.refresh(); 
      } else {
        toast.error("  cancel Failed ");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <button
      onClick={handleCancel}
      className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]"
    >
      Cancel
    </button>
  );
}