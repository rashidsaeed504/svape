import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VibePicker() {
  const [selectedMood, setSelectedMood] = useState(0)
  const navigate = useNavigate()

  const fruitMap = {
    strawberry: { name: 'Straw-berry', color: '#FF5CA8', fg: '#14121A' },
    mango: { name: 'Mango', color: '#FF7A2F', fg: '#14121A' },
    blueberry: { name: 'Blue-berry', color: '#14121A', fg: '#FFD83D' },
    grape: { name: 'Grape', color: '#8E5CF2', fg: '#FFFFFF' },
    peach: { name: 'Peach', color: '#FFB38A', fg: '#14121A' },
    apple: { name: 'Green apple', color: '#7BE04F', fg: '#14121A' }
  }

  const moods = [
    { label: 'Cool', fruits: ['blueberry', 'grape', 'apple'] },
    { label: 'Sweet', fruits: ['strawberry', 'peach', 'grape'] },
    { label: 'Tropical', fruits: ['mango', 'peach', 'strawberry'] },
    { label: 'Fresh', fruits: ['apple', 'blueberry', 'mango'] }
  ]

  const slots = [
    { left: '4%', top: '8%', size: '220px', rot: '-8deg' },
    { left: '50%', top: '4%', size: '180px', rot: '9deg' },
    { left: '26%', top: '50%', size: '200px', rot: '-4deg' }
  ]

  const activeFruits = moods[selectedMood].fruits.map((key, i) => ({
    ...fruitMap[key],
    rawKey: key,
    ...slots[i]
  }))

  const handleFruitClick = (fruitName) => {
    navigate(`/shop?search=${encodeURIComponent(fruitName)}`)
  }

  return (
    <section id="vibe" className="w-full bg-[#2F4BFF] text-white py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 flex flex-col lg:flex-row items-center gap-12 md:gap-20">
        {/* Left Column */}
        <div className="flex-1 max-w-[500px] flex flex-col gap-6 text-left w-full">
          <div className="text-sm font-bold tracking-widest uppercase text-[#FFD83D]">
            Shop by flavor
          </div>

          <h2 className="disp text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
            Pick your vibe
          </h2>

          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90 font-medium">
            Find the flavor that matches your mood. Choose one and see what is waiting in stock for instant delivery.
          </p>

          {/* Mood Pills */}
          <div className="flex flex-wrap gap-3 pt-2">
            {moods.map((m, idx) => {
              const isSelected = selectedMood === idx
              return (
                <button
                  key={m.label}
                  onClick={() => setSelectedMood(idx)}
                  className="mood cursor-pointer text-sm sm:text-base px-5 sm:px-7 py-3 sm:py-4"
                  style={{
                    background: isSelected ? '#FFD83D' : '#FFFFFF',
                    color: '#14121A'
                  }}
                >
                  {m.label}
                </button>
              )
            })}
          </div>

          <p className="text-xs text-white/70 tracking-wide uppercase font-semibold pt-1">
            Click any flavor sticker to shop immediately
          </p>
        </div>

        {/* Right Floating Stickers */}
        <div className="vibe-vis-container">
          <div className="vibe-vis">
            {activeFruits.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                onClick={() => handleFruitClick(item.name)}
                className="stk absolute rounded-full flex items-center justify-center text-center p-4 cursor-pointer hover:scale-110 select-none shadow-[5px_6px_0_#14121A]"
                style={{
                  left: item.left,
                  top: item.top,
                  width: item.size,
                  height: item.size,
                  backgroundColor: item.color,
                  color: item.fg,
                  '--r': item.rot
                }}
              >
                <span className="disp text-xl sm:text-2xl leading-none">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
