var noble = require('noble'),
    events = require('events'),
    util = require('util'),
    Blink1 = require('node-blink1')

var Detector = exports.Detector = function(noble){
  this.noble = noble
  this.noble.on('discover', this.discover.bind(this))
  this.peripherals = {}
  events.EventEmitter.call(this)
}

util.inherits(Detector, events.EventEmitter)

Detector.prototype.discover = function(peripheral){
  this.peripherals[peripheral.uuid] = peripheral
  peripheral.on('rssiUpdate', function(rssi){
    this.emit('rssiUpdate', {
      uuid: peripheral.uuid,
      rssi: rssi
    })
  }.bind(this))
}

Detector.prototype.start = function(){
  this.noble.startScanning()
}

var Blinker = exports.Blinker = function(blink1){
  this.blink1 = blink1
  this.rate = 12
  this.duration = 5000
}

Blinker.prototype.update = function(rssi){
  this.rate = 125000/Math.pow(rssi,2)
  this.duration = 60000/this.rate
}

Blinker.prototype.pulse = function(){
  this.blink1.fadeToRGB(this.duration/3, 255, 255, 255, function(){
    this.blink1.fadeToRGB(this.duration/3, 0, 0, 0, function(){
      setTimeout(this.pulse.bind(this), this.duration/3)
    }.bind(this))
  }.bind(this))
}

var detector = new Detector(noble)
var blinker = new Blinker(new Blink1())

var firstUuid
detector.on('rssiUpdate', function(data){
  firstUuid || (firstUuid = data.uuid)
  if (firstUuid == data.uuid){
    blinker.update(data.rssi)
  }
})
detector.start()
blinker.pulse()

// yeah, so this isn't working...
setInterval(function(){
  Object.keys(noble._peripherals).forEach(function(k,i){
    setTimeout(function(){
      noble._peripherals[k].emit('rssiUpdate', noble._peripherals[k].rssi)
    }, i*250)
  })
}, 1000)

process.on('uncaughtException', function(err){
  console.log('uncaughtException:' + err.message)
})