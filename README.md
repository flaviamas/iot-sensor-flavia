

# Sending sensor data to AzureIoTHUB using MQTT 
The project consists in the creation of an architecture based on the MQTT protocol to transmit data. The following code consists in two different publishers that send data to the MQTT Broker and then the data is visualized on a web app. The MQTT Broker is realized via AzureIoTHub. 
## Technologies 
* [Azure IoT](https://azure.microsoft.com/it-it/overview/iot/)
* [NodeJs](q)

## Overview
The publisher is a simulated device that publishes some random values on a MQTT topic in the AzureIoT Hub.
When data arrive to the MQTT Broker the Broker sends it to a Web Application that shows the data trend in a 
chart. 
# How to Use
To try the project just go on 
[Web App](https://flaviasensoriot.azurewebsites.net)
and download the repository. At this point run Publisher.py and Publisher1.py
You'll have two devices connected to the Hub and sending data and you will see the results of that in the chart of the Web App.
# Other Links
- [Hands-on Tutorial]()
- [Demo Video]()
