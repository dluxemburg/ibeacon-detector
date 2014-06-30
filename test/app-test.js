var expect = require('expect.js'),
    sinon = require('sinon'),
    IBeaconDetector = require('../lib/app').IBeaconDetector

describe("IBeaconDetector", function(){

  describe("new", function(){

    var options, detector, display, blinker, app

    before(function(){
      options = {x: 'y'}
      detector = {on: sinon.spy()}
      display = {on: sinon.spy()}
      blinker = {blink: sinon.spy()}

      app = new IBeaconDetector(options, {
                                  detector: detector,
                                  display: display,
                                  blinker: blinker
                                })
    })

    it("accepts options", function(){
      expect(app.options.x).to.eql('y')
    })

    it("accepts detector, display, and blinker dependencies", function(){
      expect(app.detector).to.eql(detector)
      expect(app.display).to.eql(display)
      expect(app.blinker).to.eql(blinker)
    })

    it("calls display#on", function(){
      expect(app.display.on.called).to.be.ok()
    })

    it("calls detector#on", function(){
      expect(app.detector.on.called).to.be.ok()
    })

  })

})