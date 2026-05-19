
'use client';

import Image from 'next/image';
import Link from 'next/link';
import banner from "@/assets/banner.png";

export default function Banner() {
  return (
    <section className="relative min-h-[85vh] w-11/12 mx-auto flex items-center justify-center overflow-hidden bg-[#030712] px-4 md:px-8 py-20">
      
      {/* 🚗 BACKGROUND IMAGE CONTAINER (Fixed with explicit positioning) */}
      <div className="absolute inset-0 w-full h-full z-0 block">
        <Image 
          src={banner}
          alt="Premium Rental Car Background" 
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none pointer-events-none"
        />
        {/* 𝖣𝖺𝗋𝗄 𝖮𝗏𝖾𝗋𝗅𝖺𝗒: টেক্সট রিডিবিলিটি এবং সাইবারপাঙ্ক মুড ব্লেন্ড করার জন্য */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/60 via-[#030712]/80 to-[#030712] backdrop-blur-[2px]" />
      </div>

      {/* 🔮 সাইবারপাঙ্ক গ্লো ইফেক্টস (Z-Index Adjusted to stay behind text but above image) */}
      <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/10 blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/10 blur-[120px] pointer-events-none z-10" />

      {/* 🏁 সূক্ষ্ম গ্রিড ব্যাকগ্রাউন্ড ওভারলে */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />

      {/* 📦 CENTERED CONTENT CONTAINER */}
      <div className="relative z-20 max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
        
        {/* 🚀 বর্ডার ট্যাগলাইন */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 bg-[#00ffcc]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00ffcc]">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
          <span>Next-Gen Rental Network Active</span>
        </div>

        {/* 🏷️ TITLE */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
          Drive <span className="text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.4)]">Fleet</span> Platforms
        </h1>

        {/* 📝 SHORT DESCRIPTION */}
        <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
          Architect your premium travel experience. Instant secure access to verified automotive listings, high-performance maintenance matrix logs, and tactical pricing structures.
        </p>

        {/* 🎯 EXPLORE CARS BUTTON */}
        <div className="pt-4">
          <Link 
            href="/cars" 
            className="group relative inline-flex items-center justify-center rounded-full bg-[#00ffcc] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#00ffcc]/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,204,0.2)] hover:shadow-[0_0_40px_rgba(0,255,204,0.4)]"
          >
            Explore Cars
            <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

      </div>

      {/* 📐底部 1px gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/20 to-transparent z-20" />
    </section>
  );
}






// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import banner from "@/assets/banner.png";

// export default function Banner() {
//   return (
//     <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#030712] px-4 md:px-8 py-20">
      
//       {/* 🚗 BACKGROUND IMAGE */}
//       <div className="absolute inset-0 z-0">
//         <Image 
//           src={banner}
//           alt="Premium Rental Car Background" 
//           fill
//           priority
//           placeholder="blur" // যদি আপনার ইমেজটি স্ট্যাটিক ইমপোর্ট হয়, এটি ব্লাড লোডিং ইফেক্ট দেবে
//           className="object-cover object-center"
//         />
//         {/* 𝖣𝖺𝗋𝗄 𝖮𝗏𝖾𝗋𝗅𝖺𝗒: ইমেজ ব্যাকগ্রাউন্ডের ওপর টেক্সট যেন পরিষ্কার দেখা যায় */}
//         <div className="absolute inset-0 bg-[#030712]/75 backdrop-blur-sm" />
//       </div>

//       {/* 🔮 ব্যাকগ্রাউন্ড সাইবারপাঙ্ক গ্লো ইফেক্টস */}
//       <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none z-10" />
//       <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none z-10" />

//       {/* 🏁 গ্রিড ব্যাকগ্রাউন্ড ওভারলে */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />

//       {/* 📦 CENTERED CONTENT CONTAINER */}
//       <div className="relative z-20 max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
        
//         {/* 🚀 বর্ডার ট্যাগলাইন */}
//         <div className="inline-flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 bg-[#00ffcc]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00ffcc]">
//           <span className="flex h-1.5 w-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
//           <span>Next-Gen Rental Network Active</span>
//         </div>

//         {/* 🏷️ TITLE */}
//         <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
//           Drive <span className="text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.4)]">Fleet</span> Platforms
//         </h1>

//         {/* 📝 SHORT DESCRIPTION */}
//         <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
//           Architect your premium travel experience. Instant secure access to verified automotive listings, high-performance maintenance matrix logs, and tactical pricing structures.
//         </p>

//         {/* 🎯 EXPLORE CARS BUTTON */}
//         <div className="pt-4">
//           <Link 
//             href="/cars" 
//             className="group relative inline-flex items-center justify-center rounded-full bg-[#00ffcc] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#00ffcc]/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,204,0.2)] hover:shadow-[0_0_40px_rgba(0,255,204,0.4)]"
//           >
//             Explore Cars
//             <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
//               →
//             </span>
//           </Link>
//         </div>

//       </div>

//       {/* 📐底部 1px gradient line */}
//       <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/10 to-transparent z-20" />
//     </section>
//   );
// }












// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import banner from "@/assets/banner.png";

// export default function Banner() {
//   return (
//     <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#030712] px-4 md:px-8 py-16 md:py-24">
      
//       {/* 🔮 ব্যাকগ্রাউন্ড সাইবারপাঙ্ক গ্লো ইফেক্টস */}
//       <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />

//       {/* 🏁 গ্রিড ব্যাকগ্রাউন্ড ওভারলে */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

//       {/* 📦 মেইন কন্টেইনার গ্রিড (টেক্সট বামে, কার ডানে) */}
//       <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
//         {/* 📝 বাম পাশের কন্টেন্ট সেকশন (Text Content) */}
//         <div className="space-y-6 text-center lg:text-left">
          
//           {/* 🚀 বর্ডার ট্যাগলাইন */}
//           <div className="inline-flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 bg-[#00ffcc]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00ffcc]">
//             <span className="flex h-1.5 w-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
//             <span>Next-Gen Rental Network Active</span>
//           </div>

//           {/* 🏷️ TITLE */}
//           <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
//             Drive <span className="text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.4)]">Fleet</span> Platforms
//           </h1>

//           {/* 📝 SHORT DESCRIPTION */}
//           <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
//             Architect your premium travel experience. Instant secure access to verified automotive listings, high-performance maintenance matrix logs, and tactical pricing structures.
//           </p>

//           {/* 🎯 EXPLORE CARS BUTTON */}
//           <div className="pt-2">
//             <Link 
//               href="/cars" 
//               className="group relative inline-flex items-center justify-center rounded-full bg-[#00ffcc] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#00ffcc]/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,204,0.2)] hover:shadow-[0_0_40px_rgba(0,255,204,0.4)]"
//             >
//               Explore Cars
//               <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
//                 →
//               </span>
//             </Link>
//           </div>
//         </div>

//         {/* 🚗 ডান পাশের ইমেজ সেকশন (Car Image with Neon Aura) */}
//         <div className="relative flex justify-center items-center w-full">
//           {/* কার এর পেছনে হালকা সায়ান রঙের গ্লোয়িং ডিস্ক বা শ্যাডো ইফেক্ট */}
//           <div className="absolute w-[80%] h-[50%] bg-[#00ffcc]/10 rounded-full blur-[60px] pointer-events-none" />
          
//           <Image 
//             src={banner}
//             alt="Premium Rental Car" 
//             priority
//             className="relative z-10 w-full max-w-[550px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,255,204,0.2)] transform hover:scale-105 transition-transform duration-500 ease-out"
//           />
//         </div>

//       </div>

//       {/* 📐底部 1px gradient line */}
//       <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/10 to-transparent" />
//     </section>
//   );
// }

















// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import banner from "@/assets/banner.png";

// export default function Banner() {
//   return (
//     <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#030712] px-4 md:px-8 py-16 md:py-24">
      
//       {/* 🔮 ব্যাকগ্রাউন্ড সাইবারপাঙ্ক গ্লো ইফেক্টস */}
//       <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />

//       {/* 🏁 গ্রিড ব্যাকগ্রাউন্ড ওভারলে */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

//       {/* 📦 মেইন কন্টেইনার গ্রিড (টেক্সট বামে, কার ডানে) */}
//       <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
//         {/* 📝 বাম পাশের কন্টেন্ট সেকশন (Text Content) */}
//         <div className="space-y-6 text-center lg:text-left">
          
//           {/* 🚀 বর্ডার ট্যাগলাইন */}
//           <div className="inline-flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 bg-[#00ffcc]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00ffcc]">
//             <span className="flex h-1.5 w-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
//             <span>Next-Gen Rental Network Active</span>
//           </div>

//           {/* 🏷️ TITLE */}
//           <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
//             Drive <span className="text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.4)]">Fleet</span> Platforms
//           </h1>

//           {/* 📝 SHORT DESCRIPTION */}
//           <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
//             Architect your premium travel experience. Instant secure access to verified automotive listings, high-performance maintenance matrix logs, and tactical pricing structures.
//           </p>

//           {/* 🎯 EXPLORE CARS BUTTON */}
//           <div className="pt-2">
//             <Link 
//               href="/cars" 
//               className="group relative inline-flex items-center justify-center rounded-full bg-[#00ffcc] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#00ffcc]/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,204,0.2)] hover:shadow-[0_0_40px_rgba(0,255,204,0.4)]"
//             >
//               Explore Cars
//               <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
//                 →
//               </span>
//             </Link>
//           </div>
//         </div>

//         {/* 🚗 ডান পাশের ইমেজ সেকশন (Car Image with Neon Aura) */}
//         <div className="relative flex justify-center items-center w-full">
//           {/* কার এর পেছনে হালকা সায়ান রঙের গ্লোয়িং ডিস্ক বা শ্যাডো ইফেক্ট */}
//           <div className="absolute w-[80%] h-[50%] bg-[#00ffcc]/10 rounded-full blur-[60px] pointer-events-none" />
          
//           <Image 
//             src={banner}
//             alt="Premium Rental Car" 
//             className="relative z-10 w-full max-w-[550px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,255,204,0.2)] transform hover:scale-105 transition-transform duration-500 ease-out"
//           />
//         </div>

//       </div>

//       {/* 📐底部 1px gradient line */}
//       <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/10 to-transparent" />
//     </section>
//   );
// }











// 'use client';

// import Link from 'next/link';

// export default function Banner() {
//   return (
//     <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#030712] px-4 md:px-8 py-20">
      
//       {/* 🔮 ব্যাকগ্রাউন্ড সাইবারপাঙ্ক গ্লো ইফেক্টস (Extra UI Aesthetics) */}
//       <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />

//       {/* 🏁 গ্রিড ব্যাকগ্রাউন্ড ওভারলে */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

//       <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
        
//         {/* 🚀 বর্ডার ট্যাগলাইন */}
//         <div className="inline-flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 bg-[#00ffcc]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00ffcc]">
//           <span className="flex h-1.5 w-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
//           <span>Next-Gen Rental Network Active</span>
//         </div>

//         {/* 🏷️ TITLE */}
//         <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
//           Drive <span className="text-[#00ffcc] drop-shadow-[0_0_15px_rgba(0,255,204,0.4)]">Fleet</span> Platforms
//         </h1>

//         {/* 📝 SHORT DESCRIPTION (No Lorem Ipsum - Pure Recruiter Friendly Text) */}
//         <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
//           Architect your premium travel experience. Instant secure access to verified automotive listings, high-performance maintenance matrix logs, and tactical pricing structures.
//         </p>

//         {/* 🎯 EXPLORE CARS BUTTON */}
//         <div className="pt-4">
//           <Link 
//             href="/cars" 
//             className="group relative inline-flex items-center justify-center rounded-full bg-[#00ffcc] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#00ffcc]/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,204,0.2)] hover:shadow-[0_0_40px_rgba(0,255,204,0.4)]"
//           >
//             Explore Cars
//             <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
//               →
//             </span>
//           </Link>
//         </div>

//       </div>

//       {/* 📐 বটম বর্ডার গ্রাডিয়েন্ট ডিটেকশন */}
//       <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/10 to-transparent" />
//     </section>
//   );
// }