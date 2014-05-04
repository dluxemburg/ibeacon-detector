var Display = require('./display').Display
display = new Display()
display.setBacklight(true)
display.setMessage('Testing')

var interval = setInterval(function(){
  display.appendMessage('.')
},500)

var backlight = false

setTimeout(function(){
  clearInterval(interval)
  interval = setInterval(function(){
    display.setBacklight(backlight)
    backlight = !backlight
  },200)
  setTimeout(function(){
    clearInterval(interval)
  },2000)
},3000)