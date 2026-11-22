import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { createOrder } from '../lib/api'
import toast from 'react-hot-toast'
import { HiCheckCircle, HiTruck, HiArrowLeft, HiShieldCheck } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    area: 'DHA Phase 5 & 6',
    notes: '',
    couponCode: ''
  })

  const [discountPercent, setDiscountPercent] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)

  const subtotal = getCartTotal()
  const discountAmount = Math.round((subtotal * discountPercent) / 100)
  const finalTotal = subtotal - discountAmount

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    const code = formData.couponCode.trim().toUpperCase()
    if (!code) return

    if (code.includes('SVAPE') || code.includes('10') || code === 'FIRST10' || code === 'LAHORE10') {
      setDiscountPercent(10)
      toast.success('10% Referral Discount Applied!', {
        icon: '🎉',
        style: { background: '#2FD6A1', color: '#14121A', fontWeight: 'bold' }
      })
    } else {
      toast.error('Invalid coupon code')
    }
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      toast.error('Please fill in your name, phone and delivery address')
      return
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setSubmitting(true)
    try {
      const orderPayload = {
        customer_name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: `${formData.address.trim()}, ${formData.area}, Lahore`,
        city: 'Lahore',
        notes: formData.notes.trim() || null,
        total: finalTotal,
        payment_method: 'cod',
        status: 'pending',
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      }

      const res = await createOrder(orderPayload)
      setPlacedOrder({
        ...orderPayload,
        id: res.id || `ord-${Date.now()}`
      })
      clearCart()
      toast.success('Order placed successfully! Delivery rider dispatched.')
    } catch (err) {
      console.error(err)
      toast.error('Failed to submit order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // If order was just placed, show confirmation screen
  if (placedOrder) {
    const waMessage = encodeURIComponent(
      `Hello Svape! I just placed order #${placedOrder.id} for Rs. ${placedOrder.total}. Name: ${placedOrder.customer_name}. Address: ${placedOrder.address}. Please dispatch soon!`
    )

    return (
      <div className="min-h-screen bg-[#FBF7EE] text-[#14121A] flex flex-col justify-between">
        <Navbar />
        <main className="max-w-2xl mx-auto px-5 py-16 flex-1 w-full text-center">
          <div className="stk bg-white rounded-3xl p-8 md:p-12 border-4 border-[#14121A] shadow-[8px_10px_0_#14121A]">
            <div className="w-24 h-24 bg-[#2FD6A1] rounded-full border-4 border-[#14121A] mx-auto flex items-center justify-center text-5xl mb-6 shadow-[4px_4px_0_#14121A]">
              ✓
            </div>

            <div className="inline-block bg-[#FFD83D] text-[#14121A] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-[#14121A]">
              Order Placed • 30-Min Delivery Dispatched
            </div>

            <h1 className="disp text-3xl sm:text-4xl text-[#14121A] mb-2">
              Thank You, {placedOrder.customer_name}!
            </h1>

            <p className="text-base text-[#14121A]/80 mb-6 font-medium">
              Your order <strong className="font-mono text-[#2F4BFF]">#{placedOrder.id}</strong> has been received. Our rider in Lahore is preparing your parcel with Cash on Delivery.
            </p>

            {/* Order Summary Box */}
            <div className="bg-[#FBF7EE] border-2 border-[#14121A] rounded-2xl p-6 text-left mb-8 space-y-3">
              <div className="flex justify-between font-bold text-sm">
                <span>Payment:</span>
                <span className="text-emerald-700 uppercase">Cash on Delivery (COD)</span>
              </div>
              <div className="flex justify-between font-bold text-sm">
                <span>Delivery Address:</span>
                <span className="text-right max-w-[260px] truncate">{placedOrder.address}</span>
              </div>
              <div className="flex justify-between font-bold text-sm">
                <span>Phone:</span>
                <span>{placedOrder.phone}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-3 border-t border-[#14121A]/20">
                <span className="disp">Total Amount:</span>
                <span className="disp text-xl text-[#2F4BFF]">
                  Rs. {placedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* WhatsApp live status tracking */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/923275550770?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center justify-center gap-2 bg-[#2FD6A1] text-[#14121A] px-6 py-4 rounded-full font-bold text-sm sm:text-base border-2 border-[#14121A] shadow-[4px_4px_0_#14121A]"
              >
                <FaWhatsapp className="text-xl text-emerald-800" />
                <span>Track Rider on WhatsApp</span>
              </a>

              <Link
                to="/shop"
                className="btn inline-flex items-center justify-center px-6 py-4 rounded-full font-bold text-sm sm:text-base bg-[#14121A] text-white hover:bg-[#2F4BFF]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBF7EE] text-[#14121A] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-12 py-10 flex-1 w-full">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 font-bold text-sm text-[#14121A]/70 hover:text-[#14121A] mb-8"
        >
          <HiArrowLeft /> Back to Shop
        </Link>

        <h1 className="disp text-3xl sm:text-4xl md:text-5xl text-[#14121A] mb-10">
          Fast Checkout
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white border-4 border-[#14121A] rounded-3xl p-12 text-center max-w-lg mx-auto shadow-[6px_8px_0_#14121A]">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="disp text-2xl mb-2">Your cart is empty</h2>
            <p className="text-sm text-[#14121A]/70 mb-6">
              Pick your fix first from our selection of disposables, matcha, and devices.
            </p>
            <Link
              to="/shop"
              className="btn bg-[#2F4BFF] text-white px-8 py-3.5 rounded-full font-bold text-base shadow-[3px_4px_0_#14121A]"
            >
              Go to Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 cols: Checkout Form */}
            <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
              <div className="bg-white border-4 border-[#14121A] rounded-3xl p-6 sm:p-8 shadow-[6px_8px_0_#14121A]">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-8 rounded-full bg-[#FFD83D] border-2 border-[#14121A] font-black text-sm flex items-center justify-center">
                    1
                  </span>
                  <h2 className="disp text-xl sm:text-2xl text-[#14121A]">
                    Delivery Details (Lahore Only)
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-[#14121A] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ali Ahmed"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD83D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-[#14121A] mb-1.5">
                      Phone Number (for Rider WhatsApp/Call) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0321 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD83D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-[#14121A] mb-1.5">
                      Lahore Area / Sector *
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD83D]"
                    >
                      <option>DHA Phase 1-6</option>
                      <option>DHA Phase 7-8 & Raya</option>
                      <option>Gulberg & MM Alam</option>
                      <option>Model Town & Garden Town</option>
                      <option>Johar Town & Faisal Town</option>
                      <option>Cantt & Cavalry Ground</option>
                      <option>Wapda Town & Valencia</option>
                      <option>Bahria Town Lahore</option>
                      <option>Other Lahore Area</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-[#14121A] mb-1.5">
                      Complete Street Address / House No. *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House #, Street #, Sector / Block, Landmark"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD83D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-[#14121A] mb-1.5">
                      Rider Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ring bell twice, deliver at rear gate"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD83D]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white border-4 border-[#14121A] rounded-3xl p-6 sm:p-8 shadow-[6px_8px_0_#14121A]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-[#2FD6A1] border-2 border-[#14121A] font-black text-sm flex items-center justify-center">
                    2
                  </span>
                  <h2 className="disp text-xl sm:text-2xl text-[#14121A]">
                    Payment Method
                  </h2>
                </div>

                <div className="p-4 rounded-2xl bg-[#2FD6A1]/20 border-2 border-[#14121A] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked
                      readOnly
                      className="w-5 h-5 accent-[#14121A]"
                    />
                    <div>
                      <span className="font-bold text-sm block">Cash on Delivery (COD)</span>
                      <span className="text-xs text-[#14121A]/70">Pay when your rider hands over parcel</span>
                    </div>
                  </div>
                  <span className="disp text-sm text-[#14121A] bg-white px-2.5 py-1 rounded-md border border-[#14121A]">
                    COD
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="btn w-full bg-[#2F4BFF] text-white py-5 rounded-full font-bold text-xl shadow-[5px_6px_0_#14121A] hover:bg-[#1f37cc] transition-all disabled:opacity-50"
              >
                {submitting ? 'Placing Order...' : `Confirm & Place Order (Rs. ${finalTotal.toLocaleString()})`}
              </button>
            </form>

            {/* Right 5 cols: Order Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border-4 border-[#14121A] rounded-3xl p-6 sm:p-8 shadow-[6px_8px_0_#14121A]">
                <h3 className="disp text-xl text-[#14121A] pb-4 border-b-2 border-[#14121A]/10 mb-4">
                  Order Summary ({cart.length})
                </h3>

                {/* Items */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex-1 pr-3 truncate">
                        <span className="font-bold">{item.quantity}×</span> {item.name}
                      </div>
                      <span className="font-bold text-[#14121A] font-mono whitespace-nowrap">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Input */}
                <div className="pt-6 mt-6 border-t-2 border-[#14121A]/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Referral / Promo code"
                      value={formData.couponCode}
                      onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                      className="flex-1 bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-3 py-2 text-xs font-bold uppercase focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="btn px-4 py-2 bg-[#FFD83D] border-2 border-[#14121A] rounded-xl font-bold text-xs shadow-[2px_2px_0_#14121A]"
                    >
                      Apply
                    </button>
                  </div>
                  {discountPercent > 0 && (
                    <p className="text-xs text-emerald-700 font-bold mt-2">
                      ✓ {discountPercent}% discount active!
                    </p>
                  )}
                </div>

                {/* Financial Totals */}
                <div className="pt-6 mt-6 border-t-2 border-[#14121A]/10 space-y-2.5 text-sm font-semibold">
                  <div className="flex justify-between text-[#14121A]/70">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Referral Discount (10%)</span>
                      <span>- Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#14121A]/70">
                    <span>Delivery (Lahore 30-min express)</span>
                    <span className="text-emerald-700 font-bold uppercase bg-emerald-100 px-2 py-0.5 rounded text-xs">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-4 border-t-2 border-[#14121A] text-lg">
                    <span className="disp text-xl">Total Payable:</span>
                    <span className="disp text-2xl text-[#2F4BFF]">
                      Rs. {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Express guarantee badge */}
              <div className="p-5 bg-[#FFD83D] border-3 border-[#14121A] rounded-2xl flex items-center gap-3 shadow-[4px_4px_0_#14121A]">
                <HiTruck className="text-3xl text-[#14121A] shrink-0" />
                <p className="text-xs font-bold text-[#14121A] leading-tight">
                  Dispatched within 5 minutes of order placement. Delivered directly to your gate in 30 minutes anywhere in Lahore!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
