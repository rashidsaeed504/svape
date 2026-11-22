export default function WhySvape() {
  const cards = [
    {
      num: '30',
      title: 'Minute delivery',
      desc: 'Free, anywhere in Lahore.',
      bg: '#FFD83D',
      color: '#14121A',
      r: '-3deg',
      delay: '0s'
    },
    {
      num: '100%',
      title: 'Authentic',
      desc: 'Only genuine products. No fakes.',
      bg: '#FF5CA8',
      color: '#14121A',
      r: '2deg',
      delay: '-1s'
    },
    {
      num: 'COD',
      title: 'Pay on arrival',
      desc: 'No upfront payment needed.',
      bg: '#2FD6A1',
      color: '#14121A',
      r: '-2deg',
      delay: '-2s'
    },
    {
      num: '24/7',
      title: 'Open 365 days',
      desc: 'Order any hour and track it.',
      bg: '#2F4BFF',
      color: '#FFFFFF',
      r: '3deg',
      delay: '-3s'
    }
  ]

  return (
    <section id="why" className="w-full bg-[#FBF7EE] py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16">
        <div className="text-sm font-bold tracking-widest uppercase text-[#14121A]/70 mb-3">
          The Svape difference
        </div>

        <h2 className="disp text-4xl sm:text-5xl md:text-6xl text-[#14121A] leading-tight mb-16 max-w-2xl">
          Fast. Genuine. No fuss.
        </h2>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="stk wig rounded-[36px] p-8 md:p-9 min-h-[300px] flex flex-col justify-between cursor-default"
              style={{
                backgroundColor: card.bg,
                color: card.color,
                '--r': card.r,
                animationDelay: card.delay
              }}
            >
              {/* Giant Stat Display */}
              <div className="disp text-6xl sm:text-7xl md:text-8xl leading-none">
                {card.num}
              </div>

              {/* Text Bottom */}
              <div>
                <h3 className="disp text-xl sm:text-2xl leading-tight">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base font-medium opacity-90 leading-snug">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
