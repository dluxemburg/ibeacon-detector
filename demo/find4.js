var noble = require('noble')
noble.on('discover', function(per){
  console.log(per.advertisement.localName+' '+per.uuid)
  per.on('connect', function(){
    per.on('servicesDiscover', function(sers){
      sers.forEach(function(ser){
        if(ser.name) console.log(' '+ser.name)
        ser.on('characteristicsDiscover', function(chs){
          chs.forEach(function(ch){
            if(ch.name) console.log('  '+ch.name)
            ch.on('descriptorsDiscover', function(descs){
              descs.forEach(function(desc){
                if(desc.name) console.log('   '+desc.name)
              })
            })
            ch.discoverDescriptors()
          })
        })
        ser.discoverCharacteristics()
      })
    })
    per.discoverServices()
  })
  per.connect()
})
noble.startScanning()