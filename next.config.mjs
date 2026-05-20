/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // গুগলের প্রোফাইল ইমেজের ডোমেইন
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
