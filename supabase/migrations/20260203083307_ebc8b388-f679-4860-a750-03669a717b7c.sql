-- Create department_registrations table for AI&DS students (no payment required)
CREATE TABLE public.department_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 1 AND year <= 4),
  section TEXT NOT NULL CHECK (section IN ('A', 'B', 'C', 'D', 'E')),
  register_number TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  entry_confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.department_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can register department"
ON public.department_registrations FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view department registrations"
ON public.department_registrations FOR SELECT
USING (true);

CREATE POLICY "Admins can update department registrations"
ON public.department_registrations FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for department registrations"
ON public.department_registrations FOR DELETE
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_department_registrations_updated_at
BEFORE UPDATE ON public.department_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add department_limit to site_settings
INSERT INTO public.site_settings (key, value)
VALUES ('department_limit', '150'::jsonb)
ON CONFLICT (key) DO NOTHING;