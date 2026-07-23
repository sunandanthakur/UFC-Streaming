const fs = require('fs');
const files = ['server.js', 'server.supabase.js', 'src/app.js', 'src/app.supabase.js'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');

    code = code.replace(/"SportsData\.io MMA API key is not configured\."/g, '"Service unavailable."');
    code = code.replace(/"Cito API key missing"/g, '"Service unavailable."');
    code = code.replace(/"Cito API key is not configured\."/g, '"Service unavailable."');
    code = code.replace(/"Supabase is not configured\."/g, '"Service unavailable."');
    code = code.replace(/Supabase is not configured\. Add SUPABASE_URL and SUPABASE_ANON_KEY to \.env, then restart the server\./g, 'Service unavailable.');
    
    // Also remove the banner in app.js
    code = code.replace(/<div class="supabase-banner">Supabase is not configured yet\. Copy <code>env\.supabase\.example<\/code> values into <code>\.env<\/code>, run the SQL in <code>supabase\/schema\.sql<\/code>, then restart with <code>npm start<\/code>\.<\/div>/g, '<div class="supabase-banner">Service unavailable. Please try again later.</div>');

    fs.writeFileSync(file, code);
  }
});
console.log("All API key texts scrubbed from legacy and current files.");
