-- Svape Database Schema for Supabase

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Categories
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

-- Products
create table products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price numeric not null,
  sale_price numeric,
  category_id uuid references categories(id) on delete set null,
  image_url text,
  in_stock boolean default true,
  featured boolean default false,
  puffs text,
  nicotine text,
  flavor text,
  brand text,
  created_at timestamptz default now()
);

-- Reviews / Testimonials
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

-- Orders
create table orders (
  id uuid default uuid_generate_v4() primary key,
  customer_name text not null,
  phone text not null,
  address text not null,
  city text default 'Lahore',
  notes text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'delivering', 'delivered', 'cancelled')),
  total numeric not null,
  payment_method text default 'cod',
  created_at timestamptz default now()
);

-- Order Items
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  quantity int not null,
  price numeric not null
);

-- Site Settings (key-value store)
create table site_settings (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null,
  value text,
  updated_at timestamptz default now()
);

-- Referral Codes
create table referral_codes (
  id uuid default uuid_generate_v4() primary key,
  code text unique not null,
  discount_percent numeric default 10,
  reward_percent numeric default 15,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Seed default categories
insert into categories (name, slug, description, bg_color, border_radius, sort_order) values
  ('Matcha', 'matcha', 'Smooth and calm.', '#2FD6A1', '50%', 1),
  ('Caffeine', 'caffeine', 'Energy and focus on demand.', '#FFD83D', '44px', 2),
  ('Disposables', 'disposables', 'Open the box and go. Pick a flavor.', '#2F4BFF', '46% 54% 50% 50% / 56% 44% 56% 44%', 3),
  ('E-Liquids', 'e-liquids', 'Nic-salt and freebase bottles.', '#FF5CA8', '60px 30px 60px 30px', 4),
  ('Devices', 'devices', 'Pod kits and starter devices.', '#FFFFFF', '50%', 5),
  ('Accessories', 'accessories', 'Pods, coils and chargers.', '#FF7A2F', '30px 60px 30px 60px', 6);

-- Seed default reviews
insert into reviews (name, city, text, bg_color, rotation) values
  ('Ahmed', 'Lahore', 'Ordered at 2am, got it in 25 minutes. These guys are insane!', '#FFD83D', '-3deg'),
  ('Sara', 'Lahore', 'Only place I trust for authentic products. Never had a fake.', '#FFFFFF', '2deg'),
  ('Bilal', 'Lahore', 'Cash on delivery makes it so easy. No hassle at all.', '#2FD6A1', '-2deg');

-- Seed default site settings
insert into site_settings (key, value) values
  ('whatsapp', '03275550770'),
  ('uan', '03041117929'),
  ('email', 'purchasing@svape.pk'),
  ('address', '90/18 Broadway, Block B, DHA Phase 8, Lahore 54910'),
  ('delivery_time', '30'),
  ('hero_title_1', 'Your fix,'),
  ('hero_title_2', 'delivered.'),
  ('hero_subtitle', 'Disposables, devices, e-liquids, matcha and caffeine at your door in 30 minutes. Free delivery, pay cash when it arrives.');

-- Enable Row Level Security
alter table categories enable row level security;
alter table products enable row level security;
alter table reviews enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table site_settings enable row level security;
alter table referral_codes enable row level security;

-- Public read access policies
create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (true);
create policy "Public read active reviews" on reviews for select using (is_active = true);
create policy "Public read site settings" on site_settings for select using (true);

-- Public insert for orders (customers can place orders)
create policy "Public insert orders" on orders for insert with check (true);
create policy "Public insert order items" on order_items for insert with check (true);

-- Authenticated (admin) full access
create policy "Admin full access categories" on categories for all using (auth.role() = 'authenticated');
create policy "Admin full access products" on products for all using (auth.role() = 'authenticated');
create policy "Admin full access reviews" on reviews for all using (auth.role() = 'authenticated');
create policy "Admin full access orders" on orders for all using (auth.role() = 'authenticated');
create policy "Admin full access order_items" on order_items for all using (auth.role() = 'authenticated');
create policy "Admin full access site_settings" on site_settings for all using (auth.role() = 'authenticated');
create policy "Admin full access referral_codes" on referral_codes for all using (auth.role() = 'authenticated');
