var events = require('events'),
    util = require('util'),
    LcdPlate

if (require('os').platform() == 'linux') {
  require('coffee-script')
  require('coffee-script/register')
  LcdPlate = require('adafruit-i2c-lcd').plate
} else {
  LcdPlate = require('./stub-lcd-plate').plate
}

var Display = exports.Display = function(options){
  options || (options = {})
  this.piVersion = (options.piVersion || '1')
  this.device = '/dev/i2c-'+this.piVersion.toString()
  this.lcdPlate = new LcdPlate(this.device, 0x20)
  this.lcdPlate.on('button_down', this.buttonDown.bind(this))
  this.lcdPlate.quietStub = options.quietStub
  process.on('exit', this.shutdown.bind(this))
  events.EventEmitter.call(this)
}

util.inherits(Display, events.EventEmitter)

Display.prototype.buttonDown = function(button){
  var action = Display.buttons[button]
  if(action){
    this.emit('button',{action: action})
  } else {
    console.log('Invalid button index: '+button)
  }
}

Display.prototype.appendMessage = function(message){
  this.lcdPlate.message(message)
}

Display.prototype.setMessage = function(message){
  this.lcdPlate.clear()
  this.lcdPlate.message(message)
}

Display.prototype.clear = function(){
  this.lcdPlate.clear()
}

Display.prototype.setBacklight = function(bool){
  this.lcdPlate.backlight(bool ? 1 : 0)
}

Display.prototype.flash = function(){
  var backlight = false
  var self = this
  var interval = setInterval(function(){
    backlight = !backlight
    self.setBacklight(backlight)
  },200)
  setTimeout(function(){
    clearInterval(interval)
    setTimeout(function(){
      self.setBacklight(true)
    },200)
  },1000)
}

Display.prototype.shutdown = function(){
  this.clear()
  this.setBacklight(false)
}

Display.buttons = {1: 'select', 2: 'right', 4: 'down', 8: 'up', 16: 'left'}
