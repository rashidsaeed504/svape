export default function Marquee() {
  const pinkItems = [
    'Cash on delivery',
    'Open 24/7, 365',
    'Free delivery',
    'Track your order',
    'Cash on delivery',
    'Open 24/7, 365',
    'Free delivery',
    'Track your order'
  ]

  const blackItems = [
    { text: 'Your fix, delivered', color: '#FFD83D' },
    { text: '30 minutes in Lahore', color: '#FFFFFF' },
    { text: 'Just Svape it', color: '#FFD83D' },
    { text: '100% authentic', color: '#FFFFFF' },
    { text: 'Your fix, delivered', color: '#FFD83D' },
    { text: '30 minutes in Lahore', color: '#FFFFFF' },
    { text: 'Just Svape it', color: '#FFD83D' },
    { text: '100% authentic', color: '#FFFFFF' }
  ]

  return (
    <div className="relative h-[190px] md:h-[220px] overflow-hidden bg-[#FBF7EE] select-none my-2">
      {/* Pink Strip (Reverse Animation) */}
      <div 
        className="absolute left-[-10%] w-[120%] top-[72px] md:top-[80px] bg-[#FF5CA8] py-3.5 md:py-4 overflow-hidden border-y-4 border-[#14121A] z-10"
        style={{ transform: 'rotate(2.5deg)' }}
      >
        <div className="marquee rev disp text-2xl md:text-3xl text-[#14121A] whitespace-nowrap">
          {pinkItems.map((item, i) => (
            <span key={i} className="pr-10 inline-block font-bold">
              {item}
            </span>
          ))}
          {pinkItems.map((item, i) => (
            <span key={`dup-${i}`} className="pr-10 inline-block font-bold">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Black Strip (Normal Forward Animation) */}
      <div 
        className="absolute left-[-10%] w-[120%] top-[40px] md:top-[48px] bg-[#14121A] py-3.5 md:py-4 overflow-hidden border-y-4 border-white shadow-[0_6px_0_#FBF7EE] z-20"
        style={{ transform: 'rotate(-2.5deg)' }}
      >
        <div className="marquee disp text-2xl md:text-4xl whitespace-nowrap">
          {blackItems.map((item, i) => (
            <span 
              key={i} 
              className="pr-10 inline-block font-bold"
              style={{ color: item.color }}
            >
              {item.text}
            </span>
          ))}
          {blackItems.map((item, i) => (
            <span 
              key={`dup-${i}`} 
              className="pr-10 inline-block font-bold"
              style={{ color: item.color }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
