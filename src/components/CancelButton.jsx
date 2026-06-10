

'use client'; // 🎯 ক্লায়েন্ট সাইড অ্যাকশন হ্যান্ডেল করার জন্য

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CancelButton({ bookingId, token }) {
  const router = useRouter();

  const handleCancel = async () => {
    // ১. সিম্পল ব্রাউজার কনফার্মেশন পপআপ
    // const proceed = window.confirm("Are you sure you want to cancel this booking?");
    // if (!proceed) return;

    try {
      // ২. ব্যাকএন্ডে ডিলিট রিকোয়েস্ট পাঠানো
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      // ৩. ডিলিট সফল হলে পেজ রিফ্রেশ করা
      if (data.success) {
        toast.success("Booking canceled successfully!");
        router.refresh(); // 🔄 টেবিল থেকে ডাটা ইনস্ট্যান্ট হাওয়া করে দেবে
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