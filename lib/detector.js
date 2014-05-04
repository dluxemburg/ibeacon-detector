var events = require('events'),
    util = require('util'),
    lo = require('lodash')

var Detector = exports.Detector = function(options, injected){
  this.options = options
  this.noble = injected.noble
  this.noble.on('discover', this.discover.bind(this))
  this.peripherals = []
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

Detector.prototype.beaconCount = function(){
  Object.keys(this.noble._peripherals).length
}

Detector.prototype.beaconUuidByIndex = function(index){
  Object.keys(this.noble._peripherals)[index]
}

Detector.prototype.beaconByIndex = function(index){
  this.noble._peripherals[this.beaconUuidByIndex(index)]
}