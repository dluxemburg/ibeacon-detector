if (require('os').platform() == 'linux') {
  require('child_process').spawn('npm', ['install', 'adafruit-i2c-lcd'])
}