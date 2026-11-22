import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../lib/api'

export default function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  const renderIcon = (slug) => {
    switch (slug) {
      case 'matcha':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 md:w-24 md:h-24 transition-transform group-hover:scale-110" aria-hidden="true">
            <ellipse cx="60" cy="62" rx="46" ry="11" fill="#E6F6B5" />
            <path d="M14 62 H106 C106 92 84 108 60 108 C36 108 14 92 14 62 Z" fill="#14121A" />
            <rect x="50" y="106" width="20" height="7" rx="3" fill="#14121A" />
          </svg>
        )
      case 'caffeine':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 md:w-24 md:h-24 transition-transform group-hover:scale-110" aria-hidden="true">
            <rect x="32" y="16" width="56" height="92" rx="14" fill="#FF5CA8" />
            <rect x="32" y="16" width="56" height="14" rx="7" fill="#14121A" />
            <path d="M64 38 L48 70 H60 L54 98 L76 60 H63 Z" fill="#14121A" />
          </svg>
        )
      case 'disposables':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 md:w-24 md:h-24 transition-transform group-hover:scale-110" aria-hidden="true">
            <rect x="52" y="4" width="16" height="16" rx="4" fill="#FFD83D" />
            <rect x="40" y="14" width="40" height="102" rx="20" fill="#FFD83D" />
            <rect x="54" y="44" width="12" height="38" rx="6" fill="#2F4BFF" />
          </svg>
        )
      case 'e-liquids':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 md:w-24 md:h-24 transition-transform group-hover:scale-110" aria-hidden="true">
            <rect x="46" y="6" width="28" height="18" rx="5" fill="#14121A" />
            <rect x="52" y="22" width="16" height="16" fill="#FFFFFF" />
            <rect x="28" y="36" width="64" height="76" rx="18" fill="#FFFFFF" />
            <rect x="40" y="58" width="40" height="34" rx="6" fill="#14121A" />
          </svg>
        )
      case 'devices':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 md:w-24 md:h-24 transition-transform group-hover:scale-110" aria-hidden="true">
            <rect x="40" y="6" width="40" height="28" rx="9" fill="#14121A" />
            <rect x="26" y="28" width="68" height="86" rx="20" fill="#2F4BFF" />
            <circle cx="60" cy="72" r="9" fill="#FFD83D" />
          </svg>
        )
      case 'accessories':
      default:
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 md:w-24 md:h-24 transition-transform group-hover:scale-110" aria-hidden="true">
            <rect x="48" y="10" width="7" height="22" rx="2" fill="#14121A" />
            <rect x="66" y="10" width="7" height="22" rx="2" fill="#14121A" />
            <rect x="36" y="30" width="48" height="44" rx="10" fill="#FFFFFF" />
            <path d="M60 74 C60 104 30 94 40 114" fill="none" stroke="#14121A" strokeWidth="5" strokeLinecap="round" />
          </svg>
        )
    }
  }

  // Predefined sticker angles for authentic feel
  const rotations = ['-3deg', '2.5deg', '-2deg', '3deg', '-3deg', '2deg']

  return (
    <section id="shop" className="w-full bg-[#FBF7EE] py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-sm font-bold tracking-widest uppercase text-[#14121A]/70 block mb-2">
              Browse Inventory
            </span>
            <h2 className="disp text-4xl sm:text-5xl md:text-6xl text-[#14121A] leading-tight">
              Pick your fix
            </h2>
          </div>
          <p className="text-lg md:text-xl font-medium text-[#14121A]/80 max-w-sm leading-relaxed">
            Six categories. All genuine. All delivered to your door in 30 minutes.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {categories.map((cat, index) => {
            const rot = rotations[index % rotations.length]
            const isWhiteText = cat.slug === 'disposables' || cat.bg_color === '#2F4BFF'

            return (
              <Link
                key={cat.id || cat.slug}
                to={`/shop/${cat.slug}`}
                className="group stk flex flex-col items-center justify-center text-center p-8 md:p-10 gap-3 aspect-square cursor-pointer transition-all"
                style={{
                  background: cat.bg_color || '#FFD83D',
                  borderRadius: cat.border_radius || '40px',
                  color: isWhiteText ? '#FFFFFF' : '#14121A',
                  '--r': rot
                }}
              >
                {/* SVG Icon */}
                <div className="mb-2">
                  {renderIcon(cat.slug)}
                </div>

                {/* Name */}
                <h3 className="disp text-2xl sm:text-3xl tracking-tight">
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base font-medium opacity-90 max-w-[240px] leading-snug">
                  {cat.description}
                </p>

                {/* Micro CTA */}
                <span className="mt-2 text-xs font-bold uppercase tracking-wider underline underline-offset-4 group-hover:scale-105 transition-transform">
                  Explore {cat.name} →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
