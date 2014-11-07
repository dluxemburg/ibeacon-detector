var noble = require('noble')

noble.on('discover', function(peripheral){
  console.log('discovered '
              +peripheral.advertisement.localName+' '
              +peripheral.uuid+
              ' with RSSI '+peripheral.rssi)
  peripheral.on('rssiUpdate', function(rssi){
    console.log(peripheral.advertisement.localName
              +' '+peripheral.uuid+' '+
              ' RSSI update to: '+rssi)
  })
})

noble.startScanning()

// yeah, so this isn't working...
setInterval(function(){
  Object.keys(noble._peripherals).forEach(function(k,i){
    setTimeout(function(){
      noble._peripherals[k].emit('rssiUpdate', noble._peripherals[k].rssi)
    }, i*250)
  })
}, 1000)

// just in case...
process.on('uncaughtException', function(err){
  console.log('uncaughtException:' + err.message)
})