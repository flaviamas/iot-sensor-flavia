import threading
import time
import random
import datetime
import json
import os
import connectionstring
import paho.mqtt.client as mqtt
from azure.iot.device import IoTHubDeviceClient, MethodResponse

def on_message(client, userdata, message):

        print((json.dumps(message.payload)))
        # Send a single message
        print("Sending message...")
        device_client.send_message(json.dumps(message.payload))
        print("Message successfully sent!")
        time.sleep(5)

if __name__ == "__main__":
    # Fetch the connection string from an enviornment variable
    conn_str = connectionstring.connect1

    # Create instance of the device client using the connection string
    device_client = IoTHubDeviceClient.create_from_connection_string(
        conn_str, websockets=True)
    device_client.connect()
    #create an istance to connect to mqtt-sn broker
    mqttc = mqtt.Client()
    #connect to the mqtt-sn broker
    mqttc.connect("localhost",1885,60)
   # mqttc.loop_start()

    mqttc.on_message = on_message


  
 
    # finally, disconnect
    device_client.disconnect()

