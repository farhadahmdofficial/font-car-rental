


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
        '/cars/:id',       //
        '/my-bookings',
        '/my-add-cars',
        
    ],


//   matcher: '/cars/:id',
  
//   matcher: '/about/:path*',
}






