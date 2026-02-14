-- Check existing day_entry records
SELECT * FROM day_entry WHERE date = '2026-02-14';

-- Check all day_entry records
SELECT id, date, day_type, screen_time_minutes, created_at 
FROM day_entry 
ORDER BY date DESC;

-- If you want to clear existing records for testing
-- DELETE FROM day_entry WHERE date >= '2026-02-14';
