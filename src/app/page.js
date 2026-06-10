import Banner from "@/components/Banner";
import FutureSection from "@/components/Future";
import Tips from "@/components/Tips";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black ">
      {/* <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Welcome to Next.js 14!</h1> */}

      <Banner></Banner>
      <FutureSection></FutureSection> 

    <Tips></Tips>
    </div>
  );
}
