# iBeacon Detector Program for "JavaScript & iBeacons" Talk

This is a small iBeacon detector application designed to run on a Raspberry Pi with an Adafruit LCD display, a Bluetooth 4.0/LE USB dongle, a ThinkM blink(1) Mk2 RGB LED, and (ideally) a battery for the Pi. It is intended to demonstrate design and programming approaches for working with iBeacons, as part of a "Getting Started with iBeacons" presentation.

## Notes

- The "real" applicaiton is in the `lib` directory. Start it with `node index.js`
 - `index1.js` runs the application without the blink(1)
- The `demo` directory contains stand-alone scripts for demonstration purposes
- The `ibeacon-detector` file in the root directory is the `init.d` executable script
- The `setup` executable is a shell script to setup `init.d`
- `install-conditional-deps.js` is used by npm to only install the module for the LCD display when running on the Raspberry Pi (it won't build correctly on, say, a MacBook)

## Running the Application

1. Install the Raspian OS an SD card to book your Raspberry Pi
2. Install an >= 0.10.28 version of Node.js using a prebuilt binary for the Raspberry Pi
3. Clone the repository while SSHed into the Pi or copy it on to the SD card
4. `npm install` to install dependencies
5. `sudo setup` to copy the `init.d` script
6. Now the applicition will start when the Pi boots up