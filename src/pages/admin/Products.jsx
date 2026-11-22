import { useState, useEffect } from 'react'
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct } from '../../lib/api'
import toast from 'react-hot-toast'
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiSearch,
  HiCheck,
  HiX,
  HiTag,
  HiPhotograph
} from 'react-icons/hi'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCat, setSelectedCat] = useState('all')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_slug: 'disposables',
    category_id: '',
    price: '',
    sale_price: '',
    puffs: '',
    nicotine: '',
    flavor: '',
    brand: '',
    description: '',
    image_url: '',
    in_stock: true,
    featured: false
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [p, c] = await Promise.all([getProducts(), getCategories()])
    setProducts(p)
    setCategories(c)
    setLoading(false)
  }

  const openAddModal = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      slug: '',
      category_slug: categories[0]?.slug || 'disposables',
      category_id: categories[0]?.id || '',
      price: '',
      sale_price: '',
      puffs: '',
      nicotine: '',
      flavor: '',
      brand: '',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=60',
      in_stock: true,
      featured: false
    })
    setIsModalOpen(true)
  }

  const openEditModal = (p) => {
    setEditingProduct(p)
    setFormData({
      name: p.name || '',
      slug: p.slug || '',
      category_slug: p.category_slug || 'disposables',
      category_id: p.category_id || '',
      price: p.price || '',
      sale_price: p.sale_price || '',
      puffs: p.puffs || '',
      nicotine: p.nicotine || '',
      flavor: p.flavor || '',
      brand: p.brand || '',
      description: p.description || '',
      image_url: p.image_url || '',
      in_stock: p.in_stock !== false,
      featured: Boolean(p.featured)
    })
    setIsModalOpen(true)
  }

  const handleSaveProduct = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.price) {
      toast.error('Product name and price are required')
      return
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          ...formData,
          price: Number(formData.price),
          sale_price: formData.sale_price ? Number(formData.sale_price) : null
        })
        toast.success('Product updated successfully!')
      } else {
        await createProduct({
          ...formData,
          price: Number(formData.price),
          sale_price: formData.sale_price ? Number(formData.sale_price) : null
        })
        toast.success('New product created!')
      }
      setIsModalOpen(false)
      loadData()
    } catch (err) {
      console.error(err)
      toast.error('Failed to save product')
    }
  }

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id)
        toast.success('Product removed')
        loadData()
      } catch (err) {
        toast.error('Failed to delete product')
      }
    }
  }

  const handleToggleStock = async (product) => {
    const updated = !product.in_stock
    await updateProduct(product.id, { in_stock: updated })
    setProducts(products.map((p) => (p.id === product.id ? { ...p, in_stock: updated } : p)))
    toast.success(updated ? 'Product marked In Stock' : 'Product marked Out of Stock')
  }

  // Filter products
  const filtered = products.filter((p) => {
    const matchesCat = selectedCat === 'all' || p.category_slug === selectedCat
    const matchesSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.flavor && p.flavor.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCat && matchesSearch
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="disp text-3xl sm:text-4xl text-[#14121A]">
            Manage Products
          </h1>
          <p className="text-xs sm:text-sm text-[#14121A]/70 font-semibold mt-1">
            Add new inventory, update pricing, flavors, and in-stock visibility.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn self-start sm:self-auto inline-flex items-center gap-2 bg-[#2F4BFF] text-white px-6 py-3 rounded-full font-bold text-sm shadow-[4px_4px_0_#14121A]"
        >
          <HiPlus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-3 border-[#14121A] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[4px_4px_0_#14121A]">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, brand, flavor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm font-semibold focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 border-[#14121A] whitespace-nowrap transition-all ${
              selectedCat === 'all'
                ? 'bg-[#14121A] text-[#FFD83D]'
                : 'bg-white text-[#14121A] hover:bg-[#FFD83D]'
            }`}
          >
            All ({products.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSelectedCat(c.slug)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 border-[#14121A] whitespace-nowrap transition-all ${
                selectedCat === c.slug
                  ? 'bg-[#14121A] text-[#FFD83D]'
                  : 'bg-white text-[#14121A] hover:bg-[#FFD83D]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white border-3 border-[#14121A] rounded-3xl p-6 shadow-[6px_8px_0_#14121A]">
        {loading ? (
          <div className="py-16 text-center text-sm font-bold text-gray-500">
            Loading product catalog...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm font-bold text-gray-500">
            No products match the selected criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-[#14121A] text-xs font-black uppercase text-[#14121A]">
                  <th className="py-3 px-3">Item</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Puffs / Specs</th>
                  <th className="py-3 px-3">Stock Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14121A]/10 font-medium">
                {filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#FBF7EE]">
                    {/* Item */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image_url || 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=60'}
                          alt={prod.name}
                          className="w-12 h-12 object-cover rounded-xl border border-[#14121A] shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-sm text-[#14121A] block truncate max-w-[220px]">
                            {prod.name}
                          </span>
                          <span className="text-[11px] text-gray-500 block">
                            {prod.brand || 'Svape Exclusive'} {prod.flavor ? `• ${prod.flavor}` : ''}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3">
                      <span className="inline-block bg-[#FBF7EE] text-[#14121A] text-xs font-bold uppercase px-2.5 py-1 rounded-md border border-[#14121A]">
                        {prod.category_slug || 'General'}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-3 font-mono">
                      {prod.sale_price ? (
                        <div>
                          <span className="text-xs line-through text-red-500 block">
                            Rs. {Number(prod.price).toLocaleString()}
                          </span>
                          <span className="font-bold text-[#2F4BFF]">
                            Rs. {Number(prod.sale_price).toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold">
                          Rs. {Number(prod.price).toLocaleString()}
                        </span>
                      )}
                    </td>

                    {/* Specs */}
                    <td className="py-3 px-3 text-xs">
                      {prod.puffs && (
                        <span className="block font-bold text-emerald-700">{prod.puffs}</span>
                      )}
                      {prod.nicotine && (
                        <span className="block text-gray-500">{prod.nicotine}</span>
                      )}
                      {!prod.puffs && !prod.nicotine && <span className="text-gray-400">—</span>}
                    </td>

                    {/* Stock status toggle */}
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleToggleStock(prod)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                          prod.in_stock !== false
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                            : 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200'
                        }`}
                      >
                        {prod.in_stock !== false ? <HiCheck size={14} /> : <HiX size={14} />}
                        <span>{prod.in_stock !== false ? 'In Stock' : 'Out of Stock'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-2 bg-[#FFD83D] text-[#14121A] border-2 border-[#14121A] rounded-lg shadow-[2px_2px_0_#14121A] hover:bg-[#2FD6A1]"
                          title="Edit"
                        >
                          <HiPencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id, prod.name)}
                          className="p-2 bg-red-100 text-red-600 border-2 border-[#14121A] rounded-lg shadow-[2px_2px_0_#14121A] hover:bg-red-200"
                          title="Delete"
                        >
                          <HiTrash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FBF7EE] border-4 border-[#14121A] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-[8px_10px_0_#14121A] my-8">
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#14121A]/10 mb-6">
              <h2 className="disp text-2xl text-[#14121A]">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-[#14121A] text-white rounded-full hover:bg-red-500"
              >
                <HiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Svape Grape Mint 9000 Puffs"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category_slug}
                    onChange={(e) => {
                      const selected = categories.find((c) => c.slug === e.target.value)
                      setFormData({
                        ...formData,
                        category_slug: e.target.value,
                        category_id: selected?.id || ''
                      })
                    }}
                    className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Elf Bar, Uwell, Tokyo"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                  />
                </div>

                {/* Regular Price */}
                <div>
                  <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                    Regular Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="3500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none font-mono"
                  />
                </div>

                {/* Sale Price */}
                <div>
                  <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                    Sale Price (PKR Optional)
                  </label>
                  <input
                    type="number"
                    placeholder="Leave empty if no discount"
                    value={formData.sale_price}
                    onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                    className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none font-mono"
                  />
                </div>

                {/* Puffs */}
                <div>
                  <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                    Puffs Count (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 7000 Puffs"
                    value={formData.puffs}
                    onChange={(e) => setFormData({ ...formData, puffs: e.target.value })}
                    className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                  />
                </div>

                {/* Nicotine */}
                <div>
                  <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                    Nicotine / Strength
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50mg Salt Nic, 0mg"
                    value={formData.nicotine}
                    onChange={(e) => setFormData({ ...formData, nicotine: e.target.value })}
                    className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                  />
                </div>

                {/* Flavor */}
                <div>
                  <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                    Flavor Profile
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Watermelon Ice"
                    value={formData.flavor}
                    onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                    className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                    Product Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about flavors, hardware specs, certification..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white border-2 border-[#14121A] rounded-xl px-4 py-2 font-semibold text-sm focus:outline-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="sm:col-span-2 flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                    <input
                      type="checkbox"
                      checked={formData.in_stock}
                      onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                      className="w-5 h-5 accent-[#14121A]"
                    />
                    <span>Available In Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-sm">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 accent-[#2F4BFF]"
                    />
                    <span>Featured on Home Page</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
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
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
