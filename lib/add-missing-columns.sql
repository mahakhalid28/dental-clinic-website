-- =====================================================
-- ADD MISSING COLUMNS TO EXISTING TABLES
-- Run this in Supabase SQL Editor to add missing columns
-- =====================================================

-- =====================================================
-- 1. PATIENTS TABLE - Add missing columns
-- =====================================================
DO $$
BEGIN
    -- Add gender column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'gender') THEN
        ALTER TABLE patients ADD COLUMN gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other'));
    END IF;

    -- Add city column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'city') THEN
        ALTER TABLE patients ADD COLUMN city VARCHAR(100);
    END IF;

    -- Add emergency_phone column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'emergency_phone') THEN
        ALTER TABLE patients ADD COLUMN emergency_phone VARCHAR(20);
    END IF;

    -- Add blood_group column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'blood_group') THEN
        ALTER TABLE patients ADD COLUMN blood_group VARCHAR(10);
    END IF;

    -- Add allergies column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'allergies') THEN
        ALTER TABLE patients ADD COLUMN allergies TEXT;
    END IF;

    -- Add notes column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'notes') THEN
        ALTER TABLE patients ADD COLUMN notes TEXT;
    END IF;

    -- Add is_active column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'patients' AND column_name = 'is_active') THEN
        ALTER TABLE patients ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- =====================================================
-- 2. DENTISTS TABLE - Add missing columns
-- =====================================================
DO $$
BEGIN
    -- Add license_number column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'dentists' AND column_name = 'license_number') THEN
        ALTER TABLE dentists ADD COLUMN license_number VARCHAR(100);
    END IF;

    -- Add consultation_fee column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'dentists' AND column_name = 'consultation_fee') THEN
        ALTER TABLE dentists ADD COLUMN consultation_fee DECIMAL(10, 2);
    END IF;

    -- Add available_days column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'dentists' AND column_name = 'available_days') THEN
        ALTER TABLE dentists ADD COLUMN available_days VARCHAR(100);
    END IF;

    -- Add working_hours_start column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'dentists' AND column_name = 'working_hours_start') THEN
        ALTER TABLE dentists ADD COLUMN working_hours_start TIME;
    END IF;

    -- Add working_hours_end column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'dentists' AND column_name = 'working_hours_end') THEN
        ALTER TABLE dentists ADD COLUMN working_hours_end TIME;
    END IF;

    -- Add is_active column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'dentists' AND column_name = 'is_active') THEN
        ALTER TABLE dentists ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- =====================================================
-- 3. SERVICES TABLE - Add missing columns
-- =====================================================
DO $$
BEGIN
    -- Add image column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'image') THEN
        ALTER TABLE services ADD COLUMN image TEXT;
    END IF;

    -- Add is_active column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'is_active') THEN
        ALTER TABLE services ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;

    -- Add duration_minutes column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'duration_minutes') THEN
        ALTER TABLE services ADD COLUMN duration_minutes INTEGER DEFAULT 30;
    END IF;

    -- Add category column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'category') THEN
        ALTER TABLE services ADD COLUMN category VARCHAR(100);
    END IF;
END $$;

-- =====================================================
-- 4. APPOINTMENTS TABLE - Add missing columns
-- =====================================================
DO $$
BEGIN
    -- Add end_time column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'end_time') THEN
        ALTER TABLE appointments ADD COLUMN end_time TIME;
    END IF;

    -- Add cancellation_reason column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'cancellation_reason') THEN
        ALTER TABLE appointments ADD COLUMN cancellation_reason TEXT;
    END IF;

    -- Add reminder_sent column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'reminder_sent') THEN
        ALTER TABLE appointments ADD COLUMN reminder_sent BOOLEAN DEFAULT false;
    END IF;

    -- Add created_by column if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'created_by') THEN
        ALTER TABLE appointments ADD COLUMN created_by UUID;
    END IF;
END $$;

-- Verify columns were added
SELECT 'Columns updated successfully!' as result;
