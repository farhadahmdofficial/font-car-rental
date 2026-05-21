


/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 🎯 এই ডবল স্টার চিহ্নটির মানে হলো যেকোনো ওয়েবসাইটের ডোমেইন অনুমোদিত
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http', // 🎯 কিছু কিছু ওয়েবসাইট http (অসিকিউর) প্রোটোকল ব্যবহার করতে পারে, তার জন্য এটি ব্যাকআপ
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;














// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com', // গুগলের প্রোফাইল ইমেজের ডোমেইন
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;
