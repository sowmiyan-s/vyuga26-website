-- Remove payment-related columns from intercollege_registrations (now free registration)
ALTER TABLE public.intercollege_registrations DROP COLUMN IF EXISTS payment_screenshot_url;
ALTER TABLE public.intercollege_registrations DROP COLUMN IF EXISTS payment_verified;