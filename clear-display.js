var Display = require('./lib/display').Display
var display = new Display()
setTimeout(function(){
  display.clear()
  display.setBacklight(false)
}, 250)
setTimeout(function(){
  process.exit()
}, 500)
