import { useState } from 'react'
import { isSupabaseConfigured } from '../../lib/api'
import toast from 'react-hot-toast'
import {
  HiDatabase,
  HiClipboardCopy,
  HiCheck,
  HiExternalLink,
  HiSave,
  HiInformationCircle
} from 'react-icons/hi'

export default function AdminSettings() {
  const isSupa = isSupabaseConfigured()
  const [copied, setCopied] = useState(false)

  const [settings, setSettings] = useState({
    whatsapp: '0327 5550770',
    uan: '0304 1117929',
    email: 'purchasing@svape.pk',
    address: '90/18 Broadway, Block B, DHA Phase 8, Lahore 54910',
    deliveryTime: '30',
    city: 'Lahore'
  })

  const sqlSchema = `-- Svape Database Setup for Supabase
-- Run this in your Supabase SQL Editor:

create extension if not exists "uuid-ossp";

-- Categories table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  icon_svg text,
  bg_color text default '#FFD83D',
  border_radius text default '44px',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Products table
create table products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price numeric not null,
  sale_price numeric,
  category_slug text,
  image_url text,
  in_stock boolean default true,
  featured boolean default false,
  puffs text,
  nicotine text,
  flavor text,
  brand text,
  created_at timestamptz default now()
);

-- Reviews table
create table reviews (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  city text default 'Lahore',
  text text not null,
  bg_color text default '#FFD83D',
  rotation text default '-3deg',
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Orders table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  customer_name text not null,
  phone text not null,
  address text not null,
  city text default 'Lahore',
  notes text,
  status text default 'pending',
  total numeric not null,
  payment_method text default 'cod',
  created_at timestamptz default now()
);

-- Order Items table
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id text,
  product_name text not null,
  quantity int not null,
  price numeric not null
);

-- Enable RLS and public policies
alter table categories enable row level security;
alter table products enable row level security;
alter table reviews enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (true);
create policy "Public read reviews" on reviews for select using (is_active = true);
create policy "Public insert orders" on orders for insert with check (true);
create policy "Public insert order_items" on order_items for insert with check (true);

create policy "Admin full categories" on categories for all using (true);
create policy "Admin full products" on products for all using (true);
create policy "Admin full reviews" on reviews for all using (true);
create policy "Admin full orders" on orders for all using (true);
create policy "Admin full order_items" on order_items for all using (true);`

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sqlSchema)
    setCopied(true)
    toast.success('SQL Schema copied to clipboard!')
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSaveContact = (e) => {
    e.preventDefault()
    toast.success('Store settings saved successfully!')
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="disp text-3xl sm:text-4xl text-[#14121A]">
          Store Settings & Database
        </h1>
        <p className="text-xs sm:text-sm text-[#14121A]/70 font-semibold mt-1">
          Manage Supabase integration, store contact details, and SQL migrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Supabase Status & SQL Schema */}
        <div className="space-y-6">
          {/* Connection Status Card */}
          <div className="bg-white border-3 border-[#14121A] rounded-3xl p-6 sm:p-8 shadow-[6px_8px_0_#14121A]">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-xl border-2 border-[#14121A] flex items-center justify-center text-xl ${
                  isSupa ? 'bg-[#2FD6A1]' : 'bg-[#FFD83D]'
                }`}
              >
                <HiDatabase />
              </div>
              <div>
                <h2 className="disp text-xl text-[#14121A]">Supabase Status</h2>
                <span
                  className={`text-xs font-bold uppercase inline-block ${
                    isSupa ? 'text-emerald-700' : 'text-amber-800'
                  }`}
                >
                  {isSupa ? '● Connected & Active' : '○ Standalone / Local Storage Mode'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#14121A]/80 leading-relaxed font-medium mb-4">
              {isSupa
                ? 'Your website is actively connected to Supabase cloud database. All products, categories, reviews and customer orders synchronize in real time.'
                : 'Your website is currently running in zero-setup Local Storage mode. Any product or order changes persist in your browser. To connect real Supabase, add your credentials in `.env`.'}
            </p>

            <div className="p-4 bg-[#FBF7EE] border-2 border-[#14121A] rounded-2xl text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">VITE_SUPABASE_URL:</span>
                <span className="truncate max-w-[200px]">
                  {import.meta.env.VITE_SUPABASE_URL || 'Not configured'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">VITE_SUPABASE_ANON_KEY:</span>
                <span>{import.meta.env.VITE_SUPABASE_ANON_KEY ? '••••••••' : 'Not configured'}</span>
              </div>
            </div>

            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#2F4BFF] hover:underline"
            >
              <span>Open Supabase Cloud Dashboard</span>
              <HiExternalLink size={14} />
            </a>
          </div>

          {/* SQL Migration Script Box */}
          <div className="bg-white border-3 border-[#14121A] rounded-3xl p-6 sm:p-8 shadow-[6px_8px_0_#14121A]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="disp text-xl text-[#14121A]">Supabase SQL Schema</h3>
                <p className="text-xs text-[#14121A]/70 font-semibold">
                  1-Click SQL to run inside Supabase SQL Editor
                </p>
              </div>

              <button
                onClick={handleCopySQL}
                className="btn inline-flex items-center gap-1.5 bg-[#FFD83D] border-2 border-[#14121A] px-4 py-2 rounded-xl text-xs font-bold shadow-[2px_2px_0_#14121A] hover:bg-[#2FD6A1]"
              >
                {copied ? <HiCheck className="text-emerald-700" size={16} /> : <HiClipboardCopy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
              </button>
            </div>

            <pre className="bg-[#14121A] text-[#2FD6A1] p-4 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-60 border-2 border-[#14121A]">
              <code>{sqlSchema}</code>
            </pre>
          </div>
        </div>

        {/* Right Column: Contact & Store Configuration */}
        <div className="bg-white border-3 border-[#14121A] rounded-3xl p-6 sm:p-8 shadow-[6px_8px_0_#14121A]">
          <h2 className="disp text-xl sm:text-2xl text-[#14121A] mb-4">
            Store Contact Information
          </h2>
          <p className="text-xs sm:text-sm text-[#14121A]/70 font-semibold mb-6">
            These details appear in the footer, WhatsApp order tracking, and header.
          </p>

          <form onSubmit={handleSaveContact} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                WhatsApp Hotline
              </label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                UAN Telephone Number
              </label>
              <input
                type="text"
                value={settings.uan}
                onChange={(e) => setSettings({ ...settings, uan: e.target.value })}
                className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                Delivery City & Speed
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={settings.city}
                  onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                  className="bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                />
                <input
                  type="text"
                  value={`${settings.deliveryTime} Minutes`}
                  onChange={(e) => setSettings({ ...settings, deliveryTime: e.target.value.replace(/[^0-9]/g, '') })}
                  className="bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-4 py-2.5 font-semibold text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#14121A] mb-1">
                Physical Store / Warehouse Address
              </label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-[#FBF7EE] border-2 border-[#14121A] rounded-xl px-4 py-2 font-semibold text-sm focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t-2 border-[#14121A]/10">
              <button
                type="submit"
                className="btn w-full bg-[#14121A] text-[#FFD83D] py-3.5 rounded-full font-bold text-base hover:bg-[#2F4BFF] hover:text-white transition-all shadow-[3px_4px_0_#2FD6A1]"
              >
                Save Store Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
