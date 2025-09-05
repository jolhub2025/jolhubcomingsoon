-- JolHub Registration Database Schema
-- Run this SQL in your Supabase SQL editor

-- Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    company TEXT,
    event_types TEXT NOT NULL,
    referral_source TEXT NOT NULL DEFAULT 'Not specified'
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for form submissions)
CREATE POLICY "Allow public insert" ON registrations
    FOR INSERT
    WITH CHECK (true);

-- Create policy to allow public read access (you can restrict this later if needed)
CREATE POLICY "Allow public read" ON registrations
    FOR SELECT
    USING (true);

-- Add comments for documentation
COMMENT ON TABLE registrations IS 'Stores user registrations for JolHub waitlist';
COMMENT ON COLUMN registrations.id IS 'Auto-incrementing primary key';
COMMENT ON COLUMN registrations.created_at IS 'Timestamp when registration was created';
COMMENT ON COLUMN registrations.first_name IS 'User first name (required)';
COMMENT ON COLUMN registrations.last_name IS 'User last name (required)';
COMMENT ON COLUMN registrations.email IS 'User email address (required, unique)';
COMMENT ON COLUMN registrations.phone IS 'User phone number (optional)';
COMMENT ON COLUMN registrations.company IS 'User company/organization (optional)';
COMMENT ON COLUMN registrations.event_types IS 'Selected event types (required)';
COMMENT ON COLUMN registrations.referral_source IS 'How user heard about JolHub (required)';