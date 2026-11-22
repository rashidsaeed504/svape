import { supabase } from './supabase'
import { initialCategories, initialProducts, initialReviews, initialOrders } from './mockData'

const STORAGE_KEYS = {
  PRODUCTS: 'svape_local_products',
  CATEGORIES: 'svape_local_categories',
  REVIEWS: 'svape_local_reviews',
  ORDERS: 'svape_local_orders',
  SETTINGS: 'svape_local_settings'
}

function getStored(key, fallback) {
  try {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : fallback
  } catch {
    return fallback
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('LocalStorage write error', e)
  }
}

// Is real Supabase configured?
export function isSupabaseConfigured() {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return Boolean(url && key && !url.includes('your-project') && !key.includes('your-anon-key'))
}

// --- CATEGORIES ---
export async function getCategories() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })
      if (!error && data && data.length > 0) return data
    } catch (e) {
      console.warn('Supabase categories fetch failed, falling back to local', e)
    }
  }
  return getStored(STORAGE_KEYS.CATEGORIES, initialCategories)
}

export async function createCategory(cat) {
  const newCat = {
    ...cat,
    id: cat.id || `cat-${Date.now()}`,
    slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
    sort_order: Number(cat.sort_order || 0)
  }
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('categories').insert([newCat]).select()
      if (!error && data) return data[0]
    } catch (e) {
      console.warn('Supabase category create failed', e)
    }
  }
  const list = getStored(STORAGE_KEYS.CATEGORIES, initialCategories)
  const updated = [...list, newCat]
  setStored(STORAGE_KEYS.CATEGORIES, updated)
  return newCat
}

export async function deleteCategory(id) {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('categories').delete().eq('id', id)
    } catch (e) {
      console.warn('Supabase category delete failed', e)
    }
  }
  const list = getStored(STORAGE_KEYS.CATEGORIES, initialCategories)
  setStored(STORAGE_KEYS.CATEGORIES, list.filter(c => c.id !== id))
}

// --- PRODUCTS ---
export async function getProducts(categorySlug = null) {
  if (isSupabaseConfigured()) {
    try {
      let query = supabase.from('products').select('*').order('created_at', { ascending: false })
      if (categorySlug) {
        query = query.eq('category_slug', categorySlug)
      }
      const { data, error } = await query
      if (!error && data && data.length > 0) return data
    } catch (e) {
      console.warn('Supabase products fetch failed, falling back to local', e)
    }
  }
  const all = getStored(STORAGE_KEYS.PRODUCTS, initialProducts)
  if (categorySlug) {
    return all.filter(p => p.category_slug === categorySlug)
  }
  return all
}

export async function getProductById(id) {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
      if (!error && data) return data
    } catch (e) {
      console.warn('Supabase product fetch failed', e)
    }
  }
  const all = getStored(STORAGE_KEYS.PRODUCTS, initialProducts)
  return all.find(p => p.id === id || p.slug === id)
}

export async function createProduct(prod) {
  const newProd = {
    ...prod,
    id: prod.id || `prod-${Date.now()}`,
    slug: prod.slug || prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    price: Number(prod.price),
    sale_price: prod.sale_price ? Number(prod.sale_price) : null,
    in_stock: prod.in_stock !== false,
    featured: Boolean(prod.featured),
    created_at: new Date().toISOString()
  }

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('products').insert([newProd]).select()
      if (!error && data) return data[0]
    } catch (e) {
      console.warn('Supabase product insert failed', e)
    }
  }
  const list = getStored(STORAGE_KEYS.PRODUCTS, initialProducts)
  const updated = [newProd, ...list]
  setStored(STORAGE_KEYS.PRODUCTS, updated)
  return newProd
}

export async function updateProduct(id, updates) {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('products').update(updates).eq('id', id).select()
      if (!error && data) return data[0]
    } catch (e) {
      console.warn('Supabase product update failed', e)
    }
  }
  const list = getStored(STORAGE_KEYS.PRODUCTS, initialProducts)
  const updated = list.map(p => (p.id === id ? { ...p, ...updates } : p))
  setStored(STORAGE_KEYS.PRODUCTS, updated)
  return updated.find(p => p.id === id)
}

export async function deleteProduct(id) {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('products').delete().eq('id', id)
    } catch (e) {
      console.warn('Supabase product delete failed', e)
    }
  }
  const list = getStored(STORAGE_KEYS.PRODUCTS, initialProducts)
  setStored(STORAGE_KEYS.PRODUCTS, list.filter(p => p.id !== id))
}

// --- REVIEWS ---
export async function getReviews() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('reviews').select('*').eq('is_active', true)
      if (!error && data && data.length > 0) return data
    } catch (e) {
      console.warn('Supabase reviews fetch failed', e)
    }
  }
  return getStored(STORAGE_KEYS.REVIEWS, initialReviews)
}

export async function createReview(rev) {
  const newRev = {
    ...rev,
    id: rev.id || `rev-${Date.now()}`,
    is_active: rev.is_active !== false,
    created_at: new Date().toISOString()
  }
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('reviews').insert([newRev]).select()
      if (!error && data) return data[0]
    } catch (e) {
      console.warn('Supabase review insert failed', e)
    }
  }
  const list = getStored(STORAGE_KEYS.REVIEWS, initialReviews)
  const updated = [...list, newRev]
  setStored(STORAGE_KEYS.REVIEWS, updated)
  return newRev
}

export async function deleteReview(id) {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('reviews').delete().eq('id', id)
    } catch (e) {
      console.warn('Supabase review delete failed', e)
    }
  }
  const list = getStored(STORAGE_KEYS.REVIEWS, initialReviews)
  setStored(STORAGE_KEYS.REVIEWS, list.filter(r => r.id !== id))
}

// --- ORDERS ---
export async function getOrders() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false })
      if (!error && data) return data
    } catch (e) {
      console.warn('Supabase orders fetch failed', e)
    }
  }
  return getStored(STORAGE_KEYS.ORDERS, initialOrders)
}

export async function createOrder(orderData) {
  const newOrder = {
    ...orderData,
    id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'pending',
    payment_method: 'cod',
    created_at: new Date().toISOString()
  }

  if (isSupabaseConfigured()) {
    try {
      const { items, ...orderHeader } = newOrder
      const { data: insertedOrder, error: oErr } = await supabase.from('orders').insert([orderHeader]).select().single()
      if (!oErr && insertedOrder) {
        if (items && items.length > 0) {
          const itemPayload = items.map(item => ({
            order_id: insertedOrder.id,
            product_id: item.id || null,
            product_name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
          await supabase.from('order_items').insert(itemPayload)
        }
        return insertedOrder
      }
    } catch (e) {
      console.warn('Supabase order creation failed', e)
    }
  }

  const list = getStored(STORAGE_KEYS.ORDERS, initialOrders)
  const updated = [newOrder, ...list]
  setStored(STORAGE_KEYS.ORDERS, updated)
  return newOrder
}

export async function updateOrderStatus(orderId, status) {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('orders').update({ status }).eq('id', orderId)
    } catch (e) {
      console.warn('Supabase order update failed', e)
    }
  }
  const list = getStored(STORAGE_KEYS.ORDERS, initialOrders)
  const updated = list.map(o => (o.id === orderId ? { ...o, status } : o))
  setStored(STORAGE_KEYS.ORDERS, updated)
}
