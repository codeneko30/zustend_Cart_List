import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { Link } from "react-router";


// const products = [
//     { id: 'p01', name: 'Ceramic Mug', price: 18, description: 'Stoneware mug, 340ml capacity.' },
//     { id: 'p02', name: 'Dinner Plate', price: 24, description: 'Matte glaze plate, 27cm diameter.' },
//     { id: 'p03', name: 'Bud Vase', price: 32, description: 'Single-stem vase, 15cm tall.' },
//     { id: 'p04', name: 'Prep Bowl Set', price: 36, description: 'Set of 3 nesting bowls.' },
//     { id: 'p05', name: 'Pour-Over Carafe', price: 48, description: 'Coffee carafe, 900ml capacity.' },
//     { id: 'p06', name: 'Butter Dish', price: 22, description: 'Fluted lid, fits 250g block.' },
// ]


const products = [
    {
        id: 'p01',
        name: 'Ceramic Mug',
        price: 18,
        description: 'Stoneware mug, 340ml capacity.',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
    },
    {
        id: 'p02',
        name: 'Dinner Plate',
        price: 24,
        description: 'Matte glaze plate, 27cm diameter.',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop',
    },
    {
        id: 'p03',
        name: 'Bud Vase',
        price: 32,
        description: 'Single-stem vase, 15cm tall.',
        image: 'https://images-na.ssl-images-amazon.com/images/I/811asNvY3-L.jpg'
    },
    {
        id: 'p04',
        name: 'Prep Bowl Set',
        price: 36,
        description: 'Set of 3 nesting bowls.',
        image: 'https://m.media-amazon.com/images/I/81UDZtEW6tL.jpg',
    },
    {
        id: 'p05',
        name: 'Pour-Over Carafe',
        price: 48,
        description: 'Coffee carafe, 900ml capacity.',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
    },
    {
        id: 'p06',
        name: 'Butter Dish',
        price: 22,
        description: 'Fluted lid, fits 250g block.',
        image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=400&fit=crop',
    },
]

export default function ProductPage() {
    const addItem = useCartStore((state) => state.addItem)
    const [addedId, setAddedId] = useState<string | null>(null)

    const handleAddToCart = (product) => {
        addItem({ id: product.id, name: product.name, price: product.price })
        setAddedId(product.id)
        setTimeout(() => setAddedId(null), 1200)
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="mt-1 text-gray-500">Browse our items and add them to your cart.</p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">






                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        {/* Image container */}
                        <div className="flex items-center justify-center rounded-lg bg-gray-100 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-gray-900">
                            {product.name}
                        </h2>
                        <p className="mt-1 flex-1 text-sm text-gray-500">
                            {product.description}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">
                            ${product.price.toFixed(2)}
                        </p>
                        <Link to="/cart">

                            <button
                                onClick={() => handleAddToCart(product)}
                                className={`mt-4 rounded-lg px-4 py-2 text-sm font-medium transition ${addedId === product.id
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-900 text-white hover:bg-gray-700'
                                    }`}
                            >
                                {addedId === product.id ? 'Added ✓' : 'Add to Cart'}
                            </button>

                        </Link>


                    </div>
                ))}







            </div>
        </div>
    )
}