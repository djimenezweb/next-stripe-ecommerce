export const revalidate = 0;
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import Orders from './Orders';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  const orders = await prisma.order.findMany({ where: { userId: session?.user?.id }, include: { products: true }, orderBy: { createdDate: 'desc' } });

  return (
    <>
      <h2 className="text-2xl mb-8 font-patua max-w-3xl mx-auto">My Orders</h2>
      {orders.length ? <Orders orders={orders} /> : <p>No orders found</p>}
    </>
  );
}
