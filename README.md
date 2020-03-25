

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
Now add your connection string inside a `variable.js` module in the SetUp folder
```javascript
module.exports={
    'conn_string' :'Your host string',
    'consumer' : 'Your Consumer Name'
}
```
To save the values inside a CosmosDB database you also need to create a new file inside the setUp folder called `config.js` and write
```
const config = {
    endpoint: "Your Endpoint",
    key: "Your primary key",
    databaseId: "task",
    containerId: "items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  
  module.exports = config;
```
now you need to build and run the server by using `npm start`.

At this point to run the publisher you need to add your Device connection string to the python code, both in `Publisher.py`and `Publisher1.py`
```
conn_str = "HostName=################"

```
Now you just have to run the python code, connect on your browser on `localhost:3000` and you'll see the real time data of your device

# Other Links
- [Hands-on Tutorial](https://www.linkedin.com/pulse/environment-sensors-azureiot-hub-mqtt-protocol-flavia-masoni/?published=t)
- [Demo Video](https://www.youtube.com/watch?v=fYQqH0yyTSQ&t=6s)
