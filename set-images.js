const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateImages() {
  try {
    const { data: dentists } = await supabase
      .from('dentists')
      .select('id, name');

    console.log('Dentists in database:');
    dentists?.forEach(d => console.log(`  ${d.name}`));

    // Update Ahmed
    const ahmed = dentists?.find(d => d.name.toLowerCase().includes('ahmed'));
    if (ahmed) {
      await supabase.from('dentists').update({ profile_image: 'ahmed.png' }).eq('id', ahmed.id);
      console.log('\n✓ Updated Ahmed with ahmed.png');
    }

    // Update Sharqa
    const sharqa = dentists?.find(d => d.name.toLowerCase().includes('sharqa'));
    if (sharqa) {
      await supabase.from('dentists').update({ profile_image: 'sharqa.png' }).eq('id', sharqa.id);
      console.log('✓ Updated Sharqa with sharqa.png');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

updateImages();
