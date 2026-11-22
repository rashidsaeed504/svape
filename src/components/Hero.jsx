import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="w-full bg-[#FFD83D] overflow-hidden pt-6 pb-16 md:pb-28">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
        {/* Left Copy & Actions */}
        <div className="flex-1 max-w-[620px] text-left w-full">
          {/* Eyebrow badge */}
          <div className="inline-block bg-[#14121A] text-[#FFD83D] px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-6 rotate-[-2deg] shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
            Lahore. 30-minute delivery.
          </div>

          {/* Main Title */}
          <h1 className="disp text-4xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95] text-[#14121A] tracking-tight">
            <span className="block">Your fix,</span>
            <span className="block text-[#2F4BFF]">delivered.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 md:mt-7 text-base sm:text-lg md:text-xl text-[#14121A] font-medium leading-relaxed max-w-[500px]">
            Disposables, devices, e-liquids, matcha and caffeine at your door in 30 minutes. Free delivery, pay cash when it arrives.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8 md:mt-9">
            <Link
              to="/shop"
              className="btn inline-flex items-center justify-center bg-[#2F4BFF] text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-xl shadow-[5px_6px_0_#14121A] hover:bg-[#1f37cc] transition-all"
            >
              Just Svape it.
            </Link>
            <a
              href="#why"
              className="btn px-6 py-4 font-bold text-base md:text-lg text-[#14121A] hover:underline"
            >
              Why Svape →
            </a>
          </div>
        </div>

        {/* Right Sticker Composition */}
        <div className="hero-vis-container mt-6 lg:mt-0">
          <div className="hero-vis">
            {/* 1. Tall Blue Device */}
            <div
              className="stk stk-hero"
              style={{
                position: 'absolute',
                left: '150px',
                top: '90px',
                width: '190px',
                height: '440px',
                background: '#2F4BFF',
                borderRadius: '95px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '--r': '-8deg',
                '--d': '.1s'
              }}
            >
              <div
                className="disp"
                style={{
                  color: '#FFFFFF',
                  fontSize: '38px',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  textTransform: 'lowercase'
                }}
              >
                svape
              </div>
            </div>

            {/* Device Mouthpiece / Cap */}
            <div
              className="stk stk-hero"
              style={{
                position: 'absolute',
                left: '197px',
                top: '30px',
                width: '70px',
                height: '70px',
                background: '#14121A',
                borderRadius: '18px 18px 0 0',
                borderBottom: 0,
                boxShadow: 'none',
                '--r': '-8deg',
                '--d': '.1s'
              }}
            />

            {/* 2. Starburst Badge (30 min) */}
            <div
              className="stk-hero"
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                width: '230px',
                height: '230px',
                '--r': '10deg',
                '--d': '.35s'
              }}
            >
              <div
                className="burst"
                style={{
                  width: '230px',
                  height: '230px',
                  transform: 'rotate(10deg)'
                }}
              >
                <i style={{ background: '#FFFFFF', transform: 'scale(1.08)' }} />
                <i style={{ background: '#FFFFFF', transform: 'rotate(30deg) scale(1.08)' }} />
                <i style={{ background: '#FFFFFF', transform: 'rotate(60deg) scale(1.08)' }} />
                <i style={{ background: '#FF5CA8' }} />
                <i style={{ background: '#FF5CA8', transform: 'rotate(30deg)' }} />
                <i style={{ background: '#FF5CA8', transform: 'rotate(60deg)' }} />
                <div
                  className="disp"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    lineHeight: 0.95
                  }}
                >
                  <span style={{ fontSize: '64px' }}>30</span>
                  <span style={{ fontSize: '26px' }}>min</span>
                </div>
              </div>
            </div>

            {/* 3. Mint Circle "Cash on Delivery" */}
            <div
              className="stk stk-hero"
              style={{
                position: 'absolute',
                left: '0px',
                top: '360px',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: '#2FD6A1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '--r': '-10deg',
                '--d': '.55s'
              }}
            >
              <div className="disp" style={{ fontSize: '20px', lineHeight: 1 }}>
                Cash on<br />delivery
              </div>
            </div>

            {/* 4. Black Circle "18+" */}
            <div
              className="stk stk-hero"
              style={{
                position: 'absolute',
                right: '0px',
                top: '330px',
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                background: '#14121A',
                color: '#FFD83D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '--r': '12deg',
                '--d': '.7s'
              }}
            >
              <div className="disp" style={{ fontSize: '34px' }}>
                18+
              </div>
            </div>

            {/* 5. Orange Pill "Mango" */}
            <div
              className="stk stk-hero"
              style={{
                position: 'absolute',
                right: '60px',
                top: '500px',
                width: '200px',
                height: '84px',
                borderRadius: '999px',
                background: '#FF7A2F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '--r': '6deg',
                '--d': '.85s'
              }}
            >
              <div className="disp" style={{ fontSize: '24px' }}>
                Mango
              </div>
            </div>

            {/* 6. Purple Pill "Grape" */}
            <div
              className="stk stk-hero"
              style={{
                position: 'absolute',
                left: '30px',
                top: '540px',
                width: '190px',
                height: '84px',
                borderRadius: '999px',
                background: '#8E5CF2',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '--r': '-6deg',
                '--d': '1s'
              }}
            >
              <div className="disp" style={{ fontSize: '24px' }}>
                Grape
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
