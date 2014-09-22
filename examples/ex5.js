var noble = require('noble')  

noble.on('discover', function(per){
  console.log(per.advertisement.localName +
              " "+per.uuid) 
  per.on('servicesDiscover', function(sers){
    sers.forEach(function(ser){
      if(ser.name) console.log(" "+ser.name)
      ser.on('characteristicsDiscover', function(chs){
        chs.forEach(function(ch){
          if(ch.name){
            console.log("  "+ch.name)
            ch.read(function(err, data){
              if(data) console.log("  "+data.toString('hex'))
            })
            characteristic.on('descriptorsDiscover', function(descs){

            })
          }
        })
      })
      ser.discoverCharacteristics()
    })
  })
  per.connect(function(){
    per.discoverServices()
  })

})

noble.startScanning()
console.log('scanning...')