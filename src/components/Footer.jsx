import { Link } from 'react-router-dom'
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-[#14121A] text-[#FBF7EE] pt-20 md:pt-28 pb-0 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16">
        {/* Top Header & WhatsApp CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-16 border-b border-white/10">
          <h2 className="disp text-4xl sm:text-5xl md:text-6xl text-[#FFD83D] max-w-xl leading-tight">
            Just Svape it.
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://wa.me/923275550770"
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-3 bg-[#FFD83D] text-[#14121A] px-7 py-4 rounded-full font-bold text-base md:text-lg shadow-[4px_4px_0_#2FD6A1] hover:bg-[#2FD6A1] transition-all"
            >
              <FaWhatsapp className="text-2xl text-emerald-700" />
              <span>WhatsApp 0327 5550770</span>
            </a>

            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm font-semibold opacity-85">
              <FaPhoneAlt className="text-xs" />
              <span>UAN: 0304 1117929</span>
            </div>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 text-sm font-medium">
          {/* Col 1: Store info */}
          <div className="flex flex-col gap-4">
            <div className="disp text-2xl text-[#FFD83D] lowercase tracking-normal">
              svape
            </div>
            <p className="opacity-80 leading-relaxed max-w-xs">
              Pakistan's curated niche products. 30-minute expedited delivery across Lahore with Cash on Delivery.
            </p>
            <p className="opacity-70 text-xs leading-relaxed">
              90/18 Broadway, Block B, DHA Phase 8, Lahore 54910.<br />
              <span className="text-[#FFD83D]">purchasing@svape.pk</span>
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-white text-base mb-2">Quick links</span>
            <Link to="/shop" className="opacity-80 hover:opacity-100 hover:text-[#FFD83D] transition-colors">Shop all products</Link>
            <Link to="/checkout" className="opacity-80 hover:opacity-100 hover:text-[#FFD83D] transition-colors">Track order & Cart</Link>
            <a href="/#why" className="opacity-80 hover:opacity-100 hover:text-[#FFD83D] transition-colors">Why Svape</a>
            <a href="/#referral" className="opacity-80 hover:opacity-100 hover:text-[#FFD83D] transition-colors">Referral program (Give 10%, Get 15%)</a>
            <a href="/#reviews" className="opacity-80 hover:opacity-100 hover:text-[#FFD83D] transition-colors">Customer reviews</a>
            <Link to="/admin" className="text-[#2FD6A1] font-bold hover:underline mt-1">Admin Portal →</Link>
          </div>

          {/* Col 3: Categories */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-white text-base mb-2">Categories</span>
            <Link to="/shop/matcha" className="opacity-80 hover:opacity-100 hover:text-[#2FD6A1] transition-colors">Matcha (Ceremonial)</Link>
            <Link to="/shop/caffeine" className="opacity-80 hover:opacity-100 hover:text-[#FFD83D] transition-colors">Caffeine (Inhalers & Sticks)</Link>
            <Link to="/shop/disposables" className="opacity-80 hover:opacity-100 hover:text-[#2F4BFF] transition-colors">Disposables (7k - 15k Puffs)</Link>
            <Link to="/shop/e-liquids" className="opacity-80 hover:opacity-100 hover:text-[#FF5CA8] transition-colors">E-liquids (Salt Nic & Freebase)</Link>
            <Link to="/shop/devices" className="opacity-80 hover:opacity-100 hover:text-white transition-colors">Devices & Pod Kits</Link>
            <Link to="/shop/accessories" className="opacity-80 hover:opacity-100 hover:text-[#FF7A2F] transition-colors">Accessories & Coils</Link>
          </div>

          {/* Col 4: Policies */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-white text-base mb-2">Policies</span>
            <a href="#contact" className="opacity-70 hover:opacity-100">Privacy Policy</a>
            <a href="#contact" className="opacity-70 hover:opacity-100">Return and Refund</a>
            <a href="#contact" className="opacity-70 hover:opacity-100">30-Min Shipping Lahore</a>
            <a href="#contact" className="opacity-70 hover:opacity-100">Cash on Delivery Terms</a>
            <a href="#contact" className="opacity-70 hover:opacity-100">Authenticity Guarantee</a>
            <a href="#contact" className="opacity-70 hover:opacity-100">Terms of Service</a>
          </div>
        </div>

        {/* 18+ Warning Notice */}
        <div className="pt-8 pb-4 border-t border-white/10 text-xs sm:text-sm opacity-70 leading-relaxed max-w-4xl">
          <strong className="text-red-400">18+ ONLY. AGE RESTRICTED:</strong> You must be 18 years or older to purchase nicotine products. WARNING: This product contains nicotine. Nicotine is an addictive chemical. Keep strictly out of reach of children and pets.
        </div>
      </div>

      {/* Huge Decorative Lowercase "svape svape" Banner */}
      <div className="w-full overflow-hidden select-none pointer-events-none mt-6">
        <div className="disp text-[#FFD83D] text-[120px] sm:text-[180px] md:text-[250px] lg:text-[300px] leading-[0.75] whitespace-nowrap lowercase tracking-tighter opacity-95 translate-y-3">
          svape svape
        </div>
      </div>
    </footer>
  )
}
