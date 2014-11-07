var noble = require('noble'),
    events = require('events'),
    util = require('util')

var Detector = exports.Detector = function(noble){
  this.noble = noble
  this.noble.on('discover', this.discover.bind(this))
  this.peripherals = {}
  events.EventEmitter.call(this)
}

util.inherits(Detector, events.EventEmitter)

Detector.prototype.discover = function(peripheral){
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

var detector = new Detector(noble)

detector.on('rssiUpdate', function(data){
  console.log(data)
})

detector.start()


// yeah, so this isn't working...
setInterval(function(){
  Object.keys(noble._peripherals).forEach(function(k,i){
    setTimeout(function(){
      noble._peripherals[k].emit('rssiUpdate', noble._peripherals[k].rssi)
    }, i*250)
  })
}, 1000)

// just in case...
process.on('uncaughtException', function(err){
  console.log('uncaughtException:' + err.message)
})