

# Sending sensor data to AzureIoTHUB using MQTT 
The project consists in the creation of an architecture based on the MQTT protocol to transmit data. The following code consists in two different publishers that send data to the MQTT Broker and then the data is visualized on a web app. The MQTT Broker is realized via AzureIoTHub. 
## Technologies 
* [Azure IoT](https://azure.microsoft.com/it-it/overview/iot/)
* [Azure Cosmos DB](https://azure.microsoft.com/it-it/services/cosmos-db/)

## Overview
The publisher is a simulated device that publishes some random values on a MQTT topic in the AzureIoT Hub.
When data arrive to the MQTT Broker the Broker sends it to a Web Application that shows the data trend in a 
chart. 
# How to Use
Downoald the Repository, install all the node dependencies that you'll need by using the command 
`npm install`.
Now add your connection string inside the `server.js` module
```javascript
const iotHubConnectionString = <your connection string>;
const eventHubConsumerGroup = <your consumer group>;
```
To save the values inside a CosmosDB database you also need to create a new `file config.js` and writing 
`
const config = {
    endpoint: "Your Endpoint",
    key: "Your primary key",
    databaseId: "task",
    containerId: "items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  
  module.exports = config;
`
now you need to build and run the server by using `npm start`

# Other Links
- [Hands-on Tutorial]()
- [Demo Video]()
