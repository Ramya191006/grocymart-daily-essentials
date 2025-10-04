-- Create products table
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  image_url text,
  category text NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  total decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_method text NOT NULL,
  delivery_address jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id),
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read)
CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (true);

-- Orders policies (users can view their own orders)
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view their order items"
  ON public.order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can create order items for their orders"
  ON public.order_items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  ));

-- Insert sample products
INSERT INTO public.products (name, description, price, category, stock, image_url) VALUES
('Extra Virgin Olive Oil', 'Premium quality cold-pressed olive oil', 12.99, 'Oils', 50, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'),
('Sunflower Oil', 'Pure refined sunflower cooking oil', 8.99, 'Oils', 75, 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400'),
('Coconut Oil', 'Organic virgin coconut oil', 14.99, 'Oils', 40, 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400'),
('Red Lentils', 'Premium quality red lentils', 4.99, 'Pulses', 100, 'https://images.unsplash.com/photo-1596040033229-a0b5b5240c83?w=400'),
('Yellow Moong Dal', 'Split yellow moong beans', 5.99, 'Pulses', 80, 'https://images.unsplash.com/photo-1610988321569-b3e7c5c47c8a?w=400'),
('Chickpeas', 'Organic dried chickpeas', 6.49, 'Pulses', 90, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400'),
('Whole Wheat Flour', 'Stone ground whole wheat flour', 7.99, 'Flours', 60, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'),
('All Purpose Flour', 'Refined wheat flour', 5.99, 'Flours', 70, 'https://images.unsplash.com/photo-1628508749278-9f96c1e8e1b1?w=400'),
('Rice Flour', 'Fine quality rice flour', 6.99, 'Flours', 55, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'),
('Fresh Tomatoes', 'Ripe red tomatoes', 3.99, 'Vegetables', 120, 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400'),
('Fresh Onions', 'Yellow onions', 2.99, 'Vegetables', 150, 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400'),
('Potatoes', 'Farm fresh potatoes', 3.49, 'Vegetables', 200, 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400'),
('Carrots', 'Fresh orange carrots', 3.99, 'Vegetables', 100, 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400'),
('Spinach', 'Fresh green spinach leaves', 4.49, 'Vegetables', 80, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400'),
('Turmeric Powder', 'Pure turmeric powder', 5.99, 'Spices', 60, 'https://images.unsplash.com/photo-1615485500925-0c59a39b5f8b?w=400'),
('Cumin Seeds', 'Whole cumin seeds', 4.99, 'Spices', 70, 'https://images.unsplash.com/photo-1596040033229-a0b5b5240c83?w=400'),
('Coriander Powder', 'Ground coriander', 4.49, 'Spices', 65, 'https://images.unsplash.com/photo-1615485501831-02af1b0e2b29?w=400'),
('Red Chili Powder', 'Hot red chili powder', 5.49, 'Spices', 75, 'https://images.unsplash.com/photo-1583706890722-0d08b4b91e89?w=400');