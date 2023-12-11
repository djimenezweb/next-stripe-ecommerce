export const revalidate = 0;
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import Orders from './Orders';

export default async function Dashboard() {
  const session = await auth();
  const orders = await prisma.order.findMany({ where: { userId: session?.user?.id }, include: { products: true } });

  return (
    <>
      <h2>My orders</h2>
      <Orders orders={orders} />
    </>
  );
}
