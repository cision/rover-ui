var fs = require('fs');
var svgRegex = /<\/?svg.*?>/g;
var fillRegex = /\sfill="#\d+"/;
var spaceRegex = /"\/>/g;
var gRegex = /<\/?g.*?>/;

module.exports = {
  helpers: {
    fileContents: fileName => {
      var fileContents = fs.readFileSync(fileName, 'utf8');
      return fileContents
        .replace(svgRegex, '')
        .replace(fillRegex, '')
        .replace(spaceRegex, '" />');
    },
    // dontPrint: fileTemplate => String(fs).match(regex)
  },
};
