var Blinker = exports.Blinker = function(options, injected){
  options || (options = {})
  this.options = options
  this.blink1 = injected.blink1
}

Blinker.prototype.off = function(fn){
  this.blink1.setRGB(0, 0, 0, function(){
    if(fn) fn()
  })
  this.on = false
  clearInterval(this.masterInterval)
}

Blinker.prototype.start = function(){
  this.rate = 1
  this.color = {r: 0, b: 0, g: 0}
  this.lastBlinkAt = 0
  this.on = true
  this.masterInterval = setInterval(this.tick.bind(this), 50)
}

Blinker.prototype.tick = function(){
  var now = Date.now()
  var timeSinceLastBlink = now - this.lastBlinkAt
  if (timeSinceLastBlink > this.interval) {
    this.blink()
    this.lastBlinkAt = now
  }
}


Blinker.prototype.blinkOnce = function(options, fn){
  this.blink1.setRGB(
    this.color.r,
    this.color.g,
    this.color.b,
    function(){
      setTimeout(this.blinkToBlack.bind(this),
                 this.duration)
    }.bind(this)
  )
}

Blinker.prototype.blinkToBlack = function(options, fn){
  this.blink1.setRGB(0, 0, 0, function(){})
}

Blinker.prototype.pulseOnce = function(options){
  var blink1 = this.blink1
  blink1.fadeToRGB(this.duration/2, this.color.r,
                   this.color.g, this.color.b,
                   this.fadeToBlack.bind(this))
}

Blinker.prototype.fadeToBlack = function(){
  this.blink1.fadeToRGB(this.duration/2, 0, 0, 0, function(){})
}

Blinker.prototype.blink = function(options){
  return this.type == 'pulse' ? this.pulseOnce() : this.blinkOnce()
}

Blinker.prototype.set = function(options){
  options.interval || (options.interval = 60000/options.rate)
  options.duration || (options.duration = options.interval/2)
  this.interval = options.interval
  this.duration = options.duration
  if (options.color) this.color = options.color
  if (options.type) this.type = options.type
}

Blinker.prototype.rssiToRate = Blinker.rssiToRate = function(rssi){
  return (1/(rssi*rssi))*125000
}