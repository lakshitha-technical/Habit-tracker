-- Fix enum column casting issues
-- This script manually converts string columns to proper PostgreSQL enum types

-- Fix applies_to column in habit table
ALTER TABLE habit 
ALTER COLUMN applies_to TYPE habit_scope_enum 
USING applies_to::habit_scope_enum;

-- Fix category column in expense table (if needed)
ALTER TABLE expense 
ALTER COLUMN category TYPE expense_category_enum 
USING category::expense_category_enum;

-- Fix day_type column in day_entry table (if needed)
ALTER TABLE day_entry 
ALTER COLUMN day_type TYPE day_type_enum 
USING day_type::day_type_enum;

-- Verify the changes
SELECT column_name, data_type, udt_name 
FROM information_schema.columns 
WHERE table_name IN ('habit', 'expense', 'day_entry') 
AND column_name IN ('applies_to', 'category', 'day_type')
ORDER BY table_name, column_name;
