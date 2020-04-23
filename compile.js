const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

if (process.argv.length < 4) {
  throw "Error - no files specified. Usage: 'node compile.js data.json template.hbs'";
}

let root = __dirname;
let outputPath = path.join(root, "/build/");
if (!fs.existsSync(outputPath)) {
  console.log("build folder does not exist yet. Creating...");
  fs.mkdirSync(outputPath);
}

let dataPath = process.argv[2];
if (path.extname(dataPath) === "") {
  dataPath = dataPath + ".json";
}

let templatePath = process.argv[3];
if (path.extname(templatePath) === "") {
  templatePath = templatePath + ".hbs";
}

let directoryName = path.dirname(dataPath).split(path.sep).pop();
let fileName = "index.html";

if (directoryName !== "index") {
  fileName = directoryName + "/index.html";
  console.log(path.join(outputPath, directoryName));
  fs.mkdirSync(path.join(outputPath, directoryName));
}

console.log("Compiling " + dataPath);
let dataJSON = JSON.parse(fs.readFileSync(dataPath));
let templateHBS = fs.readFileSync(templatePath).toString();
let templateFunction = handlebars.compile(templateHBS);
let html = templateFunction(dataJSON);

fs.writeFileSync(path.join(outputPath, fileName), html, function (error) {
  if (error) throw error;
});

function debug() {
  console.table({
    root: root,
    outputPath: outputPath,
    "process.argv[2]": process.argv[2],
    "process.argv[3]": process.argv[3],
    dataPath: dataPath,
    templatePath: templatePath,
    directoryName: directoryName,
  });
}
debug();
