const fs = require('fs');
const path = require('path');

// it's a very simple script to just update firebase http2 push header after success build
const DIST = path.join(__dirname, '../dist');
const FIREBASE = path.join(__dirname, '../firebase.json');

const dir_list = fs.readdirSync(DIST);
const app_js = dir_list.find(file => file.startsWith('app-') && file.endsWith('.js'));
const file = JSON.parse(fs.readFileSync(FIREBASE, 'utf8'));
const link = file['hosting']
  .headers.find(prop => prop.source === '/')
  .headers.find(head => head.key === 'Link');

// I know I am mutating directly but it's fine
link.value = `</${app_js}>;rel=preload;as=script`;
const newFile = JSON.stringify(file, null, 2);

// write new firebase.json with new app-{hash}.js file
fs.writeFileSync(FIREBASE, newFile);
