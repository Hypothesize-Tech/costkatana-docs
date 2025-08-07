#!/usr/bin/env node
const testMimeTypes = async () => {
  const baseUrl = 'http://localhost:3000';
  
  const testFiles = [
    '/assets/index-B5Qt9EMX.js',
    '/assets/index-C3txxzPH.css',
    '/'
  ];

  console.log('🔍 Testing MIME types on local server...\n');

  for (const file of testFiles) {
    try {
      const url = `${baseUrl}${file}`;
      console.log(`Testing: ${url}`);
      
      const response = await fetch(url);
      const contentType = response.headers.get('content-type');
      
      console.log(`  Status: ${response.status}`);
      console.log(`  Content-Type: ${contentType}`);
      
      // Check if MIME type is correct
      if (file.endsWith('.js')) {
        if (contentType && contentType.includes('application/javascript')) {
          console.log('  ✅ JavaScript MIME type is correct');
        } else {
          console.log('  ❌ JavaScript MIME type is incorrect');
        }
      } else if (file.endsWith('.css')) {
        if (contentType && contentType.includes('text/css')) {
          console.log('  ✅ CSS MIME type is correct');
        } else {
          console.log('  ❌ CSS MIME type is incorrect');
        }
      } else if (file === '/') {
        if (contentType && contentType.includes('text/html')) {
          console.log('  ✅ HTML MIME type is correct');
        } else {
          console.log('  ❌ HTML MIME type is incorrect');
        }
      }
      
      console.log('');
    } catch (error) {
      console.log(`  ❌ Error testing ${file}: ${error.message}\n`);
    }
  }
};

// Wait a moment for server to start, then test
setTimeout(testMimeTypes, 2000);
