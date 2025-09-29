// scripts/build.js
import { build } from 'vite';

async function run() {
  try {
    await build({
      // options Vite par défaut : il lit vite.config.js si présent
      // tu peux ajouter ici des overrides si nécessaire
    });
    console.log('✅ Vite build succeeded');
  } catch (err) {
    console.error('❌ Vite build failed', err);
    process.exit(1);
  }
}

run();
