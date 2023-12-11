'use client';

import { formatPrice } from '@/utils';
import { useState } from 'react';

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
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="table w-full">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell text-left">Order ID</div>
            <div className="table-cell text-left">Date</div>
            <div className="table-cell text-left">Payment</div>
            <div className="table-cell text-right">Amount</div>
          </div>
        </div>
        <div className="table-row-group">
          {orders.map((order, i) => {
            return (
              <div key={order.id} className={`table-row hover:bg-orange-200 cursor-pointer ${i === index ? 'bg-orange-200' : ''}`} onClick={() => setIndex(i)}>
                <div className="table-cell text-left">{order.id}</div>
                <div className="table-cell text-left">{order.createdDate.toISOString()}</div>
                <div className="table-cell text-left">{order.status}</div>
                <div className="table-cell text-right">{formatPrice(order.amount, order.currency)}</div>
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="my-4">Order details</h2>
      <div className="table w-full">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell text-left">Product</div>
            <div className="table-cell text-left">Price per unit</div>
          </div>
          {orders[index].products.map(product => {
            return (
              <div className="table-row" key={product.id}>
                <div className="table-cell text-left">
                  {product.quantity} × {product.name}
                </div>
                <div className="table-cell text-left">{formatPrice(product.price, 'eur')}</div>
              </div>
            );
          })}{' '}
        </div>
      </div>
    </>
  );
}
