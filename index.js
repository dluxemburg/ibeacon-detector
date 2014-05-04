var Display = require('./lib/display').Display,
    Detector = require('./lib/detector').Detector,
    noble = require('noble')

var detector = new Detector({},{noble: noble})
var display = new Display()

var app = require('./lib/app').create({},{
                                        detector: detector,
                                        display: display
                                      })

app.run()