-- Complete Schema Creation for Habit Tracker Application
-- This script creates all tables, enums, and constraints for the tracker database

-- Create custom enum types
CREATE TYPE day_type_enum AS ENUM ('WEEKDAY', 'WEEKEND', 'PERIODS', 'SICK');
CREATE TYPE expense_category_enum AS ENUM ('NECESSARY', 'UNNECESSARY', 'INNER_JOY');
CREATE TYPE habit_scope_enum AS ENUM ('WEEKDAY', 'WEEKEND', 'BOTH');

-- Create habit table
CREATE TABLE habit (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score_value INTEGER NOT NULL,
    is_negative BOOLEAN NOT NULL DEFAULT FALSE,
    applies_to habit_scope_enum NOT NULL DEFAULT 'BOTH',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create day_entry table
CREATE TABLE day_entry (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    day_type day_type_enum NOT NULL DEFAULT 'WEEKDAY',
    screen_time_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create expense table
CREATE TABLE expense (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    category expense_category_enum NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create daily_habit table with foreign key constraints
CREATE TABLE daily_habit (
    id BIGSERIAL PRIMARY KEY,
    day_entry_id BIGINT NOT NULL,
    habit_id BIGINT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    value_minutes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- Foreign key constraints
    CONSTRAINT fk_daily_habit_day_entry 
        FOREIGN KEY (day_entry_id) REFERENCES day_entry(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_daily_habit_habit 
        FOREIGN KEY (habit_id) REFERENCES habit(id) 
        ON DELETE CASCADE,
    
    -- Unique constraint to prevent duplicate habit entries for the same day
    UNIQUE (day_entry_id, habit_id)
);

-- Create indexes for better performance
CREATE INDEX idx_day_entry_date ON day_entry(date);
CREATE INDEX idx_day_entry_day_type ON day_entry(day_type);
CREATE INDEX idx_expense_date ON expense(date);
CREATE INDEX idx_expense_category ON expense(category);
CREATE INDEX idx_habit_name ON habit(name);
CREATE INDEX idx_habit_applies_to ON habit(applies_to);
CREATE INDEX idx_daily_habit_day_entry ON daily_habit(day_entry_id);
CREATE INDEX idx_daily_habit_habit ON daily_habit(habit_id);
CREATE INDEX idx_daily_habit_completed ON daily_habit(completed);

-- Insert some default habits (optional - can be removed)
INSERT INTO habit (name, score_value, is_negative, applies_to) VALUES
('Morning Exercise', 2, FALSE, 'BOTH'),
('Read Books', 1, FALSE, 'BOTH'),
('Meditation', 1, FALSE, 'BOTH'),
('No Social Media', 1, TRUE, 'BOTH'),
('Screen Time < 2hrs', 2, TRUE, 'BOTH');

-- Comments for documentation
COMMENT ON TABLE day_entry IS 'Daily entries for tracking habits and metrics';
COMMENT ON TABLE habit IS 'Master list of habits to track';
COMMENT ON TABLE daily_habit IS 'Daily completion status for each habit';
COMMENT ON TABLE expense IS 'Expense tracking with categories';
COMMENT ON COLUMN day_entry.screen_time_minutes IS 'Negative score source - higher screen time reduces score';
COMMENT ON COLUMN daily_habit.value_minutes IS 'For screen-time style habits, stores the actual minutes';
COMMENT ON COLUMN habit.score_value IS 'Points awarded (positive) or deducted (negative) when completed';
COMMENT ON COLUMN habit.is_negative IS 'TRUE = bad habit (deduct points), FALSE = good habit (add points)';
