type Product = {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  bggURL: string;
  bggID: string;
  priceEur: number | 0;
  currency: string;
};

type CartItem = {
  name: string;
  id: string;
  price: number | 0;
  image: string;
  quantity: number | 0;
};

type CartState = {
  cart: CartItem[];
  isOpen: boolean;
  paymentIntent: string;
  setPaymentIntent: (value: string) => void;
  toggleCart: () => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  resetCart: () => void;
};

type OrderWithProducts = {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  createdDate: Date;
  paymentIntentId: string | null;
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};
