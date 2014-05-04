var repl = require('repl'),
    Detector = require('./lib/detector').Detector

var session = repl.start({})
var noble = session.context.noble = require('noble')
session.context.detector = new Detector({isRepl: true},
                                        {noble: noble})