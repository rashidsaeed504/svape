import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import { HiPlus, HiCheck } from 'react-icons/hi'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success(`${product.name} added to cart!`, {
      icon: '🛍️',
      style: {
        background: '#14121A',
        color: '#FFD83D',
        fontWeight: 'bold',
        border: '2px solid #FFD83D'
      }
    })
  }

  return (
    <div className="group stk bg-white rounded-3xl p-5 flex flex-col justify-between border-4 border-[#14121A] transition-all hover:scale-[1.02] shadow-[6px_8px_0_#14121A]">
      <Link to={`/product/${product.id || product.slug}`} className="block">
        {/* Product Image Frame */}
        <div className="relative w-full aspect-square bg-[#FBF7EE] rounded-2xl overflow-hidden border-2 border-[#14121A] mb-4 flex items-center justify-center p-4">
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=60'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
            loading="lazy"
          />

          {/* Badges */}
          {product.sale_price && (
            <span className="absolute top-2 left-2 bg-[#FF5CA8] text-white text-xs font-black uppercase px-2.5 py-1 rounded-full border border-[#14121A] shadow-[2px_2px_0_#14121A]">
              Sale
            </span>
          )}

          {product.featured && (
            <span className="absolute top-2 right-2 bg-[#FFD83D] text-[#14121A] text-xs font-black uppercase px-2.5 py-1 rounded-full border border-[#14121A] shadow-[2px_2px_0_#14121A]">
              Hot
            </span>
          )}
        </div>

        {/* Brand / Category */}
        <div className="flex items-center gap-2 mb-1.5">
          {product.brand && (
            <span className="text-xs font-bold uppercase text-[#14121A]/60">
              {product.brand}
            </span>
          )}
          {product.puffs && (
            <span className="text-[11px] font-bold bg-[#2FD6A1]/20 text-emerald-800 px-2 py-0.5 rounded-md">
              {product.puffs}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h4 className="disp text-lg text-[#14121A] line-clamp-2 leading-tight group-hover:text-[#2F4BFF] transition-colors mb-2">
          {product.name}
        </h4>

        {/* Flavor / Spec */}
        {product.flavor && (
          <p className="text-xs text-[#14121A]/70 font-medium mb-3">
            Flavor: <span className="font-bold text-[#14121A]">{product.flavor}</span>
          </p>
        )}
      </Link>

      {/* Pricing & Add to Cart */}
      <div className="pt-3 border-t-2 border-[#14121A]/10 flex items-center justify-between gap-3 mt-auto">
        <div>
          {product.sale_price ? (
            <div className="flex flex-col">
              <span className="text-xs line-through text-red-500 font-bold">
                Rs. {Number(product.price).toLocaleString()}
              </span>
              <span className="disp text-xl text-[#2F4BFF]">
                Rs. {Number(product.sale_price).toLocaleString()}
              </span>
            </div>
          ) : (
            <span className="disp text-xl text-[#14121A]">
              Rs. {Number(product.price).toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className="btn flex items-center gap-1.5 bg-[#14121A] text-[#FFD83D] px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm hover:bg-[#2F4BFF] hover:text-white transition-all shadow-[2px_3px_0_rgba(0,0,0,0.3)]"
          title="Add to cart"
        >
          <HiPlus className="text-base" />
          <span>Add</span>
        </button>
      </div>
    </div>
  )
}
