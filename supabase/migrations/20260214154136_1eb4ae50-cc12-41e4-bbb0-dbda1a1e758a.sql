
-- Create backup table for existing free intra college registrations
CREATE TABLE public.intercollege_registrations_old (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  register_number text NOT NULL,
  year integer NOT NULL,
  department text NOT NULL,
  selected_events text[] DEFAULT '{}'::text[],
  entry_confirmed boolean DEFAULT false,
  payment_verified boolean DEFAULT false,
  payment_screenshot_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Copy existing data to backup table
INSERT INTO public.intercollege_registrations_old 
  (id, name, email, phone, register_number, year, department, selected_events, entry_confirmed, payment_verified, payment_screenshot_url, created_at, updated_at)
SELECT id, name, email, phone, register_number, year, department, selected_events, entry_confirmed, payment_verified, payment_screenshot_url, created_at, updated_at
FROM public.intercollege_registrations;

-- Clear the main table for new paid registrations
DELETE FROM public.intercollege_registrations;

-- Enable RLS on backup table
ALTER TABLE public.intercollege_registrations_old ENABLE ROW LEVEL SECURITY;

-- Read-only policies for backup table
CREATE POLICY "Anyone can view old intercollege registrations"
ON public.intercollege_registrations_old FOR SELECT
USING (true);

CREATE POLICY "Enable delete for old intercollege registrations"
ON public.intercollege_registrations_old FOR DELETE
USING (true);
