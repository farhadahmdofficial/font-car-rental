




'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-hot-toast'; //
// import { authClient } from "@/lib/auth-client"; // আপনার auth-client ফাইলের সঠিক পাথ দিন

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📝 Better Auth রেজিস্ট্রেশন হ্যান্ডলার
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("All fields are required to compile profile matrix."); // ইনলাইন এররের পাশাপাশি টোস্টও দিতে পারেন
      setLoading(false);
      return;
    }

    // 🚀 Better Auth Sign-Up Protocol
    await authClient.signUp.email({
      email: email,
      password: password,
      name: name,
      image: formData.photoUrl || "" // যদি ফটো ইউআরএল না থাকে তবে খালি স্ট্রিং পাঠান
    }, {
      onRequest: () => {
        setLoading(true);
      },
      // ✅ সাকসেসফুলি ইউজার ক্রিয়েট হলে
      onSuccess: (ctx) => {
        setLoading(false);
        console.log('User registered successfully in MongoDB via Better Auth:', ctx);

        // 🌟 ২. সাকসেস টোস্ট মেসেজ
        toast.success('Registration Successful! ', {
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

        // সফল হলে হোম পেজ বা লগইন পেজে রিডাইরেক্ট
        router.push('/');
      },
      // ❌ কোনো এরর হলে
      onError: (ctx) => {
        setLoading(false);
        const errorMsg = ctx.error.message || 'Registration failed. Protocol breach.';

        // 🌟 ৩. এরর টোস্ট মেসেজ
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








  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // // 📝 Better Auth রেজিস্ট্রেশন হ্যান্ডলার
  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   // Better Auth-এর জন্য formData থেকে নাম, ইমেইল, পাসওয়ার্ড আলাদা করা
  //   const { name, email, password } = formData;

  //   // প্রাথমিক ভ্যালিডেশন চেক
  //   if (!name || !email || !password) {
  //     setError("All fields are required to compile profile matrix.");
  //     setLoading(false);
  //     return;
  //   }

  //   // 🚀 Better Auth Sign-Up Protocol
  //   await authClient.signUp.email({
  //     email: email,
  //     password: password,
  //     name: name,
  //     // (ঐচ্ছিক) যদি ইমেজ ইউআরএল থাকে তবে এভাবে দিতে পারেন: image: formData.imageURL || ""
  //   }, {
  //     // 🔄 রিকোয়েস্ট শুরু হওয়ার সময় (onRequest)
  //     onRequest: () => {
  //       setLoading(true);
  //     },
  //     // ✅ সাকসেসফুলি ইউজার ক্রিয়েট হলে (onSuccess)
  //     onSuccess: (ctx) => {
  //       setLoading(false);
  //       console.log('User registered successfully in MongoDB via Better Auth:', ctx);
  //       // সফল হলে লগইন পেজে রিডাইরেক্ট
  //       router.push('/');
  //     },
  //     // ❌ কোনো এরর হলে (onError)
  //     onError: (ctx) => {
  //       setLoading(false);
  //       // Better Auth-এর নিজস্ব এরর মেসেজ দেখানোর জন্য ctx.error.message ব্যবহার করা হয়
  //       setError(ctx.error.message || 'Registration failed. Protocol breach or email already exists.');
  //     }
  //   });
  // };








  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // // 📝 ১. রেগুলার ফর্ম রেজিস্ট্রেশন হ্যান্ডলার
  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   try {
  //     // 💡 এখানে পরবর্তীতে Firebase (createUserWithEmailAndPassword) বা আপনার কাস্টম API কানেক্ট করবেন
  //     console.log('Registering Node Profile:', formData);

  //     // সফল রেজিস্ট্রেশন সিমুলেশন (Mocking Success Response)
  //     setTimeout(() => {
  //       setLoading(false);
  //       // সফল হলে লগইন পেজে রিডাইরেক্ট (As per requirement)
  //       router.push('/login');
  //     }, 1500);

  //   } catch (err) {
  //     setLoading(false);
  //     // কোনো এরর হলে কাস্টম ইনলাইন মেসেজ/অ্যালার্ট সেট হবে
  //     setError('Registration failed. Email matrix already exists or invalid protocol.');
  //   }
  // };

  // 🌐 ২. গুগল লগইন হ্যান্ডলার
  // const handleGoogleLogin = async () => {
  //   setError('');
  //   try {
  //     // 💡 এখানে পরবর্তীতে Firebase (signInWithPopup with GoogleAuthProvider) কানেক্ট করবেন
  //     console.log('Initializing Google OAuth Loop...');

  //     // সফল গুগল লগইন সিমুলেশন (Mocking Google Success)
  //     setTimeout(() => {
  //       // গুগল লগইন সফল হলে সরাসরি হোম পেজে রিডাইরেক্ট (As per requirement)
  //       router.push('/');
  //     }, 1000);

  //   } catch (err) {
  //     setError('Google Authentication aborted or network handshake failed.');
  //   }
  // };





  const handleGoogleLogin = async () => {
    setError('');
    try {
      console.log('Initializing Better Auth Google OAuth Loop...');

      // 🚀 Better Auth-এর রিয়েল সোশ্যাল সাইন-ইন প্রোটোকল
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",         // সফলভাবে অ্যাকাউন্ট তৈরি বা লগইন হলে হোম পেজে নিয়ে যাবে
        errorCallbackURL: "/signup", // কোনো এরর হলে সাইন-আপ পেজেই ব্যাক করাবে
      });

    } catch (err) {
      console.error("Google Auth Error:", err);
      setError('Google Authentication aborted or network handshake failed.');
      toast.error('Google Authentication failed.');
    }
  };





  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 py-12 flex items-center justify-center relative overflow-hidden">

      {/* 🔮 Background Cyan Glow Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#00ffcc]/5 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#090d16]/60 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative z-10 space-y-6 shadow-2xl">

        {/* 📑 REGISTRATION TITLE */}
        <div className="text-center space-y-1.5">
          <div className="inline-block font-mono text-[9px] tracking-[0.2em] text-[#00ffcc] uppercase border-b border-[#00ffcc]/20 pb-0.5">
            Access Protocol
          </div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            Create <span className="text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.3)]">Grid Account</span>
          </h1>
          <p className="text-xs text-gray-400">
            Initialize your profile metrics to join the DriveFleet network.
          </p>
        </div>

        {/* ⚠️ ERROR MESSAGE DISPLAY (Inline Custom Alert) */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-xl font-mono flex items-center space-x-2 animate-pulse">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* 📝 REGISTRATION FORM */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Field 1: Name */}
          <div className="space-y-1">
            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Farhad Ahmed"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
            />
          </div>

          {/* Field 2: Email */}
          <div className="space-y-1">
            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Email Address</label>
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

          {/* Field 3: Photo URL */}
          <div className="space-y-1">
            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Photo URL</label>
            <input
              type="url"
              name="photoUrl"
              required
              placeholder="https://images.com/profile.jpg"
              value={formData.photoUrl}
              onChange={handleChange}
              className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
            />
          </div>

          {/* Field 4: Password */}
          <div className="space-y-1">
            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Secure Password</label>
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

          {/* 🎯 REGISTER BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00ffcc] text-black font-black uppercase text-xs tracking-widest py-3 rounded-xl hover:bg-[#00ffcc]/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_15px_rgba(0,255,204,0.1)] hover:shadow-[0_0_25px_rgba(0,255,204,0.3)]"
            >
              {loading ? 'Compiling Profile Matrix...' : 'Register Account'}
            </button>
          </div>
        </form>

        {/* ⚡ OR DIVIDER */}
        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <span className="relative bg-[#090d16] px-3 font-mono text-[9px] uppercase tracking-widest text-gray-500">OR NETWORK Auth</span>
        </div>

        {/* 🌐 GOOGLE LOGIN BUTTON */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white/5 border border-white/10 hover:border-white/20 text-gray-200 font-bold text-xs tracking-wide py-3 rounded-xl hover:bg-white/[0.08] active:scale-[0.99] transition-all flex items-center justify-center space-x-2.5"
        >
          {/* Minimalist Google SVG Icon */}
          <svg className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.97 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 7.14 8.74 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.45h6.45c-.28 1.48-1.12 2.73-2.38 3.58l3.68 2.85c2.14-1.98 3.75-4.9 3.75-8.53z" />
            <path fill="#FBBC05" d="M5.1 14.7c-.23-.7-.35-1.44-.35-2.2s.12-1.5.35-2.2L1.5 7.5C.54 9.4 0 11.63 0 14s.54 4.6 1.5 6.5l3.6-2.8z" />
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.68-2.85c-1.02.68-2.33 1.1-4.28 1.1-3.26 0-5.99-2.1-6.98-5.26l-3.6 2.8C3.4 20.35 7.35 23 12 23z" />
          </svg>
          <span>Continue with Google</span>
        </button>

      </div>
    </div>
  );
}