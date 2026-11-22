import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import ProductCard from '../components/ProductCard'
import { getProductById, getProducts } from '../lib/api'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import { HiPlus, HiMinus, HiTruck, HiShieldCheck, HiArrowLeft } from 'react-icons/hi'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    async function load() {
      setLoading(true)
      const prod = await getProductById(id)
      setProduct(prod)
      if (prod) {
        const all = await getProducts()
        setRelated(all.filter((p) => p.id !== prod.id).slice(0, 4))
      }
      setLoading(false)
      window.scrollTo(0, 0)
    }
    load()
  }, [id])

  const handleAdd = () => {
    if (!product) return
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    toast.success(`Added ${quantity} × ${product.name} to cart!`, {
      icon: '🚀',
      style: {
        background: '#14121A',
        color: '#FFD83D',
        fontWeight: 'bold',
        border: '2px solid #FFD83D'
      }
    })
    setCartOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF7EE] flex flex-col justify-between">
        <Navbar onOpenCart={() => setCartOpen(true)} />
        <div className="text-center py-32">
          <div className="disp text-4xl text-[#2F4BFF] animate-bounce">Loading product...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBF7EE] flex flex-col justify-between">
        <Navbar onOpenCart={() => setCartOpen(true)} />
        <div className="max-w-md mx-auto text-center py-32 px-5">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="disp text-3xl mb-4 text-[#14121A]">Product not found</h2>
          <Link to="/shop" className="btn bg-[#2F4BFF] text-white px-6 py-3 rounded-full font-bold">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBF7EE] text-[#14121A] flex flex-col">
      <Navbar onOpenCart={() => setCartOpen(true)} />

      <main className="max-w-[1440px] mx-auto px-5 md:px-16 py-10 flex-1 w-full">
        {/* Back Link */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 font-bold text-sm text-[#14121A]/70 hover:text-[#14121A] mb-8"
        >
          <HiArrowLeft /> Back to all products
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Product Image Sticker Frame */}
          <div className="stk bg-white rounded-3xl p-6 md:p-10 border-4 border-[#14121A] shadow-[8px_10px_0_#14121A]">
            <div className="relative aspect-square rounded-2xl bg-[#FBF7EE] border-2 border-[#14121A] overflow-hidden flex items-center justify-center p-6">
              <img
                src={product.image_url || 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=60'}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />

              {product.sale_price && (
                <div className="absolute top-4 left-4 bg-[#FF5CA8] text-white text-sm font-black px-4 py-1 rounded-full border-2 border-[#14121A] shadow-[3px_3px_0_#14121A]">
                  SALE
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info & Actions */}
          <div className="flex flex-col gap-6">
            {/* Category / Brand Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              {product.brand && (
                <span className="bg-[#14121A] text-[#FFD83D] text-xs font-bold uppercase px-3 py-1 rounded-full">
                  {product.brand}
                </span>
              )}
              {product.puffs && (
                <span className="bg-[#2FD6A1] text-[#14121A] text-xs font-bold px-3 py-1 rounded-full border border-[#14121A]">
                  {product.puffs}
                </span>
              )}
              {product.nicotine && (
                <span className="bg-[#FF7A2F] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#14121A]">
                  {product.nicotine}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="disp text-3xl sm:text-4xl md:text-5xl text-[#14121A] leading-tight">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline gap-4 py-2 border-y-2 border-[#14121A]/10">
              {product.sale_price ? (
                <>
                  <span className="disp text-4xl text-[#2F4BFF]">
                    Rs. {Number(product.sale_price).toLocaleString()}
                  </span>
                  <span className="text-xl line-through text-red-500 font-bold">
                    Rs. {Number(product.price).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="disp text-4xl text-[#14121A]">
                  Rs. {Number(product.price).toLocaleString()}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300">
                In Stock • Lahore Ready
              </span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#14121A]/80 leading-relaxed font-medium">
              {product.description || 'Authentic genuine product sourced directly from certified distributors. Comes in sealed factory packaging with anti-counterfeit QR scratch code.'}
            </p>

            {/* Quantity Selector + Add Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <div className="flex items-center justify-between border-3 border-[#14121A] rounded-full bg-white px-4 py-3 shadow-[3px_3px_0_#14121A]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-[#2F4BFF]"
                >
                  <HiMinus size={18} />
                </button>
                <span className="disp text-xl px-5">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-[#2F4BFF]"
                >
                  <HiPlus size={18} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="btn flex-1 bg-[#2F4BFF] text-white py-4 px-8 rounded-full font-bold text-lg shadow-[4px_5px_0_#14121A] hover:bg-[#1a34db] transition-all flex items-center justify-center gap-2"
              >
                <span>Add to Cart</span>
                <span>•</span>
                <span>
                  Rs. {((product.sale_price || product.price) * quantity).toLocaleString()}
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t-2 border-[#14121A]/10">
              <div className="flex items-center gap-3 p-4 bg-[#FFD83D]/30 border-2 border-[#14121A] rounded-2xl">
                <HiTruck className="text-3xl text-[#2F4BFF] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-[#14121A]">30-Minute Lahore Express</h4>
                  <p className="text-xs text-[#14121A]/70">DHA, Gulberg, Johar Town & all Lahore</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#2FD6A1]/30 border-2 border-[#14121A] rounded-2xl">
                <HiShieldCheck className="text-3xl text-emerald-800 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-[#14121A]">Cash on Delivery</h4>
                  <p className="text-xs text-[#14121A]/70">Inspect parcel before paying rider</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t-4 border-[#14121A]">
            <h3 className="disp text-3xl sm:text-4xl text-[#14121A] mb-8">
              You Might Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
