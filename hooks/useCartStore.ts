import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      isOpen: false,
      cart: [],
      paymentIntent: '',
      setPaymentIntent: value => set({ paymentIntent: value }),
      // toggleCart: () => set({ isOpen: !get().isOpen })
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      addToCart: (product: CartItem) => {
        const cart = get().cart;
        const isAlready = cart.find(p => p.id === product.id);
        if (isAlready) {
          isAlready.quantity! += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        set({ cart });
      },
      increase: (id: string) => {
        const cart = get().cart;
        const findProduct = cart.find(p => p.id === id);
        if (findProduct) {
          findProduct.quantity += 1;
        }
        set({ cart });
      },
      decrease: (id: string) => {
        const cart = get().cart;
        const findProduct = cart.find(p => p.id === id);
        if (findProduct && findProduct.quantity > 1) {
          findProduct.quantity -= 1;
        }
        set({ cart });
      },
      removeFromCart: (id: string) => {
        set({ cart: get().cart.filter(p => p.id !== id) });
      },
      resetCart: () => set({ isOpen: false, cart: [], paymentIntent: '' })
    }),

    {
      name: 'cart-storage'
    }
  )
);
