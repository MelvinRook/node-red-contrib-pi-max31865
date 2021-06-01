node-red-node-pi-max31865
========================

A <a href="https://nodered.org" target="_new">Node-RED</a> node to read from the <a href="https://learn.adafruit.com/adafruit-max31865-rtd-pt100-amplifier" target="_new">Adafruit MAX31865 board</a>, which can be connected to the PT100 and PT1000 Resistance Temperature Detectors (RTDs).

The node will appear as `MAX38165 Converter` in the menu, listed in the `Raspberry Pi` category.

## Pre-requisites

1. Ensure to enable SPI on your Raspberry Pi:

 - Run `sudo raspi-config`
 - Select `5 - Interfacing Options`
 - Select `P4 - SPI`
 - Select `yes` to enable SPI
 - Select `OK` to confirm
 - Select the `Finish` button

2. Wire the board as described in the Adafruit article for the <a href="https://learn.adafruit.com/adafruit-max31865-rtd-pt100-amplifier?view=all#python-computer-wiring-6-3" target="_new">Python Computer Wiring</a>:

 - Pi 3V3 to sensor VIN
 - Pi GND to sensor GND
 - Pi SPI0 MOSI to sensor SDI
 - Pi SPI0 MISO to sensor SDO
 - Pi SPI0 SCLK to sensor CLK
 - Pi SPI0 CE0 to sensor CS

If you would like to connect *multiple* MAX31865's to a single Raspberry Pi, have them share the MOSI, MISO and SCLK pins. Then assign the first board the CE0 pin and the second board the CE1 pin.

More details on the Raspberry Pi pinout: https://pinout.xyz/pinout/spi

## Installation

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-pi-max31865

## Usage

Find the node `MAX38165 Converter` in the menu and add it to your workflow. The configuration speaks for itself:

 - bus - first digit in /dev/spidev0.0
 - device - second digit in /dev/spidev0.0
 - nominal resistance of sensor
 - reference resistance on board
 - wires used for sensor (2, 3 or 4)
 - name to set a custom name

Connect a debug node to quickly assess that everything is working. The output will appear in the debug panel. Use a timestamp `inject` node as input to trigger readings on a regular interval. Use `node-red-dashboard` nodes for visualization, i.e. use `ui_chart` to plot data points on a graph.
