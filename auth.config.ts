import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',    // quando l'user deve loggare è reindirizzato a questo percorso (es entrare in /dashboard)
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;    // se l'user non è loggato e non è in /dashboard allora permetti la rotta
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;