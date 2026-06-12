

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

                




      
             
          
{/* 📱 MOBILE MENU TRIGGER & PANEL */}
<div className="md:hidden flex items-center">
  

  <button
    onClick={() => setIsOpen(!isOpen)}
    className="p-1.5 rounded-lg bg-[#090d16] border border-[#00ffcc]/20 text-[#00ffcc] drop-shadow-[0_0_5px_rgba(0,255,204,0.3)] focus:outline-none transition-all duration-300 active:scale-95"
  >
    <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
    </svg>
  </button>

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



      












      
    </nav>
    </div>
  );
};

export default Navber;




