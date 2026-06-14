const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/pages/admin/AdminAspirasi.tsx',
  'src/pages/admin/AdminGabung.tsx',
  'src/pages/admin/AdminKipPip.tsx',
  'src/pages/admin/Dashboard.tsx',
  'src/pages/public/Home.tsx',
  'src/pages/public/Kabar.tsx',
  'src/pages/public/KabarDetail.tsx',
  'src/pages/public/Multimedia.tsx',
  'src/pages/public/Profil.tsx'
];

filesToFix.forEach(file => {
  const filePath = path.join(__dirname, 'frontend', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix "import React, { "
    content = content.replace(/import React, \{/g, 'import {');
    
    // Fix "import React from 'react';"
    content = content.replace(/import React from 'react';\n?/g, '');

    // Fix unused Trash2 in AdminKipPip
    if (file.includes('AdminKipPip')) {
      content = content.replace(/, Trash2/g, '');
    }

    // Fix unused ChevronRight in Home
    if (file.includes('Home')) {
      content = content.replace(/ChevronRight, /g, '');
    }

    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
  }
});
