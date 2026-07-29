const fs = require('fs');
const cssFile = 'src/premium-theme.css';

let css = fs.readFileSync(cssFile, 'utf8');

const fixCSS = `

/* =========================================================================
   MOBILE GLOBAL BACKGROUND FIX
   Ensure the UFC background image shows on all mobile pages with a dark overlay
========================================================================= */
@media (max-width: 768px) {
  body {
    /* Set the background image globally for mobile, with a strong dark overlay */
    background: 
      linear-gradient(to bottom, rgba(10, 10, 10, 0.94), rgba(5, 5, 5, 0.98)),
      url('../assets/ufc-front-page.jpg') center/cover fixed no-repeat !important;
  }
  
  /* Ensure the app-shell is transparent so the body background shows through */
  .app-shell {
    background-color: transparent !important;
  }
  
  /* Remove the home page specific background since it's now global */
  .home-page-container {
    background: transparent !important;
  }
}
`;

fs.writeFileSync(cssFile, css + fixCSS);
console.log('Mobile background fix applied.');
