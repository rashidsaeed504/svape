import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { HiMenu, HiX, HiShoppingBag, HiShieldCheck } from 'react-icons/hi'

export default function Navbar({ onOpenCart }) {
  const { getCartCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = getCartCount()

  return (
    <nav id="top" className="w-full bg-[#FFD83D] border-b-4 border-[#14121A] sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-4 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="disp text-3xl md:text-4xl lowercase text-[#14121A] tracking-tight hover:rotate-[-2deg] transition-transform"
        >
          svape
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-bold text-base text-[#14121A]">
          <Link to="/" className="nav-link hover:text-[#2F4BFF]">Home</Link>
          <Link to="/shop" className="nav-link hover:text-[#2F4BFF]">Shop</Link>
          <a href="/#why" className="nav-link hover:text-[#2F4BFF]">About</a>
          <a href="/#referral" className="nav-link hover:text-[#2F4BFF]">Referral</a>
          <a href="/#reviews" className="nav-link hover:text-[#2F4BFF]">Reviews</a>
          <a href="/#contact" className="nav-link hover:text-[#2F4BFF]">Contact</a>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-white text-[#14121A] border-2 border-[#14121A] rounded-full shadow-[2px_2px_0_#14121A] hover:bg-[#2FD6A1] transition-colors"
            title="Admin Portal"
          >
            <HiShieldCheck className="text-base" />
            <span>Admin</span>
          </Link>

          <button
            onClick={onOpenCart}
            className="btn flex items-center gap-2 bg-[#14121A] text-[#FFD83D] px-5 py-2.5 rounded-full font-bold text-sm md:text-base shadow-[3px_4px_0_rgba(0,0,0,0.3)] hover:bg-[#2F4BFF] hover:text-white transition-all"
          >
            <HiShoppingBag className="text-lg" />
            <span>Cart ({cartCount})</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-[#14121A] text-white rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFD83D] border-t-2 border-[#14121A] px-6 py-6 flex flex-col gap-4 font-bold text-lg text-[#14121A]">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#14121A]/20"
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#14121A]/20"
          >
            Shop All Products
          </Link>
          <a 
            href="/#why" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#14121A]/20"
          >
            About & Difference
          </a>
          <a 
            href="/#referral" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#14121A]/20"
          >
            Referral Program (Give 10%, Get 15%)
          </a>
          <a 
            href="/#reviews" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#14121A]/20"
          >
            Reviews & Testimonials
          </a>
          <a 
            href="/#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#14121A]/20"
          >
            Contact & 24/7 WhatsApp
          </a>
          <Link 
            to="/admin" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 mt-2 inline-flex items-center gap-2 text-[#2F4BFF]"
          >
            <HiShieldCheck size={20} />
            Admin Portal
          </Link>
        </div>
      )}
    </nav>
  )
}
