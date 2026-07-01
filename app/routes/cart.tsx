import { useCartStore } from '../store/cartStore'

import { Link } from 'react-router'

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
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Add some products to get started.</p>

        <Link to="/">

          <button className="mt-6 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700">
            Continue Shopping
          </button>

        </Link>



      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>

      <div className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-gray-300">
                <button
                  onClick={() => decrement(item.id)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{item.qty}</span>
                <button
                  onClick={() => increment(item.id)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <p className="w-16 text-right font-medium text-gray-900">
                ${(item.price * item.qty).toFixed(2)}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <Link to='/checkout'>

          <button className="mt-5 w-full rounded-lg bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-700">
            Proceed to Checkout
          </button>



        </Link>


        <Link to='/'>

          <button className="mt-2 w-full rounded-lg py-2 text-sm text-gray-500 hover:text-gray-900">
            Continue Shopping
          </button>


        </Link>


      </div>
    </div>
  )
}