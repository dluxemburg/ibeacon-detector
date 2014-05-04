var Display = require('./lib/display').Display
var display = new Display()
setTimeout(function(){
  display.setBacklight(false)
  display.clear()
}, 250)
setTimeout(function(){
  process.exit()
},500)
