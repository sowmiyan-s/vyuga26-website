-- Add selected_events column to all registration tables
-- This stores an array of event IDs (max 4 events per registration)

ALTER TABLE public.registrations
ADD COLUMN selected_events text[] DEFAULT '{}';

ALTER TABLE public.intercollege_registrations
ADD COLUMN selected_events text[] DEFAULT '{}';

ALTER TABLE public.department_registrations
ADD COLUMN selected_events text[] DEFAULT '{}';

-- Add comment for documentation
COMMENT ON COLUMN public.registrations.selected_events IS 'Array of event IDs selected by the registrant (max 4)';
COMMENT ON COLUMN public.intercollege_registrations.selected_events IS 'Array of event IDs selected by the registrant (max 4)';
COMMENT ON COLUMN public.department_registrations.selected_events IS 'Array of event IDs selected by the registrant (max 4)';