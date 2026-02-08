-- Migration to update CSC to CSE in intercollege_registrations

-- 1. Drop the existing check constraint FIRST to allow the update
-- We use IF EXISTS to avoid errors if the constraint name is different or doesn't exist
ALTER TABLE public.intercollege_registrations 
DROP CONSTRAINT IF EXISTS intercollege_registrations_department_check;

-- 2. Update existing data
UPDATE public.intercollege_registrations 
SET department = 'CSE' 
WHERE department = 'CSC';

-- 3. Add the new check constraint with CSE instead of CSC
ALTER TABLE public.intercollege_registrations 
ADD CONSTRAINT intercollege_registrations_department_check 
CHECK (department IN ('AGRI', 'AIDS', 'CIVIL', 'CSE', 'ECE', 'EEE', 'MECH', 'IT', 'AIML'));
