
import threading
import time
import datetime
import json
import os
import ttn
import connectionstring
import paho.mqtt.client as mqtt
from azure.iot.device import IoTHubDeviceClient, MethodResponse


def on_message(client, userdata, message):

	print("Received message '")
	# Capturing the message arrived on TTN Topic
	generic_payload = json.loads(message.payload)
	msg = generic_payload['payload_fields']
	payload_1 = msg['string']
	final = str(json.dumps(payload_1))
	final = final.replace("\\","")
	finalarray=[]
	for elem in final:
		if(elem.isdigit()):
			finalarray.append(elem)
	jsonfile={"temperature":finalarray[0],"humidity":finalarray[1],"windintensity":finalarray[2],"winddirection":finalarray[3],"rain":finalarray[4]}
	print(jsonfile)
	print("sending message to the hub")
	azure_client.send_message(json.dumps(jsonfile))
	print("sent")


def on_connect(client, userdata, flags, rc):

    print("Connected with result code "+str(rc))
    mqttc.subscribe("device")


if __name__ == "__main__":
    # Azure Connection
    # Create instance of the device client using the connection string
    conn_str = connectionstring.connect1
    azure_client = IoTHubDeviceClient.create_from_connection_string(conn_str)
    print("connection to the hub")
    azure_client.connect()

    # Thethingsnetwork connection
    ttn_host = 'eu.thethings.network'
    ttn_port = 1883
    ttn_topic = '+/devices/+/up'
    ttn_user = 'sensor-iot-flavia'
    ttn_key = 'ttn-account-v2.EsmXG-SRGhIPZxRp6ECMb_VbEmkuKtkaE7h8pjUuwKg'

    # Setting up Data Receiver from TTN
    # create client for data receiver from TTN
    datarec = mqtt.Client("DataRec")
    # define what to do when a message is received
    datarec.on_message = on_message
    # access with the right credentials
    datarec.username_pw_set(ttn_user, password=ttn_key)
    # establish connection
    datarec.connect(ttn_host, ttn_port, keepalive=60)
    datarec.subscribe(ttn_topic, qos=1)
    datarec.loop_forever()
