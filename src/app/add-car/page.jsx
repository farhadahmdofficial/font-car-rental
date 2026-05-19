

'use client';

import { useState } from 'react';

export default function AddCar() {
  const [formData, setFormData] = useState({
    carName: '',
    brand: '',
    price: '',
    image: '',
    transmission: 'Automatic',
    fuelType: 'Electric',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 💡 এখানে পরবর্তীতে আপনার backend API (যেমন: /api/cars) এর সাথে fetch বা axios কানেক্ট করবেন
    console.log('Submitting Car Data Matrix:', formData);

    // মক সাকসেস রেসপন্স (টেস্ট করার জন্য)
    setTimeout(() => {
      alert('Vehicle Node Successfully Integrated to the Database Matrix!');
      setFormData({
        carName: '',
        brand: '',
        price: '',
        image: '',
        transmission: 'Automatic',
        fuelType: 'Electric',
        description: '',
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 md:px-8 py-12 flex items-center justify-center relative overflow-hidden">
      
      {/* 🔮 Background Cyan Glow Aura */}
      <div className="absolute top-[-20%] right-[-20%] h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-20%] h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-2xl bg-[#090d16]/60 border border-white/5 rounded-2xl p-6 md:p-10 backdrop-blur-xl relative z-10 space-y-8 shadow-2xl">
        
        {/* 📑 FORM HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-1">
            Database Input Terminal
          </div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Deploy New <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Vehicle Node</span>
          </h1>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Input automotive data parameters to index your vehicle registry safely into the active tracking cluster.
          </p>
        </div>

        {/* 📝 CORE FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Row 1: Car Name & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Car Name</label>
              <input
                type="text"
                name="carName"
                required
                placeholder="e.g., Cyber Coupe X1"
                value={formData.carName}
                onChange={handleChange}
                className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Brand Name</label>
              <input
                type="text"
                name="brand"
                required
                placeholder="e.g., Tesla"
                value={formData.brand}
                onChange={handleChange}
                className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Price Per Day & Image URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Price Per Day ($)</label>
              <input
                type="number"
                name="price"
                required
                placeholder="e.g., 120"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Image URL</label>
              <input
                type="url"
                name="image"
                required
                placeholder="https://example.com/car.png"
                value={formData.image}
                onChange={handleChange}
                className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Transmission & Fuel Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Transmission</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00ffcc]/50 transition-colors cursor-pointer appearance-none"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Fuel Architecture</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00ffcc]/50 transition-colors cursor-pointer appearance-none"
              >
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Octane">Octane</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>
          </div>

          {/* Row 4: Description Textarea */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">System Log / Description</label>
            <textarea
              name="description"
              required
              rows="4"
              placeholder="Provide a detailed log of performance matrix, structural highlights, and special specifications..."
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-[#030712] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00ffcc] text-black font-black uppercase text-xs tracking-widest py-3.5 rounded-xl hover:bg-[#00ffcc]/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_20px_rgba(0,255,204,0.15)] hover:shadow-[0_0_30px_rgba(0,255,204,0.35)]"
            >
              {loading ? 'Processing Node Integration...' : 'Initialize Add Car'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}






