var LcdPlate
if (require('os').platform() == 'linux') {
  require('coffee-script')
  require('coffee-script/register')
  LcdPlate = require('adafruit-i2c-lcd').plate
} else {
  LcdPlate = require('./stub-lcd-plate').plate
}

var Display = exports.Display = function(options){
  options || (options = {})
  this.piVersion = (options.piVersion || '0')
  this.device = '/dev/i2c-'+this.piVersion.toString()
  this.lcdPlate = new LcdPlate(this.device, 0x20)
  this.lcdPlate.quietStub = options.quietStub
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