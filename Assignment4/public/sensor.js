if (Accelerometer in window) {
  const linear_acceleration = new LinearAccelerationSensor({
    frequency: 1,
  });

  let at = document.getElementById("at").nodeValue;
  linear_acceleration.start();
  linear_acceleration.onreading = () => {
    let x = Number(linear_acceleration.x.toFixed(5));
    let y = Number(linear_acceleration.y.toFixed(5));
    let z = Number(linear_acceleration.z.toFixed(5));
    document.getElementById("x").innerHTML = x;
    document.getElementById("y").innerHTML = y;
    document.getElementById("z").innerHTML = z;
    let telemetry = { x: x, y: y, z: z };
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(telemetry),
    }).then((response) => {
      console.log("Sent!");
      // Update HTML page with results
    });
  };

  linear_acceleration.onerror = (event) => {
    console.log(event.error.name, event.error.message);
    document.getElementById("errorname").innerHTML =
      "Error name: " + event.error.name;
    document.getElementById("errormex").innerHTML =
      "Error Message: " + event.error.message;
  };
}
