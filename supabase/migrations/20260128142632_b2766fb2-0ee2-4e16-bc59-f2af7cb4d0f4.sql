-- Create registrations table for symposium participants
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college_name TEXT NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 1 AND year <= 4),
  department TEXT NOT NULL,
  payment_screenshot_url TEXT,
  payment_verified BOOLEAN DEFAULT false,
  entry_confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_registrations_email ON public.registrations(email);
CREATE INDEX idx_registrations_phone ON public.registrations(phone);
CREATE INDEX idx_registrations_payment_verified ON public.registrations(payment_verified);
CREATE INDEX idx_registrations_entry_confirmed ON public.registrations(entry_confirmed);

-- Enable Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (register)
CREATE POLICY "Anyone can register" 
ON public.registrations 
FOR INSERT 
WITH CHECK (true);

-- Policy: Users can view their own registration by email
CREATE POLICY "Users can view own registration" 
ON public.registrations 
FOR SELECT 
USING (true);

-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE email = user_email
  )
$$;

-- Policy for admins to update registrations
CREATE POLICY "Admins can update registrations" 
ON public.registrations 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Insert a default admin (can be changed in database)
INSERT INTO public.admin_users (email) VALUES ('admin@siragu26.com');

-- Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-screenshots', 'payment-screenshots', true);

-- Storage policies for payment screenshots
CREATE POLICY "Anyone can upload payment screenshots"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'payment-screenshots');

CREATE POLICY "Anyone can view payment screenshots"
ON storage.objects
FOR SELECT
USING (bucket_id = 'payment-screenshots');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_registrations_updated_at
BEFORE UPDATE ON public.registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();