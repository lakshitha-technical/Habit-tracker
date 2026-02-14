-- Drop and recreate day_entry table with proper structure
-- This will fix the column addition issue

DROP TABLE IF EXISTS day_entry CASCADE;

-- Recreate with correct day_type column from the start
CREATE TABLE day_entry (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    day_type VARCHAR(20) NOT NULL DEFAULT 'WEEKDAY' CHECK (day_type IN ('WEEKDAY','WEEKEND','PERIODS','SICK')),
    screen_time_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Recreate indexes
CREATE INDEX idx_day_entry_date ON day_entry(date);
CREATE INDEX idx_day_entry_day_type ON day_entry(day_type);

-- Verify table structure
\d day_entry
