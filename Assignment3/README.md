# Assignment 3 
This part of the homework allows us to create a Riot-OS application that can be executed on a LoraWan device and sends data to the MQTT Broker of The Things Network. We also build a Transparent bridge to subscribe to specific topic of The Things network MQTT channel and send the received data to the Azure Hub.
## Technologies
- [The Things Network](https://www.thethingsnetwork.org/)
- [LoraWAN](https://lora-alliance.org/about-lorawan)
## Overview
Starting from RiotOS we simulate a sensor that randomly generates 5 different values corresponding to temperature, humidity, wind intensity, wind direction and rain. Then we publish these data on a topic. The things network broker receives these data and when the python Transparent Bridge subscribes to the same topic reads the data and formats them. The final JSON file is sent to the Azure IoT Hub and we can start the Web App to see the data on a chart. 
## Other Links
- [Hands on tutorial](https://www.linkedin.com/pulse/lorawan-things-network-send-data-azure-iot-hub-flavia-masoni)
- [Demo Video](https://www.youtube.com/watch?v=FAQi6sA85Xw&feature=emb_logo)
