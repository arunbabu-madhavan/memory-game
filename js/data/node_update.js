var fs = require('fs');
var path = require('path');

var blockImages = [];

fs.readdir(path.resolve(__dirname,"../../images"), function(err, items) {
    for (var i=0; i<items.length; i++) {
        blockImages.push({type:i,src:items[i]});
    }
    console.log("Count:",blockImages.length);
    
fs.writeFile("images.json", JSON.stringify(blockImages), function(err, data) {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
});

