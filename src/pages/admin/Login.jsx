import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { HiLockClosed, HiMail, HiArrowLeft } from 'react-icons/hi'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back, Admin!')
      navigate('/admin')
    } catch (err) {
      console.warn('Supabase auth failed', err)
      toast.error(err.message || 'Login failed. Please check credentials.')
    } finally {
      setLoading(false)
    }
  }

  // 1-Click bypass for instant testing
  const handleDemoAccess = () => {
    toast.success('Logged in as Store Manager (Demo Mode)')
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-[#FBF7EE] flex flex-col justify-center items-center p-5">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="disp text-5xl text-[#14121A] lowercase tracking-tight">
            svape
          </Link>
          <p className="text-sm font-bold uppercase tracking-widest text-[#2F4BFF] mt-2">
            Store Management Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="stk bg-white rounded-3xl p-8 border-4 border-[#14121A] shadow-[8px_10px_0_#14121A]">
          <h2 className="disp text-2xl text-[#14121A] mb-6">Admin Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-[#14121A] mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  required
                  placeholder="admin@svape.pk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl pl-10 pr-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD83D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#14121A] mb-1.5">
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl pl-10 pr-4 py-3 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD83D]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-[#14121A] text-[#FFD83D] py-3.5 rounded-full font-bold text-base hover:bg-[#2F4BFF] hover:text-white transition-all shadow-[3px_4px_0_rgba(0,0,0,0.3)] disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In with Supabase'}
            </button>
          </form>

          {/* Demo Instant Access Button */}
          <div className="mt-6 pt-6 border-t-2 border-[#14121A]/10 text-center">
            <p className="text-xs text-[#14121A]/70 mb-3 font-medium">
              Testing locally without Supabase account yet?
            </p>
            <button
              onClick={handleDemoAccess}
              className="btn w-full bg-[#2FD6A1] text-[#14121A] py-3 rounded-full font-bold text-sm border-2 border-[#14121A] shadow-[3px_3px_0_#14121A]"
            >
              1-Click Instant Admin Access ⚡
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14121A]/70 hover:underline">
            <HiArrowLeft /> Back to Public Store
          </Link>
        </div>
      </div>
    </div>
  )
}
