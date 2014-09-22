var IBeaconDetector = exports.IBeaconDetector = function(options, injected){
  this.options = options
  this.display = injected.display
  this.detector = injected.detector
  this.blinker = injected.blinker
  this.beaconIndex = 0
  this.setup()
}

IBeaconDetector.prototype.setup = function(){
  this.display.on('button', this.handleButton.bind(this))
  this.detector.on('update', this.handleDetectorUpdate.bind(this))
  this.detector.on('refresh', this.refresh.bind(this))
}

IBeaconDetector.prototype.run = function(){
  var self = this
  this.display.setBacklight(true)
  this.display.setMessage('Starting up')
  var interval = setInterval(function(){
    self.display.appendMessage('.')
  },200)
  setTimeout(function(){
    clearInterval(interval)
    self.display.clear()
    self.detector.start()
  },1000)
  setInterval(function(){
    if(self.beaconCount() > 0) self.refresh()
  }, 200)
  this.blinker.start()
}

IBeaconDetector.prototype.handleButton = function(button){
  this[button.action]()
}

IBeaconDetector.prototype.left = function(){
  this.setBeaconIndex(this.beaconIndex - 1)
}

IBeaconDetector.prototype.right = function(){
  this.setBeaconIndex(this.beaconIndex + 1)
}

IBeaconDetector.prototype.up = function(){

}

IBeaconDetector.prototype.down = function(){

}

IBeaconDetector.prototype.select = function(){

}

IBeaconDetector.prototype.setBeaconIndex = function(index){
  if(index == -1) index = this.beaconCount() - 1
  if(index == this.beaconCount()) index = 0
  this.beaconIndex = index
  this.refresh()
}

IBeaconDetector.prototype.refresh = function(){
  this.currentBeacon = this.detector.beaconByIndex(this.beaconIndex)
  if (!this.currentBeacon) return
  var displayIndex = this.beaconIndex + 1
  var displayRssi = this.currentBeacon.rssi
  this.display.setMessage('#'+displayIndex+') '+this.currentBeacon.uuid+'\nAt '+displayRssi+' RSSI')
  var blinkRate = this.blinker.rssiToRate(this.currentBeacon.rssi)
  console.log('blink rate: '+ blinkRate)
  this.blinker.set({rate: blinkRate, color: {r: 255, b:255, g: 255}})
}

IBeaconDetector.prototype.beaconCount = function(){
  return this.detector.beaconCount()
}


IBeaconDetector.prototype.handleDetectorUpdate = function(update){
  this.display.setMessage(update.message)
}

exports.create = function(options, injected){
  return new IBeaconDetector(options, injected)
}