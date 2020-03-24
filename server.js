const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
var randomstring = require("randomstring");
const c_string = require('./scripts/variable.js');
const EventHubReader = require('./scripts/event-hub-reader.js');
const iotHubConnectionString = c_string.conn_string;
const eventHubConsumerGroup = c_string.consumer;
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./scripts/databaseContext");
var message;
// Redirect requests to the public subdirectory to the root
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res /* , next */) => {
  res.redirect('/');
});


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        console.log(`Broadcasting data ${data}`);
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

server.listen(process.env.PORT || '3000', () => {
  console.log('Listening on %d.', server.address().port);
});

const eventHubReader = new EventHubReader(iotHubConnectionString, eventHubConsumerGroup);

(async () => {
  await eventHubReader.startReadMessage((message, date, deviceId) => {
    try {
      const payload = {
        id: randomstring.generate(),
        IotData: message,
        MessageDate: date || Date.now().toISOString(),
        DeviceId: deviceId,
      };
      
      message = payload;
      entry(message);
      wss.broadcast(JSON.stringify(payload));
    } catch (err) {
      console.error('Error broadcasting: [%s] from [%s].', err, message);
    }
  });
})().catch();


async function entry(message) {
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await dbContext.create(client, databaseId, containerId);

  try {
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
      query: "SELECT * from c"
    };


    const { resource: createdItem } = await container.items.create(message);

    console.log('\r\nCreated new item');



  } catch (err) {
    console.log(err.message);
  }
}


