import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { HiX, HiPlus, HiMinus, HiTrash, HiArrowRight } from 'react-icons/hi'

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart } = useCart()
  const total = getCartTotal()
  const count = getCartCount()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 transition-opacity backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF7EE] border-l-4 border-[#14121A] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 bg-[#FFD83D] border-b-4 border-[#14121A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="disp text-2xl text-[#14121A]">Your Cart</span>
              <span className="bg-[#14121A] text-[#FFD83D] text-xs font-bold px-2.5 py-1 rounded-full">
                {count} {count === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-[#14121A] text-white rounded-full hover:bg-red-500 transition-colors"
            >
              <HiX size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 bg-[#FFD83D] rounded-full border-3 border-[#14121A] flex items-center justify-center text-3xl mb-4 shadow-[4px_4px_0_#14121A]">
                  🛒
                </div>
                <h3 className="disp text-2xl text-[#14121A] mb-2">Cart is empty</h3>
                <p className="text-sm text-[#14121A]/70 max-w-xs mb-6">
                  Add genuine disposables, matcha, or caffeine to enjoy 30-min Lahore delivery.
                </p>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="btn bg-[#2F4BFF] text-white px-6 py-3 rounded-full font-bold text-sm shadow-[3px_4px_0_#14121A]"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-3 border-[#14121A] rounded-2xl p-4 flex gap-4 shadow-[3px_4px_0_#14121A] items-center"
                >
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=60'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl border border-[#14121A]"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[#14121A] truncate">
                      {item.name}
                    </h4>
                    <p className="disp text-sm text-[#2F4BFF] mt-0.5">
                      Rs. {Number(item.price).toLocaleString()}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="inline-flex items-center border-2 border-[#14121A] rounded-lg bg-[#FBF7EE] text-xs font-bold">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-[#FFD83D]"
                        >
                          <HiMinus size={12} />
                        </button>
                        <span className="px-3 py-1 font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-[#FFD83D]"
                        >
                          <HiPlus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Remove"
                      >
                        <HiTrash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t-4 border-[#14121A] space-y-4">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-[#14121A]/70">Delivery to Lahore</span>
                <span className="text-emerald-600 font-bold uppercase bg-emerald-100 px-2 py-0.5 rounded">
                  Free (30 Mins)
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-[#14121A]/10">
                <span className="disp text-xl text-[#14121A]">Total</span>
                <span className="disp text-2xl text-[#2F4BFF]">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="px-4 py-3 border-2 border-[#14121A] rounded-full font-bold text-xs text-[#14121A] hover:bg-red-50"
                >
                  Clear
                </button>

                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="btn flex-1 bg-[#14121A] text-[#FFD83D] py-4 rounded-full font-bold text-center flex items-center justify-center gap-2 hover:bg-[#2F4BFF] hover:text-white transition-all shadow-[4px_4px_0_#2FD6A1]"
                >
                  <span>Proceed to Checkout</span>
                  <HiArrowRight />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
