var Blinker = require('./blinker').Blinker
var Blink1 = require('node-blink1')
blinker = new Blinker({}, {blink1: new Blink1()})

var states = [
  {
    name: 'Blinking red',
    state: function(){
      blinker.set({rate: 180, color: {r: 255, b:0, g: 0}})
    }
  },
  {
    name: 'Pulsing blue',
    state: function(){
      blinker.set({type: 'pulse', rate: 30, color: {r: 0, b:255, g: 0}})
    }
  },
  {
    name: 'Exiting',
    state: function(){
      process.exit()
    }
  }
]

setInterval(function(){
  blinker.off()
  blinker.start()
  var next = states.shift()
  setTimeout(function(){
    console.log(next.name)
    setTimeout(function(){
      next.state(blinker)
    },250)
  },250)
}, 5500)