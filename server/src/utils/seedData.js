import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Funkcja do wczytywania danych z plików JS
async function loadDataFile(filename) {
  try {
    const dataPath = path.join(__dirname, '../../../data', filename);
    const fileContent = await fs.readFile(dataPath, 'utf8');
    
    // Wyciągnij dane z eksportu
    const exportMatch = fileContent.match(/const\s+\w+\s*=\s*(\[[\s\S]*\]);/);
    if (!exportMatch) {
      throw new Error(`Nie można znaleźć danych w pliku ${filename}`);
    }
    
    // Użyj eval (tylko dla seedowania, NIGDY w produkcji!)
    const data = eval(exportMatch[1]);
    return data;
  } catch (error) {
    console.error(`Błąd wczytywania ${filename}:`, error);
    throw error;
  }
}

async function seedSwiadczenia() {
  console.log('🌱 Seeding świadczenia...');
  
  try {
    const swiadczeniaData = await loadDataFile('swiadczeniaDb.js');
    
    const { data, error } = await supabase
      .from('swiadczenia')
      .upsert(swiadczeniaData, { onConflict: 'id' });

    if (error) {
      console.error('❌ Error seeding świadczenia:', error);
      return false;
    }

    console.log(`✅ Successfully seeded ${swiadczeniaData.length} świadczenia`);
    return true;
  } catch (error) {
    console.error('❌ Error in seedSwiadczenia:', error);
    return false;
  }
}

async function seedPisma() {
  console.log('🌱 Seeding pisma...');
  
  try {
    const pismaData = await loadDataFile('pismaDb.js');
    
    const { data, error } = await supabase
      .from('pisma')
      .upsert(pismaData, { onConflict: 'id' });

    if (error) {
      console.error('❌ Error seeding pisma:', error);
      return false;
    }

    console.log(`✅ Successfully seeded ${pismaData.length} pisma`);
    return true;
  } catch (error) {
    console.error('❌ Error in seedPisma:', error);
    return false;
  }
}

async function seedDotacje() {
  console.log('🌱 Seeding dotacje...');
  
  try {
    const dotacjeData = await loadDataFile('dotacjeDb.js');
    
    const { data, error } = await supabase
      .from('dotacje')
      .upsert(dotacjeData, { onConflict: 'id' });

    if (error) {
      console.error('❌ Error seeding dotacje:', error);
      return false;
    }

    console.log(`✅ Successfully seeded ${dotacjeData.length} dotacje`);
    return true;
  } catch (error) {
    console.error('❌ Error in seedDotacje:', error);
    return false;
  }
}

async function createDemoUser() {
  console.log('🌱 Creating demo user...');
  
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'demo@example.com',
      password: 'demo123',
      email_confirm: true,
      user_metadata: {
        full_name: 'Demo User'
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('ℹ️  Demo user already exists');
        return true;
      }
      console.error('❌ Error creating demo user:', error);
      return false;
    }

    // Utwórz profil
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email: 'demo@example.com',
        full_name: 'Demo User'
      });

    if (profileError && !profileError.message.includes('duplicate')) {
      console.error('❌ Error creating demo profile:', profileError);
    }

    console.log('✅ Demo user created successfully');
    console.log('   Email: demo@example.com');
    console.log('   Password: demo123');
    return true;
  } catch (error) {
    console.error('❌ Error in createDemoUser:', error);
    return false;
  }
}

async function seedAll() {
  console.log('🚀 Starting database seeding...\n');

  try {
    // Sprawdź połączenie
    const { data, error } = await supabase
      .from('swiadczenia')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Cannot connect to database:', error.message);
      console.error('Please check your SUPABASE_URL and SUPABASE_SERVICE_KEY');
      process.exit(1);
    }

    await seedSwiadczenia();
    await seedPisma();
    await seedDotacje();
    await createDemoUser();
    
    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Start the server: npm run dev');
    console.log('   2. Start the client: cd ../client && npm run dev');
    console.log('   3. Login with: demo@example.com / demo123');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during seeding:', error);
    process.exit(1);
  }
}

// Uruchom seeding
seedAll();