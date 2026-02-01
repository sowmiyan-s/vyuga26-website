-- Create inter-college registrations table
CREATE TABLE public.intercollege_registrations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    register_number TEXT NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 1 AND year <= 4),
    department TEXT NOT NULL CHECK (department IN ('AGRI', 'AIDS', 'CIVIL', 'CSC', 'ECE', 'EEE', 'MECH', 'IT', 'AIML')),
    payment_screenshot_url TEXT,
    payment_verified BOOLEAN DEFAULT false,
    entry_confirmed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.intercollege_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for intercollege registrations
CREATE POLICY "Anyone can register intercollege" 
ON public.intercollege_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view own intercollege registration" 
ON public.intercollege_registrations 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can update intercollege registrations" 
ON public.intercollege_registrations 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_intercollege_registrations_updated_at
BEFORE UPDATE ON public.intercollege_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();