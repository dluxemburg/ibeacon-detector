var Display = require('./lib/display').Display,
    Detector = require('./lib/detector').Detector,
    Blinker = require('./lib/blinker').Blinker,
    noble = require('noble'),
    Blink1 = require('node-blink1')

var detector = new Detector({},{noble: noble})
var blinker = new Blinker({},{blink1: new Blink1()})
var display = new Display()

var app = require('./lib/app').create({},{
                                        detector: detector,
                                        display: display,
                                        blinker: blinker
                                      })

app.run()