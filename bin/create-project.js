#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];
const projectPath = path.join(process.cwd(), projectName);

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

// Define paths to template files within your current project structure
const currentProjectDir = path.resolve(__dirname); // Get the directory where the script is located

const filesToCreate = [
  { path: 'pages/index.js', template: path.join(currentProjectDir, 'pages', 'index.js') },
  { path: 'app/globals.css', template: path.join(currentProjectDir, 'app', 'globals.css') },
  { path: 'package.json', template: path.join(currentProjectDir, 'package.json') },
  { path: 'next.config.mjs', template: path.join(currentProjectDir, 'next.config.mjs') }, // Adjusted to use .mjs
  { path: 'jsconfig.json', template: path.join(currentProjectDir, 'jsconfig.json') },
  { path: 'postcss.config.mjs', template: path.join(currentProjectDir, 'postcss.config.mjs') }, // Adjusted to use .mjs
  { path: 'tailwind.config.js', template: path.join(currentProjectDir, 'tailwind.config.js') },
  { path: '.gitignore', template: path.join(currentProjectDir, '.gitignore') },
  { path: 'README.md', template: path.join(currentProjectDir, 'README.md') }
];

// Function to copy files recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Create project directory and necessary subdirectories
fs.mkdirSync(projectPath, { recursive: true });
fs.mkdirSync(path.join(projectPath, 'pages'), { recursive: true });
fs.mkdirSync(path.join(projectPath, 'app'), { recursive: true });

// Write files to project directory
filesToCreate.forEach(file => {
  const filePath = path.join(projectPath, file.path);
  const templateFilePath = file.template;

  // Check if the template file exists
  if (fs.existsSync(templateFilePath)) {
    // Read template content and write to project file
    const content = fs.readFileSync(templateFilePath, 'utf8');
    fs.writeFileSync(filePath, content);
  } else {
    console.error(`Template file '${templateFilePath}' not found.`);
  }
});

// Copy all files from the components directory
const componentsSrc = path.join(currentProjectDir, 'components');
const componentsDest = path.join(projectPath, 'components');
if (fs.existsSync(componentsSrc)) {
  copyRecursiveSync(componentsSrc, componentsDest);
} else {
  console.error(`Components directory '${componentsSrc}' not found.`);
}

console.log(`Project ${projectName} created successfully.`);
