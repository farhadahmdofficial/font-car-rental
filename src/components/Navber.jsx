

"use client"
import { signOut, useSession } from '@/lib/auth-client';
// import { signOut } from 'better-auth/api';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';


// import { Avatar, Button } from '@heroui/react';
// import { FiLogOut} from 'react-icons/fi'; 
import toast from 'react-hot-toast';
import { IoReorderThree } from 'react-icons/io5';

const Navber = () => {
  const router = useRouter();
    const [isOpen, setIsOpen] = useState(false); 

  const {data:session,isPending}=useSession()
  
  // console.log(session);


  const handleLogout= async()=>{

    await signOut()
    toast.success(' Successful Logout ', {
                  style: {
                    border: '1px solid #00ffcc',
                    padding: '16px',
                    color: '#fff',
                    background: '#090d16',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                  },
                });
        
        
                setTimeout(() => {
                  router.push('/');
                 }, 1500);

  }



   const pathname = usePathname();
  return (
    <div>
      <nav className="sticky top-0 z-50 border-b border-[#00ffcc]/10 bg-[#030712]/80 backdrop-blur-md px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* 🏎️ LOGO SECTION */}
        <div className="flex items-center space-x-2">

          <Image
  src="/log.png"
  alt="logo"
  loading="eager"
  width={35}
  height={35}
  className="rounded-full object-cover aspect-square animate__animated animate__rotateIn animate__fast group-hover:animate__pulse"
/>
         
     






           


          <span className="text-xl font-black uppercase tracking-wider text-white">
            Rent<span className="text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]">Ride</span>
          </span>
        </div>

        {/* 🌐 DESKTOP NAV ITEMS */}
    

        <ul className="hidden items-center space-x-6 md:flex">



          <li>

            <Link href={"/"} className={pathname === "/" ? "text-xs font-bold uppercase tracking-widest transition-colors duration-300    text-[#00ffcc] " : "text-xs font-bold uppercase tracking-widest transition-colors duration-300   text-gray-400 hover:text-white  "}>
                Home
              </Link>


           
            </li> 
          <li>

            <Link href="/cars" className={pathname === "/cars" ? "text-xs font-bold uppercase tracking-widest transition-colors duration-300    text-[#00ffcc] " : "text-xs font-bold uppercase tracking-widest transition-colors duration-300   text-gray-400 hover:text-white  "}>
               Explore Cars
              </Link>


           
            </li> 
          <li>

            <Link  href="/add-car" className={pathname === "/add-car" ? "text-xs font-bold uppercase tracking-widest transition-colors duration-300    text-[#00ffcc] " : "text-xs font-bold uppercase tracking-widest transition-colors duration-300   text-gray-400 hover:text-white  "}>
              Add Car
              </Link>


         
            </li> 
          <li>

            <Link href="/my-bookings" className={pathname === "/my-bookings" ? "text-xs font-bold uppercase tracking-widest transition-colors duration-300    text-[#00ffcc] " : "text-xs font-bold uppercase tracking-widest transition-colors duration-300   text-gray-400 hover:text-white  "}>
                My Bookings
              </Link>


            </li> 
          <li>

            <Link href="/my-add-cars" className={pathname === "/my-add-cars" ? "text-xs font-bold uppercase tracking-widest transition-colors duration-300    text-[#00ffcc] " : "text-xs font-bold uppercase tracking-widest transition-colors duration-300   text-gray-400 hover:text-white  "}>
                My Add Cars
              </Link>


           

            </li> 
           





          
          
          {/* <Link
            href="/cars"
            className="ext-xs font-bold uppercase tracking-widest transition-colors duration-300" 
              
            
          >
            Explore Cars
          </Link> */}
{/* 
          <Link
            href="/add-car"
            // className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
            //   isActive('/add-car') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
            // }`}
          >
            Add Car
          </Link> */}
          
      

       
          </ul>

        {/* 🔒 RIGHT SIDE: AUTH BUTTON / PROFILE DROPDOWN */}

        {!isPending &&!session  ? <div className="hidden items-center space-x-4 md:flex">
        
           
                   
         
            <Link
              href="/login"
              className="rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/5 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00ffcc] hover:bg-[#00ffcc]/20 transition-all duration-300"
            >
              Login / Register
            </Link>




        
        </div>:<div className="hidden md:flex items-center justify-between border border-[#00ffcc]/20 bg-[#090d16]/90 rounded-2xl p-1.5 min-w-[220px] gap-3">   
  {/* 💡 Section 1: User Profile Header */}
  <div className="border-b border-white/5 px-3 py-1 flex items-center gap-2">
    {/* User Avatar */}
    <div className="relative shrink-0">
      <img
        src={session?.user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
        alt={session?.user?.name || "User"}
        referrerPolicy="no-referrer"
        className="h-6 w-6 rounded-full object-cover border border-[#00ffcc]/40 shadow-[0_0_10px_rgba(0,255,204,0.15)]"
      />
      {/* 🟢 Online Status Indicator Dot */}
      <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#00ffcc] ring-2 ring-[#030712]" />
    </div>

    {/* User Identity Meta */}
    <div className="min-w-0 flex-1">
      <p className="text-xs font-black uppercase tracking-wide text-white truncate font-mono">
        {session?.user?.name || " no User"}
      </p>
      <p className="text-[10px] text-gray-500 truncate font-mono mt-0.5">
        {session?.user?.email || "No email "}
      </p>
    </div>
  </div>

  {/* 💡 Section 2: Action Terminal (Logout Button) */}
  <div className="mt-1.5 p-1">
    <button
      onClick={handleLogout}

      className="w-full text-left block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 transition-colors font-mono"
      // className="w-full text-left flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-rose-400   active:scale-[0.98] transition-all font-mono border border-transparent "
    >
    
      Logout
    </button>
  </div>

</div>  }



        {/* <div className="hidden items-center space-x-4 md:flex">
        
           
                   
         
            <Link
              href="/login"
              className="rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/5 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00ffcc] hover:bg-[#00ffcc]/20 transition-all duration-300"
            >
              Login / Register
            </Link>




        
        </div> */}


        {/* logout button  */}


         








         
                {/* <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#090d16] p-2 shadow-2xl z-50"> */}

                



{/* 

                  <div className="border-b border-white/5 px-3 py-2">

                  <img
  /
                  
                 








              






                







                {/* logout  */}

                  {/* <div className="flex gap-3">
              <Avatar size="sm">
                <Avatar.Image
                  alt="John Doe"
                  src={session?.user?.image}
                  referrerPolicy="no-referrer"
                />
                <Avatar.Fallback>{session?.user?.name.charAt(0)}</Avatar.Fallback>
              </Avatar>

              <Button onClick={handleLogout} size="sm" variant="danger"><FiLogOut className="text-white" /> SignOut</Button>
            </div> */}
             
             

        {/* 📱 MOBILE MENU TRIGGER */}
        {/* <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-[#00ffcc] focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.83-4.828 4.83a1 1 0 01-1.414-1.414l4.829-4.83-4.829-4.83a1 1 0 011.414-1.414l4.828 4.83 4.829-4.83a1 1 0 111.414 1.414l-4.83 4.83 4.83 4.83z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
              )}
            </svg>
          </button>
        </div> */}


   {/* 📱 MOBILE NAV MENU */}







{/* 📱 MOBILE MENU TRIGGER & PANEL */}
<div className="md:hidden flex items-center">
  
  {/* ১. মোবাইল টগল বাটন (লোগোর ডানপাশে একদম সোজা থাকবে) */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="p-1.5 rounded-lg bg-[#090d16] border border-[#00ffcc]/20 text-[#00ffcc] drop-shadow-[0_0_5px_rgba(0,255,204,0.3)] focus:outline-none transition-all duration-300 active:scale-95"
  >
    <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
    </svg>
  </button>

  {/* ২. মোবাইল ড্রপডাউন প্যানেল (যা স্ক্রিনের পুরো উইডথ জুড়ে নিচে ঝুলবে) */}
  {isOpen && (
    <div className="absolute top-full left-0 w-full bg-[#030712]/95 backdrop-blur-lg border-b border-[#00ffcc]/10 px-6 py-6 animate__animated animate__fadeIn shadow-[0_10px_30px_rgba(0,0,0,0.6)] z-50">
      <ul className="flex flex-col gap-5 text-center font-mono text-xs font-bold uppercase tracking-widest">
        <li onClick={() => setIsOpen(false)}>
          <Link href="/" className={pathname === "/" ? "text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]" : "text-gray-400 hover:text-white"}>
            Home
          </Link>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <Link href="/cars" className={pathname === "/cars" ? "text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]" : "text-gray-400 hover:text-white"}>
            Explore Cars
          </Link>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <Link href="/add-car" className={pathname === "/add-car" ? "text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]" : "text-gray-400 hover:text-white"}>
            Add Car
          </Link>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <Link href="/my-bookings" className={pathname === "/my-bookings" ? "text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]" : "text-gray-400 hover:text-white"}>
            My Bookings
          </Link>
        </li>
        <li onClick={() => setIsOpen(false)}>
          <Link href="/my-add-cars" className={pathname === "/my-add-cars" ? "text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]" : "text-gray-400 hover:text-white"}>
            My Add Cars
          </Link>
        </li>

        {/* AUTH INTERFACE FOR MOBILE */}
        <div className="flex flex-col gap-3 pt-4 border-t border-white/5 mx-auto w-full max-w-[260px] items-center">
          {!isPending && !session && (
            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
              <button className="w-full rounded-xl border border-[#00ffcc]/30 bg-[#00ffcc]/5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#00ffcc] hover:bg-[#00ffcc]/10 transition-all font-mono">
                Login / Register
              </button>
            </Link>
          )}

          {session && (
            <div className="flex flex-col items-center gap-3 w-full">
              {/* User identity box */}
              <div className="flex items-center gap-3 bg-[#090d16]/80 border border-white/5 rounded-xl p-2.5 w-full justify-center">
                <div className="relative shrink-0">
                  <img
                    src={session?.user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="User"
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full object-cover border border-[#00ffcc]/40"
                  />
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#00ffcc] ring-2 ring-[#090d16]" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[10px] font-black uppercase text-white truncate font-mono">
                    {session?.user?.name}
                  </p>
                  <p className="text-[9px] text-gray-500 truncate font-mono">
                    {session?.user?.email}
                  </p>
                </div>
              </div>

              {/* Terminate button */}
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-center block rounded-xl bg-rose-500/10 border border-rose-500/20 py-2.5 text-xs font-bold uppercase tracking-wider text-rose-400 font-mono active:scale-[0.98] transition-all"
              >
              Logout
              </button>
            </div>
          )}
        </div>
      </ul>
    </div>
  )}
</div>





      </div>

      {/* 📱 MOBILE NAV MENU */}

      {/* 📱 MOBILE MENU TRIGGER & PANEL */}

      












      
    </nav>
    </div>
  );
};

export default Navber;




// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { authClient } from "@/lib/auth-client"; 
// import { toast } from 'react-hot-toast';

// const Navbar =()=> {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

 
//   const { data: session, isPending } = authClient.useSession();
  
//   const isLoggedIn = !!session; 
//   const user = session?.user;

//   // Better Auth 
//   const handleLogout = async () => {
//     try {
//       await authClient.signOut({
//         fetchOptions: {
//           onSuccess: () => {
//             setShowDropdown(false);
//             setIsOpen(false);
//             toast.success("LOGOUT SUCCESSFUL!", {
//               style: {
//                 border: '1px solid #f43f5e',
//                 padding: '16px',
//                 color: '#fff',
//                 background: '#090d16',
//                 fontFamily: 'monospace',
//                 fontSize: '12px'
//               },
//             });
//             router.push('/login');
//           }
//         }
//       });
//     } catch (error) {
//       toast.error("Logout failed protocol.");
//     }
//   };

//   const isActive = (path) => pathname === path;

 
//   const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

//   return (
//     <nav className="sticky top-0 z-50 border-b border-[#00ffcc]/10 bg-[#030712]/80 backdrop-blur-md px-4 py-3 md:px-8">
//       <div className="mx-auto flex max-w-7xl items-center justify-between">
        
//         {/* 🏎️ LOGO SECTION */}
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-xl font-black uppercase tracking-wider text-white">
//             Drive<span className="text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]">Fleet</span>
//           </span>
//         </Link>

//         {/* 🌐 DESKTOP NAV ITEMS */}
//         <div className="hidden items-center space-x-6 md:flex">
//           <Link
//             href="/"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Home
//           </Link>
          
//           <Link
//             href="/cars"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/cars') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Explore Cars
//           </Link>

//           <Link
//             href="/add-car"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/add-car') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Add Car
//           </Link>
          
//           <Link
//             href="/my-bookings"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/my-bookings') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             My Bookings
//           </Link>

//           <Link
//             href="/my-add-cars"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/my-add-cars') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             My Add Cars
//           </Link>
//         </div>

//         {/* 🔒 RIGHT SIDE: AUTH BUTTON / PROFILE DROPDOWN */}
//         <div className="hidden items-center space-x-4 md:flex">
//           {isPending ? (
//             <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00ffcc] border-t-transparent"></div>
//           ) : isLoggedIn ? (
//             <div className="relative">
//               {/* Profile Trigger Button */}
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 p-0.5 focus:outline-none"
//               >
                // <img
                //   src={user?.image || defaultAvatar}
                //   alt={user?.name || "User"}
                //   referrerPolicy="no-referrer" // 👈 গুগলের ইমেজ ব্লকিং ইস্যু দূর করার জন্য এটি যুক্ত করা হয়েছে
                //   className="h-8 w-8 rounded-full object-cover border border-[#00ffcc]/40"
                // />
//               </button>

//               {/* USER PROFILE DROPDOWN */}
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#090d16] p-2 shadow-2xl z-50">
//                   <div className="border-b border-white/5 px-3 py-2">
//                     <p className="text-xs font-bold text-white truncate">{user?.name}</p>
//                     <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
//                   </div>
                  
//                   <div className="mt-1 space-y-0.5">
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left block rounded-lg px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               className="rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/5 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00ffcc] hover:bg-[#00ffcc]/20 transition-all duration-300"
//             >
//               Login / Register
//             </Link>
//           )}
//         </div>

//         {/* 📱 MOBILE MENU TRIGGER */}
//         <div className="flex items-center md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-400 hover:text-[#00ffcc] focus:outline-none"
//           >
//             <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
//               {isOpen ? (
//                 <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.83-4.828 4.83a1 1 0 01-1.414-1.414l4.829-4.83-4.829-4.83a1 1 0 011.414-1.414l4.828 4.83 4.829-4.83a1 1 0 111.414 1.414l-4.83 4.83 4.83 4.83z" />
//               ) : (
//                 <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* 📱 MOBILE NAV MENU */}
//       {isOpen && (
//         <div className="mt-3 space-y-1 border-t border-white/5 pt-3 md:hidden">
//           <Link
//             href="/"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Home
//           </Link>
          
//           <Link
//             href="/cars"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/cars') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Explore Cars
//           </Link>

//           <Link
//             href="/add-car"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/add-car') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Add Car
//           </Link>
          
//           <Link
//             href="/my-bookings"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/my-bookings') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             My Bookings
//           </Link>

//           <Link
//             href="/my-add-cars"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/my-add-cars') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             My ADD cars
//           </Link>

//           {/* Mobile Auth Button State */}
//           <div className="border-t border-white/5 pt-2 mt-2">
//             {isLoggedIn ? (
//               <div className="flex flex-col space-y-2 px-3 py-1">
//                 <div className="flex items-center space-x-2 pb-2">
//                   <img 
//                     src={user?.image || defaultAvatar} 
//                     referrerPolicy="no-referrer" // 👈 মোবাইলের জন্যেও সেম পলিসি ফিক্স
//                     className="h-6 w-6 rounded-full object-cover" 
//                     alt="" 
//                   />
//                   <span className="text-xs font-bold text-white truncate">{user?.name}</span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left block rounded-lg py-2 text-xs font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-500/10"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 href="/login"
//                 onClick={() => setIsOpen(false)}
//                 className="block w-full text-center rounded-xl bg-[#00ffcc] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black"
//               >
//                 Login / Register
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }























// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { authClient } from "@/lib/auth-client"; 
// import { toast } from 'react-hot-toast';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Better Auth সেশন হুক
//   const { data: session, isPending } = authClient.useSession();
  
//   const isLoggedIn = !!session; 
//   const user = session?.user;

//   // Better Auth লগআউট হ্যান্ডলার
//   const handleLogout = async () => {
//     try {
//       await authClient.signOut({
//         fetchOptions: {
//           onSuccess: () => {
//             setShowDropdown(false);
//             setIsOpen(false);
//             toast.success("SESSION TERMINATED. BYE!", {
//               style: {
//                 border: '1px solid #f43f5e',
//                 padding: '16px',
//                 color: '#fff',
//                 background: '#090d16',
//                 fontFamily: 'monospace',
//                 fontSize: '12px'
//               },
//             });
//             router.push('/login');
//           }
//         }
//       });
//     } catch (error) {
//       toast.error("Logout failed protocol.");
//     }
//   };

//   const isActive = (path) => pathname === path;

//   // ডিফল্ট প্রোফাইল অবতার
//   const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

//   return (
//     <nav className="sticky top-0 z-50 border-b border-[#00ffcc]/10 bg-[#030712]/80 backdrop-blur-md px-4 py-3 md:px-8">
//       <div className="mx-auto flex max-w-7xl items-center justify-between">
        
//         {/* 🏎️ LOGO SECTION */}
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-xl font-black uppercase tracking-wider text-white">
//             Drive<span className="text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]">Fleet</span>
//           </span>
//         </Link>

//         {/* 🌐 DESKTOP NAV ITEMS (সব মেনু এখন ওপেন) */}
//         <div className="hidden items-center space-x-6 md:flex">
//           <Link
//             href="/"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Home
//           </Link>
          
//           <Link
//             href="/cars"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/cars') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Explore Cars
//           </Link>

//           <Link
//             href="/add-car"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/add-car') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Add Car
//           </Link>
          
//           <Link
//             href="/my-bookings"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/my-bookings') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             My Bookings
//           </Link>
//         </div>

//         {/* 🔒 RIGHT SIDE: AUTH BUTTON / PROFILE DROPDOWN */}
//         <div className="hidden items-center space-x-4 md:flex">
//           {isPending ? (
//             <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00ffcc] border-t-transparent"></div>
//           ) : isLoggedIn ? (
//             <div className="relative">
//               {/* Profile Trigger Button */}
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 p-0.5 focus:outline-none"
//               >
//                 <img
//                   src={user?.image || defaultAvatar}
//                   alt={user?.name || "User"}
//                   className="h-8 w-8 rounded-full object-cover border border-[#00ffcc]/40"
//                 />
//               </button>

//               {/* USER PROFILE DROPDOWN */}
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#090d16] p-2 shadow-2xl z-50">
//                   <div className="border-b border-white/5 px-3 py-2">
//                     <p className="text-xs font-bold text-white truncate">{user?.name}</p>
//                     <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
//                   </div>
                  
//                   <div className="mt-1 space-y-0.5">
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left block rounded-lg px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               className="rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/5 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00ffcc] hover:bg-[#00ffcc]/20 transition-all duration-300"
//             >
//               Login / Register
//             </Link>
//           )}
//         </div>

//         {/* 📱 MOBILE MENU TRIGGER */}
//         <div className="flex items-center md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-400 hover:text-[#00ffcc] focus:outline-none"
//           >
//             <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
//               {isOpen ? (
//                 <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.83-4.828 4.83a1 1 0 01-1.414-1.414l4.829-4.83-4.829-4.83a1 1 0 011.414-1.414l4.828 4.83 4.829-4.83a1 1 0 111.414 1.414l-4.83 4.83 4.83 4.83z" />
//               ) : (
//                 <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* 📱 MOBILE NAV MENU (মোবাইলেও সব মেনু ওপেন) */}
//       {isOpen && (
//         <div className="mt-3 space-y-1 border-t border-white/5 pt-3 md:hidden">
//           <Link
//             href="/"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Home
//           </Link>
          
//           <Link
//             href="/cars"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/cars') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Explore Cars
//           </Link>

//           <Link
//             href="/add-car"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/add-car') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Add Car
//           </Link>
          
//           <Link
//             href="/my-bookings"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/my-bookings') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             My Bookings
//           </Link>

//           {/* Mobile Auth Button State */}
//           <div className="border-t border-white/5 pt-2 mt-2">
//             {isLoggedIn ? (
//               <div className="flex flex-col space-y-2 px-3 py-1">
//                 <div className="flex items-center space-x-2 pb-2">
//                   <img src={user?.image || defaultAvatar} className="h-6 w-6 rounded-full" alt="" />
//                   <span className="text-xs font-bold text-white truncate">{user?.name}</span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left block rounded-lg py-2 text-xs font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-500/10"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 href="/login"
//                 onClick={() => setIsOpen(false)}
//                 className="block w-full text-center rounded-xl bg-[#00ffcc] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black"
//               >
//                 Login / Register
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


































// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { authClient } from "@/lib/auth-client"; // 🚀 ১. Better Auth ক্লায়েন্ট ইম্পোর্ট
// import { toast } from 'react-hot-toast';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   // 🚀 ২. Better Auth সেশন হুক (এটি রিয়েল-টাইমে লগইন স্টেট ট্র্যাক করে)
//   const { data: session, isPending } = authClient.useSession();
  
//   // ইউজার লগইন আছে কিনা তা ডিফাইন করা
//   const isLoggedIn = !!session; 
//   const user = session?.user;

//   // 🚪 Better Auth লগআউট হ্যান্ডলার
//   const handleLogout = async () => {
//     try {
//       await authClient.signOut({
//         fetchOptions: {
//           onSuccess: () => {
//             setShowDropdown(false);
//             setIsOpen(false);
//             toast.success("SESSION TERMINATED. BYE!", {
//               style: {
//                 border: '1px solid #f43f5e',
//                 padding: '16px',
//                 color: '#fff',
//                 background: '#090d16',
//                 fontFamily: 'monospace',
//                 fontSize: '12px'
//               },
//             });
//             router.push('/login'); // লগআউট শেষে লগইন পেজে পুশ
//           }
//         }
//       });
//     } catch (error) {
//       toast.error("Logout failed protocol.");
//     }
//   };

//   const isActive = (path) => pathname === path;

//   // 👤 যদি ইউজারের নিজস্ব ইমেজ না থাকে, তবে এই ডিফল্ট অবতারটি শো করবে
//   const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

//   return (
//     <nav className="sticky top-0 z-50 border-b border-[#00ffcc]/10 bg-[#030712]/80 backdrop-blur-md px-4 py-3 md:px-8">
//       <div className="mx-auto flex max-w-7xl items-center justify-between">
        
//         {/* 🏎️ LOGO SECTION */}
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-xl font-black uppercase tracking-wider text-white">
//             Drive<span className="text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]">Fleet</span>
//           </span>
//         </Link>

//         {/* 🌐 DESKTOP NAV ITEMS */}
//         <div className="hidden items-center space-x-6 md:flex">
//           <Link
//             href="/"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Home
//           </Link>
          
//           <Link
//             href="/cars"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/cars') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Explore Cars
//           </Link>

//           {/* 🔒 কন্ডিশনাল রেন্ডারিং: ইউজার লগইন থাকলে এই অপশনগুলো দেখাবে */}
//           {isLoggedIn && (
//             <>
//               <Link
//                 href="/add-car"
//                 className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//                   isActive('/add-car') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 Add Car
//               </Link>
              
//               <Link
//                 href="/my-bookings"
//                 className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//                   isActive('/my-bookings') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 My Bookings
//               </Link>
//             </>
//           )}
//         </div>

//         {/* 🔒 RIGHT SIDE: AUTH BUTTON / PROFILE DROPDOWN */}
//         <div className="hidden items-center space-x-4 md:flex">
//           {isPending ? (
//             <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00ffcc] border-t-transparent"></div>
//           ) : isLoggedIn ? (
//             <div className="relative">
//               {/* Profile Trigger Button */}
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 p-0.5 focus:outline-none"
//               >
//                 {/* 🌟 কন্ডিশনাল ইমেজ হ্যান্ডলার: গুগল ওঅথ-এর ইমেজ অথবা ডিফল্ট অবতার */}
//                 <img
//                   src={user?.image || defaultAvatar}
//                   alt={user?.name || "User"}
//                   className="h-8 w-8 rounded-full object-cover border border-[#00ffcc]/40"
//                 />
//               </button>

//               {/* USER PROFILE DROPDOWN */}
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#090d16] p-2 shadow-2xl z-50">
//                   <div className="border-b border-white/5 px-3 py-2">
//                     <p className="text-xs font-bold text-white truncate">{user?.name}</p>
//                     <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
//                   </div>
                  
//                   <div className="mt-1 space-y-0.5">
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left block rounded-lg px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               className="rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/5 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00ffcc] hover:bg-[#00ffcc]/20 transition-all duration-300"
//             >
//               Login / Register
//             </Link>
//           )}
//         </div>

//         {/* 📱 MOBILE MENU TRIGGER */}
//         <div className="flex items-center md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-400 hover:text-[#00ffcc] focus:outline-none"
//           >
//             <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
//               {isOpen ? (
//                 <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.83-4.828 4.83a1 1 0 01-1.414-1.414l4.829-4.83-4.829-4.83a1 1 0 011.414-1.414l4.828 4.83 4.829-4.83a1 1 0 111.414 1.414l-4.83 4.83 4.83 4.83z" />
//               ) : (
//                 <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* 📱 MOBILE NAV MENU */}
//       {isOpen && (
//         <div className="mt-3 space-y-1 border-t border-white/5 pt-3 md:hidden">
//           <Link
//             href="/"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Home
//           </Link>
          
//           <Link
//             href="/cars"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/cars') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Explore Cars
//           </Link>

//           {isLoggedIn && (
//             <>
//               <Link
//                 href="/add-car"
//                 onClick={() => setIsOpen(false)}
//                 className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//                   isActive('/add-car') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//                 }`}
//               >
//                 Add Car
//               </Link>
              
//               <Link
//                 href="/my-bookings"
//                 onClick={() => setIsOpen(false)}
//                 className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//                   isActive('/my-bookings') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//                 }`}
//               >
//                 My Bookings
//               </Link>
//             </>
//           )}

//           {/* Mobile Auth Button State */}
//           <div className="border-t border-white/5 pt-2 mt-2">
//             {isLoggedIn ? (
//               <div className="flex flex-col space-y-2 px-3 py-1">
//                 {/* মোবাইল স্ক্রিনে ইউজারের শর্ট প্রোফাইল ইনফো */}
//                 <div className="flex items-center space-x-2 pb-2">
//                   <img src={user?.image || defaultAvatar} className="h-6 w-6 rounded-full" alt="" />
//                   <span className="text-xs font-bold text-white truncate">{user?.name}</span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left block rounded-lg py-2 text-xs font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-500/10"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 href="/login"
//                 onClick={() => setIsOpen(false)}
//                 className="block w-full text-center rounded-xl bg-[#00ffcc] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black"
//               >
//                 Login / Register
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }



















// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const pathname = usePathname();

//   // 💡 মক ইউজার অথেনটিকেশন স্টেট
//   const [isLoggedIn, setIsLoggedIn] = useState(true); 
//   const [user, setUser] = useState({
//     name: 'Farhad Ahmed',
//     email: 'fa99.official@gmail.com',
//     photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
//   });

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowDropdown(false);
//   };

//   const isActive = (path) => pathname === path;

//   return (
//     <nav className="sticky top-0 z-50 border-b border-[#00ffcc]/10 bg-[#030712]/80 backdrop-blur-md px-4 py-3 md:px-8">
//       <div className="mx-auto flex max-w-7xl items-center justify-between">
        
//         {/* 🏎️ LOGO SECTION */}
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-xl font-black uppercase tracking-wider text-white">
//             Drive<span className="text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]">Fleet</span>
//           </span>
//         </Link>

//         {/* 🌐 DESKTOP NAV ITEMS (ALWAYS VISIBLE NOW) */}
//         <div className="hidden items-center space-x-6 md:flex">
//           <Link
//             href="/"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Home
//           </Link>
          
//           <Link
//             href="/cars"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/cars') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Explore Cars
//           </Link>

//           <Link
//             href="/add-car"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/add-car') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Add Car
//           </Link>
          
//           <Link
//             href="/my-bookings"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/my-bookings') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             My Bookings
//           </Link>

        
//         </div>

//         {/* 🔒 RIGHT SIDE: AUTH BUTTON / PROFILE DROPDOWN */}
//         <div className="hidden items-center space-x-4 md:flex">
//           {isLoggedIn ? (
//             <div className="relative">
//               {/* Profile Trigger Button */}
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 p-0.5 focus:outline-none"
//               >
//                 <img
//                   src={user.photo}
//                   alt={user.name}
//                   className="h-8 w-8 rounded-full object-cover border border-[#00ffcc]/40"
//                 />
//               </button>

//               {/* USER PROFILE DROPDOWN */}
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#090d16] p-2 shadow-2xl backdrop-blur-xl-none z-50">
//                   <div className="border-b border-white/5 px-3 py-2">
//                     <p className="text-xs font-bold text-white truncate">{user.name}</p>
//                     <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
//                   </div>
                  
//                   <div className="mt-1 space-y-0.5">
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left block rounded-lg px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               className="rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/5 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00ffcc] hover:bg-[#00ffcc]/20 transition-all duration-300"
//             >
//               Login / Register
//             </Link>
//           )}
//         </div>

//         {/* 📱 MOBILE MENU TRIGGER */}
//         <div className="flex items-center md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-400 hover:text-[#00ffcc] focus:outline-none"
//           >
//             <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
//               {isOpen ? (
//                 <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.83-4.828 4.83a1 1 0 01-1.414-1.414l4.829-4.83-4.829-4.83a1 1 0 011.414-1.414l4.828 4.83 4.829-4.83a1 1 0 111.414 1.414l-4.83 4.83 4.83 4.83z" />
//               ) : (
//                 <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* 📱 MOBILE NAV MENU */}
//       {isOpen && (
//         <div className="mt-3 space-y-1 border-t border-white/5 pt-3 md:hidden">
//           <Link
//             href="/"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Home
//           </Link>
          
//           <Link
//             href="/cars"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/cars') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Explore Cars
//           </Link>

//           <Link
//             href="/add-car"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/add-car') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Add Car
//           </Link>
          
//           <Link
//             href="/my-bookings"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/my-bookings') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             My Bookings
//           </Link>

         

//           {/* Mobile Auth Button State */}
//           <div className="border-t border-white/5 pt-2 mt-2">
//             {isLoggedIn ? (
//               <button
//                 onClick={() => { handleLogout(); setIsOpen(false); }}
//                 className="w-full text-left block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-500/10"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 href="/login"
//                 onClick={() => setIsOpen(false)}
//                 className="block w-full text-center rounded-xl bg-[#00ffcc] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black"
//               >
//                 Login / Register
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }









































// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const pathname = usePathname();

//   // 💡 মক ইউজার অথেনটিকেশন স্টেট (পরবর্তীতে আপনার Auth Context বা JWT এর সাথে কানেক্ট করবেন)
//   // টেস্ট করার জন্য এটিকে true বা false করে দেখতে পারেন
//   const [isLoggedIn, setIsLoggedIn] = useState(true); 
//   const [user, setUser] = useState({
//     name: 'Farhad Ahmed',
//     email: 'fa99.official@gmail.com',
//     photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
//   });

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowDropdown(false);
//   };

//   const isActive = (path) => pathname === path;

//   return (
//     <nav className="sticky top-0 z-50 border-b border-[#00ffcc]/10 bg-[#030712]/80 backdrop-blur-md px-4 py-3 md:px-8">
//       <div className="mx-auto flex max-w-7xl items-center justify-between">
        
//         {/* LOGO SECTION */}
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-xl font-black uppercase tracking-wider text-white">
//             Drive<span className="text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]">Fleet</span>
//           </span>
//         </Link>

//         {/* DESKTOP NAV ITEMS (CONDITIONAL RENDERING) */}
//         <div className="hidden items-center space-x-6 md:flex">
//           <Link
//             href="/"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Home
//           </Link>
          
//           <Link
//             href="/cars"
//             className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//               isActive('/cars') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             Explore Cars
//           </Link>

//           {/* 🔒 যদি ইউজার লগইন থাকে তবে এই মেনুগুলো সরাসরি নববারে শো করবে */}
//           {isLoggedIn && (
//             <>
//               <Link
//                 href="/add-car"
//                 className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//                   isActive('/add-car') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 Add Car
//               </Link>
              
//               <Link
//                 href="/my-bookings"
//                 className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//                   isActive('/my-bookings') ? 'text-[#00ffcc]' : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 My Bookings
//               </Link>
//             </>
//           )}
//         </div>

//         {/* RIGHT SIDE: AUTH BUTTON / PROFILE DROPDOWN */}
//         <div className="hidden items-center space-x-4 md:flex">
//           {isLoggedIn ? (
//             <div className="relative">
//               {/* Profile Trigger Button */}
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 p-0.5 focus:outline-none"
//               >
//                 <img
//                   src={user.photo}
//                   alt={user.name}
//                   className="h-8 w-8 rounded-full object-cover border border-[#00ffcc]/40"
//                 />
//               </button>

//               {/* USER PROFILE DROPDOWN */}
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#090d16] p-2 shadow-2xl backdrop-blur-xl">
//                   <div className="border-b border-white/5 px-3 py-2">
//                     <p className="text-xs font-bold text-white truncate">{user.name}</p>
//                     <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
//                   </div>
                  
//                   <div className="mt-1 space-y-0.5">
//                     <Link
//                       href="/add-car"
//                       onClick={() => setShowDropdown(false)}
//                       className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-[#00ffcc]"
//                     >
//                       Add Car
//                     </Link>
//                     <Link
//                       href="/my-bookings"
//                       onClick={() => setShowDropdown(false)}
//                       className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-[#00ffcc]"
//                     >
//                       My Bookings
//                     </Link>
//                     <Link
//                       href="/my-added-cars"
//                       onClick={() => setShowDropdown(false)}
//                       className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-[#00ffcc]"
//                     >
//                       My Added Cars
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left block rounded-lg px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               className="rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/5 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00ffcc] hover:bg-[#00ffcc]/20 transition-all duration-300"
//             >
//               Login / Register
//             </Link>
//           )}
//         </div>

//         {/* MOBILE MENU TRIGGER */}
//         <div className="flex items-center md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-400 hover:text-[#00ffcc] focus:outline-none"
//           >
//             <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
//               {isOpen ? (
//                 <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.83-4.828 4.83a1 1 0 01-1.414-1.414l4.829-4.83-4.829-4.83a1 1 0 011.414-1.414l4.828 4.83 4.829-4.83a1 1 0 111.414 1.414l-4.83 4.83 4.83 4.83z" />
//               ) : (
//                 <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* MOBILE NAV MENU */}
//       {isOpen && (
//         <div className="mt-3 space-y-2 border-t border-white/5 pt-3 md:hidden">
//           <Link
//             href="/"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Home
//           </Link>
          
//           <Link
//             href="/cars"
//             onClick={() => setIsOpen(false)}
//             className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//               isActive('/cars') ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'text-gray-400 hover:bg-white/5'
//             }`}
//           >
//             Explore Cars
//           </Link>

//           {isLoggedIn ? (
//             <div className="border-t border-white/5 pt-2 mt-2 space-y-1">
//               <Link
//                 href="/add-car"
//                 onClick={() => setIsOpen(false)}
//                 className={`block rounded-lg px-3 py-2 text-xs font-medium ${
//                   isActive('/add-car') ? 'text-[#00ffcc] bg-white/5' : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 Add Car
//               </Link>
//               <Link
//                 href="/my-bookings"
//                 onClick={() => setIsOpen(false)}
//                 className={`block rounded-lg px-3 py-2 text-xs font-medium ${
//                   isActive('/my-bookings') ? 'text-[#00ffcc] bg-white/5' : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 My Bookings
//               </Link>
//               <Link
//                 href="/my-added-cars"
//                 onClick={() => setIsOpen(false)}
//                 className={`block rounded-lg px-3 py-2 text-xs font-medium ${
//                   isActive('/my-added-cars') ? 'text-[#00ffcc] bg-white/5' : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 My Added Cars
//               </Link>
//               <button
//                 onClick={() => { handleLogout(); setIsOpen(false); }}
//                 className="w-full text-left block rounded-lg px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               onClick={() => setIsOpen(false)}
//               className="mt-4 block w-full text-center rounded-lg bg-[#00ffcc] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all"
//             >
//               Login / Register
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }








// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const pathname = usePathname();

//   // 💡 মক ইউজার স্টেট (পরবর্তীতে আপনার Auth Context/JWT এর সাথে কানেক্ট করবেন)
//   // লগইন টেস্ট করার জন্য এটিকে true অথবা false করে চেক করতে পারেন
//   const [isLoggedIn, setIsLoggedIn] = useState(true); 
//   const [user, setUser] = useState({
//     name: 'Farhad Ahmed',
//     email: 'fa99.official@gmail.com',
//     photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
//   });

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowDropdown(false);
//     // আপনার লগআউট লজিক এখানে লিখবেন
//   };

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Explore Cars', path: '/cars' },
//   ];

//   const isActive = (path) => pathname === path;

//   return (
//     <nav className="sticky top-0 z-50 border-b border-[#00ffcc]/10 bg-[#030712]/80 backdrop-blur-md px-4 py-3 md:px-8">
//       <div className="mx-auto flex max-w-7xl items-center justify-between">
        
//         {/* LOGO SECTION */}
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-xl font-black uppercase tracking-wider text-white">
//             Drive<span className="text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]">Fleet</span>
//           </span>
//         </Link>

//         {/* DESKTOP NAV LINKS */}
//         <div className="hidden items-center space-x-6 md:flex">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               href={link.path}
//               className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
//                 isActive(link.path)
//                   ? 'text-[#00ffcc]'
//                   : 'text-gray-400 hover:text-white'
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         {/* AUTHENTICATION / PROFILE SECTION */}
//         <div className="hidden items-center space-x-4 md:flex">
//           {isLoggedIn ? (
//             <div className="relative">
//               {/* Profile Trigger Button */}
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center space-x-2 rounded-full border border-[#00ffcc]/20 p-0.5 focus:outline-none"
//               >
//                 <img
//                   src={user.photo}
//                   alt={user.name}
//                   className="h-8 w-8 rounded-full object-cover border border-[#00ffcc]/40"
//                 />
//               </button>

//               {/* USER DROPDOWN MENU */}
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#090d16] p-2 shadow-2xl backdrop-blur-xl">
//                   <div className="border-b border-white/5 px-3 py-2">
//                     <p className="text-xs font-bold text-white truncate">{user.name}</p>
//                     <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
//                   </div>
                  
//                   <div className="mt-1 space-y-0.5">
//                     <Link
//                       href="/add-car"
//                       onClick={() => setShowDropdown(false)}
//                       className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-[#00ffcc]"
//                     >
//                       Add Car
//                     </Link>
//                     <Link
//                       href="/my-bookings"
//                       onClick={() => setShowDropdown(false)}
//                       className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-[#00ffcc]"
//                     >
//                       My Bookings
//                     </Link>
//                     <Link
//                       href="/my-added-cars"
//                       onClick={() => setShowDropdown(false)}
//                       className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-[#00ffcc]"
//                     >
//                       My Added Cars
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left block rounded-lg px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               className="rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/5 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00ffcc] hover:bg-[#00ffcc]/20 transition-all duration-300"
//             >
//               Login
//             </Link>
//           )}
//         </div>

//         {/* MOBILE MENU TRIGGER BUTTON */}
//         <div className="flex items-center md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-400 hover:text-[#00ffcc] focus:outline-none"
//           >
//             <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
//               {isOpen ? (
//                 <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.83-4.828 4.83a1 1 0 01-1.414-1.414l4.829-4.83-4.829-4.83a1 1 0 011.414-1.414l4.828 4.83 4.829-4.83a1 1 0 111.414 1.414l-4.83 4.83 4.83 4.83z" />
//               ) : (
//                 <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* MOBILE RESPONSIVE NAV MENU */}
//       {isOpen && (
//         <div className="mt-3 space-y-2 border-t border-white/5 pt-3 md:hidden">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               href={link.path}
//               onClick={() => setIsOpen(false)}
//               className={`block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest ${
//                 isActive(link.path)
//                   ? 'bg-[#00ffcc]/10 text-[#00ffcc]'
//                   : 'text-gray-400 hover:bg-white/5 hover:text-white'
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* Conditional links for mobile view */}
//           {isLoggedIn ? (
//             <div className="border-t border-white/5 pt-2 mt-2 space-y-1">
//               <div className="px-3 py-1 text-xs text-gray-500 font-mono">Dashboard</div>
//               <Link
//                 href="/add-car"
//                 onClick={() => setIsOpen(false)}
//                 className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-[#00ffcc]"
//               >
//                 Add Car
//               </Link>
//               <Link
//                 href="/my-bookings"
//                 onClick={() => setIsOpen(false)}
//                 className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-[#00ffcc]"
//               >
//                 My Bookings
//               </Link>
//               <Link
//                 href="/my-added-cars"
//                 onClick={() => setIsOpen(false)}
//                 className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-[#00ffcc]"
//               >
//                 My Added Cars
//               </Link>
//               <button
//                 onClick={() => { handleLogout(); setIsOpen(false); }}
//                 className="w-full text-left block rounded-lg px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               onClick={() => setIsOpen(false)}
//               className="mt-4 block w-full text-center rounded-lg bg-[#00ffcc] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }