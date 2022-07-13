const path = require('path');
const fs = require('fs');

const useVue = process.argv[2] === 'v';

function removeVue(file) {
  var data = fs.readFileSync(file, 'utf-8');

  var newValue;

  if (useVue) {
    newValue = data.replace(/\n\s*\/\/ VUE-START/, '');
    newValue = newValue.replace(/\n\s*\/\/ VUE-END/, '');
  } else {
    newValue = data.replace(/\s+\/\/ VUE-START((\n|.)*)\s+\/\/ VUE-END/, '');
  }

  fs.writeFileSync(file, newValue, 'utf-8');
}

removeVue(path.join(process.cwd(), 'views', 'layout.pug'));
removeVue(path.join(process.cwd(), 'views', 'index.pug'));
removeVue(path.join(process.cwd(), 'public', 'javascripts', 'script.js'));
removeVue(path.join(process.cwd(), 'public', 'stylesheets', 'style.styl'));

if (!useVue) {
  fs.unlinkSync(path.join(process.cwd(), 'public', 'javascripts', 'vue.js'));
}
fs.unlinkSync(path.join(process.cwd(), 'init.js'));
