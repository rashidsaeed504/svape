import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/api'
import {
  HiTemplate,
  HiShoppingBag,
  HiViewGrid,
  HiClipboardList,
  HiChatAlt2,
  HiCog,
  HiLogout,
  HiExternalLink,
  HiMenu,
  HiX,
  HiDatabase
} from 'react-icons/hi'

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isSupa = isSupabaseConfigured()

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: HiTemplate },
    { label: 'Products', path: '/admin/products', icon: HiShoppingBag },
    { label: 'Categories', path: '/admin/categories', icon: HiViewGrid },
    { label: 'Orders', path: '/admin/orders', icon: HiClipboardList },
    { label: 'Reviews', path: '/admin/reviews', icon: HiChatAlt2 },
    { label: 'Settings & DB', path: '/admin/settings', icon: HiCog },
  ]

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      // ignore
    }
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col md:flex-row text-[#14121A]">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#14121A] text-white p-4 flex items-center justify-between">
        <Link to="/admin" className="disp text-2xl text-[#FFD83D] lowercase">
          svape admin
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#FFD83D]"
        >
          {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:flex flex-col justify-between w-full md:w-64 bg-[#14121A] text-[#FBF7EE] p-6 shrink-0 md:min-h-screen z-30`}
      >
        <div>
          {/* Brand */}
          <div className="pb-6 border-b border-white/10 mb-6 flex items-center justify-between">
            <Link to="/admin" className="disp text-3xl text-[#FFD83D] lowercase tracking-normal">
              svape
            </Link>
            <span className="text-[10px] font-bold uppercase bg-[#2FD6A1] text-[#14121A] px-2 py-0.5 rounded">
              Admin
            </span>
          </div>

          {/* Database Connection Pill */}
          <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs">
            <HiDatabase className={isSupa ? 'text-[#2FD6A1]' : 'text-[#FFD83D]'} size={18} />
            <div>
              <span className="block font-bold text-white">
                {isSupa ? 'Supabase Connected' : 'Local Storage Mode'}
              </span>
              <span className="text-[10px] opacity-70">
                {isSupa ? 'Live cloud sync' : 'Configure in .env'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 font-bold text-sm">
            {navItems.map((item) => {
              const Icon = item.icon
              const active =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path)

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? 'bg-[#FFD83D] text-[#14121A] shadow-[2px_2px_0_#2FD6A1]'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2 mt-6">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-white/80 hover:bg-white/10"
          >
            <span>View Public Website</span>
            <HiExternalLink size={16} />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <HiLogout size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
