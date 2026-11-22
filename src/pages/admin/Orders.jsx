import { useState, useEffect } from 'react'
import { getOrders, updateOrderStatus } from '../../lib/api'
import toast from 'react-hot-toast'
import {
  HiSearch,
  HiEye,
  HiX,
  HiCheck,
  HiTruck,
  HiClock,
  HiBan
} from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    setLoading(true)
    const data = await getOrders()
    setOrders(data)
    setLoading(false)
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus })
      }
      toast.success(`Order marked as ${newStatus}`)
    } catch (err) {
      toast.error('Failed to update order status')
    }
  }

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

  const filtered = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter
    const term = searchTerm.toLowerCase().trim()
    const matchesSearch =
      !term ||
      o.customer_name?.toLowerCase().includes(term) ||
      o.phone?.includes(term) ||
      o.address?.toLowerCase().includes(term) ||
      o.id?.toLowerCase().includes(term)
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="disp text-3xl sm:text-4xl text-[#14121A]">
            Customer Orders
          </h1>
          <p className="text-xs sm:text-sm text-[#14121A]/70 font-semibold mt-1">
            Dispatch, track, and manage 30-min Cash on Delivery orders in Lahore.
          </p>
        </div>

        <button
          onClick={loadOrders}
          className="btn self-start sm:self-auto px-5 py-2.5 bg-white border-2 border-[#14121A] rounded-full font-bold text-xs sm:text-sm shadow-[2px_2px_0_#14121A] hover:bg-[#FFD83D]"
        >
          Refresh Orders 🔄
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-3 border-[#14121A] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[4px_4px_0_#14121A]">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by customer, phone, order #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm font-semibold focus:outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          {['all', 'pending', 'confirmed', 'delivering', 'delivered', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 border-[#14121A] capitalize whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-[#14121A] text-[#FFD83D]'
                  : 'bg-white text-[#14121A] hover:bg-[#FFD83D]'
              }`}
            >
              {st} ({orders.filter((o) => (st === 'all' ? true : o.status === st)).length})
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border-3 border-[#14121A] rounded-3xl p-6 shadow-[6px_8px_0_#14121A]">
        {loading ? (
          <div className="py-16 text-center font-bold text-gray-500">Loading orders...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center font-bold text-gray-500">No matching orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-[#14121A] text-xs font-black uppercase text-[#14121A]">
                  <th className="py-3 px-3">Order</th>
                  <th className="py-3 px-3">Customer Details</th>
                  <th className="py-3 px-3">Delivery Address</th>
                  <th className="py-3 px-3">Total (COD)</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14121A]/10 font-medium">
                {filtered.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FBF7EE]">
                    {/* Order ID & Date */}
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-xs text-[#2F4BFF] block">
                        #{ord.id}
                      </span>
                      <span className="text-[11px] text-gray-500 block">
                        {ord.created_at ? new Date(ord.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-3">
                      <span className="font-bold text-sm text-[#14121A] block">
                        {ord.customer_name}
                      </span>
                      <a
                        href={`https://wa.me/92${ord.phone?.replace(/[^0-9]/g, '').slice(-10)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-emerald-700 font-mono hover:underline"
                      >
                        <FaWhatsapp /> {ord.phone}
                      </a>
                    </td>

                    {/* Address */}
                    <td className="py-3 px-3 text-xs max-w-xs text-gray-700">
                      <p className="line-clamp-2">{ord.address}</p>
                      {ord.notes && (
                        <span className="text-[10px] bg-[#FFD83D]/60 px-1.5 py-0.5 rounded text-black font-semibold mt-0.5 inline-block">
                          Note: {ord.notes}
                        </span>
                      )}
                    </td>

                    {/* Total */}
                    <td className="py-3 px-3 font-mono font-bold text-sm text-[#14121A]">
                      Rs. {Number(ord.total).toLocaleString()}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-3">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className={`text-xs font-bold uppercase rounded-full px-2.5 py-1 border focus:outline-none cursor-pointer ${getStatusBadge(
                          ord.status
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="delivering">Delivering (30 Min)</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="btn inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#14121A] text-[#FFD83D] rounded-lg text-xs font-bold shadow-[2px_2px_0_#2FD6A1] hover:bg-[#2F4BFF] hover:text-white"
                      >
                        <HiEye size={14} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FBF7EE] border-4 border-[#14121A] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[8px_10px_0_#14121A]">
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#14121A]/10 mb-6">
              <div>
                <span className="font-mono font-bold text-xs text-[#2F4BFF]">
                  #{selectedOrder.id}
                </span>
                <h2 className="disp text-2xl text-[#14121A]">Order Details</h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 bg-[#14121A] text-white rounded-full hover:bg-red-500"
              >
                <HiX size={18} />
              </button>
            </div>

            <div className="space-y-4 text-sm font-medium">
              {/* Customer Info Card */}
              <div className="bg-white border-2 border-[#14121A] rounded-2xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-xs font-bold uppercase">Customer:</span>
                  <span className="font-bold">{selectedOrder.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-xs font-bold uppercase">Phone:</span>
                  <span className="font-mono font-bold">{selectedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-xs font-bold uppercase">Delivery Address:</span>
                  <span className="text-right max-w-[220px] font-semibold">{selectedOrder.address}</span>
                </div>
                {selectedOrder.notes && (
                  <div className="flex justify-between pt-2 border-t border-gray-100">
                    <span className="text-gray-500 text-xs font-bold uppercase">Rider Note:</span>
                    <span className="text-right font-semibold text-amber-800">{selectedOrder.notes}</span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="bg-white border-2 border-[#14121A] rounded-2xl p-4">
                <span className="text-xs font-black uppercase text-[#14121A] block mb-3">
                  Ordered Items
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div>
                          <span className="font-bold">{item.quantity}×</span> {item.product_name || item.name}
                        </div>
                        <span className="font-mono font-bold">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">Standard delivery item</p>
                  )}
                </div>

                <div className="pt-3 border-t-2 border-[#14121A] flex justify-between items-baseline mt-3">
                  <span className="disp text-base">Total Payable:</span>
                  <span className="disp text-xl text-[#2F4BFF]">
                    Rs. {Number(selectedOrder.total).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Fast WhatsApp Message Button */}
              <a
                href={`https://wa.me/92${selectedOrder.phone?.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(
                  `Hello ${selectedOrder.customer_name}! Your Svape order #${selectedOrder.id} has been dispatched with our Lahore express delivery rider.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn w-full bg-[#2FD6A1] text-[#14121A] py-3.5 rounded-full font-bold text-center flex items-center justify-center gap-2 border-2 border-[#14121A] shadow-[3px_3px_0_#14121A]"
              >
                <FaWhatsapp size={20} />
                <span>Text Customer on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
