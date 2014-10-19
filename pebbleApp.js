/**
 * 
 * Pebble.js app deployed from Pebble Cloud
 * 
 */

var UI = require('ui');

var main = new UI.Card({
  title: 'RovR',
  subtitle: 'Control the Rover',
  body: 'Press any button.'
});

main.show();

var url = "http://5ad6e740.ngrok.com/?Body=";

var sendReq = function(direction) {
  var req = new XMLHttpRequest();
  req.open('GET', url+direction, true);
  req.onload = function(e) {
    if (req.readyState == 4 && req.status == 200) {
      if(req.status == 200) {
        var response = JSON.parse(req.responseText);
        console.log(response);        
      } else { console.log("Error"); }
    }
  };
  req.send(null);
};


main.on('click', 'select', function(e) {
  sendReq("go");
});


main.on('longClick', 'select', function(e) {
  sendReq("halt");
});

main.on('click', 'up', function(e) {
  sendReq("left");
});

main.on('longClick', 'up', function(e) {
  sendReq("back");
});

main.on('click', 'down', function(e) {
  sendReq("right");
});

main.on('longClick', 'down', function(e) {
  sendReq("back");
});
