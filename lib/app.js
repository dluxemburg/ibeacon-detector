var IBeaconDetector = exports.IBeaconDetector = function(options, injected){
  this.options = options
  this.display = injected.display
  this.detector = injected.detector
  this.setup()
}

IBeaconDetector.prototype.setup = function(){
  this.display.on('button', this.handleButton.bind(this))
  this.detector.on('update', this.handleDetectorUpdate.bind(this))
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
}

IBeaconDetector.prototype.handleButton = function(button){

}

IBeaconDetector.prototype.handleDetectorUpdate = function(update){
  this.display.flash()
  this.display.setMessage(update.message)
}

exports.create = function(options, injected){
  return new IBeaconDetector(options, injected)
}