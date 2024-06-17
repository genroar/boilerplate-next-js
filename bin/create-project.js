#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];
const projectPath = path.join(process.cwd(), projectName);

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

const templateDir = path.join(__dirname, '../templates');

const filesToCreate = [
  { path: 'pages/index.js', template: 'pages/index.js' },
  { path: 'app/globals.css', template: 'app/globals.css' },
  { path: 'package.json', template: 'package.json' },
  { path: 'next.config.js', template: 'next.config.js' },
  { path: 'jsconfig.json', template: 'jsconfig.json' },
  { path: 'postcss.config.mjs', template: 'postcss.config.mjs' },
  { path: 'tailwind.config.js', template: 'tailwind.config.js' },
  { path: '.gitignore', content: `node_modules\n.next\nout\n` },
  { path: 'README.md', template: 'README.md' }
];

fs.mkdirSync(projectPath, { recursive: true });
fs.mkdirSync(path.join(projectPath, 'pages'), { recursive: true });
fs.mkdirSync(path.join(projectPath, 'app'), { recursive: true });

filesToCreate.forEach(file => {
  const filePath = path.join(projectPath, file.path);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const content = file.template
    ? fs.readFileSync(path.join(templateDir, file.template), 'utf8')
    : file.content;
  fs.writeFileSync(filePath, content);
});

console.log(`Project ${projectName} created successfully.`);
