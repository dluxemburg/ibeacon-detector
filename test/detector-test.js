var expect = require('expect.js'),
    assert = require('assert'),
    sinon = require('sinon'),
    Detector = require('../lib/detector').Detector

describe("Detector", function(){

  describe("new", function(){

    it("accepts the noble module as a dependency", function(){

      var noble = {on: sinon.spy()}
      var detector = new Detector({}, {noble: noble})
      expect(detector.noble).to.be(noble)

    })

    it("calls noble#on", function(){

      var noble = {on: sinon.spy()}
      var detector = new Detector({}, {noble: noble})
      expect(noble.on.called).to.be.ok()

    })

  })

})