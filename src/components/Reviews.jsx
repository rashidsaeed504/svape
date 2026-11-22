import { useState, useEffect } from 'react'
import { getReviews } from '../lib/api'

export default function Reviews() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getReviews().then(setReviews)
  }, [])

  const defaultRotations = ['-3deg', '2deg', '-2deg']
  const defaultColors = ['#FFD83D', '#FFFFFF', '#2FD6A1']

  return (
    <section id="reviews" className="w-full bg-[#FF5CA8] py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16">
        <h2 className="disp text-4xl sm:text-5xl md:text-6xl text-[#14121A] leading-tight mb-16">
          Lahore says
        </h2>

        {/* 3 Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {reviews.slice(0, 3).map((rev, i) => {
            const rot = rev.rotation || defaultRotations[i % defaultRotations.length]
            const bg = rev.bg_color || defaultColors[i % defaultColors.length]
            const tapeBg = bg === '#FFFFFF' ? '#FFD83D' : '#FFFFFF'

            return (
              <div
                key={rev.id || i}
                className="note relative p-8 sm:p-10 min-h-[320px] flex flex-col justify-between rounded-xl border-4 border-[#14121A]"
                style={{
                  backgroundColor: bg,
                  color: '#14121A',
                  '--r': rot
                }}
              >
                {/* Simulated Tape strip on top */}
                <div
                  className="absolute left-1/2 -top-4 -translate-x-1/2 w-32 h-8 opacity-75 shadow-sm border border-black/10"
                  style={{
                    backgroundColor: tapeBg,
                    transform: `rotate(${i % 2 === 0 ? '-3deg' : '2deg'})`
                  }}
                />

                {/* Handwritten review quote */}
                <p 
                  className="text-2xl sm:text-3xl font-bold leading-snug mt-4"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  "{rev.text}"
                </p>

                {/* Author attribution */}
                <div className="font-bold text-base text-[#14121A] pt-4 border-t-2 border-[#14121A]/20">
                  {rev.name}, <span className="opacity-70 font-medium">{rev.city || 'Lahore'}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
