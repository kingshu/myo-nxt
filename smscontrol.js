var http = require('http');
var url = require('url');
var request = require('request');
var nodeNxt = require('node-nxt');

nodeNxt.connect ('/dev/tty.wonderbot-DevB', function (nxt) {
    console.log("NXT Connected");
	var server = http.createServer( function(req, res) {
	    var parsedReq = url.parse(req.url, true);
	    console.log(parsedReq.query.Body);
	    
	    switch (parsedReq.query.Body.toLowerCase()) {
	        case 'halt' :
		        nxt.OutputSetSpeed (3, 0, 0);
		        nxt.OutputSetSpeed (2, 0, 0);
		        nxt.OutputSetSpeed (1, 0, 0);
		        break;
	    	
	    	case 'go' :
		    	nxt.OutputSetSpeed (3, 32, 400);
		        nxt.OutputSetSpeed (2, 32, -400);
		        nxt.OutputSetSpeed (1, 32, 400);
		        break;

		    case 'back' :
		    	nxt.OutputSetSpeed (3, 32, -200);
		        nxt.OutputSetSpeed (2, 32, 200);
		        nxt.OutputSetSpeed (1, 32, -200);
		        break;

		    case 'right' :
		    	nxt.OutputSetSpeed (3, 32, 100);
	        	nxt.OutputSetSpeed (1, 32, -100); 
	        	break;

	        case 'left' :
		        nxt.OutputSetSpeed (3, 32, -100);
		        nxt.OutputSetSpeed (1, 32, 100);
		        break;
	    }
	    
	}).listen(8080);
});