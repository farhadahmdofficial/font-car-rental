


import { headers } from 'next/headers';
import { NextResponse } from 'next/server'
import { auth } from './lib/auth';
// import { authClient } from './lib/auth-client';

 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session =await auth.api.getSession({
        headers:await headers()

    });
    // console.log(session);
    if (!session || !session?.user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    return NextResponse.next();

//   return NextResponse.redirect(new URL('/', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
    matcher: [
        '/cars/:id',       // কার ডিটেইলস পেজ
        '/add-car',        // 🚗 এড কার পেজ (আপনার প্রজেক্টের সঠিক পাথটি দিন)
        '/my-bookings',
        '/my-add-cars',
        // 📅 মাই বুকিং পেজ (আপনার প্রজেক্টের সঠিক পাথটি দিন)
    ],


//   matcher: '/cars/:id',
  
//   matcher: '/about/:path*',
}






