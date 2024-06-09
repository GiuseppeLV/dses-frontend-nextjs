const express = require('express');
const { SerialPort } = require('serialport');
const axios = require('axios');
const cors = require('cors');
const app = express();
let serialData = 0;

const port = new SerialPort({ path: 'COM8', baudRate: 9600 }); //setup the correct port
app.use(cors());

app.get('/sampling', (req, res) => {
  port.write('S');
  console.log('RES:', serialData);
  if (serialData != 0) {
    res.json({ data: serialData, headers: req.headers });
  } else {
    res.json({ data: 0 });
  }
});

port.on('data', (data) => {
  console.log('Dati seriali ricevuti:', data.toString());
  serialData = data.toString();
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server serial listening on port ${PORT}`);
});
