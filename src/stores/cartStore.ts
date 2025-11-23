import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product.types";
import type { CartItem } from "../types/cart.types";

interface AddToCartResult {
  success: boolean;
  reason?: "out-of-stock" | "max-quantity";
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => AddToCartResult;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const selectTotalItems = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: CartState) =>
  state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

export const selectProductCartStatus =
  (productId: string) => (state: CartState) => {
    const cartItem = state.items.find(item => item.product.id === productId);
    return {
      cartItem,
      isAtMaxQuantity: cartItem
        ? cartItem.quantity >= cartItem.product.stock
        : false,
    };
  };

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product: Product): AddToCartResult => {
        const state = get();
        const existingItem = state.items.find(
          item => item.product.id === product.id
        );

        if (product.stock <= 0) {
          return { success: false, reason: "out-of-stock" };
        }

        if (existingItem && existingItem.quantity >= product.stock) {
          return { success: false, reason: "max-quantity" };
        }

        set(state => {
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        });

        return { success: true };
      },

      removeFromCart: (productId: string) => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set(state => ({
          items: state.items.map(item => {
            if (item.product.id === productId) {
              const validQuantity = Math.min(quantity, item.product.stock);
              return { ...item, quantity: validQuantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
