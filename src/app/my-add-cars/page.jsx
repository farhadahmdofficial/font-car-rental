

"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyAddCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const userEmail = "farhad@example.com"; 

 
  useEffect(() => {
    if (userEmail) {
      setLoading(true);
      
    
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-cars?email=${userEmail}`)
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          setCars(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching my cars:", err);
          setLoading(false);
        });
    }
  }, [userEmail]);

 
const handleDelete = async (id) => {
  const proceed = window.confirm("Are you sure you want to Delete thisn car?");
  if (proceed) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.deletedCount > 0) {
        toast("car deleted successfully! 🗑️");
        
        const remaining = cars.filter((car) => car._id !== id);
        setCars(remaining);
      } else {
        toast.error("Data found in DB, but could not be delete");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error(`car are not delete . Error: ${error.message}`);
    }
  }
};






  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#00ffcc] font-mono tracking-widest animate-pulse">
        LOADING SYSTEM DATA...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen relative font-sans bg-[#030712] my-5 rounded-2xl">
      
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#00ffcc]/5 blur-[120px] pointer-events-none" />

      

      {cars.length===0?<h1>addone </h1>: <div className="mb-8 relative z-10">
        <h1 className="text-3xl font-black uppercase tracking-wider text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.2)]">
          My Added Cars ({cars.length})
        </h1>
        
      </div>}
     

      
      {cars.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 bg-[#090d16]/40 border border-white/5 rounded-2xl max-w-2xl mx-auto my-10 backdrop-blur-xl">
          <h2 className="text-lg font-mono uppercase tracking-wider text-white">
            You  haven't added <span className="text-[#00ffcc]">Any Cars Yet</span>
          </h2>
          {/* <p className="text-xs text-gray-500 mt-2">Try adding a new vehicle from the deploy panel.</p> */}
        </div>
      ) : (
        <div className="bg-[#090d16]/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
                  <th className="p-4 md:p-5">Car Image</th>
                  <th className="p-4 md:p-5">Car Name</th>
                  <th className="p-4 md:p-5">Daily Price</th>
                  <th className="p-4 md:p-5">Car Type</th>
                  <th className="p-4 md:p-5">Location</th>
                  <th className="p-4 md:p-5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                {cars.map((car) => (
                  <tr key={car._id} className="hover:bg-white/[0.015] transition-colors group">
                   
                    <td className="p-4 md:p-5">
                      <div className="relative h-12 w-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-inner group-hover:border-[#00ffcc]/40 transition-all duration-300">
                        <img
                          src={car.imageUrl || "https://placehold.co/600x400"}
                          alt={car.carName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>

                   
                    <td className="p-4 md:p-5 font-bold text-white group-hover:text-[#00ffcc] transition-colors text-sm">
                      {car.carName}
                    </td>

                   
                    <td className="p-4 md:p-5 font-mono font-bold text-[#00ffcc]">
                      ${car.dailyPrice} <span className="text-[10px] text-gray-500 font-normal">/ day</span>
                    </td>

                    
                    <td className="p-4 md:p-5 font-mono uppercase text-xs">
                      {car.carType}
                    </td>

                   
                    <td className="p-4 md:p-5 text-gray-400">
                      {car.location}
                    </td>

                
                    <td className="p-4 md:p-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-rose-400 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddCars;






















