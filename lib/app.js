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
  this.detector.start()
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