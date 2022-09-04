/* eslint-disable no-unused-vars */
import express from 'express';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import expressValidation from 'express-validation';
import cors from 'cors';
import WebSocket, { WebSocketServer } from 'ws';
import { UniqueConstraintError } from 'sequelize';
import { APIClientError } from './helpers/APIResponse';

import models from './database/models';
import { clone } from './helpers/utils';

const Device = models.device;
const Reading = models.reading;

const app = express();

app.use(cors({ origin: '*' }));

// [
//   '*',
//   'http://35.223.21.175:3000',
//   '35.223.21.175:3000',
//   '35.223.21.175',
// ]

app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));

const wss = new WebSocketServer({ port: 8080 });

// Config variables
app.get('/', (req, res) => {
  res.json({ message: 'WELCOME TO PICKERAPP APIv2' });
});

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
    return process.exit(1);
  });

require('./routes').default(app);

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data);
      console.log('message received: ', message);

      const device = clone(
        await Device.findOne({
          where: {
            id: message.device_id ? message.device_id : null,
          },
        }),
      );

      if (!device) {
        ws.send("Device doesn't exist");
        ws.close(1000, 'No Device Found');
        return;
      }
      if (message.oxygen_level && message.heart_rate && device.id) {
        await Reading.create({
          patient_id: device.patient_id ? device.patient_id : null,
          device_id: device.id,
          oxygen_level: message.oxygen_level,
          heart_rate: message.heart_rate,
        });
      }
    } catch (error) {
      // console.log('error', error);
    }
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
  ws.send('You are connected to websocket server');
});

app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    return res.status(err.status).json({
      ...err,
      message: err.errors.map((e) => e.messages.join('. ')).join(' and '),
    });
  }

  if (err instanceof UniqueConstraintError) {
    return res.status(400).json({
      message: `${err.errors[0].value} already exists`,
    });
  }

  return next(err);
});

// Handle APIClientError
app.use((err, req, res, next) => {
  if (err instanceof APIClientError) {
    return res.status(err.status).json(err.jsonify());
  }

  return next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) =>
  res.status(500).json({ message: err.message }),
);

export default app;
