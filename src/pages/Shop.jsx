import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import ProductCard from '../components/ProductCard'
import { getProducts, getCategories } from '../lib/api'
import { HiSearch, HiFilter, HiX } from 'react-icons/hi'

export default function Shop() {
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCat, setSelectedCat] = useState(category || 'all')
  const [searchTerm, setSearchTerm] = useState(searchQuery)
  const [sortBy, setSortBy] = useState('featured')
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (category) {
      setSelectedCat(category)
    } else {
      setSelectedCat('all')
    }
  }, [category])

  useEffect(() => {
    setSearchTerm(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const [cats, prods] = await Promise.all([getCategories(), getProducts()])
      setCategories(cats)
      setProducts(prods)
      setLoading(false)
    }
    loadData()
  }, [])

  // Filter products
  const filteredProducts = products.filter((prod) => {
    const matchesCat =
      selectedCat === 'all' ||
      prod.category_slug === selectedCat ||
      prod.category_id === selectedCat

    const term = searchTerm.toLowerCase().trim()
    const matchesSearch =
      !term ||
      prod.name.toLowerCase().includes(term) ||
      (prod.flavor && prod.flavor.toLowerCase().includes(term)) ||
      (prod.brand && prod.brand.toLowerCase().includes(term)) ||
      (prod.description && prod.description.toLowerCase().includes(term))

    return matchesCat && matchesSearch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.sale_price || a.price
    const priceB = b.sale_price || b.price
    if (sortBy === 'low-high') return priceA - priceB
    if (sortBy === 'high-low') return priceB - priceA
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  })

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      setSearchParams({ search: searchTerm })
    } else {
      setSearchParams({})
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-[#FBF7EE] text-[#14121A] flex flex-col">
      <Navbar onOpenCart={() => setCartOpen(true)} />

      {/* Hero Banner Header */}
      <div className="bg-[#2F4BFF] text-white py-12 md:py-16 border-b-4 border-[#14121A]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#FFD83D] block mb-2">
                100% Genuine • Lahore 30-Min Delivery
              </span>
              <h1 className="disp text-4xl sm:text-5xl md:text-6xl text-white">
                The Svape Menu
              </h1>
            </div>

            {/* Live Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search flavors, pods, devices, matcha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-[#14121A] font-semibold text-sm sm:text-base py-3.5 pl-5 pr-12 rounded-full border-3 border-[#14121A] shadow-[4px_4px_0_#FFD83D] focus:outline-none focus:ring-4 focus:ring-[#FFD83D]"
              />
              {searchTerm ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  <HiX size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14121A]"
                >
                  <HiSearch size={22} />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-5 md:px-16 py-12 flex-1 w-full">
        {/* Filters and Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-10 pb-6 border-b-2 border-[#14121A]/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap border-2 border-[#14121A] transition-all shadow-[2px_2px_0_#14121A] ${
                selectedCat === 'all'
                  ? 'bg-[#14121A] text-[#FFD83D]'
                  : 'bg-white text-[#14121A] hover:bg-[#FFD83D]'
              }`}
            >
              All Items ({products.length})
            </button>

            {categories.map((c) => (
              <button
                key={c.id || c.slug}
                onClick={() => setSelectedCat(c.slug)}
                className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap border-2 border-[#14121A] transition-all shadow-[2px_2px_0_#14121A] ${
                  selectedCat === c.slug
                    ? 'bg-[#14121A] text-[#FFD83D]'
                    : 'bg-white text-[#14121A] hover:bg-[#FFD83D]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <span className="text-xs font-bold uppercase text-[#14121A]/70 flex items-center gap-1">
              <HiFilter /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border-2 border-[#14121A] text-[#14121A] font-bold text-xs sm:text-sm rounded-xl px-3 py-2 shadow-[2px_2px_0_#14121A] focus:outline-none"
            >
              <option value="featured">Featured & Hot</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Search indicator badge */}
        {searchTerm && (
          <div className="mb-6 inline-flex items-center gap-2 bg-[#FFD83D] border-2 border-[#14121A] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-[2px_2px_0_#14121A]">
            <span>Showing results for: "{searchTerm}"</span>
            <button onClick={clearSearch} className="hover:text-red-600">
              <HiX size={16} />
            </button>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="disp text-3xl animate-pulse text-[#2F4BFF]">
              Loading freshest drops...
            </div>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="py-20 bg-white border-4 border-[#14121A] rounded-3xl p-10 text-center max-w-lg mx-auto shadow-[6px_8px_0_#14121A]">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="disp text-2xl text-[#14121A] mb-2">No products found</h3>
            <p className="text-sm text-[#14121A]/70 mb-6 font-medium">
              We couldn't find anything matching your filters. Try another flavor or clear search.
            </p>
            <button
              onClick={() => {
                setSelectedCat('all')
                clearSearch()
              }}
              className="btn bg-[#2F4BFF] text-white px-6 py-3 rounded-full font-bold text-sm shadow-[3px_4px_0_#14121A]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {sortedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
