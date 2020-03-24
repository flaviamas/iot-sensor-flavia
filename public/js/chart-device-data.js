/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

$(document).ready(() => {
  // if deployed to a site supporting SSL, use wss://
  const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
  const webSocket = new WebSocket(protocol + location.host);
  

  // A class for holding the last N points of telemetry for a device
  class DeviceData {
    constructor(deviceId) {
      this.deviceId = deviceId;
      this.maxLen = 50;
      this.timeData = new Array(this.maxLen);
      this.temperatureData = new Array(this.maxLen);
      this.humidityData = new Array(this.maxLen);
      this.windintensityData = new Array(this.maxLen);
      this.winddirectionData = new Array(this.maxLen);
      this.rainData = new Array(this.maxLen);
    }

    addData(time, temperature, humidity, windintensity, winddirection, rain) {
      this.timeData.push(time);
      this.temperatureData.push(temperature);
      this.humidityData.push(humidity || null);
      this.windintensityData.push(windintensity || null);
      this.winddirectionData.push(winddirection || null);
      this.rainData.push(rain || null);

      if (this.timeData.length > this.maxLen) {
        this.timeData.shift();
        this.temperatureData.shift();
        this.humidityData.shift();
        this.winddirectionData.shift();
        this.rainData.shift();
        this.windintensityData.shift();

      }
    }
  }

  // All the devices in the list (those that have been sending telemetry)
  class TrackedDevices {
    constructor() {
      this.devices = [];
    }

    // Find a device based on its Id
    findDevice(deviceId) {
      for (let i = 0; i < this.devices.length; ++i) {
        if (this.devices[i].deviceId === deviceId) {
          return this.devices[i];
        }
      }

      return undefined;
    }

    getDevicesCount() {
      return this.devices.length;
    }
  }

  const trackedDevices = new TrackedDevices();

  // Define the chart axes
  const chartData = {
    datasets: [
      {
        fill: false,
        label: 'Temperature',
        yAxisID: 'Temperature',
        borderColor: 'rgba(255, 204, 0, 1)',
        pointBoarderColor: 'rgba(255, 204, 0, 1)',
        backgroundColor: 'rgba(255, 204, 0, 0.4)',
        pointHoverBackgroundColor: 'rgba(255, 204, 0, 1)',
        pointHoverBorderColor: 'rgba(255, 204, 0, 1)',
        spanGaps: true,
      },
      {
        fill: false,
        label: 'Humidity',
        yAxisID: 'Humidity',
        borderColor: 'rgba(24, 120, 240, 1)',
        pointBoarderColor: 'rgba(24, 120, 240, 1)',
        backgroundColor: 'rgba(24, 120, 240, 0.4)',
        pointHoverBackgroundColor: 'rgba(24, 120, 240, 1)',
        pointHoverBorderColor: 'rgba(24, 120, 240, 1)',
        spanGaps: true,
      },
      {
        fill: false,
        label: 'WindIntesnsity',
        yAxisID: 'Windint',
        borderColor: 'rgba(79, 141, 30, 1)',
        pointBoarderColor: 'rgba(79, 141, 30, 1)',
        backgroundColor: 'rgba(79, 141, 30, 1)',
        pointHoverBackgroundColor: 'rgba(79, 141, 30, 1)',
        pointHoverBorderColor: 'rgba(79, 141, 30, 1)',
        spanGaps: true,
      },
      {
        fill: false,
        label: 'Winddirection',
        yAxisID: 'Winddir',
        borderColor: 'rgba(217, 39, 39, 1)',
        pointBoarderColor: 'rgba(217, 39, 39, 1)',
        backgroundColor: 'rgba(217, 39, 39, 1)',
        pointHoverBackgroundColor: 'rgba(217, 39, 39, 1)',
        pointHoverBorderColor: 'rgba(217, 39, 39, 1)',
        spanGaps: true,
      },
      {
        fill: false,
        label: 'Rain',
        yAxisID: 'Rain',
        borderColor: 'rgba(121, 7, 242, 75)',
        pointBoarderColor: 'rgba(121, 7, 242, 75)',
        backgroundColor: 'rgba(121, 7, 242, 75)',
        pointHoverBackgroundColor: 'rgba(121, 7, 242, 75)',
        pointHoverBorderColor: 'rgba(121, 7, 242, 75)',
        spanGaps: true,
      }
    ]
  };

  const chartOptions = {
    scales: {
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'Temperature (ºC)',
          display: true,
        },
        position: 'left',
      },
      {
        id: 'Humidity',
        type: 'linear',
        scaleLabel: {
          labelString: 'Humidity (%)',
          display: true,
        },
        position: 'left',
      },
      {
        id: 'Windint',
        type: 'linear',
        scaleLabel: {
          labelString: 'Windintensity (%)',
          display: true,
        },
        position: 'left',
      },
      {
        id: 'Winddir',
        type: 'linear',
        scaleLabel: {
          labelString: 'Winddirection (°)',
          display: true,
        },
        position: 'left',
      },
      {
        id: 'Rain',
        type: 'linear',
        scaleLabel: {
          labelString: 'Rain (mm/h)',
          display: true,
        },
        position: 'left',
      }

      ]
    }
  };

  // Get the context of the canvas element we want to select
  const ctx = document.getElementById('iotChart').getContext('2d');
  const myLineChart = new Chart(
    ctx,
    {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  const showing = document.getElementById('showing');

  // Manage a list of devices in the UI, and update which device data the chart is showing
  // based on selection
  let needsAutoSelect = true;
  const deviceCount = document.getElementById('deviceCount');
  const listOfDevices = document.getElementById('listOfDevices');
  function OnSelectionChange() {
    const device = trackedDevices.findDevice(listOfDevices[listOfDevices.selectedIndex].text);
    chartData.labels = device.timeData;
    chartData.datasets[0].data = device.temperatureData;
    chartData.datasets[1].data = device.humidityData;
    chartData.datasets[2].data = device.windintensityData;
    chartData.datasets[3].data = device.winddirectionData;
    chartData.datasets[4].data = device.rainData;
  }
  listOfDevices.addEventListener('change', OnSelectionChange, false);

  // When a web socket message arrives:
  // 1. Unpack it
  // 2. Validate it has date/time and temperature
  // 3. Find or create a cached device to hold the telemetry data
  // 4. Append the telemetry data
  // 5. Update the chart UI
  webSocket.onmessage = function onMessage(message) {
    try {
      const messageData = JSON.parse(message.data);
      console.log("file JSON \n" + messageData);

      // time and either temperature or humidity are required
      if (!messageData.MessageDate || (!messageData.IotData.temperature && !messageData.IotData.humidity)) {
        return;
      }

      // find or add device to list of tracked devices
      const existingDeviceData = trackedDevices.findDevice(messageData.DeviceId);

      if (existingDeviceData) {
        existingDeviceData.addData(messageData.MessageDate, messageData.IotData.temperature, messageData.IotData.humidity, messageData.IotData.windintensity, messageData.IotData.winddirection,messageData.IotData.rain);
      } else {
        const newDeviceData = new DeviceData(messageData.DeviceId);
        trackedDevices.devices.push(newDeviceData);
        const numDevices = trackedDevices.getDevicesCount();
        deviceCount.innerText = numDevices === 1 ? `${numDevices} device` : `${numDevices} devices`;
        newDeviceData.addData(messageData.MessageDate, messageData.IotData.temperature, messageData.IotData.humidity, messageData.IotData.windintensity, messageData.IotData.winddirection,messageData.IotData.rain);

        // add device to the UI list
        const node = document.createElement('option');
        const nodeText = document.createTextNode(messageData.DeviceId);
        node.appendChild(nodeText);
        listOfDevices.appendChild(node);

        // if this is the first device being discovered, auto-select it
        if (needsAutoSelect) {
          needsAutoSelect = false;
          listOfDevices.selectedIndex = 0;
          OnSelectionChange();
        }

        
      }

      myLineChart.update();
    } catch (err) {
      console.error(err);
    }
  };

  
  
});

