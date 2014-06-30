var expect = require('expect.js'),
    assert = require('assert'),
    sinon = require('sinon'),
    Blinker = require('../lib/blinker').Blinker

describe("Blinker", function(){

  describe("new", function(){

    it("accepts the blink1 instance as a dependency", function(){

      var blink1 = {on: sinon.spy()}
      var blinker = new Blinker({}, {blink1: blink1})
      expect(blinker.blink1).to.be(blink1)

    })

  })

  describe(".rssiToRate", function(){

    it("converts a close reading to a fast blink", function(){
      expect(Blinker.rssiToRate(-20)).to.be.greaterThan(120)
    })

    it("converts a medium reading to a medium blink", function(){
      expect(Blinker.rssiToRate(-50)).to.be.greaterThan(40)
      expect(Blinker.rssiToRate(-50)).to.be.lessThan(80)
    })


    it("converts a weak reading to a slow blink", function(){
      expect(Blinker.rssiToRate(-80)).to.be.lessThan(20)
      expect(Blinker.rssiToRate(-80)).to.be.greaterThan(10)
    })



  })

})