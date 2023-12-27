import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  events: {
    // Only when a user is created
    createUser: async ({ user }) => {
      // Create a Stripe customer
      if (user.name && user.email) {
        const customer = await stripe.customers.create({ email: user.email, name: user.name });
        // Update Prisma user
        const updateUser = await prisma.user.update({ where: { id: user.id }, data: { stripeCustomerId: customer.id } });
      }
    }
  },
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    }
  },
  pages: {
    signIn: '/signin'
  }
});
