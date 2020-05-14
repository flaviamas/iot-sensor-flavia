var express = require("express");
var fs = require("fs");
var https = require("https");
var app = express();
var path = require("path");
var stringc = require("./connectionstr");
var Protocol = require("azure-iot-device-mqtt").Mqtt;
var Client = require("azure-iot-device").Client;
var Message = require("azure-iot-device").Message;

var deviceConnectionString = stringc.fcstring;

// fromConnectionString must specify a transport constructor, coming from any transport package.
var client = Client.fromConnectionString(deviceConnectionString, Protocol);

var connectCallback = function (err) {
  if (err) {
    console.error("Could not connect: " + err.message);
  } else {
    console.log("Client connected");
    client.on("message", function (msg) {
      console.log("Id: " + msg.messageId + " Body: " + msg.data);
      client.complete(msg, printResultFor("completed"));
    });

    client.on("error", function (err) {
      console.error(err.message);
    });

    client.on("disconnect", function () {
      clearInterval(sendInterval);
      client.removeAllListeners();
      client.open(connectCallback);
    });
  }
};

client.open(connectCallback);

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + " error: " + err.toString());
    if (res) console.log(op + " status: " + res.constructor.name);
  };
}

app.use(express.static("public"));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/", function (req, res) {
  let data = req.body;
  var message = new Message(JSON.stringify(data));
  client.sendEvent(message, printResultFor("send"));
  res.send("POST request to the homepage");
});
https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(3000, function () {
    console.log(
      "Example app listening on port 3000! Go to https://localhost:3000/"
    );
  });
