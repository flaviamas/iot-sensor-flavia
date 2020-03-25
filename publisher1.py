import threading
import time
import random
import datetime
import json
import os
import connectionstring
from azure.iot.device import IoTHubDeviceClient, MethodResponse


if __name__ == "__main__":
    # Fetch the connection string from an enviornment variable
    conn_str = connectionstring.connect2

    # Create instance of the device client using the connection string
    device_client = IoTHubDeviceClient.create_from_connection_string(conn_str,websockets=True)
    device_client.connect()
    # Connect the device client.
    while(True):
        file_j = {'temperature': random.randrange(-50, 50),
                  'humidity': random.randrange(0, 100),
                  'windintensity': random.randrange(0, 100),
                  'winddirection': random.randrange(0, 360),
                  'rain': random.randrange(0, 50)}
        print((json.dumps(file_j)))
        # Send a single message
        print("Sending message...")
        device_client.send_message(json.dumps(file_j))
        print("Message successfully sent!")
        time.sleep(15)
    # finally, disconnect
    device_client.disconnect()
