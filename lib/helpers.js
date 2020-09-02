const fs = require('fs');

module.exports = function(req, res, next) {
  res.locals.json = JSON.stringify;
  res.locals.svg = svg;
  next();
};

const svg = function (src, _prefix) {
  if (!src.match(/\.svg$/)) src = `${src}.svg`;

  if (fs.existsSync(`public/images/${src}`)) {
    src = `public/images/${src}`;
  }

  const prefix = _prefix ? `${prefix_}-` : '';

  let file = fs.readFileSync(src).toString();

  // Sketch uses generic IDs that conflict...
  file = file.replace(/id="/g, `id="${prefix}`);
  file = file.replace(/xlink:href="#/g, `xlink:href="#${prefix}`);
  file = file.replace(/url\(#/g, `url(#${prefix}`);

  file = file.replace(/<title>(.*)<\/title>/g, '');
  file = file.replace(/<desc>(.*)<\/desc>/g, '');
  file = file.replace(/<!--(.*?)-->/g, '');

  // Give it an ID
  if (_prefix) {
    file = file.replace(/<svg/, `<svg id="${_prefix}"`);
  }
  return file;
};
