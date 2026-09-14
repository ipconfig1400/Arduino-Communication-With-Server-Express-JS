//express
const express = require('express');
const app = express();

//serial
const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');

let port_status = 0;
let port = null;
let parser = null;
let led_status = 0;
let data = {
  "value" : 0,
}

// Detect ports
async function detect_ports() {
  const ports = await SerialPort.list();
  
  return ports;
}



function openPort() {
  if(port_status == 0) {
    port = new SerialPort({path: 'COM7', baudRate: 9600});  // Change the path with the detected COM Port from ur computer
    parser = port.pipe(new ReadlineParser({delimiter: '\r\n'}));
    port.on('open', (err) => {
      if(err) {
        console.error("Error! Can not open the port: ", err.message);
      }
      console.log("Port is opened.");
      port_status = 1;
    });
    port.on('error', (err) => {
      console.error("Cannot open the port: ", err);
    })
  } else {
    console.log("Port telah dibuka!");
  }
  parser.on('data', (recv) => {
    console.log("Received: ", recv);
    data["value"] = recv;
  });
}

function closePort() {
  if(port !== null) {
    port_status = 0;
    port.close((err) => {
      if(err) {
        console.error("Error! Can not close the port: ", err.message);
      }
      console.log("Port is closed.");
    });
  } else {
    console.log("Port is not opened.")
  }
}

process.on('SIGINT', () => {
  process.exit();
});


app.use(express.static('public'));

app.get('/openPort', (req, res) => {
  async function get_ports_value() {
    const portCom = await detect_ports();
    comPort = [];
    portCom.forEach(portArray => {
      comPort.push(portArray.path);
    });
    console.log(comPort[0]);
    res.json({"port" : comPort[0]});
  }
  openPort();
  get_ports_value();
});

app.get('/readPort', (req, res) => {
  res.json(data);
});

app.get('/closePort', (req, res) => {
  closePort();
  res.json({"port" : "close"});
});

app.get('/ledonoff', (req, res) => {
  if (port_status == 0) {
    console.log("Open the port first!");
    res.json({"led" : "0"});
  } else {
    if(led_status == 0) {
      port.write("1", (err) => {    //change the value to send other message to your arduino
        if(err) {
          console.error("Error!", err.message);
        } else {
          console.log("sent data: 1");    //changable
          console.log("Led On..");    //changable
          res.json({"led" : "on"});   //changable
          led_status = 1;
        }
      });
    } else {
      port.write("2", (err) => {    //change the value to send other message to your arduino
        if(err) {
          console.error("Error!", err.message);
        } else {
          console.log("sent data: 0");    //changable
          console.log("Led Off..");   //changable
          res.json({"led" : "off"});    //changable
          led_status = 0;
        }
      });
    }
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});