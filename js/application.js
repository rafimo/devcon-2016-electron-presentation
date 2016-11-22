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

  // open links in default browser
  const shell = require('electron').shell
  const links = document.querySelectorAll('a[href]')
  Array.prototype.forEach.call(links, function (link) {
    const url = link.getAttribute('href')
    if (url.indexOf('http') === 0) {
      link.addEventListener('click', function (e) {
        e.preventDefault()
        shell.openExternal(url)
      })
    }
  })

  // add a right-click context menu
  const {remote} = require('electron')
  const {Menu, MenuItem} = remote
  const ipc = require('electron').ipcRenderer

  const menu = new Menu()
  menu.append(new MenuItem({label: 'Launch A Dialog', click() {
    ipc.send('open-dialog');
  }}))

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
  }, false)
}