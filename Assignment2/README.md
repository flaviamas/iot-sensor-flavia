# Second Assignment 
The second assignment is about simulating sensor data by a RiotOs application and send them to an MQTTSN broker via the MQTT-SN protocol. We add two more modules to the architecture that are an MQTT-SN Broker and an MQTT-SN transparent bridge. 
## Technologies 
- [RiotOS](https://riot-os.org/)
- [MQTT-SN Broker](http://mqtt.org/tag/rsmb)
## Overview 
Inside this folder there are two modules, the first one is the MQTT-SN client that uses RiotOs to simulate sensor data to send to the Azure Hub. Inside the MqttBridge folder we have the Mqtt-SN transparent Bridge that subscribes to the “device” topic and sends the data that receives on that topic to the Azure Hub
## Other Links
-[Hands-on tutorial](https://www.linkedin.com/pulse/building-riot-app-send-data-azure-iot-hub-flavia-masoni/)
-[Demo Video](https://www.youtube.com/watch?v=9TTQIUp1_iU&feature=youtu.be)
