import { useState } from 'react'
import toast from 'react-hot-toast'
import { HiCheck, HiClipboardCopy } from 'react-icons/hi'

export default function Referral() {
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [refName, setRefName] = useState('')
  const [generatedCode, setGeneratedCode] = useState('SVAPE15-LAHORE')

  const handleGenerate = (e) => {
    e.preventDefault()
    if (!refName.trim()) {
      toast.error('Please enter your name or phone')
      return
    }
    const clean = refName.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
    const code = `SVAPE-${clean || 'VIP'}`
    setGeneratedCode(code)
    setShowModal(true)
    toast.success('Your referral code is ready!')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    toast.success('Referral code copied to clipboard!')
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="referral" className="w-full bg-[#2FD6A1] text-[#14121A] py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16">
        <div className="text-sm font-bold tracking-widest uppercase text-[#14121A]/70 mb-3">
          Referral program
        </div>

        <h2 className="disp text-4xl sm:text-5xl md:text-6xl text-[#14121A] leading-tight mb-14 max-w-2xl">
          Give 10%. Get 15%.
        </h2>

        {/* Dual Ticket Box */}
        <div className="ticket flex flex-col md:flex-row max-w-[1050px] shadow-[8px_8px_0_#14121A] border-4 border-[#14121A] rounded-2xl overflow-hidden">
          {/* Left Half (White) */}
          <div className="flex-1 bg-white p-8 sm:p-12 md:p-16 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-dashed border-[#14121A]">
            <div className="disp text-7xl sm:text-8xl md:text-9xl leading-none text-[#2F4BFF]">
              10%
            </div>
            <p className="mt-4 text-xl sm:text-2xl font-bold text-[#14121A] leading-snug">
              off for your friend's first order
            </p>
            <p className="mt-2 text-sm text-[#14121A]/70 font-medium">
              Applied automatically at checkout with zero minimum cart requirement.
            </p>
          </div>

          {/* Right Half (Yellow) */}
          <div className="flex-1 bg-[#FFD83D] p-8 sm:p-12 md:p-16 flex flex-col justify-center">
            <div className="disp text-7xl sm:text-8xl md:text-9xl leading-none text-[#14121A]">
              15%
            </div>
            <p className="mt-4 text-xl sm:text-2xl font-bold text-[#14121A] leading-snug">
              of their order value, paid to you as cash
            </p>
            <p className="mt-2 text-sm text-[#14121A]/70 font-medium">
              Transferred directly via JazzCash, EasyPaisa, or Raast on delivery.
            </p>
          </div>
        </div>

        {/* Action Form */}
        <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-md">
          <input
            type="text"
            placeholder="Enter your name or nickname"
            value={refName}
            onChange={(e) => setRefName(e.target.value)}
            className="px-6 py-4 rounded-full bg-white border-3 border-[#14121A] font-bold text-[#14121A] placeholder:text-[#14121A]/50 focus:outline-none focus:ring-4 focus:ring-[#FFD83D] shadow-[4px_4px_0_#14121A]"
          />
          <button
            onClick={handleGenerate}
            className="btn whitespace-nowrap bg-[#14121A] text-[#FBF7EE] px-8 py-4 rounded-full font-bold text-base md:text-lg shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:bg-[#2F4BFF] transition-all"
          >
            Get my code
          </button>
        </div>
      </div>

      {/* Code Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FBF7EE] border-4 border-[#14121A] rounded-3xl p-8 max-w-md w-full shadow-[8px_10px_0_#14121A] relative text-center">
            <div className="disp text-3xl mb-2 text-[#14121A]">
              Your Referral Code
            </div>
            <p className="text-sm text-[#14121A]/80 mb-6 font-medium">
              Share this code with friends. They save 10%, you get 15% cash payout on every order!
            </p>

            <div className="bg-[#FFD83D] border-3 border-[#14121A] rounded-2xl py-4 px-6 flex items-center justify-between mb-6 shadow-[4px_4px_0_#14121A]">
              <span className="disp text-2xl tracking-wider text-[#14121A]">
                {generatedCode}
              </span>
              <button
                onClick={copyToClipboard}
                className="btn p-2 bg-[#14121A] text-white rounded-xl hover:bg-[#2F4BFF]"
                title="Copy code"
              >
                {copied ? <HiCheck size={22} className="text-[#2FD6A1]" /> : <HiClipboardCopy size={22} />}
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="btn w-full bg-[#14121A] text-white py-3.5 rounded-full font-bold text-base"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
