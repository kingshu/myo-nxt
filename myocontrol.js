var Myo = require('myo');
var nodeNxt = require('node-nxt');

nodeNxt.connect ('/dev/tty.wonderbot-DevB', function (nxt) {
    console.log("NXT Connected");


    Myo.connect();
    Myo.onError = function () {  
            console.log("Woah, couldn't connect to Myo Connect");
    }

    var myMyo;

    Myo.on('connected', function(){  
        myMyo = this;
        addEvents(myMyo);
        console.log("Myo Connected!");
        myMyo.vibrate();
        myMyo.unlock();
    });

    var addEvents = function(myo) {
        myo.on('fist', function(edge){
            console.log("Fist");  
            nxt.OutputSetSpeed (3, 0, 0);
            nxt.OutputSetSpeed (2, 0, 0);
            nxt.OutputSetSpeed (1, 0, 0);
        });

        myo.on('fingers_spread', function(edge){
            console.log("Spread");
            nxt.OutputSetSpeed (3, 32, 400);
            nxt.OutputSetSpeed (2, 32, -400);
            nxt.OutputSetSpeed (1, 32, 400);
        });


        myo.on('wave_out', function(edge){
            console.log("Out");
            nxt.OutputSetSpeed (3, 32, 100);
            nxt.OutputSetSpeed (1, 32, -100);       
        });

        myo.on('wave_in', function(edge){
            console.log("Out");
            nxt.OutputSetSpeed (3, 32, -100);
            nxt.OutputSetSpeed (1, 32, 100);
        });

        myo.on('thumb_to_pinky', function(edge){
            console.log("Out");
            nxt.OutputSetSpeed (3, 32, -200);
            nxt.OutputSetSpeed (2, 32, 200);
            nxt.OutputSetSpeed (1, 32, -200);
        });
    }
    
});