const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// it's a very simple script to just update firebase http2 push header after success build
const DIST = path.join(__dirname, '../dist');
const INDEX_FILE = path.join(__dirname, '../dist/index.html');
const SW_REGISTRATION = '<script src="/sw-registration.js"></script>';

const dir_list = fs.readdirSync(DIST);
const sw_js = dir_list.find(file => file.startsWith('sw-') && file.endsWith('.js'));
const app_js = dir_list.find(file => file.startsWith('app-') && file.endsWith('.js'));
const app_css = dir_list.find(file => file.startsWith('app-') && file.endsWith('.css'));
const swContent = fs.readFileSync(DIST + '/' + sw_js, 'utf8');
const file = fs.readFileSync(INDEX_FILE, 'utf8');
// replace sw-registration.js with the content
const newIndex = file
  .replace(SW_REGISTRATION, `<script defer>${swContent}</script>`);

// write new index with inline sw-registration.js
/*
 PLEASE DON"T JUDGE ME FOR THIS CODE, I WILL MAKE IT MUCH BETTER LATER.
 */
fs.writeFileSync(INDEX_FILE, newIndex);

// remove sw-registration.js
exec('rm ./dist/sw-registration.js', (error) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(sw_js + ' has been removed!');
});

// remove app-**.css file
exec(`rm ./dist/${app_css}`, (error) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(app_css + ' has been removed!');
});

console.log('index.html has been successfully updated.');
