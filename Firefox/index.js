var tabs = require('sdk/tabs');
var pageMod = require('sdk/page-mod');
var buttons = require('sdk/ui/button/action');

var button = buttons.ActionButton ({
  id: "nytimesapp",
  label: "So Hot Right Now",
  icon: {
    "16": "./nytimesred16.png",
    "32": "./nytimesred32.png",
    "64": "./nytimesred64.png"
  },
});

pageMod.PageMod ({
  include: "*.nytimes.com/*",
  contentScriptFile: ["./contentscript.js","./jquery-1.11.3.min.js"],
  contentScriptWhen: "ready"
});
