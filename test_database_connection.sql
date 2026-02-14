-- Test script to verify you're connected to the right database
-- Run this in the same database your application connects to

-- Verify database name
SELECT current_database();

-- Verify day_entry table exists and has day_type column
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'day_entry';

-- Show day_entry table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'day_entry' 
ORDER BY ordinal_position;

-- Test a simple query like your application does
SELECT id, created_at, date, day_type, screen_time_minutes 
FROM day_entry 
LIMIT 1;
