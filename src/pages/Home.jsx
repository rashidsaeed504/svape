import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Categories from '../components/Categories'
import VibePicker from '../components/VibePicker'
import WhySvape from '../components/WhySvape'
import Referral from '../components/Referral'
import Reviews from '../components/Reviews'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../lib/api'

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    getProducts().then((all) => {
      setFeaturedProducts(all.slice(0, 4))
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#FBF7EE] text-[#14121A] flex flex-col">
      <Navbar onOpenCart={() => setCartOpen(true)} />

      <main className="flex-1">
        <Hero />
        <Marquee />
        <Categories />

        {/* Featured Products Showcase Section */}
        <section className="w-full bg-[#FBF7EE] py-16 md:py-24 border-t-4 border-[#14121A]">
          <div className="max-w-[1440px] mx-auto px-5 md:px-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-sm font-bold tracking-widest uppercase text-[#2F4BFF] block mb-2">
                  Best Sellers in Lahore
                </span>
                <h2 className="disp text-3xl sm:text-4xl md:text-5xl text-[#14121A]">
                  Fresh Drops & Trending
                </h2>
              </div>
              <Link
                to="/shop"
                className="btn self-start sm:self-auto inline-flex items-center gap-2 bg-[#FFD83D] text-[#14121A] px-6 py-3 rounded-full font-bold border-2 border-[#14121A] shadow-[3px_3px_0_#14121A] hover:bg-[#2FD6A1]"
              >
                View Full Menu →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <VibePicker />
        <WhySvape />
        <Referral />
        <Reviews />
      </main>

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
