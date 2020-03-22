import threading
import time
import random
import datetime
import json
import os
from azure.iot.device import IoTHubDeviceClient, MethodResponse


if __name__ == "__main__":
    # Fetch the connection string from an enviornment variable
    conn_str = "HostName=assignment-hub.azure-devices.net;DeviceId=mydevice2;SharedAccessKey=h3mGZrP1HR7vXqX7GCoIlwsjM4UhGq5v0n4p9mpsX38="

    # Create instance of the device client using the connection string
    device_client = IoTHubDeviceClient.create_from_connection_string(conn_str)
    device_client.connect()
    # Connect the device client.
    while(True):
        time.sleep(5)
        file_j = {'temperature': random.randrange(-50, 50),
                'humidity': random.randrange(0, 100),
                'windintensity':random.randrange(0,100),
                'winddirection':random.randrange(0,360),
                'rain':random.randrange(0,50)}
        print((json.dumps(file_j)))
        # Send a single message
        print("Sending message...")
        device_client.send_message(json.dumps(file_j))
        print("Message successfully sent!")
    # finally, disconnect
    device_client.disconnect()
