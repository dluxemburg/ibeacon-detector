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
  var self = this
  peripheral.on('rssiUpdate', function(rssi){
    console.log('rssiUpdate: '+rssi)
    self.emit('refresh')
  });
  this.emit('update', {message: name})
}

Detector.prototype.beaconCount = function(){
  return Object.keys(this.noble._peripherals).length
}

Detector.prototype.beaconUuidByIndex = function(index){
  return Object.keys(this.noble._peripherals)[index]
}

Detector.prototype.beaconByIndex = function(index){
  return this.noble._peripherals[this.beaconUuidByIndex(index)]
}