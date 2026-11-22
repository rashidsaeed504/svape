import { useState, useEffect } from 'react'
import { getReviews, createReview, deleteReview } from '../../lib/api'
import toast from 'react-hot-toast'
import { HiPlus, HiTrash, HiX, HiCheck } from 'react-icons/hi'

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    city: 'DHA Phase 5, Lahore',
    text: '',
    bg_color: '#FFD83D',
    rotation: '-2deg',
    is_active: true
  })

  useEffect(() => {
    loadReviews()
  }, [])

  async function loadReviews() {
    setLoading(true)
    const data = await getReviews()
    setReviews(data)
    setLoading(false)
  }

  const handleAddReview = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.text.trim()) {
      toast.error('Reviewer name and comment are required')
      return
    }

    try {
      await createReview(formData)
      toast.success('Customer review added to homepage!')
      setIsModalOpen(false)
      setFormData({
        name: '',
        city: 'Lahore',
        text: '',
        bg_color: '#FFD83D',
        rotation: '-2deg',
        is_active: true
      })
      loadReviews()
    } catch (err) {
      toast.error('Failed to save review')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this customer testimonial?')) {
      try {
        await deleteReview(id)
        toast.success('Review removed')
        loadReviews()
      } catch (err) {
        toast.error('Failed to delete review')
      }
    }
  }

  const colorOptions = [
    { label: 'Yellow Sticky', code: '#FFD83D' },
    { label: 'White Sticky', code: '#FFFFFF' },
    { label: 'Mint Sticky', code: '#2FD6A1' },
    { label: 'Pink Sticky', code: '#FF5CA8' }
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="disp text-3xl sm:text-4xl text-[#14121A]">
            Manage Customer Reviews
          </h1>
          <p className="text-xs sm:text-sm text-[#14121A]/70 font-semibold mt-1">
            Handwritten "Lahore says" sticky notes displayed on the homepage.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn self-start sm:self-auto inline-flex items-center gap-2 bg-[#2F4BFF] text-white px-6 py-3 rounded-full font-bold text-sm shadow-[4px_4px_0_#14121A]"
        >
          <HiPlus size={18} />
          <span>Add New Review Note</span>
        </button>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="py-20 text-center font-bold text-gray-500">Loading reviews...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={rev.id || i}
              className="bg-white border-3 border-[#14121A] rounded-3xl p-6 shadow-[5px_6px_0_#14121A] flex flex-col justify-between"
            >
              {/* Note Preview */}
              <div
                className="p-6 rounded-2xl border-2 border-[#14121A] mb-4 relative min-h-[160px] flex flex-col justify-between"
                style={{ backgroundColor: rev.bg_color || '#FFD83D' }}
              >
                <p
                  className="text-xl font-bold leading-snug"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  "{rev.text}"
                </p>

                <div className="text-xs font-bold pt-2 border-t border-black/10">
                  {rev.name}, <span className="opacity-70">{rev.city || 'Lahore'}</span>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                  Active on Homepage
                </span>

                <button
                  onClick={() => handleDelete(rev.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-300"
                  title="Delete review"
                >
                  <HiTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FBF7EE] border-4 border-[#14121A] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[8px_10px_0_#14121A]">
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#14121A]/10 mb-6">
              <h2 className="disp text-2xl text-[#14121A]">Add Review Note</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-[#14121A] text-white rounded-full hover:bg-red-500"
              >
                <HiX size={18} />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daniyal Sheikh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                  Location / Area in Lahore
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gulberg III, Lahore"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ordered at 2am, got it in 20 minutes! Super fast and 100% original."
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2 font-semibold text-sm focus:outline-none"
                />
              </div>

              {/* Color selection */}
              <div>
                <label className="block text-xs font-black uppercase text-[#14121A] mb-1.5">
                  Sticky Note Color
                </label>
                <div className="flex gap-3">
                  {colorOptions.map((c) => (
                    <button
                      type="button"
                      key={c.code}
                      onClick={() => setFormData({ ...formData, bg_color: c.code })}
                      className={`w-9 h-9 rounded-full border-2 border-[#14121A] transition-transform ${
                        formData.bg_color === c.code ? 'scale-115 ring-2 ring-offset-2 ring-black' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.code }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t-2 border-[#14121A]/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border-2 border-[#14121A] rounded-full font-bold text-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn flex-1 bg-[#14121A] text-[#FFD83D] py-3 rounded-full font-bold text-base hover:bg-[#2F4BFF] hover:text-white transition-all shadow-[3px_3px_0_#2FD6A1]"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
