-- Fix existing NULL values in day_type column
-- This updates all existing NULL day_type values to 'WEEKDAY' as default

UPDATE day_entry 
SET day_type = 'WEEKDAY' 
WHERE day_type IS NULL;

-- Verify the update
SELECT COUNT(*) as null_count 
FROM day_entry 
WHERE day_type IS NULL;
