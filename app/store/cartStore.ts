


import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// export interface CartItem {
//   id: string
//   name: string
//   price: number
//   qty: number
// }

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  image?: string // <-- add this
  description?: string
}


export interface Customer {
  name: string
  email: string
  address: string
  city: string
  zip: string
}

export interface Order {
  id: string
  date: string
  items: CartItem[]
  customer: Customer
  subtotal: number
  shipping: number
  tax: number
  total: number
}

interface CartState {
  items: CartItem[]
  lastOrder: Order | null
  addItem: (item: Omit<CartItem, 'qty'>) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  removeItem: (id: string) => void
  clearCart: () => void
  placeOrder: (customer: Customer) => Order
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      lastOrder: null,

      addItem: (item) => {
        const items = get().items
        const existing = items.find((i) => i.id === item.id)

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + 1 } : i
            ),
          })
        } else {
          set({ items: [...items, { ...item, qty: 1 }] })
        }
      },

      increment: (id) => {
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i
          ),
        })
      },

      decrement: (id) => {
        set({
          items: get()
            .items.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },

      clearCart: () => set({ items: [] }),

      placeOrder: (customer) => {
        const items = get().items
        const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
        const shipping = subtotal > 75 || subtotal === 0 ? 0 : 6.5
        const tax = subtotal * 0.0825
        const total = subtotal + shipping + tax

        const order: Order = {
          id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date().toISOString(),
          items,
          customer,
          subtotal,
          shipping,
          tax,
          total,
        }

        set({ lastOrder: order, items: [] })
        return order
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, lastOrder: state.lastOrder }),
    }
  )
)