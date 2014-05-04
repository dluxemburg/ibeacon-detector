var expect = require('expect.js'),
    Display = require('../lib/display').Display

describe("Display", function(){

  describe("#setMessage", function(){

    it("sets the message", function(){

      var display = new Display({quietStub: true})
      display.setMessage('hello daniel')
      expect(display.lcdPlate.currentMessage).to.eql('hello daniel')

    })

  })

})