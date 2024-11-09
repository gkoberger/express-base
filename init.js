const path = require("path");
const fs = require("fs");

const useVue = process.argv[2] === "v";
const useSocket = process.argv[2] === "s";

(() => {
  function removeVue(file) {
    var data = fs.readFileSync(file, "utf-8");

    var newValue = data;

    if (useVue) {
      newValue = newValue.replace(/\n\s*\/\/ VUE-START/, "");
      newValue = newValue.replace(/\n\s*\/\/ VUE-END/, "");
    } else {
      newValue = newValue.replace(
        /\s+\/\/ VUE-START((\n|.)*)\s+\/\/ VUE-END/,
        "",
      );
    }

    if (useSocket) {
      newValue = newValue.replace(/(^\n)?\s*\/\/ SOCKET-START/g, "");
      newValue = newValue.replace(/\n\s*\/\/ SOCKET-END/g, "");
    } else {
      newValue = newValue.replace(
        /\s*\/\/ SOCKET-START((\n|.)*?)\s+\/\/ SOCKET-END/g,
        "",
      );
    }

    fs.writeFileSync(file, newValue.trim(), "utf-8");
  }

  removeVue(path.join(process.cwd(), "bin", "www"));
  removeVue(path.join(process.cwd(), "bin", "www-e"));
  removeVue(path.join(process.cwd(), "views", "layout.pug"));
  removeVue(path.join(process.cwd(), "views", "index.pug"));
  removeVue(path.join(process.cwd(), "routes", "index.js"));
  removeVue(path.join(process.cwd(), "public", "javascripts", "script.js"));
  removeVue(path.join(process.cwd(), "public", "stylesheets", "style.styl"));

  if (!useVue) {
    fs.unlinkSync(path.join(process.cwd(), "public", "javascripts", "vue.js"));
  }

  if (!useSocket) {
    fs.unlinkSync(path.join(process.cwd(), "lib", "socket.js"));

    const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

    if (packageJson.dependencies && packageJson.dependencies["socket.io"]) {
      delete packageJson.dependencies["socket.io"];
    }

    fs.writeFileSync(
      "./package.json",
      JSON.stringify(packageJson, null, 2),
      "utf8",
    );
  }

  fs.unlinkSync(path.join(process.cwd(), "init.js"));
})();
