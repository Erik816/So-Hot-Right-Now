var tabs = require('sdk/tabs');
var pageMod = require('sdk/page-mod');
var self= require('sdk/self');

pageMod.PageMod ({
  include: "http://www.nytimes.com/*",
  contentScriptFile: [self.data.url("contentscript.js"),
                      self.data.url("jquery-2.1.4.min.js")],
  attachTo: ['existing', 'top'],
  contentScriptWhen: 'ready',
  contentScriptOptions: {
    pngUrl: self.data.url("hot_big.png")
  }
});
