const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDentists() {
  const { data, error } = await supabase
    .from('dentists')
    .select('id, name, image');

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Current dentists:');
    console.log(JSON.stringify(data, null, 2));
  }
  process.exit(0);
}

checkDentists();
