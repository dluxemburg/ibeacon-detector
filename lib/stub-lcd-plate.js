var Plate = exports.plate = function(){
  this.currentMessage = ""
  this.light = false
}

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