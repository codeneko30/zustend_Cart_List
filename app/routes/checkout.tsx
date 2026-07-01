import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
const emptyForm = {
  name: '',
  email: '',
  address: '',
  city: '',
  zip: '',
}

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const placeOrder = useCartStore((state) => state.placeOrder)
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)

  const [errors, setErrors] = useState({})

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  const shipping =
    subtotal > 75 || subtotal === 0
      ? 0
      : 6.5

  const tax = subtotal * 0.0825

  const total =
    subtotal +
    shipping +
    tax

  function handleChange(field, e) {
    setForm({
      ...form,
      [field]: e.target.value,
    })
  }

  function validate() {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Name required'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email required'
    }

    if (!form.address.trim()) {
      newErrors.address = 'Address required'
    }

    if (!form.city.trim()) {
      newErrors.city = 'City required'
    }

    if (!form.zip.trim()) {
      newErrors.zip = 'ZIP required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // function handleSubmit(e) {
  //   e.preventDefault()

  //   if (!validate()) {
  //     return
  //   }

  //   placeOrder(form)

  //   alert('Order placed')

  //   setForm(emptyForm)
  // }


  function handleSubmit(e) {
    e.preventDefault()
  
    if (!validate()) {
      return
    }
  
    placeOrder(form)
  
    navigate('/order')
  }




  return (
    <div className="mx-auto max-w-3xl px-4 py-10">

      <Link to="/cart">
      <button className="text-sm text-gray-500 hover:text-gray-900">
        ← Back to Cart
      </button>
      </Link>

     

      <h1 className="mt-4 text-3xl font-bold text-gray-900">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2"
      >

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-gray-600">
            Full Name
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              handleChange('name', e)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-gray-600">
            Email
          </label>

          <input
            value={form.email}
            onChange={(e) =>
              handleChange('email', e)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-gray-600">
            Address
          </label>

          <input
            value={form.address}
            onChange={(e) =>
              handleChange('address', e)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />

          {errors.address && (
            <p className="mt-1 text-xs text-red-500">
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">
            City
          </label>

          <input
            value={form.city}
            onChange={(e) =>
              handleChange('city', e)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />

          {errors.city && (
            <p className="mt-1 text-xs text-red-500">
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">
            ZIP Code
          </label>

          <input
            value={form.zip}
            onChange={(e) =>
              handleChange('zip', e)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />

          {errors.zip && (
            <p className="mt-1 text-xs text-red-500">
              {errors.zip}
            </p>
          )}
        </div>

        <div className="sm:col-span-2 rounded-xl border border-gray-200 bg-white p-5">

          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span>
              {shipping === 0
                ? 'Free'
                : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link to="/order">
          <button type="submit" className="mt-5 w-full rounded-lg bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-700">
            Place Order
          </button>
          </Link>

          

        </div>

      </form>

    </div>
  )
}