var display = new require('./lib/display').Display()
setTimeout(function(){
  display.setBacklight(false)
  display.clear()
}, 250)
setTimeout(function(){
  process.exit()
},500)
