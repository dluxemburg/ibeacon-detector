var events = require('events'),
    util = require('util')

var Plate = exports.plate = function(){
  this.currentMessage = ""
  this.light = false
  events.EventEmitter.call(this)
}

util.inherits(Plate, events.EventEmitter)

Plate.prototype.log = function(message){
  if (!this.quietStub) console.log('[STUB DISPLAY] '+message)
}

Plate.prototype.message = function(message){
  this.currentMessage += message
  this.log('message: '+this.currentMessage)
}

Plate.prototype.clear = function(message){
  this.currentMessage = ''
  this.log('clear')
}

Plate.prototype.backlight = function(n){
  this.light = !!(n % 2)
  this.log('light: '+ (this.light ? 'ON' : 'OFF'))
}