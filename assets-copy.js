var wrench = require("wrench"),
  util = require("util");

var source = "./assets";
var target = "./dist/bundles/assets";

wrench.copyDirSyncRecursive(source, target, {
  forceDelete: true
});

console.log("Asset files successfully copied!");