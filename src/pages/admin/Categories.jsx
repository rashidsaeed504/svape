import { useState, useEffect } from 'react'
import { getCategories, createCategory, deleteCategory } from '../../lib/api'
import toast from 'react-hot-toast'
import { HiPlus, HiTrash, HiX, HiViewGrid } from 'react-icons/hi'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    bg_color: '#FFD83D',
    border_radius: '44px',
    sort_order: 1
  })

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    setLoading(true)
    const cats = await getCategories()
    setCategories(cats)
    setLoading(false)
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      toast.error('Category name is required')
      return
    }

    try {
      await createCategory(formData)
      toast.success('Category created!')
      setIsModalOpen(false)
      setFormData({
        name: '',
        slug: '',
        description: '',
        bg_color: '#FFD83D',
        border_radius: '44px',
        sort_order: categories.length + 1
      })
      loadCategories()
    } catch (err) {
      toast.error('Failed to create category')
    }
  }

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete category "${name}"? Products inside may become uncategorized.`)) {
      try {
        await deleteCategory(id)
        toast.success('Category deleted')
        loadCategories()
      } catch (err) {
        toast.error('Failed to delete category')
      }
    }
  }

  const colorOptions = [
    { label: 'Yellow', code: '#FFD83D' },
    { label: 'Mint', code: '#2FD6A1' },
    { label: 'Pink', code: '#FF5CA8' },
    { label: 'Blue', code: '#2F4BFF' },
    { label: 'Orange', code: '#FF7A2F' },
    { label: 'Purple', code: '#8E5CF2' },
    { label: 'White', code: '#FFFFFF' }
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="disp text-3xl sm:text-4xl text-[#14121A]">
            Manage Categories
          </h1>
          <p className="text-xs sm:text-sm text-[#14121A]/70 font-semibold mt-1">
            Organize products into customized stickers and shape profiles.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn self-start sm:self-auto inline-flex items-center gap-2 bg-[#2F4BFF] text-white px-6 py-3 rounded-full font-bold text-sm shadow-[4px_4px_0_#14121A]"
        >
          <HiPlus size={18} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid Display */}
      {loading ? (
        <div className="py-20 text-center font-bold text-gray-500">Loading categories...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const isWhiteText = cat.bg_color === '#2F4BFF'
            return (
              <div
                key={cat.id || cat.slug}
                className="bg-white border-3 border-[#14121A] rounded-3xl p-6 shadow-[5px_6px_0_#14121A] flex flex-col justify-between"
              >
                {/* Sticker Color & Shape Preview Card */}
                <div
                  className="w-full h-36 rounded-2xl border-3 border-[#14121A] flex flex-col items-center justify-center p-4 mb-4 shadow-inner text-center"
                  style={{
                    backgroundColor: cat.bg_color || '#FFD83D',
                    borderRadius: cat.border_radius || '30px',
                    color: isWhiteText ? '#FFFFFF' : '#14121A'
                  }}
                >
                  <span className="disp text-2xl">{cat.name}</span>
                  <span className="text-xs font-semibold opacity-80 mt-1 line-clamp-1">
                    {cat.description}
                  </span>
                </div>

                {/* Info & Metadata */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-500">/{cat.slug}</span>
                    <span className="text-xs font-bold bg-[#FBF7EE] border border-[#14121A] px-2 py-0.5 rounded">
                      Order: {cat.sort_order || 0}
                    </span>
                  </div>
                </div>

                {/* Action footer */}
                <div className="pt-3 border-t-2 border-[#14121A]/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#14121A]/70 flex items-center gap-1.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black inline-block"
                      style={{ backgroundColor: cat.bg_color }}
                    />
                    {cat.bg_color}
                  </span>

                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors border border-transparent hover:border-red-400"
                    title="Delete Category"
                  >
                    <HiTrash size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FBF7EE] border-4 border-[#14121A] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[8px_10px_0_#14121A]">
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#14121A]/10 mb-6">
              <h2 className="disp text-2xl text-[#14121A]">Add New Category</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-[#14121A] text-white rounded-full hover:bg-red-500"
              >
                <HiX size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nicotine Pouches"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    })
                  }
                  className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  placeholder="nicotine-pouches"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-mono text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Smoke-free white pouches in various strengths."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                />
              </div>

              {/* Color picker */}
              <div>
                <label className="block text-xs font-black uppercase text-[#14121A] mb-1.5">
                  Sticker Color Palette
                </label>
                <div className="flex flex-wrap gap-2.5">
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

              {/* Shape Border Radius */}
              <div>
                <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                  Sticker Shape Style
                </label>
                <select
                  value={formData.border_radius}
                  onChange={(e) => setFormData({ ...formData, border_radius: e.target.value })}
                  className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                >
                  <option value="50%">Perfect Circle (50%)</option>
                  <option value="44px">Rounded Soft Square (44px)</option>
                  <option value="60px 30px 60px 30px">Asymmetric Organic Pill</option>
                  <option value="30px 60px 30px 60px">Diagonal Organic Cut</option>
                  <option value="999px">Oval Capsule</option>
                </select>
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
