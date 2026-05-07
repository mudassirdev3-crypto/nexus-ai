import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Home page aur Auth pages ko public rakha hai
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // Dashboard aur baaki pages ko lock kar dega
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!m)|jsx?|cfg|jp?g|png|gif|svg|ico|webp|xml|txt)).*)',
    '/(api|trpc)(.*)',
  ],
};