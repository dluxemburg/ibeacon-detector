var noble = require('noble')  

noble.on('discover', function(peripheral){
  console.log(peripheral.advertisement.localName +
              " "+peripheral.uuid)
})

noble.startScanning()