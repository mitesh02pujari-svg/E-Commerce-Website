-- ==============================================================================
-- Thiranex Internship Task 3 - Seed Data
-- ==============================================================================

-- Sample Categories
insert into public.categories (id, name, slug, description, image_url)
values
  ('11111111-1111-1111-1111-111111111111', 'Electronics', 'electronics', 'High quality electronics and gadgets', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60'),
  ('22222222-2222-2222-2222-222222222222', 'Fashion', 'fashion', 'Trendy clothing and accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=60'),
  ('33333333-3333-3333-3333-333333333333', 'Home & Living', 'home-living', 'Furniture and home improvement products', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=60')
on conflict (slug) do nothing;

-- Sample Products
insert into public.products (title, slug, description, price, sale_price, stock, category_id, images, is_featured)
values
  ('Wireless Noise-Canceling Headphones', 'wireless-noise-canceling-headphones', 'Premium over-ear wireless headphones with active noise cancellation and 30-hour battery life.', 249.99, 199.99, 50, '11111111-1111-1111-1111-111111111111', array['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60'], true),
  ('Minimalist Leather Watch', 'minimalist-leather-watch', 'Crafted stainless steel case with genuine Italian leather strap.', 120.00, null, 35, '22222222-2222-2222-2222-222222222222', array['https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=60'], true),
  ('Smart Ceramic Coffee Mug', 'smart-ceramic-coffee-mug', 'Temperature-controlled smart mug keeping your beverage hot for hours.', 89.95, 74.95, 100, '33333333-3333-3333-3333-333333333333', array['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=60'], false)
on conflict (slug) do nothing;
