import { useCartStore } from '../store/cartStore'

import { Link } from 'react-router'

export default function OrderConfirmationPage() {
  const order = useCartStore((state) => state.lastOrder)

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-gray-500">No recent order found.</p>

       <Link to='/'>

          <button className="mt-6 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700">
            Go to Products
          </button>

          </Link>
      </div>
    )
  }

  const orderDate = new Date(order.date)

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
        ✓
      </div>

      <h1 className="mt-5 text-3xl font-bold text-gray-900">Order Confirmed</h1>
      <p className="mt-2 text-gray-500">
        Thank you, {order.customer.name}. A confirmation has been sent to {order.customer.email}.
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 text-left">
        <div className="flex justify-between border-b border-gray-200 pb-3">
          <span className="font-medium text-gray-900">Order ID</span>
          <span className="text-gray-600">{order.id}</span>
        </div>
        <div className="flex justify-between border-b border-gray-200 py-3 text-sm text-gray-500">
          <span>Date</span>
          <span>{orderDate.toLocaleDateString()}</span>
        </div>

        <div className="divide-y divide-gray-100">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between py-3">
              <span className="text-gray-700">
                {item.name} × {item.qty}
              </span>
              <span className="text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-1 border-t border-gray-200 pt-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4 text-sm text-gray-500">
          <p>Shipping to:</p>
          <p>{order.customer.address}, {order.customer.city} {order.customer.zip}</p>
        </div>
      </div>

      <button

        className="mt-8 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700"
      >
        Continue Shopping
      </button>
    </div>
  )
}