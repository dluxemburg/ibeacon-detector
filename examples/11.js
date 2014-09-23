var expect = require('expect.js'),
    sinon = require('sinon'),
    Detector = require('../lib/detector').Detector

describe("Detector", function(){
  describe("new", function(){
    it("calls noble#on", function(){
      var noble = {on: sinon.spy()}
      var detector = new Detector({}, {noble: noble})
      expect(noble.on.called).to.be.ok()
    })
  })
})