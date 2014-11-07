var noble = require('noble'),
    events = require('events'),
    util = require('util'),
    Blink1 = require('node-blink1'),
    LcdPlate

if (require('os').platform() == 'darwin') {
  LcdPlate = require('../lib/stub-lcd-plate').plate
} else {
  require('coffee-script')
  require('coffee-script/register')
  LcdPlate = require('adafruit-i2c-lcd').plate
}

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


var Display = exports.Display = function(options){
  this.piVersion = '1'
  this.device = '/dev/i2c-'+this.piVersion.toString()
  this.lcdPlate = new LcdPlate(this.device, 0x20)
  this.lcdPlate.on('button_down', this.buttonDown.bind(this))
  process.on('exit', this.shutdown.bind(this))
  this.lcdPlate.backlight(1)
  events.EventEmitter.call(this)
}

util.inherits(Display, events.EventEmitter)

Display.BUTTONS = {1: 'select', 2: 'right', 4: 'down', 8: 'up', 16: 'left'}

Display.prototype.buttonDown = function(button){
  this.emit('button', Display.BUTTONS[button])
}

Display.prototype.setMessage = function(message){
  this.lcdPlate.clear()
  this.lcdPlate.message(message)
}

Display.prototype.clear = function(){
  this.lcdPlate.clear()
}

Display.prototype.shutdown = function(){
  this.clear()
  this.lcdPlate.backlight(0)
}

var detector = new Detector(noble)
var blinker = new Blinker(new Blink1())
var display = new Display()

var beaconIndex = 0
var currentBeacon = {rssi: 100, uuid: ''}

var beaconCount = function(){
  return Object.keys(noble._peripherals).length
}

var beaconByIndex = function(index){
  var key = Object.keys(noble._peripherals)[index]
  return noble._peripherals[key]
}

display.on('button', function(name){
  if (beaconCount() == 0) return
  if (name == 'left' && beaconIndex > 0) beaconIndex--
  if (name == 'right' && beaconIndex < beaconCount() - 1) {
    beaconIndex++
  }
  var currentBeacon = beaconByIndex(beaconIndex)
  display.setMessage('#' + (beaconIndex + 1) + ') '
                     + currentBeacon.uuid + '\nAt '
                     + currentBeacon.rssi + ' RSSI')
})

detector.on('rssiUpdate', function(data){
  if (currentBeacon.uuid == data.uuid){
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

// just in case...
process.on('uncaughtException', function(err){
  console.log('uncaughtException:' + err.message)
})