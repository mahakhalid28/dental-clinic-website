import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ripfehjbwcxiksavvntk.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcGZlaGpid2N4aWtzYXZ2bnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NzExNjAsImV4cCI6MjA4ODM0NzE2MH0.fooDYXiv6bNqalyey59DLtYLU3vhfwiMkYCgbWfIjDU"

export const supabase = createClient(supabaseUrl, supabaseKey)
