
# Homework 1
## Sending sensor data to Azure IoT HUB using MQTT 
The project consists in the creation of an architecture based on the MQTT protocol to transmit data. The following code consists in two different publishers that send data to the MQTT Broker and then the data is visualized on a web app. The MQTT Broker is realized via AzureIoTHub. 
## Technologies 
* [Azure IoT](https://azure.microsoft.com/it-it/overview/iot/)
* [Azure Cosmos DB](https://azure.microsoft.com/it-it/services/cosmos-db/)

## Overview
The publisher is a simulated device that publishes some random values on a MQTT topic in the AzureIoT Hub.
When data arrive to the MQTT Broker the Broker sends it to a Web Application that shows the data trend in a 
chart. 
## How to Use
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

# Homework 2
## Creating a RIOT application to send data to the Azure Iot Hub 
This second part of the project is about building a RIOT application and send the device data to the Azure IoT hub. The RIOT application uses the MQTT-SN protocol that runs over UDP and the Azure Hub uses the MQTT protocol that runs over TCP, so the final goal is to create a transparent gateway to connect these two components.
## Overview
The transparent gateway is the element that subscribes to the MQTT-SN broker and publishes the data received on the MQTT channel. The transparent Gateway is implemented in python by the use of the MQTT Paho library.  The MQTT-broker is an RSMB broker that can be found following this [link](https://github.com/eclipse/mosquitto.rsmb). To see how you can run the code follow the Hands-on tutorial below.

# Other Links
## LinkedIn Profile
[Flavia Masoni](https://www.linkedin.com/in/flavia-masoni/)
## Links for the First Homework
- [Hands-on Tutorial](https://www.linkedin.com/pulse/environment-sensors-azureiot-hub-mqtt-protocol-flavia-masoni/?published=t)
- [Demo Video](https://www.youtube.com/watch?v=fYQqH0yyTSQ&t=6s)
## Links for the Second Homework
- [Hands-on Tutorial]()
- [Demo Video](https://youtu.be/9TTQIUp1_iU)