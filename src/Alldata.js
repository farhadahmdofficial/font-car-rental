


// const alldata= async ()=>{
//       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`)

//    const cars = await res.json();
// }
// import { headers } from 'next/headers';


// all cars
export const Alldata = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`,{cache: 'no-store'});
  const cars = await res.json();
  
  return cars ||[]; 
};

// future car 
export const futurecars = async () => {


 const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/future`,{
    cache: 'no-store'
  });
  const cars = await res.json();
  
  return cars ||[]; 

};


//   try {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/future`, { cache: 'no-store' });
//   if (!res.ok) return []; // যদি কোনো কারণে ব্যাকএন্ড এরর দেয়, তবে সাইট ক্র্যাশ না করে খালি রাখবে
  
//   const cars = await res.json();
//   return cars || [];
// } catch (error) {
//   return []; 
// }




 

// singla data 
export const carone = async (id,token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`,{
    headers: {
      authorization: `Bearer ${token}` ||""
    }
  });
  const cars = await res.json();
  
  return cars ||{}; 
};


