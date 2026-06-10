import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navber";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "",
//   description: "car rental service for everyone",
// };
export const metadata = {
  title: "RentRide | Premium Car Rental Service",
  description: "Affordable and premium car rental service for everyone.",
  icons: {
    icon: "/log.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar></Navbar>
       <main className="flex-1">{children}</main>  
       <Footer></Footer>
        </body>
    </html>
  );
}
