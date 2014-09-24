var expect = require('expect.js'),
    sinon = require('sinon'),
    Display = require('../lib/display').Display

describe("Detector", function(){
  describe("#setMessage", function(){
    it("sets the message", function(){
      var display = new Display()
      display.setMessage('Hello DoT')
      expect(display.lcdPlate.currentMessage).to.eql('Hello DoT')
    })
  })
})