'use client';

import { formatPrice } from '@/lib/format-price';
import { formatDate } from '@/lib/format-date';

type OrdersWithProducts = ({
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
} & {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  createdDate: Date;
  paymentIntentID: string | null;
})[];

export default function Orders({ orders }: { orders: OrdersWithProducts }) {
  return (
    <>
      {orders.map(order => {
        return (
          <div key={order.id} className="mb-8 max-w-3xl mx-auto text-sm rounded-md overflow-hidden shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-300 px-4 py-2">
              <span>{formatDate(order.createdDate)}</span>
              <span className="text-xs uppercase opacity-70">order id: {order.id}</span>
              <p
                className={`w-28 text-center text-xs uppercase px-[1em] py-[0.25em] text-white rounded-xl ${
                  order.status === 'completed' ? 'bg-emerald-600' : 'bg-orange-400'
                }`}>
                {order.status}
              </p>
            </div>
            <ul className="bg-white p-4">
              {order.products.map(product => {
                return (
                  <li key={product.id} className="flex justify-between items-center pb-2 last:pb-0 ">
                    <span>{product.name}</span>
                    <div className="ml-auto flex gap-1 sm:gap-8">
                      <span>{product.quantity} ×</span>
                      <span>{formatPrice(product.price, order.currency)}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-end bg-white px-4 py-2 border-t border-slate-300 text-base">
              <span>{formatPrice(order.amount, order.currency)}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
