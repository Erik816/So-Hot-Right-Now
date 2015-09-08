var tabs = require('sdk/tabs');
var pageMod = require('sdk/page-mod');
var self= require('sdk/self');

pageMod.PageMod ({
  include: "http://www.nytimes.com/*",
  contentScriptFile: ["./contentscript.js",
                      "./jquery-1.11.3.min.js"],
  attachTo: ['existing', 'top'],
  contentScriptOptions: {
    pngUrl: self.data.url("hot_big.png");
  }
});
