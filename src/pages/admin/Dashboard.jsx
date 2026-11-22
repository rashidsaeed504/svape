import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOrders, getProducts, getCategories } from '../../lib/api'
import {
  HiShoppingBag,
  HiCurrencyDollar,
  HiClipboardList,
  HiViewGrid,
  HiPlus,
  HiArrowRight
} from 'react-icons/hi'

export default function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      setLoading(true)
      const [o, p, c] = await Promise.all([getOrders(), getProducts(), getCategories()])
      setOrders(o)
      setProducts(p)
      setCategories(c)
      setLoading(false)
    }
    loadStats()
  }, [])

  const totalSales = orders.reduce((sum, o) => sum + Number(o.total || 0), 0)
  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const recentOrders = orders.slice(0, 5)

  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300'
      case 'delivering':
        return 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse'
      case 'confirmed':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'pending':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300'
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="disp text-3xl sm:text-4xl text-[#14121A]">
            Dashboard Overview
          </h1>
          <p className="text-sm text-[#14121A]/70 font-semibold mt-1">
            Real-time orders, store metrics and Lahore delivery tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="btn inline-flex items-center gap-2 bg-[#2F4BFF] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-[3px_3px_0_#14121A]"
          >
            <HiPlus /> Add Product
          </Link>
          <Link
            to="/admin/orders"
            className="btn inline-flex items-center gap-2 bg-[#FFD83D] text-[#14121A] px-5 py-2.5 rounded-full font-bold text-sm border-2 border-[#14121A] shadow-[3px_3px_0_#14121A]"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales */}
        <div className="bg-white border-3 border-[#14121A] rounded-2xl p-6 shadow-[4px_5px_0_#14121A] flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase text-[#14121A]/60">Total Revenue</span>
            <div className="disp text-2xl sm:text-3xl text-[#2F4BFF] mt-1">
              Rs. {totalSales.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-600 font-bold">100% Cash on Delivery</span>
          </div>
          <div className="w-12 h-12 bg-[#2FD6A1] rounded-xl border-2 border-[#14121A] flex items-center justify-center text-xl">
            <HiCurrencyDollar />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white border-3 border-[#14121A] rounded-2xl p-6 shadow-[4px_5px_0_#14121A] flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase text-[#14121A]/60">Total Orders</span>
            <div className="disp text-2xl sm:text-3xl text-[#14121A] mt-1">
              {orders.length}
            </div>
            <span className="text-[11px] text-amber-600 font-bold">
              {pendingOrders} awaiting dispatch
            </span>
          </div>
          <div className="w-12 h-12 bg-[#FFD83D] rounded-xl border-2 border-[#14121A] flex items-center justify-center text-xl">
            <HiClipboardList />
          </div>
        </div>

        {/* Products */}
        <div className="bg-white border-3 border-[#14121A] rounded-2xl p-6 shadow-[4px_5px_0_#14121A] flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase text-[#14121A]/60">Active Products</span>
            <div className="disp text-2xl sm:text-3xl text-[#14121A] mt-1">
              {products.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-bold">In stock</span>
          </div>
          <div className="w-12 h-12 bg-[#FF5CA8] rounded-xl border-2 border-[#14121A] flex items-center justify-center text-xl text-white">
            <HiShoppingBag />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white border-3 border-[#14121A] rounded-2xl p-6 shadow-[4px_5px_0_#14121A] flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase text-[#14121A]/60">Categories</span>
            <div className="disp text-2xl sm:text-3xl text-[#14121A] mt-1">
              {categories.length}
            </div>
            <span className="text-[11px] text-blue-600 font-bold">Vape, Matcha, Caffeine</span>
          </div>
          <div className="w-12 h-12 bg-[#2F4BFF] text-white rounded-xl border-2 border-[#14121A] flex items-center justify-center text-xl">
            <HiViewGrid />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white border-3 border-[#14121A] rounded-3xl p-6 sm:p-8 shadow-[6px_8px_0_#14121A]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#14121A]/10">
          <div>
            <h2 className="disp text-xl sm:text-2xl text-[#14121A]">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-[#14121A]/60 font-semibold">
              Latest 30-min delivery dispatches in Lahore
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-[#2F4BFF] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <HiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm font-bold text-gray-500">
            Loading orders...
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="py-12 text-center text-sm font-bold text-gray-500">
            No orders placed yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-[#14121A] text-xs font-black uppercase text-[#14121A]">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Phone</th>
                  <th className="py-3 px-3">Address</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14121A]/10 font-medium">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FBF7EE]">
                    <td className="py-3 px-3 font-mono font-bold text-xs text-[#2F4BFF]">
                      #{ord.id}
                    </td>
                    <td className="py-3 px-3 font-bold text-[#14121A]">
                      {ord.customer_name}
                    </td>
                    <td className="py-3 px-3 text-xs font-mono">
                      {ord.phone}
                    </td>
                    <td className="py-3 px-3 text-xs max-w-xs truncate text-gray-600">
                      {ord.address}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${getStatusBadge(
                          ord.status
                        )}`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-[#14121A]">
                      Rs. {Number(ord.total).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
