-- Check actual enum type names in the database
SELECT t.typname AS enum_type, e.enumlabel AS enum_value
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
ORDER BY t.typname, e.enumsortorder;

-- Check current column types
SELECT table_name, column_name, data_type, udt_name 
FROM information_schema.columns 
WHERE table_name IN ('habit', 'expense', 'day_entry') 
AND column_name IN ('applies_to', 'category', 'day_type')
ORDER BY table_name, column_name;
