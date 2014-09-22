var Display = require('./lib/display').Display,
    Blink1 = require('node-blink1')

var display = new Display(),
    blink1 = new Blink1()

setTimeout(function(){
  try{
    display.clear()
    display.setBacklight(false)
  }catch(e){}
  try{
    blink1.setRGB(0, 0, 0, function(){})
  }catch(e){}
}, 250)

setTimeout(function(){
  process.exit()
}, 500)
