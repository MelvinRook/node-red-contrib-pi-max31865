
module.exports = function(RED)
{
    "use strict";
    var fs = require('fs');

    // Unlikely if not on a Pi
    try
    {
        var cpuinfo = fs.readFileSync("/proc/cpuinfo").toString();

        if (cpuinfo.indexOf(": BCM") === -1)
        {
            throw "Info : "+RED._("rpi-gpio.errors.ignorenode");
        }
    }
    catch(err)
    {
        throw "Info : "+RED._("rpi-gpio.errors.ignorenode");
    }

    // Initialize MAX31865 dependency
    const MAX31865 = require('max31865');

    // Node-RED main function
    function PiMax31865Node(n)
    {
        RED.nodes.createNode(this, n);

        // Initialize input variables
        var node = this;
        this.bus = parseInt(n.bus || 0);             // bus - first digit in /dev/spidev0.0
        this.device = parseInt(n.dev || 0);          // device - second digit in /dev/spidev0.0
        this.rtdNominal = parseInt(n.rtd || 1000);   // nominal resistance of sensor
        this.refResistor = parseInt(n.ref || 4300);  // reference resistance on board
        this.sensorWires = parseInt(n.wir || 4);     // wires used for sensor (2, 3 or 4)
        this.name = n.name || "max31865-"+this.bus+"/"+this.device;

        // Configure sensor
        const sensor = new MAX31865(
            this.bus,
            this.device,
            {
              rtdNominal: this.rtdNominal,
              refResistor: this.refResistor,
              wires: this.sensorWires,
            }
        );

        // Initialize sensor
        sensor.init()
        .then(() =>
        {
            // Get temperature from sensor
            sensor.getTemperature()
            .then((temperature) =>
            {
                // Send payload
                node.send({payload:temperature.toFixed(2), topic:this.name});
            });
        });
    }

    RED.nodes.registerType("pimax31865",PiMax31865Node);
}
