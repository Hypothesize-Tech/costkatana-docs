#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

console.log('🔍 Verifying build output...');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('❌ dist directory not found');
  process.exit(1);
}

// Check if index.html exists
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in dist directory');
  process.exit(1);
}

// Read and verify index.html
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Check for module script with proper type
const moduleScriptRegex = /<script\s+type="module"\s+crossorigin\s+src="[^"]*\.js"><\/script>/;
if (!moduleScriptRegex.test(indexContent)) {
  console.error('❌ No proper module script found in index.html');
  console.log('Index.html content preview:');
  console.log(indexContent.substring(0, 500) + '...');
  process.exit(1);
}

// Check for CSS link (optional since CSS might be inlined or not needed)
const cssLinkRegex = /<link\s+rel="stylesheet"\s+crossorigin\s+href="[^"]*\.css">/;
const hasCSSLink = cssLinkRegex.test(indexContent);
if (!hasCSSLink) {
  console.warn('⚠️  No external CSS link found in index.html (CSS might be inlined or minimal)');
} else {
  console.log('✅ CSS link found in index.html');
}

// Check assets directory
const assetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('❌ assets directory not found');
  process.exit(1);
}

// Check for JavaScript files in assets
const assetFiles = fs.readdirSync(assetsDir);
const jsFiles = assetFiles.filter(file => file.endsWith('.js'));
const cssFiles = assetFiles.filter(file => file.endsWith('.css'));

if (jsFiles.length === 0) {
  console.error('❌ No JavaScript files found in assets directory');
  process.exit(1);
}

if (cssFiles.length === 0) {
  console.warn('⚠️  No CSS files found in assets directory (CSS might be inlined or minimal)');
} else {
  console.log(`✅ Found ${cssFiles.length} CSS files`);
}

// Verify JavaScript files have proper module structure
for (const jsFile of jsFiles) {
  const jsPath = path.join(assetsDir, jsFile);
  const jsContent = fs.readFileSync(jsPath, 'utf8');
  
  // Check if it's a proper ES module (should have import/export statements or module structure)
  if (!jsContent.includes('import') && !jsContent.includes('export') && !jsContent.includes('__vite')) {
    console.warn(`⚠️  ${jsFile} might not be a proper ES module`);
  }
}

console.log('✅ Build verification completed successfully!');
console.log(`📁 Found ${jsFiles.length} JavaScript files${cssFiles.length > 0 ? ` and ${cssFiles.length} CSS files` : ''}`);
console.log('🚀 Build is ready for deployment');

// Output file list for debugging
console.log('\n📋 Asset files:');
assetFiles.forEach(file => {
  console.log(`   - ${file}`);
});
