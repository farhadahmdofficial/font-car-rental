'use client';

import Link from 'next/link';


import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#090d16] border-t border-white/5 py-12 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* COLUMN 1: BRAND & CONTACT INFORMATION */}
        <div className="space-y-4">
          <h3 className="text-white font-black uppercase tracking-wider text-lg">
            Rent <span className="text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]">Ride</span>
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            Premium car rental architecture. Engineered to deliver top-tier fleet accessibility and seamless secure booking experiences.
          </p>
          {/* Contact Information Section */}
          <div className="space-y-1.5 pt-2">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-widest text-gray-400">Contact Info</h4>
            <p className="text-xs text-gray-400 flex items-center">
              <span className="text-[#00ffcc] mr-2">📍</span> Sylhet, Bangladesh
            </p>
            <p className="text-xs text-gray-400 flex items-center">
              <span className="text-[#00ffcc] mr-2">✉</span> fa99.official@gmail.com
            </p>
          </div>
        </div>

        {/* COLUMN 2: USEFUL LINKS */}
        <div className="space-y-4 md:pl-12">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Useful Links</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="text-gray-400 ">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cars" className="text-gray-400 ">
                Explore Cars
              </Link>
            </li>
            <li>
              <Link href="/add-car" className="text-gray-400 ">
                Add Car
              </Link>
            </li>
            <li>
              <Link href="/my-bookings" className="text-gray-400 ">
                My Bookings
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 3: SOCIAL ICONS */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Connect with Us</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Follow our dynamic tech development cycles and fleet optimization matrices.
          </p>
          
          {/* Social Icons Section */}
          <div className="flex space-x-4 pt-2">
            {/* 𝕏 - Latest Rebranded Logo */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm font-black font-mono text-white  "
              title="Follow on 𝕏"
            >
              𝕏
            </a>
            
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-white "
              title="Follow on Facebook"
            >
              FB
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/farhadahmdofficial" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-white "
              title="Follow on GitHub"
            >
              GIT
            </a>
          </div>
        </div>

      </div>

      {/* SYSTEM SYSTEM LOCKOUT FOOTNOTE */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-10 pt-6 text-center">
        <p className="text-[10px] text-gray-500 font-mono tracking-wider">
          &copy; {new Date().getFullYear()}RentRide  OPERATIONS. ALL PROTOCOLS TERMINATED SAFELY.
        </p>
      </div>
    </footer>
    </div>
  );
};

export default Footer;












