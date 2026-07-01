

import { useCartStore } from '../store/cartStore'
import { Link } from 'react-router'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Truck, Package } from 'lucide-react'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)
  const removeItem = useCartStore((state) => state.removeItem)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 6.5
  const tax = subtotal * 0.0825
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-gray-500">Looks like you haven't added anything yet.</p>

          <Link to="/">
            <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-1 text-sm text-gray-500">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 ${
                    index !== items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  {/* IMAGE UNCOMMENTED - NOW SHOWS */}
                  <div className="flex-shrink-0">
                    <div className="h-24 w-24 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-8 w-8 text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                    <p className="text-sm font-medium text-gray-900 sm:hidden">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-3">
                    <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                      <button
                        onClick={() => decrement(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-l-lg text-gray-600 transition hover:bg-gray-100 active:bg-gray-200"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="flex h-9 w-12 items-center justify-center text-sm font-semibold text-gray-900">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => increment(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-r-lg text-gray-600 transition hover:bg-gray-100 active:bg-gray-200"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <p className="hidden text-right text-sm font-semibold text-gray-900 sm:block">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1 text-sm text-red-500 transition hover:text-red-700 sm:text-xs"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {shipping > 0 && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <Truck className="h-5 w-5 text-amber-600" />
                <p className="text-sm text-amber-800">
                  Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
                <p className="mt-1 text-right text-xs text-gray-400">Including taxes</p>
              </div>

              <Link to="/checkout">
                <button className="mt-6 w-full rounded-xl bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800">
                  Proceed to Checkout
                </button>
              </Link>

              <Link to="/">
                <button className="mt-3 w-full rounded-xl py-3 text-sm font-medium text-gray-500 transition hover:text-gray-900">
                  Continue Shopping
                </button>
              </Link>

              <div className="mt-6 flex items-center justify-center gap-4 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Truck className="h-4 w-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Package className="h-4 w-4" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



