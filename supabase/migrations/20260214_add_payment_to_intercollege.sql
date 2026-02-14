-- Add payment screenshot column to intercollege_registrations for paid registration
ALTER TABLE public.intercollege_registrations 
ADD COLUMN IF NOT EXISTS payment_screenshot_url TEXT;

-- Add payment verification column
ALTER TABLE public.intercollege_registrations 
ADD COLUMN IF NOT EXISTS payment_verified BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN public.intercollege_registrations.payment_screenshot_url IS 'URL to the payment screenshot uploaded by the registrant';
COMMENT ON COLUMN public.intercollege_registrations.payment_verified IS 'Whether the payment has been verified by admin';
