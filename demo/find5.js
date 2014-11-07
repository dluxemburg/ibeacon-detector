var noble = require('noble')
noble.on('discover', function(per){
  console.log(per.advertisement.localName+' '+per.uuid)
  per.on('connect', function(){
    per.on('servicesDiscover', function(sers){
      sers.forEach(function(ser){
        if(ser.name) console.log(' '+ser.name)
        ser.on('characteristicsDiscover', function(chs){
          chs.forEach(function(ch){
            ch.read(function(err, data){
              if(ch.name && data) console.log('  '+ch.name+': '+data.toString())
              ch.on('descriptorsDiscover', function(descs){
                descs.forEach(function(desc){
                  desc.readValue(function(err, data){
                    if(desc.name && data) console.log('   '+desc.name + ': '+data.toString())
                  })
                })
              })
              ch.discoverDescriptors()
            })
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