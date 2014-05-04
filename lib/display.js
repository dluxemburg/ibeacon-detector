var LcdPlate
if (require('os').platform() == 'linux') {
  LcdPlate = require('adafruit-i2c-lcd').plate
} else {
  LcdPlate = require('./stub-lcd-plate').plate
}

var Display = exports.Display = function(){
  this.lcdPlate = new LcdPlate('/dev/i2c-1', 0x20)
}

Display.prototype.message = function(message){
  this.lcdPlate.message(message)
}