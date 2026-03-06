import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateAhmed() {
  try {
    // Get all dentists to find Ahmed
    const { data: dentists, error: fetchError } = await supabase
      .from('dentists')
      .select('id, name');

    if (fetchError) throw fetchError;

    console.log('Available dentists:');
    dentists.forEach(d => console.log(`  - ${d.name} (ID: ${d.id})`));

    // Find Ahmed
    const ahmed = dentists.find(d => d.name.toLowerCase().includes('ahmed'));
    
    if (ahmed) {
      console.log(`\nUpdating ${ahmed.name} with ahmed.png...`);
      const { error: updateError } = await supabase
        .from('dentists')
        .update({ profile_image: 'ahmed.png' })
        .eq('id', ahmed.id);

      if (updateError) throw updateError;
      console.log('✓ Successfully updated Dr. Ahmed\'s image!');
    } else {
      console.log('⚠ Dr. Ahmed not found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

updateAhmed();
