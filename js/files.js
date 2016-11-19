var Files = Files || {};

// List all files in current directory
Files.getAll = function() {
  var glob = require('glob');
  glob("*.*", null, function(er, files){
    var element = document.getElementById("files");
    element.innerHTML = "";
    files.forEach(function(file) {
      element.innerHTML = element.innerHTML + 
        "<button type='button' value='" + file + "'>" + file + "</button>";
    });
  });
}

// Get contents of one file
Files.readContent = function(name) {
  const fs = require('fs');
  fs.readFile(name, (err, data) => {
    console.log(data);
  })
}