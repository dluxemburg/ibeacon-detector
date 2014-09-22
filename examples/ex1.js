var noble = require('noble') noble.on('discover', function(per){
  console.log(per.advertisement.localName+" "+per.uuid)
})
noble.startScanning()