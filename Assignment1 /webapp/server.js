/*request of all the modules */

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
var randomstring = require("randomstring");
const c_string = require('./SetUp/variable.js');
const EventHubReader = require('./scripts/event-hub-reader.js');
var count = 0;
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./SetUp/config");
const dbContext = require("./scripts/databaseContext");
const fs = require('fs');
var message;
//get the hub connection string
const iotHubConnectionString = c_string.conn_string;
const eventHubConsumerGroup = c_string.consumer;
// Redirect requests to the public subdirectory to the root
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res /* , next */) => {
  res.redirect('/');
});


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
//open a connection for every client that requires the service
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
//listen on port 3000
server.listen(process.env.PORT || '3000', () => {
  console.log('Listening on %d.', server.address().port);
});

const eventHubReader = new EventHubReader(iotHubConnectionString, eventHubConsumerGroup);

(async () => {
  //when connected to the hub read the message
  await eventHubReader.startReadMessage((message, date, deviceId) => {
    try {
      const payload = {
        id: randomstring.generate(),
        IotData: message,
        MessageDate: date || Date.now().toISOString(),
        DeviceId: deviceId,
      };

      //write the message inside the cosmos DB
      //entry(payload);
      messagew = JSON.stringify(payload);
      //save it in a JSON file, if it is the first time you receive some data create a new file
      //otherwise just append the new data
      if (count == 0) {
        fs.writeFile('output.json', messagew, 'utf8', function (err) {
          if (err)
            console.log('errore scrittura file');
        });
        count = 1;
      }
      else {
        fs.appendFile('output.json', messagew, 'utf8', function (err) {
          if (err) {
            console.log('errore scrittura file');
          }
        });
      }

      wss.broadcast(messagew);
    } catch (err) {
      console.error('Error broadcasting: [%s] from [%s].', err, message);
    }
  });
})().catch();
/*
//asynchronous function to open the database and write on it 
async function entry(message) {
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await dbContext.create(client, databaseId, containerId);

  try {
    //insert the item inside the database
    const { resource: createdItem } = await container.items.create(message);
    
  } catch (err) {
    console.log(err.message);
  }
}

*/
