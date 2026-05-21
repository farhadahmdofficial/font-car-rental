




'use client';

import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddCar() {
  const router = useRouter();
  const { data: sessionData, isPending: isSessionLoading } = authClient.useSession();
  const userSession = sessionData?.user;

  // 📝 ফর্ম স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    carName: '',
    dailyPrice: '',
    carType: 'SUV', // Default value
    image: '',
    seatCapacity: '',
    pickupLocation: '',
    description: '',
  });

  const [submitting, setSubmitting] = useState(false);

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🚀 ডাটা সাবমিট হ্যান্ডলার (POST Request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSessionLoading || !userSession?.email) {
      toast.error('You must be logged in to deploy a vehicle matrix.');
      return;
    }

    setSubmitting(true);
    const sessionTokenOrId = sessionData?.session?.id || sessionData?.session?.token;

    // আপনার দেওয়া স্ট্রাকচার অনুযায়ী পেলোড তৈরি
    const carPayload = {
      carName: formData.carName,
      dailyPrice: Number(formData.dailyPrice), // সুনিশ্চিতভাবে Number কনভার্ট করা
      carType: formData.carType,
      image: formData.image,
      seatCapacity: Number(formData.seatCapacity), // সুনিশ্চিতভাবে Number কনভার্ট করা
      pickupLocation: formData.pickupLocation,
      description: formData.description,
      availabilityStatus: 'Available', // বাই-ডিফল্ট Available থাকবে
      userEmail: userSession.email, // ট্র্যাকিংয়ের জন্য ইউজারের ইমেইল
      createdAt: new Date(),
    };

    try {
      const response = await fetch('http://localhost:8000/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionTokenOrId}`,
        },
        body: JSON.stringify(carPayload),
      });

      if (!response.ok) {
        throw new Error(`Failed to inject node: Status ${response.status}`);
      }

      toast.success('VEHICLE NODE SUCCESSFULLY DEPLOYED TO GRID');
      router.push('/my-add-cars'); // সফল হলে My Add Cars বা Explore পেজে রিডাইরেক্ট করবে
    } catch (error) {
      console.error('Submit Error:', error);
      toast.error(error.message || 'Grid injection protocol failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 relative overflow-hidden">
      {/* Background glow matrix */}
      <div className="absolute top-1/4 right-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        
        {/* HEADER */}
        <div className="space-y-2 text-center">
          <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
            Data Injection Portal
          </div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Deploy New <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Vehicle Node</span>
          </h1>
        </div>

        {/* FORM CONTAINER */}
        <form onSubmit={handleSubmit} className="bg-[#090d16]/60 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-xl shadow-2xl space-y-5">
          
          {/* Car Name */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Vehicle Model Name</label>
            <input
              type="text"
              name="carName"
              required
              value={formData.carName}
              onChange={handleChange}
              placeholder=" Car Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
            />
          </div>

          {/* Grid Layout for Price and Seat Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Daily Price */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Daily Rental Price ($)</label>
              <input
                type="number"
                name="dailyPrice"
                required
                value={formData.dailyPrice}
                onChange={handleChange}
                placeholder="USD"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
              />
            </div>

            {/* Seat Capacity */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Seat Capacity</label>
              <input
                type="number"
                name="seatCapacity"
                required
                value={formData.seatCapacity}
                onChange={handleChange}
                placeholder=" 7"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
              />
            </div>
          </div>

          {/* Grid Layout for Car Type and Pickup Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Car Type */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Vehicle Class Type</label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Hypercar">Hypercar</option>
              </select>
            </div>

            {/* Pickup Location */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Pickup Terminal Location</label>
              <input
                type="text"
                name="pickupLocation"
                required
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder=" Sylhet Terminal"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">Vehicle Asset Image URL</label>
            <input
              type="url"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">System Specifications / Description</label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide tactical specifications about the vehicle performance matrix..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ffcc] transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 text-[#00ffcc] hover:bg-[#00ffcc] hover:text-black font-mono text-xs uppercase tracking-widest py-3.5 rounded-xl font-bold shadow-[0_0_20px_rgba(0,255,204,0.1)] transition-all disabled:opacity-50"
          >
            {submitting ? 'INJECTING REPOSITORY DATA...' : 'INITIALIZE INJECTION NODE'}
          </button>

        </form>
      </div>
    </div>
  );
}





















// 'use client';

// import { useState } from 'react';

// export default function AddCar() {
//   const [formData, setFormData] = useState({
//     carName: '',
//     brand: '',
//     price: '',
//     image: '',
//     transmission: 'Automatic',
//     fuelType: 'Electric',
//     description: '',
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // 💡 এখানে পরবর্তীতে আপনার backend API (যেমন: /api/cars) এর সাথে fetch বা axios কানেক্ট করবেন
//     console.log('Submitting Car Data Matrix:', formData);

//     // মক সাকসেস রেসপন্স (টেস্ট করার জন্য)
//     setTimeout(() => {
//       alert('Vehicle Node Successfully Integrated to the Database Matrix!');
//       setFormData({
//         carName: '',
//         brand: '',
//         price: '',
//         image: '',
//         transmission: 'Automatic',
//         fuelType: 'Electric',
//         description: '',
//       });
//       setLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 flex items-center justify-center relative overflow-hidden">
      
//       {/* 🔮 Background Cyan Glow Aura */}
//       <div className="absolute top-[-20%] right-[-20%] h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />
//       <div className="absolute bottom-[-20%] left-[-20%] h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

//       <div className="w-full max-w-2xl bg-[#090d16]/60 border border-white/5 rounded-2xl p-6 md:p-10 backdrop-blur-xl relative z-10 space-y-8 shadow-2xl">
        
//         {/* 📑 FORM HEADER */}
//         <div className="text-center space-y-2">
//           <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
//             Database Input Terminal
//           </div>
//           <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
//             Deploy New <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Vehicle Node</span>
//           </h1>
//           <p className="text-xs text-gray-400 max-w-md mx-auto">
//             Input automotive data parameters to index your vehicle registry safely into the active tracking cluster.
//           </p>
//         </div>

//         {/* 📝 CORE FORM */}
//         <form onSubmit={handleSubmit} className="space-y-5">
          
//           {/* Row 1: Car Name & Brand */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-1.5">
//               <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Car Name</label>
//               <input
//                 type="text"
//                 name="carName"
//                 required
//                 placeholder="e.g., Cyber Coupe X1"
//                 value={formData.carName}
//                 onChange={handleChange}
//                 className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
//               />
//             </div>
//             <div className="space-y-1.5">
//               <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Brand Name</label>
//               <input
//                 type="text"
//                 name="brand"
//                 required
//                 placeholder="e.g., Tesla"
//                 value={formData.brand}
//                 onChange={handleChange}
//                 className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
//               />
//             </div>
//           </div>

//           {/* Row 2: Price Per Day & Image URL */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-1.5">
//               <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Price Per Day ($)</label>
//               <input
//                 type="number"
//                 name="price"
//                 required
//                 placeholder="e.g., 120"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//               />
//             </div>
//             <div className="space-y-1.5">
//               <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Image URL</label>
//               <input
//                 type="url"
//                 name="image"
//                 required
//                 placeholder="https://example.com/car.png"
//                 value={formData.image}
//                 onChange={handleChange}
//                 className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
//               />
//             </div>
//           </div>

//           {/* Row 3: Transmission & Fuel Type */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-1.5">
//               <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Transmission</label>
//               <select
//                 name="transmission"
//                 value={formData.transmission}
//                 onChange={handleChange}
//                 className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00ffcc]/50 transition-colors cursor-pointer appearance-none"
//               >
//                 <option value="Automatic">Automatic</option>
//                 <option value="Manual">Manual</option>
//               </select>
//             </div>
//             <div className="space-y-1.5">
//               <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Fuel Architecture</label>
//               <select
//                 name="fuelType"
//                 value={formData.fuelType}
//                 onChange={handleChange}
//                 className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00ffcc]/50 transition-colors cursor-pointer appearance-none"
//               >
//                 <option value="Electric">Electric</option>
//                 <option value="Hybrid">Hybrid</option>
//                 <option value="Octane">Octane</option>
//                 <option value="Diesel">Diesel</option>
//               </select>
//             </div>
//           </div>

//           {/* Row 4: Description Textarea */}
//           <div className="space-y-1.5">
//             <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">System Log / Description</label>
//             <textarea
//               name="description"
//               required
//               rows="4"
//               placeholder="Provide a detailed log of performance matrix, structural highlights, and special specifications..."
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full bg-[#030712] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors resize-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="pt-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#00ffcc] text-black font-black uppercase text-xs tracking-widest py-3.5 rounded-xl hover:bg-[#00ffcc]/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_20px_rgba(0,255,204,0.15)] hover:shadow-[0_0_30px_rgba(0,255,204,0.35)]"
//             >
//               {loading ? 'Processing Node Integration...' : 'Initialize Add Car'}
//             </button>
//           </div>

//         </form>

//       </div>
//     </div>
//   );
// }






