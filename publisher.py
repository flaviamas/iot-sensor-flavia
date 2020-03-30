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

	#print((json.dumps(message.payload)))
	# Send a single message
	print("received message "+str(message.payload))
	#device_client.send_message(json.dumps(message.payload))


        
def on_connect(client, userdata, flags, rc):
	 
	print("Connected with result code "+str(rc))
	mqttc.subscribe("device")
	
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
    mqttc.connect('fec0:affe::1',1886,60)
    mqttc.on_connect = on_connect
    mqttc.on_message = on_message
    mqttc.loop_forever()
	
		

  
 
    # finally, disconnect
    device_client.disconnect()

