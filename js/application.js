var App = App || {};

// List all files in current directory
App.getAllFiles = function() {
  var glob = require('glob');
  glob("*.*", null, function(er, files){
    var element = document.getElementById("files");
    element.innerHTML = "";
    files.forEach(function(file) {
      element.innerHTML = element.innerHTML + 
        "<button type='button' class='btn btn-link' onclick='App.readContent(\"" 
          + file + "\")'>" + file + "</button>";
    });
  });
}

// Get contents of one file
App.readContent = function(name) {
  const fs = require('fs');
  fs.readFile(name, (err, data) => {
    console.log(data.toString());
  })
}

App.triggerNotification = function() {
  let notification = new Notification('Notification', {
    body: 'Quite easy to trigger a notification!'
  })
}

// load on document ready..
App.init = function() {
  // initialize Reveal JS
  var Reveal = require('reveal.js');
  Reveal.initialize({
      controls: false,
      transition: 'convex'
    }
  );

  // initialize highlight js
  var hljs = require('highlight.js');
  hljs.initHighlightingOnLoad();
}