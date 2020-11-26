var fs = require('fs');

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
function defaultTask(cb) {
  // place code for your default task here
  console.log("gulpfile initialized and default task is running!");
  // define which directories to run
  const directories = [
    "./src/atoms/icons/svg/",
    "./src/atoms/icons/newPins/"
  ]
  // run both tasks (build icons + build icon names)
  buildIcons(directories);
  buildIconNamesDictionary(directories);
  cb();
}

function buildIcons(directories) {
  // get file template as String (with placeholders)
  let jsFileContent = 'export const LiistSVGIcons = { \n@@@CONTENT@@@ };';

  // initialize results object
  const allContent = {};

  // run for all directories
  directories.forEach(dirname => {
    let files = fs.readdirSync(dirname);
    files.forEach(function (file) {
      var contents = fs.readFileSync(dirname + file, 'utf8');
      const iconName = file.split(".")[0];
      allContent[iconName] = contents;
    })
  })

  // inject the filename and svg content
  const buildContent = [];
  for (const [key, value] of Object.entries(allContent)) {
    buildContent.push(`'${key}': \`${value}\``);
  }
  jsFileContent = jsFileContent.replace("@@@CONTENT@@@", buildContent.join(", \n"));

  // save as new file (override)
  fs.writeFileSync('./src/atoms/icons/LiistSVGIcons.js', jsFileContent);
}

function buildIconNamesDictionary(directories) {
  // get file template as String (with placeholders)
  let jsFileContent = 'export const LiistIconNames = @@@CONTENT@@@;';

  // initialize results array
  const iconNamesArr = [];

  // run for all directories
  directories.forEach(dirname => {
    let files = fs.readdirSync(dirname);
    files.forEach(function (file) {
      const iconName = file.split(".")[0];
      iconNamesArr.push(iconName);
    });
  })

  // save as new file (override)
  jsFileContent = jsFileContent.replace("@@@CONTENT@@@", JSON.stringify(iconNamesArr, null, 2));
  fs.writeFileSync('./src/atoms/icons/LiistIconNames.js', jsFileContent);
}

// exports.buildIcons = buildIcons;
exports.default = defaultTask
