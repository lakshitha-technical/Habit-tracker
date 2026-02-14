-- Quick verification and fix for day_entry table
-- Run this to check and fix the missing day_type column

-- First, check if table exists and its structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'day_entry' 
ORDER BY ordinal_position;

-- If day_type column doesn't exist, add it
ALTER TABLE day_entry ADD COLUMN IF NOT EXISTS day_type VARCHAR(20) NOT NULL DEFAULT 'WEEKDAY';

-- Add check constraint if it doesn't exist
ALTER TABLE day_entry ADD CONSTRAINT IF NOT EXISTS check_day_type 
CHECK (day_type IN ('WEEKDAY','WEEKEND','PERIODS','SICK'));

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'day_entry' AND column_name = 'day_type';
