-- ==============================================================================
-- Thiranex Internship Task 3 - Comprehensive Seed Data
-- 6 Categories & 18 Realistic Products
-- ==============================================================================

-- 1. Insert 6 Categories
insert into public.categories (id, name, slug, description, image_url)
values
  (
    'c1000000-0000-0000-0000-000000000001',
    'Electronics',
    'electronics',
    'High-performance tech, audio devices, and smart electronics.',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
  ),
  (
    'c1000000-0000-0000-0000-000000000002',
    'Fashion',
    'fashion',
    'Contemporary fashion, premium apparel, and timeless wardrobe staples.',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80'
  ),
  (
    'c1000000-0000-0000-0000-000000000003',
    'Home & Living',
    'home-living',
    'Artisanal decor, ergonomic furniture, and living space essentials.',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
  ),
  (
    'c1000000-0000-0000-0000-000000000004',
    'Sports & Outdoors',
    'sports-outdoors',
    'Gear, activewear, and endurance equipment for everyday athletes.',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
  ),
  (
    'c1000000-0000-0000-0000-000000000005',
    'Beauty & Personal Care',
    'beauty-personal-care',
    'Botanical skincare, organic hair wellness, and luxury grooming.',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80'
  ),
  (
    'c1000000-0000-0000-0000-000000000006',
    'Accessories',
    'accessories',
    'Handcrafted leather goods, precision watches, and everyday carry.',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url;

-- 2. Insert 18 Realistic Products
insert into public.products (id, category_id, name, slug, description, price, compare_at_price, image_url, stock, sku, is_active)
values
  -- Electronics (3 items)
  (
    'p1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'Aura Wireless Noise-Cancelling Headphones',
    'aura-wireless-noise-cancelling-headphones',
    'Studio-grade acoustic drivers with hybrid active noise cancellation, transparency mode, and up to 40 hours of playtime.',
    299.99,
    349.99,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    45,
    'ELEC-HP-001',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000001',
    'Pulse Smart Fitness Tracker Watch',
    'pulse-smart-fitness-tracker-watch',
    'AMOLED display, 24/7 heart-rate and sleep tracking, water-resistant up to 50m with built-in multi-sport GPS.',
    179.50,
    199.00,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    30,
    'ELEC-SW-002',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000003',
    'c1000000-0000-0000-0000-000000000001',
    'SonicWave Portable Bluetooth Speaker',
    'sonicwave-portable-bluetooth-speaker',
    'IP67 waterproof compact audio speaker delivering 360-degree deep bass and seamless dual-device pairing.',
    89.00,
    110.00,
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
    60,
    'ELEC-SPK-003',
    true
  ),

  -- Fashion (3 items)
  (
    'p1000000-0000-0000-0000-000000000004',
    'c1000000-0000-0000-0000-000000000002',
    'Classic Merino Wool Overcoat',
    'classic-merino-wool-overcoat',
    'Tailored from 100% sustainably sourced Australian merino wool with a relaxed silhouette and horn buttons.',
    285.00,
    350.00,
    'https://images.unsplash.com/photo-1539533018447-63fcce667883?w=800&auto=format&fit=crop&q=80',
    20,
    'FASH-COT-004',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000005',
    'c1000000-0000-0000-0000-000000000002',
    'Organic Heavyweight Cotton Crewneck',
    'organic-heavyweight-cotton-crewneck',
    'Pre-shrunk 450 GSM French terry cotton sweatshirt featuring ribbed trims and reinforced flatlock stitching.',
    75.00,
    90.00,
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    80,
    'FASH-CRW-005',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000006',
    'c1000000-0000-0000-0000-000000000002',
    'Tailored Linen Blend Chino Trousers',
    'tailored-linen-blend-chino-trousers',
    'Breathable cotton-linen weave cut in a modern tapered leg with an internal drawstring waistband.',
    95.00,
    120.00,
    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=80',
    50,
    'FASH-TRO-006',
    true
  ),

  -- Home & Living (3 items)
  (
    'p1000000-0000-0000-0000-000000000007',
    'c1000000-0000-0000-0000-000000000003',
    'Nordic Ceramic Pour-Over Coffee Set',
    'nordic-ceramic-pour-over-coffee-set',
    'Hand-glazed matte ceramic dripper, heat-resistant glass carafe, and stainless steel micro-mesh filter.',
    64.00,
    78.00,
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    40,
    'HOME-COF-007',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000008',
    'c1000000-0000-0000-0000-000000000003',
    'Minimalist Oak Wood Table Lamp',
    'minimalist-oak-wood-table-lamp',
    'Solid white oak base with spun brass accents and a dimmable warm 2700K ambient LED light engine.',
    115.00,
    140.00,
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    25,
    'HOME-LMP-008',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000009',
    'c1000000-0000-0000-0000-000000000003',
    'Woven Organic Hemp Throw Blanket',
    'woven-organic-hemp-throw-blanket',
    'Chunky textured waffle knit crafted from certified organic hemp and washed cotton. Hypoallergenic and ultra-soft.',
    85.00,
    105.00,
    'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80',
    35,
    'HOME-THW-009',
    true
  ),

  -- Sports & Outdoors (3 items)
  (
    'p1000000-0000-0000-0000-000000000010',
    'c1000000-0000-0000-0000-000000000004',
    'Apex All-Weather Trail Running Shoes',
    'apex-all-weather-trail-running-shoes',
    'Vibram Megagrip lugged outsole paired with responsive supercritical foam for aggressive traction on rugged terrain.',
    165.00,
    195.00,
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    55,
    'SPRT-SH-010',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000011',
    'c1000000-0000-0000-0000-000000000004',
    'Insulated Vacuum Water Bottle 32oz',
    'insulated-vacuum-water-bottle-32oz',
    'Pro-grade 18/8 stainless steel keeps cold drinks chilled for 24 hours or piping hot for 12 hours.',
    38.00,
    45.00,
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
    120,
    'SPRT-BTL-011',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000012',
    'c1000000-0000-0000-0000-000000000004',
    'High-Density Cork Yoga & Pilates Mat',
    'high-density-cork-yoga-pilates-mat',
    'Natural non-slip antimicrobial cork top layer bonded to eco-friendly natural tree rubber backing for superior cushion.',
    72.00,
    90.00,
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80',
    40,
    'SPRT-MAT-012',
    true
  ),

  -- Beauty & Personal Care (3 items)
  (
    'p1000000-0000-0000-0000-000000000013',
    'c1000000-0000-0000-0000-000000000005',
    'Hydra-Restore Botanical Face Elixir',
    'hydra-restore-botanical-face-elixir',
    'Antioxidant-rich rosehip, squalane, and jojoba seed oil blend designed to restore elasticity and natural glow.',
    52.00,
    65.00,
    'https://images.unsplash.com/photo-1608248597359-5b4856f91f3b?w=800&auto=format&fit=crop&q=80',
    70,
    'BEAU-SRM-013',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000014',
    'c1000000-0000-0000-0000-000000000005',
    'Cedar & Bergamot Exfoliating Body Wash',
    'cedar-bergamot-exfoliating-body-wash',
    'Sulfate-free formulation enriched with crushed walnut shell, organic aloe vera, and essential woody scents.',
    28.00,
    34.00,
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    95,
    'BEAU-WSH-014',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000015',
    'c1000000-0000-0000-0000-000000000005',
    'Sonic Clean Electric Toothbrush Set',
    'sonic-clean-electric-toothbrush-set',
    '40,000 vibrations per minute, inductive magnetic charging base, 4 brushing modes, and 3 premium brush heads.',
    79.99,
    99.99,
    'https://images.unsplash.com/photo-1559591937-e62fb330bc1f?w=800&auto=format&fit=crop&q=80',
    48,
    'BEAU-TB-015',
    true
  ),

  -- Accessories (3 items)
  (
    'p1000000-0000-0000-0000-000000000016',
    'c1000000-0000-0000-0000-000000000006',
    'Heritage Full-Grain Leather Bi-Fold Wallet',
    'heritage-full-grain-leather-bi-fold-wallet',
    'Hand-stitched vegetable-tanned Italian leather with 8 card slots, dual cash sleeve, and RFID protection.',
    68.00,
    85.00,
    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
    65,
    'ACCS-WLT-016',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000017',
    'c1000000-0000-0000-0000-000000000006',
    'Chrono Minimalist Stainless Steel Watch',
    'chrono-minimalist-stainless-steel-watch',
    'Japanese quartz chronograph movement, sapphire-coated crystal glass, and quick-release mesh bracelet.',
    145.00,
    180.00,
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
    32,
    'ACCS-WCH-017',
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000018',
    'c1000000-0000-0000-0000-000000000006',
    'Polarized Acetate Classic Sunglasses',
    'polarized-acetate-classic-sunglasses',
    'Handcrafted Italian Mazzucchelli acetate frame fitted with scratch-resistant 100% UV400 polarized lenses.',
    110.00,
    135.00,
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
    42,
    'ACCS-SNG-018',
    true
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  compare_at_price = excluded.compare_at_price,
  image_url = excluded.image_url,
  stock = excluded.stock,
  sku = excluded.sku,
  is_active = excluded.is_active;
