var noble = require('noble')  

noble.on('discover', function(peripheral){
  console.log(peripheral.advertisement.localName +
              " "+peripheral.uuid) 
  peripheral.on('rssiUpdate', function(rssi){ 
    console.log('rssiUpdate: '+rssi)
  })
})

noble.startScanning()
console.log('scanning...')