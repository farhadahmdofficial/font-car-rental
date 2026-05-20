

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from "@/lib/auth-client"; // ডুপ্লিকেট ইম্পোর্ট রিমুভ করা হয়েছে
import { toast } from 'react-hot-toast';

// ⚠️ ফাংশন থেকে 'async' বাদ দেওয়া হয়েছে কারণ এটি একটি Client Component
export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔑 ১. Better Auth ইমেইল/পাসওয়ার্ড লগইন হ্যান্ডলার
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Credentials grid incomplete. Check inputs.");
      setLoading(false);
      return;
    }

    // 🚀 Better Auth Sign-In Protocol
    await authClient.signIn.email({
      email: email,
      password: password,
    }, {
      onRequest: () => {
        setLoading(true);
      },
      // ✅ সফলভাবে লগইন হলে
      onSuccess: (ctx) => {
        setLoading(false);
        
        // 🌟 সাকসেস টোস্ট মেসেজ
        toast.success('LOGIN SUCCESSFUL!.', {
          style: {
            border: '1px solid #00ffcc',
            padding: '16px',
            color: '#fff',
            background: '#090d16',
            fontFamily: 'monospace',
            fontSize: '12px'
          },
          iconTheme: {
            primary: '#00ffcc',
            secondary: '#090d16',
          },
        });

        // সফল হলে হোম পেজে রিডাইরেক্ট
        router.push('/');
      },
      // ❌ লগইন ফেইল হলে
      onError: (ctx) => {
        setLoading(false);
        const errorMsg = ctx.error.message || 'Invalid credentials matrix.';
        
        // 🌟 এরর টোস্ট মেসেজ
        toast.error(errorMsg, {
          style: {
            border: '1px solid #f43f5e',
            padding: '16px',
            color: '#fff',
            background: '#090d16',
            fontFamily: 'monospace',
            fontSize: '12px'
          },
        });

        setError(errorMsg);
      }
    });
  };

  // 🌐 ২. Better Auth গুগল লগইন হ্যান্ডলার
  const handleGoogleLogin = async () => {
    setError('');
    
    try {
      // ওঅথ লুপ শুরু হওয়ার জন্য একটি স্টার্টিং টোস্ট
      toast.loading('Initializing Google OAuth Loop...', {
        style: {
          border: '1px solid #00ffcc',
          padding: '12px',
          color: '#fff',
          background: '#090d16',
          fontFamily: 'monospace',
          fontSize: '12px'
        }
      });

      // 🚀 Better Auth Social Sign-In (Google OAuth)
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/" 
      });

    } catch (err) {
      toast.dismiss(); // লোডিং টোস্ট বন্ধ করার জন্য
      toast.error('Google Authentication aborted.');
      setError('Google Authentication aborted or token validation failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 py-12 flex items-center justify-center relative overflow-hidden">
      
      {/* 🔮 Background Cyan Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#090d16]/60 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative z-10 space-y-6 shadow-2xl">
        
        {/* 📑 LOGIN TITLE */}
        <div className="text-center space-y-1.5">
          <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-0.5">
            Security Gateway
          </div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            User <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Login Portal</span>
          </h1>
          <p className="text-xs text-gray-400">
            Sync your encrypted core tokens to access the fleet grid.
          </p>
        </div>

        {/* ⚠️ ERROR MESSAGE DISPLAY */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-xl font-mono flex items-center space-x-2 animate-pulse">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* 📝 LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Field 1: Email */}
          <div className="space-y-1">
            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Identity Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@domain.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
            />
          </div>

          {/* Field 2: Password */}
          <div className="space-y-1">
            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Security Key</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
            />
          </div>

          {/* 🎯 LOGIN BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00ffcc] text-black font-black uppercase text-xs tracking-widest py-3 rounded-xl hover:bg-[#00ffcc]/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_15px_rgba(0,255,204,0.1)] hover:shadow-[0_0_25px_rgba(0,255,204,0.3)]"
            >
              {loading ? 'Authorizing Grid Session...' : 'Authenticate Login'}
            </button>
          </div>
        </form>

        {/* 🔗 LINK TO REGISTER PAGE */}
        <p className="text-center text-[11px] text-gray-400">
          New to the fleet matrix?{' '}
          <Link href="/register" className="text-[#00ffcc] font-bold hover:underline transition-all">
            Create an Account
          </Link>
        </p>

        {/* ⚡ OR DIVIDER */}
        <div className="relative flex items-center justify-center py-1">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <span className="relative bg-[#090d16] px-3 font-mono text-[9px] uppercase tracking-widest text-gray-500">OR MATRIX SECURE</span>
        </div>

        {/* 🌐 GOOGLE LOGIN BUTTON */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white/5 border border-white/10 hover:border-white/20 text-gray-200 font-bold text-xs tracking-wide py-3 rounded-xl hover:bg-white/[0.08] active:scale-[0.99] transition-all flex items-center justify-center space-x-2.5"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.97 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 7.14 8.74 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.45h6.45c-.28 1.48-1.12 2.73-2.38 3.58l3.68 2.85c2.14-1.98 3.75-4.9 3.75-8.53z"/>
            <path fill="#FBBC05" d="M5.1 14.7c-.23-.7-.35-1.44-.35-2.2s.12-1.5.35-2.2L1.5 7.5C.54 9.4 0 11.63 0 14s.54 4.6 1.5 6.5l3.6-2.8z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.68-2.85c-1.02.68-2.33 1.1-4.28 1.1-3.26 0-5.99-2.1-6.98-5.26l-3.6 2.8C3.4 20.35 7.35 23 12 23z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

      </div>
    </div>
  );
}



























// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { authClient } from "@/lib/auth-client"; // আপনার auth-client ফাইলের সঠিক পাথ দিন
// import { toast } from 'react-hot-toast';
//   import { authClient } from "@/lib/auth-client"

// export default async function Login () {

//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);



// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 🔑 ১. Better Auth ইমেইল/পাসওয়ার্ড লগইন হ্যান্ডলার
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     const { email, password } = formData;

//     if (!email || !password) {
//       toast.error("Credentials grid incomplete. Check inputs.");
//       setLoading(false);
//       return;
//     }

//     // 🚀 Better Auth Sign-In Protocol
//     await authClient.signIn.email({
//       email: email,
//       password: password,
//     }, {
//       onRequest: () => {
//         setLoading(true);
//       },
//       // ✅ সফলভাবে লগইন হলে
//       onSuccess: (ctx) => {
//         setLoading(false);
        
//         // 🌟 সাকসেস টোস্ট মেসেজ
//         toast.success('LOGIN SUCCESSFUL!.', {
//           style: {
//             border: '1px solid #00ffcc',
//             padding: '16px',
//             color: '#fff',
//             background: '#090d16',
//             fontFamily: 'monospace',
//             fontSize: '12px'
//           },
//           iconTheme: {
//             primary: '#00ffcc',
//             secondary: '#090d16',
//           },
//         });

//         // সফল হলে হোম পেজে রিডাইরেক্ট
//         router.push('/');
//       },
//       // ❌ লগইন ফেইল হলে
//       onError: (ctx) => {
//         setLoading(false);
//         const errorMsg = ctx.error.message || 'Invalid credentials matrix.';
        
//         // 🌟 এরর টোস্ট মেসেজ
//         toast.error(errorMsg, {
//           style: {
//             border: '1px solid #f43f5e',
//             padding: '16px',
//             color: '#fff',
//             background: '#090d16',
//             fontFamily: 'monospace',
//             fontSize: '12px'
//           },
//         });

//         setError(errorMsg);
//       }
//     });
//   };

//   // 🌐 ২. Better Auth গুগল লগইন হ্যান্ডলার
//   const handleGoogleLogin = async () => {
//     setError('');
    
//     try {
//       // 🚀 Better Auth Social Sign-In (Google OAuth)
//       await authClient.signIn.social({
//         provider: "google",
//         // নোট: Better Auth সফল লগইনের পর অটোমেটিক রিডাইরেক্ট করে, তাই callbackURL ব্যবহার করা হয়
//         callbackURL: "/" 
//       });

//       // ওঅথ লুপ শুরু হওয়ার জন্য একটি স্টার্টিং টোস্ট
//       toast.loading('Initializing Google OAuth Loop...', {
//         style: {
//           border: '1px solid #00ffcc',
//           padding: '12px',
//           color: '#fff',
//           background: '#090d16',
//           fontFamily: 'monospace',
//           fontSize: '12px'
//         }
//       });

//     } catch (err) {
//       toast.error('Google Authentication aborted.');
//       setError('Google Authentication aborted or token validation failed.');
//     }
//   };




//   // jwt

//     const { data, error } = await authClient.token();
//     if (error) {
//       console.error('Token retrieval failed:', error);
//     } else {
//       console.log('Current JWT Token:', data.token);
//     }












//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData((prev) => ({ ...prev, [name]: value }));
//   // };

//   // // 🔑 ১. রেগুলার ফর্ম লগইন হ্যান্ডলার
//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   setError('');
//   //   setLoading(true);

//   //   try {
//   //     // 💡 এখানে পরবর্তীতে Firebase (signInWithEmailAndPassword) বা কাস্টম API কানেক্ট করবেন
//   //     console.log('Authenticating Node Session:', formData);

//   //     // সফল লগইন সিমুলেশন (Mocking Success Response)
//   //     setTimeout(() => {
//   //       setLoading(false);
//   //       // সফল লগইন হলে সরাসরি হোম রুটে রিডাইরেক্ট (As per requirement)
//   //       router.push('/');
//   //     }, 1500);

//   //   } catch (err) {
//   //     setLoading(false);
//   //     // লগইন ফেইল হলে কাস্টম ইনলাইন মেসেজ সেট হবে
//   //     setError('Invalid credentials matrix. Secure access handshake refused.');
//   //   }
//   // };

//   // // 🌐 ২. গুগল লগইন হ্যান্ডলার
//   // const handleGoogleLogin = async () => {
//   //   setError('');
//   //   try {
//   //     // 💡 এখানে পরবর্তীতে Firebase Google Provider কানেক্ট করবেন
//   //     console.log('Initializing Google OAuth Loop...');

//   //     // সফল গুগল লগইন সিমুলেশন
//   //     setTimeout(() => {
//   //       // সফল গুগল লগইনে সরাসরি হোম রুটে রিডাইরেক্ট (As per requirement)
//   //       router.push('/');
//   //     }, 1000);

//   //   } catch (err) {
//   //     setError('Google Authentication aborted or token validation failed.');
//   //   }
//   // };

//   return (
//     <div className="min-h-screen bg-[#030712] text-white px-4 py-12 flex items-center justify-center relative overflow-hidden">
      
//       {/* 🔮 Background Cyan Glow Aura */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[160px] pointer-events-none" />

//       <div className="w-full max-w-md bg-[#090d16]/60 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative z-10 space-y-6 shadow-2xl">
        
//         {/* 📑 LOGIN TITLE */}
//         <div className="text-center space-y-1.5">
//           <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-0.5">
//             Security Gateway
//           </div>
//           <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
//             User <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Login Portal</span>
//           </h1>
//           <p className="text-xs text-gray-400">
//             Sync your encrypted core tokens to access the fleet grid.
//           </p>
//         </div>

//         {/* ⚠️ ERROR MESSAGE DISPLAY (Inline Custom Alert) */}
//         {error && (
//           <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-xl font-mono flex items-center space-x-2 animate-pulse">
//             <span>⚠️</span>
//             <span>{error}</span>
//           </div>
//         )}

//         {/* 📝 LOGIN FORM */}
//         <form onSubmit={handleLogin} className="space-y-4">
          
//           {/* Field 1: Email */}
//           <div className="space-y-1">
//             <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Identity Email</label>
//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="name@domain.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
//             />
//           </div>

//           {/* Field 2: Password */}
//           <div className="space-y-1">
//             <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Security Key</label>
//             <input
//               type="password"
//               name="password"
//               required
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
//             />
//           </div>

//           {/* 🎯 LOGIN BUTTON */}
//           <div className="pt-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#00ffcc] text-black font-black uppercase text-xs tracking-widest py-3 rounded-xl hover:bg-[#00ffcc]/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_15px_rgba(0,255,204,0.1)] hover:shadow-[0_0_25px_rgba(0,255,204,0.3)]"
//             >
//               {loading ? 'Authorizing Grid Session...' : 'Authenticate Login'}
//             </button>
//           </div>
//         </form>

//         {/* 🔗 LINK TO REGISTER PAGE */}
//         <p className="text-center text-[11px] text-gray-400">
//           New to the fleet matrix?{' '}
//           <Link href="/register" className="text-[#00ffcc] font-bold hover:underline transition-all">
//             Create an Account
//           </Link>
//         </p>

//         {/* ⚡ OR DIVIDER */}
//         <div className="relative flex items-center justify-center py-1">
//           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
//           <span className="relative bg-[#090d16] px-3 font-mono text-[9px] uppercase tracking-widest text-gray-500">OR MATRIX SECURE</span>
//         </div>

//         {/* 🌐 GOOGLE LOGIN BUTTON */}
//         <button
//           type="button"
//           onClick={handleGoogleLogin}
//           className="w-full bg-white/5 border border-white/10 hover:border-white/20 text-gray-200 font-bold text-xs tracking-wide py-3 rounded-xl hover:bg-white/[0.08] active:scale-[0.99] transition-all flex items-center justify-center space-x-2.5"
//         >
//           {/* Minimalist Google SVG Icon */}
//           <svg className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24">
//             <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.97 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 7.14 8.74 5.04 12 5.04z"/>
//             <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.45h6.45c-.28 1.48-1.12 2.73-2.38 3.58l3.68 2.85c2.14-1.98 3.75-4.9 3.75-8.53z"/>
//             <path fill="#FBBC05" d="M5.1 14.7c-.23-.7-.35-1.44-.35-2.2s.12-1.5.35-2.2L1.5 7.5C.54 9.4 0 11.63 0 14s.54 4.6 1.5 6.5l3.6-2.8z"/>
//             <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.68-2.85c-1.02.68-2.33 1.1-4.28 1.1-3.26 0-5.99-2.1-6.98-5.26l-3.6 2.8C3.4 20.35 7.35 23 12 23z"/>
//           </svg>
//           <span>Continue with Google</span>
//         </button>

//       </div>
//     </div>
//   );
// }