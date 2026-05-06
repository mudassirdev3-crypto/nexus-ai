import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// In routes ko public rakhein taake login ke baghair nazar aayein
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Next.js internals aur static files ko skip karne ke liye
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!m)|jsx?|cfg|jp?g|png|gif|svg|ico|webp|xml|txt)).*)',
    // API aur trpc routes ke liye hamesha run hoga
    '/(api|trpc)(.*)',
  ],
};