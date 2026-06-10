




import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";





const client = new MongoClient(process.env.MONGODB_URI);


const db = client.db("all-cars");

export const auth = betterAuth({


    

    
    database: mongodbAdapter(db, {
        client: client
    }),

    
    emailAndPassword: {    
        enabled: true
    },
    
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET  
        }
    },

    session: {

        cookieCache: {
            enabled: true,
            strategy :"jwt",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        }
    },
        
    
    // session: {
    //     expiresIn: 60 * 60 * 24 * 7, // 7 days
    //     cookieCache: {
    //         enabled: true
    //     }
    // }, 
    
    plugins: [
        jwt()
    ]
});





// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { jwt } from "better-auth/plugins";

// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db("all-cars");

// export const auth = betterAuth({
//     database: mongodbAdapter(db, {
//         client: client
//     }),
    
//     emailAndPassword: {    
//         enabled: true
//     },
    
//     socialProviders: {
//         google: { 
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET  
//         }
//     },
    
//     session: {
//         expiresIn: 60 * 60 * 24 * 7, // 7 days
//         cookieCache: {
//             enabled: true
//         }
//     }, // 👈 এই ক্লোজিং ব্র্যাকেট ও কমাটি অত্যন্ত গুরুত্বপূর্ণ!
    
//     plugins: [
//         jwt()
//     ]
// });










