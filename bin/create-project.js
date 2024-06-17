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
  
  // Getting files from different Directories 
  { path: 'pages/index.js', template: path.join(currentProjectDir, '../pages', 'index.js') },
  { path: 'app/globals.css', template: path.join(currentProjectDir, '../app', 'globals.css') },

  // From Component/molecules Directory
  { path: 'components/molecules/Mole.jsx', template: path.join(currentProjectDir, '../components/molecules', 'Mole.jsx') },
 
  // From Component/molecules Directory
  { path: 'components/organisms/Organ.jsx', template: path.join(currentProjectDir, '../components/organisms', 'Organ.jsx') },
 
  // From Component/molecules Directory
  { path: 'components/templates/Temp.jsx', template: path.join(currentProjectDir, '../components/templates', 'Temp.jsx') },
 
  // From Component/atoms Directory
  { path: 'components/atoms/anchorTag.jsx', template: path.join(currentProjectDir, '../components/atoms', 'anchorTag.jsx') },
  { path: 'components/atoms/Button.jsx', template: path.join(currentProjectDir, '../components/atoms', 'Button.jsx') },
  { path: 'components/atoms/CheckBox.jsx', template: path.join(currentProjectDir, '../components/atoms', 'CheckBox.jsx') },
  { path: 'components/atoms/Container.jsx', template: path.join(currentProjectDir, '../components/atoms', 'Container.jsx') },
  { path: 'components/atoms/CustomImage.jsx', template: path.join(currentProjectDir, '../components/atoms', 'CustomImage.jsx') },
  { path: 'components/atoms/EventButton.jsx', template: path.join(currentProjectDir, '../components/atoms', 'EventButton.jsx') },
  { path: 'components/atoms/Heading.jsx', template: path.join(currentProjectDir, '../components/atoms', 'Heading.jsx') },
  { path: 'components/atoms/Input.jsx', template: path.join(currentProjectDir, '../components/atoms', 'Input.jsx') },
  { path: 'components/atoms/Label.jsx', template: path.join(currentProjectDir, '../components/atoms', 'Label.jsx') },
  { path: 'components/atoms/Logo.jsx', template: path.join(currentProjectDir, '../components/atoms', 'Logo.jsx') },
  { path: 'components/atoms/Paragraph.jsx', template: path.join(currentProjectDir, '../components/atoms', 'Paragraph.jsx') },
  { path: 'components/atoms/Span.jsx', template: path.join(currentProjectDir, '../components/atoms', 'Span.jsx') },
  
  // Root Directory
  { path: 'package.json', template: path.join(currentProjectDir, '../package.json') },
  { path: 'next.config.mjs', template: path.join(currentProjectDir, '../next.config.mjs') },
  { path: 'jsconfig.json', template: path.join(currentProjectDir, '../jsconfig.json') },
  { path: 'postcss.config.mjs', template: path.join(currentProjectDir, '../postcss.config.mjs') },
  { path: 'tailwind.config.js', template: path.join(currentProjectDir, '../tailwind.config.js') },
  // { path: '.gitignore', template: path.join(currentProjectDir, '../.gitignore') },
  { path: 'README.md', template: path.join(currentProjectDir, '../README.md') }
];

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
    console.error(`Template file '${file.template}' not found.`);
  }
});

console.log(`Project ${projectName} created successfully.`);
