const fs = require("fs");

module.exports.fileExists = function (path) {
  return fs.existsSync(path);
};
