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

	
	value = message.payload
	print("data  "+str(value))
	#intvalue = str(value,'utf-8')
	intvalue = int.from_bytes(value,'little')
	print(str(intvalue))
	jsonfile = {'device':intvalue}
	print("sending message to the hub")
	device_client.send_message(json.dumps(jsonfile))
	print("sent")

        
def on_connect(client, userdata, flags, rc):
	 
	print("Connected with result code "+str(rc))
	mqttc.subscribe("device")
	mqttc.subscribe("device/temperature")
	mqttc.subscribe("device/humididty")
	mqttc.subscribe("device/windint")
	mqttc.subscribe("device/winddir")
	mqttc.subscribe("device/rain")
	
if __name__ == "__main__":
    # Fetch the connection string from an enviornment variable
    conn_str = connectionstring.connect1

    # Create instance of the device client using the connection string
    device_client = IoTHubDeviceClient.create_from_connection_string(conn_str)
    print("connection to the hub")
    device_client.connect()
    #create an istance to connect to mqtt-sn broker
    mqttc = mqtt.Client()
    
    #connect to the mqtt-sn broker
    mqttc.connect('fec0:affe::1',1886,60)
    mqttc.on_connect = on_connect
    mqttc.on_message = on_message
    mqttc.loop_forever()
    print("Hub disconnection")
    device_client.disconnect()
    print("DONE!")
	
	
