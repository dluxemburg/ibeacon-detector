var events = require('events'),
    util = require('util')

var Detector = exports.Detector = function(options, injected){
  this.options = options
  this.noble = injected.noble
  this.noble.on('discover', this.discover.bind(this))
  events.EventEmitter.call(this)
}

util.inherits(Detector, events.EventEmitter)

Detector.prototype.start = function(){
  this.noble.startScanning()
}

Detector.prototype.discover = function(peripheral){
  var name = peripheral.advertisement.localName+" "+peripheral.uuid
  this.emit('update', {message: name})
}