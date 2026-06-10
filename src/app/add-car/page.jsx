





"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

// 💡 আপনার প্রোজেক্টে যদি Better Auth বা অন্য কোনো Auth হুক থাকে, তা এখানে ইম্পোর্ট করুন:
// import { authClient } from "@/lib/auth-client"; 

const AddCars = () => {
  // 🔄 অথেনটিকেশন সেশন থেকে ইউজার ডাটা নেওয়া (উদাহরণস্বরূপ Better Auth হুক)
  // const { data: session } = authClient.useSession();
  
  // সাময়িকভাবে সেশন না থাকলে ব্যাকআপ হিসেবে আপনার ইমেইল কাজ করবে
  const userEmail = "farhad@example.com"; 

  const [formData, setFormData] = useState({
    carName: "",
    dailyPrice: "",
    seatCapacity: "7",
    carType: "SUV",
    location: "Sylhet Terminal",
    imageUrl: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🎯 ডাটাবেজের কন্ডিশন ও ফিল্টারিং ঠিক রাখতে অবজেক্ট প্রিপারেশন
    const cleanData = {
      ...formData,
      dailyPrice: parseFloat(formData.dailyPrice),   // স্ট্রিং থেকে নাম্বারে কনভার্ট
      seatCapacity: parseInt(formData.seatCapacity), // স্ট্রিং থেকে ইন্টিজারে কনভার্ট
      hrEmail: userEmail,                            // 'My Added Cars' ট্র্যাক রাখার মূল চাবিকাঠি
      bookingCount: 0,                               // ইনিশিয়াল ভ্যালু সেটিং
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanData),
      });

      const result = await response.json();

      if (result.insertedId) {
        toast.success("Car Added Successfully! 🚀");
        
        // 🔄 স্টেট রিসেট
        setFormData({
          carName: "",
          dailyPrice: "",
          seatCapacity: "7",
          carType: "SUV",
          location: "Sylhet Terminal",
          imageUrl: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Failed to add car:", error);
      toast.error("Car addition failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* 🌌 ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

      {/* 📑 হেডার সেকশন */}
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
          Deploy New <span className="text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.3)]">Car</span>
        </h1>
      </div>

      {/* 📊 সাইবারপাঙ্ক ফর্ম কন্টেইনার */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#090d16]/60 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative z-10 space-y-6"
      >
        {/* ১. Vehicle Model Name */}
        <div className="space-y-2">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
            Vehicle Model Name
          </label>
          <input
            type="text"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            placeholder="Car Name"
            required
            className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300"
          />
        </div>

        {/* ২. Rental Price এবং Seat Capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Daily Rental Price ($)
            </label>
            <input
              type="number"
              name="dailyPrice"
              value={formData.dailyPrice}
              onChange={handleChange}
              placeholder="USD"
              required
              className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Seat Capacity
            </label>
            <input
              type="number"
              name="seatCapacity"
              value={formData.seatCapacity}
              onChange={handleChange}
              placeholder="7"
              required
              className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300"
            />
          </div>
        </div>

        {/* ৩. Vehicle Class Type এবং Pickup Terminal Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Vehicle Class Type
            </label>
            <select
              name="carType"
              value={formData.carType}
              onChange={handleChange}
              className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300 cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/></svg>")`,
                backgroundPosition: "right 1rem center",
                backgroundSize: "1rem",
                backgroundRepeat: "no-repeat",
              }}
            >
              <option value="SUV" className="bg-[#090d16]">SUV</option>
              <option value="Sedan" className="bg-[#090d16]">Sedan</option>
              <option value="Luxury" className="bg-[#090d16]">Luxury</option>
              <option value="Sports" className="bg-[#090d16]">Sports</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Pickup Terminal Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Sylhet Terminal"
              required
              className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300"
            />
          </div>
        </div>

        {/* ৪. Vehicle Asset Image URL */}
        <div className="space-y-2">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
            Vehicle Asset Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            required
            className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300"
          />
        </div>

        {/* 📊 ৫. System Specifications / Description */}
        <div className="space-y-2">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
            System Specifications / Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Provide tactical specifications about the vehicle performance matrix..."
            required
            className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300 resize-none"
          />
        </div>

        {/* ⚡ ৬. Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-transparent border border-[#00ffcc]/30 text-[#00ffcc] hover:bg-[#00ffcc] hover:text-[#030712] font-mono text-xs uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-300 font-bold hover:shadow-[0_0_25px_rgba(0,255,204,0.4)]"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCars;


















// "use client";

// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const AddCars = () => {
//   const [formData, setFormData] = useState({
//     carName: "",
//     dailyPrice: "",
//     seatCapacity: "7",
//     carType: "SUV",
//     location: "Sylhet Terminal",
//     imageUrl: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 🚀 ফর্ম সাবমিট হ্যান্ডলার (অ্যাসাইনমেন্ট কন্ডিশন ফ্রেন্ডলি)
//   // 💡 আপনার Better Auth-এর সেশন বা ইউজার হুক থেকে ইমেইলটি এখানে এক্সেস করবেন।
// // উদাহরণস্বরূপ: const { data: session } = authClient.useSession();
// // অথবা সরাসরি আপনার প্রোজেক্টের Auth স্টেট থেকে ইমেইলটি নেবেন।

// const userEmail = session?.user?.email || "farhad@example.com"; 

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // 🎯 এখানে চেঞ্জ করা হয়েছে: cleanData-এর ভেতরে hrEmail যুক্ত করা হয়েছে
//   const cleanData = {
//     ...formData,
//     dailyPrice: parseFloat(formData.dailyPrice),   // স্ট্রিং থেকে নাম্বারে কনভার্ট
//     seatCapacity: parseInt(formData.seatCapacity), // স্ট্রিং থেকে ইন্টিজারে কনভার্ট
//     hrEmail: userEmail,                            // 🔥 এই লাইনটি নতুন যুক্ত করা হলো!
//   };

//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(cleanData),
//     });

//     const result = await response.json();

//     // 💾 মঙ্গোডিবি সাকসেসফুলি ইনসার্ট করলে 'insertedId' রিটার্ন করে
//     if (result.insertedId) {
//       toast.success("Car Add Successfully! 🚀");
      
//       // 🔄 ডেটা সেভ হওয়ার পর ফর্মটি খালি করার জন্য স্টেট রিসেট
//       setFormData({
//         carName: "",
//         dailyPrice: "",
//         seatCapacity: "7",
//         carType: "SUV",
//         location: "Sylhet Terminal",
//         imageUrl: "",
//         description: "",
//       });
//     }
//   } catch (error) {
//     console.error("Failed to car add:", error);
//     toast.error("Car add fail ");
//   }
// };




//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   // 🎯 ব্যাকএন্ডের কন্ডিশন ঠিক রাখতে ডেটা টাইপ এখানেই কনভার্ট করে নেওয়া হচ্ছে
//   //   const cleanData = {
//   //     ...formData,
//   //     dailyPrice: parseFloat(formData.dailyPrice),   // স্ট্রিং থেকে নাম্বারে কনভার্ট
//   //     seatCapacity: parseInt(formData.seatCapacity), // স্ট্রিং থেকে ইন্টিজারে কনভার্ট
//   //   };

//   //   try {
//   //     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(cleanData),
//   //     });

//   //     const result = await response.json();

//   //     // 💾 মঙ্গোডিবি সাকসেসফুলি ইনসার্ট করলে 'insertedId' রিটার্ন করে
//   //     if (result.insertedId) {
//   //       toast.success("Car Add Successfully! 🚀");
        
//   //       // 🔄 ডেটা সেভ হওয়ার পর ফর্মটি খালি করার জন্য স্টেট রিসেট
//   //       setFormData({
//   //         carName: "",
//   //         dailyPrice: "",
//   //         seatCapacity: "7",
//   //         carType: "SUV",
//   //         location: "Sylhet Terminal",
//   //         imageUrl: "",
//   //         description: "",
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error("Failed to car add:", error);
//   //     toast.error("Car add fail ");
//   //   }
//   // };

//   return (
//     <div className="min-h-screen bg-[#030712] text-white font-sans flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
//       {/* 🌌 ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
//       <div className="absolute top-10 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

//       {/* 📑 হেডার সেকশন */}
//       <div className="text-center mb-10 relative z-10">
        
//         <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
//           Deploy New <span className="text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.3)]">Car</span>
//         </h1>
//       </div>

//       {/* 📊 সাইবারপাঙ্ক ফর্ম কন্টেইনার */}
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-2xl bg-[#090d16]/60 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative z-10 space-y-6"
//       >
//         {/* ১. Vehicle Model Name */}
//         <div className="space-y-2">
//           <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
//             Vehicle Model Name
//           </label>
//           <input
//             type="text"
//             name="carName"
//             value={formData.carName}
//             onChange={handleChange}
//             placeholder="Car Name"
//             required
//             className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300"
//           />
//         </div>

//         {/* ২. Rental Price এবং Seat Capacity (গ্রিড লেআউট) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
//               Daily Rental Price ($)
//             </label>
//             <input
//               type="number"
//               name="dailyPrice"
//               value={formData.dailyPrice}
//               onChange={handleChange}
//               placeholder="USD"
//               required
//               className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
//               Seat Capacity
//             </label>
//             <input
//               type="number"
//               name="seatCapacity"
//               value={formData.seatCapacity}
//               onChange={handleChange}
//               placeholder="7"
//               required
//               className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300"
//             />
//           </div>
//         </div>

//         {/* ৩. Vehicle Class Type এবং Pickup Terminal Location (গ্রিড লেআউট) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
//               Vehicle Class Type
//             </label>
//             <select
//               name="carType"
//               value={formData.carType}
//               onChange={handleChange}
//               className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300 cursor-pointer appearance-none"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/></svg>")`,
//                 backgroundPosition: "right 1rem center",
//                 backgroundSize: "1rem",
//                 backgroundRepeat: "no-repeat",
//               }}
//             >
//               <option value="SUV" className="bg-[#090d16]">SUV</option>
//               <option value="Sedan" className="bg-[#090d16]">Sedan</option>
//               <option value="Luxury" className="bg-[#090d16]">Luxury</option>
//               <option value="Sports" className="bg-[#090d16]">Sports</option>
//             </select>
//           </div>

//           <div className="space-y-2">
//             <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
//               Pickup Terminal Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               placeholder="Sylhet Terminal"
//               required
//               className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300"
//             />
//           </div>
//         </div>

//         {/* 🚀 ৪. Vehicle Asset Image URL */}
//         <div className="space-y-2">
//           <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
//             Vehicle Asset Image URL
//           </label>
//           <input
//             type="url"
//             name="imageUrl"
//             value={formData.imageUrl}
//             onChange={handleChange}
//             placeholder="https://images.unsplash.com/..."
//             required
//             className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300"
//           />
//         </div>

//         {/* 📊 ৫. System Specifications / Description */}
//         <div className="space-y-2">
//           <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
//             System Specifications / Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows="4"
//             placeholder="Provide tactical specifications about the vehicle performance matrix..."
//             required
//             className="w-full bg-[#111827]/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.1)] transition-all duration-300 resize-none"
//           />
//         </div>

//         {/* ⚡ 六. Initialize Injection Node Button */}
//         <div className="pt-2">
//           <button
//             type="submit"
//             className="w-full bg-transparent border border-[#00ffcc]/30 text-[#00ffcc] hover:bg-[#00ffcc] hover:text-[#030712] font-mono text-xs uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-300 font-bold hover:shadow-[0_0_25px_rgba(0,255,204,0.4)]"
//           >
//             Add Car
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddCars;


























// 'use client';

// import { authClient } from '@/lib/auth-client';
// import { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// export default function AddCar() {
//   const router = useRouter();
//   const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
//   const userSession = sessionData?.user;

 
//   const [formData, setFormData] = useState({
//     carName: '',
//     dailyPrice: '',
//     carType: 'SUV', // Default value
//     image: '',
//     seatCapacity: '',
//     pickupLocation: '',
//     description: '',
//   });

//   const [submitting, setSubmitting] = useState(false);

  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isSessionLoading || !userSession?.email) {
//       toast.error('You must be logged in to deploy a vehicle matrix.');
//       return;
//     }

//     setSubmitting(true);
//     const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;

    
//     const carPayload = {
//       carName: formData.carName,
//       dailyPrice: Number(formData.dailyPrice), 
//       carType: formData.carType,
//       image: formData.image,
//       seatCapacity: Number(formData.seatCapacity), 
//       pickupLocation: formData.pickupLocation,
//       description: formData.description,
//       availabilityStatus: 'Available', 
//       userEmail: userSession.email,  
//       createdAt: new Date(),
//     };


//     // http://localhost:8000/cars
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${sessionTokenOrId}`,
//         },
//         body: JSON.stringify(carPayload),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to inject node: Status ${response.status}`);
//       }

//       toast.success('VEHICLE NODE SUCCESSFULLY DEPLOYED TO GRID');
//       router.push('/my-add-cars'); // সফল হলে My Add Cars বা Explore পেজে রিডাইরেক্ট করবে
//     } catch (error) {
//       console.error('Submit Error:', error);
//       toast.error(error.message || 'Grid injection protocol failed.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 relative overflow-hidden">
//       {/* Background glow matrix */}
//       <div className="absolute top-1/4 right-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />

//       <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        
//         {/* HEADER */}
//         <div className="space-y-2 text-center">
//           <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
//             Data Injection Portal
//           </div>
//           <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
//             Deploy New <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Vehicle Node</span>
//           </h1>
//         </div>

//         {/* FORM CONTAINER */}
//         <form onSubmit={handleSubmit} className="bg-[#090d16]/60 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-xl shadow-2xl space-y-5">
          
//           {/* Car Name */}
//           <div className="space-y-1.5">
//             <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Vehicle Model Name</label>
//             <input
//               type="text"
//               name="carName"
//               required
//               value={formData.carName}
//               onChange={handleChange}
//               placeholder=" Car Name"
//               className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
//             />
//           </div>

//           {/* Grid Layout for Price and Seat Capacity */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {/* Daily Price */}
//             <div className="space-y-1.5">
//               <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Daily Rental Price ($)</label>
//               <input
//                 type="number"
//                 name="dailyPrice"
//                 required
//                 value={formData.dailyPrice}
//                 onChange={handleChange}
//                 placeholder="USD"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
//               />
//             </div>

//             {/* Seat Capacity */}
//             <div className="space-y-1.5">
//               <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Seat Capacity</label>
//               <input
//                 type="number"
//                 name="seatCapacity"
//                 required
//                 value={formData.seatCapacity}
//                 onChange={handleChange}
//                 placeholder=" 7"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
//               />
//             </div>
//           </div>

//           {/* Grid Layout for Car Type and Pickup Location */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {/* Car Type */}
//             <div className="space-y-1.5">
//               <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Vehicle Class Type</label>
//               <select
//                 name="carType"
//                 value={formData.carType}
//                 onChange={handleChange}
//                 className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
//               >
//                 <option value="SUV">SUV</option>
//                 <option value="Sedan">Sedan</option>
//                 <option value="Truck">Truck</option>
//                 <option value="Coupe">Coupe</option>
//                 <option value="Hypercar">Hypercar</option>
//               </select>
//             </div>

//             {/* Pickup Location */}
//             <div className="space-y-1.5">
//               <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Pickup Terminal Location</label>
//               <input
//                 type="text"
//                 name="pickupLocation"
//                 required
//                 value={formData.pickupLocation}
//                 onChange={handleChange}
//                 placeholder=" Sylhet Terminal"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
//               />
//             </div>
//           </div>

//           {/* Image URL */}
//           <div className="space-y-1.5">
//             <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Vehicle Asset Image URL</label>
//             <input
//               type="url"
//               name="image"
//               required
//               value={formData.image}
//               onChange={handleChange}
//               placeholder="https://images.unsplash.com/..."
//               className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
//             />
//           </div>

//           {/* Description */}
//           <div className="space-y-1.5">
//             <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">System Specifications / Description</label>
//             <textarea
//               name="description"
//               required
//               rows="4"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Provide tactical specifications about the vehicle performance matrix..."
//               className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors resize-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 text-[#00ffcc] hover:bg-[#00ffcc] hover:text-black font-mono text-xs uppercase tracking-widest py-3.5 rounded-xl font-bold shadow-[0_0_20px_rgba(0,255,204,0.1)] transition-all disabled:opacity-50"
//           >
//             {submitting ? 'INJECTING REPOSITORY DATA...' : 'INITIALIZE INJECTION NODE'}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }




























