-- Terminate connections to the database
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'weekly-chores'
  AND pid <> pg_backend_pid();

-- Drop the database
DROP DATABASE IF EXISTS "weekly-chores";

-- Create the database
CREATE DATABASE "weekly-chores";

-- Connect to the database
\c "weekly-chores"

-- Drop the table if it exists
DROP TABLE IF EXISTS "days";

-- Create the table
CREATE TABLE "days"
(
    "day_id"       						SERIAL,
    "day"								VARCHAR(100),
    "sweeping_and_mopping"   			VARCHAR(100),
    "washing"   						VARCHAR(100),
    "cleaning_cooker"   				VARCHAR(100),
    "rinsing"   						VARCHAR(100),
    "randomized"   						BOOLEAN,

    PRIMARY KEY ("day_id")
);

-- Insert data into the table
INSERT INTO days ("day", "sweeping_and_mopping", "washing", "cleaning_cooker", "rinsing", "randomized") 
VALUES 
('Sunday', 'unassigned', 'unassigned', 'unassigned', 'unassigned', false),
('Monday', 'unassigned', 'unassigned', 'unassigned', 'unassigned', false),
('Tuesday', 'unassigned', 'unassigned', 'unassigned', 'unassigned', false),
('Wednesday', 'unassigned', 'unassigned', 'unassigned', 'unassigned', false),
('Thursday', 'unassigned', 'unassigned', 'unassigned', 'unassigned', false),
('Friday', 'unassigned', 'unassigned', 'unassigned', 'unassigned', false),
('Saturday', 'unassigned', 'unassigned', 'unassigned', 'unassigned', false);