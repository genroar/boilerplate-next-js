#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];
const projectPath = path.join(process.cwd(), projectName);

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

const filesToCreate = [
  { path: 'pages/index.js'},
  { path: 'app/globals.css'},
  { path: 'package.json'},
  { path: 'next.config.js'},
  { path: 'jsconfig.js'},
  { path: 'postcss.config.mjs'},
  { path: 'tailwind.config.js'},
  { path: '.gitignore', content: `node_modules\n.next\nout\n` },
  { path: 'README.md', content: `# ${projectName}\n\nGenerated by create-project script.` }
];

fs.mkdirSync(projectPath, { recursive: true });
fs.mkdirSync(path.join(projectPath, 'pages'), { recursive: true });
fs.mkdirSync(path.join(projectPath, 'styles'), { recursive: true });

filesToCreate.forEach(file => {
  const filePath = path.join(projectPath, file.path);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, file.content);
});

console.log(`Project ${projectName} created successfully.`);
